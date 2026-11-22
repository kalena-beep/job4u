import { Pool } from "pg";

const globalForDb = globalThis;

export const pool =
  globalForDb.__jobs4uPgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.DATABASE_URL?.includes("localhost") ||
      process.env.DATABASE_URL?.includes("127.0.0.1")
        ? false
        : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__jobs4uPgPool = pool;
}

const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_CV_EXTS = new Set([".pdf", ".doc", ".docx"]);
const MAX_CV_BYTES = 5 * 1024 * 1024; // 5MB

export function validateCvFile(file) {
  if (!(file instanceof File) || file.size === 0) {
    return "CV file is required.";
  }
  if (file.size > MAX_CV_BYTES) {
    return "CV file must be 5MB or smaller.";
  }

  const name = String(file.name || "").toLowerCase();
  const extMatch = name.match(/\.[a-z0-9]+$/);
  const ext = extMatch ? extMatch[0] : "";

  const validType = file.type ? ALLOWED_CV_TYPES.has(file.type) : false;
  const validExt = ALLOWED_CV_EXTS.has(ext);

  if (!validType && !validExt) {
    return "Only PDF, DOC, or DOCX files are allowed.";
  }

  return null;
}

export async function uploadCvToSupabase(file) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_CV_BUCKET || "cvs";

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  const originalName = String(file.name || "cv.pdf").trim();
  const safeName = originalName
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(-80) || "cv.pdf";

  const objectPath = `applications/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const res = await fetch(
    `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`, { method: "POST", headers: { Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "true",
      },
      body: bytes,
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Supabase Storage upload failed (${res.status}):${errText}`);
  }

  return {
    cvFileName: originalName,
    cvFilePath: `${bucket}/${objectPath}`,
  };
}

export async function downloadCvFromSupabase(cvFilePath) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const defaultBucket = process.env.SUPABASE_CV_BUCKET || "cvs";

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  const cleanPath = String(cvFilePath || "").trim().replace(/^\/+/, "");
  if (!cleanPath) {
    throw new Error("Invalid cvFilePath.");
  }

  const parts = cleanPath.split("/");
  const bucket = parts.length >= 2 ? parts[0] : defaultBucket;
  const objectPath = parts.length >= 2 ? parts.slice(1).join("/") : cleanPath;

  const res = await fetch(
    `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`, { method: "GET", headers: { Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Supabase Storage download failed (${res.status}):${errText}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "application/octet-stream";

  return { buffer, contentType };
}

export function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}