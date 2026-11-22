import path from "node:path";
import crypto from "node:crypto";

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5MB

const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function guessMimeType(ext) {
  if (ext === ".pdf") return "application/pdf";
  if (ext === ".doc") return "application/msword";
  if (ext === ".docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return "application/octet-stream";
}

export function validateCvUpload(file) {
  const ext = path.extname(String(file?.name || "")).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext) || !ALLOWED_MIME_TYPES.has(file?.type)) {
    throw new Error("CV must be a PDF, DOC, or DOCX file.");
  }
  if (typeof file?.size !== "number" || file.size <= 0 || file.size > MAX_CV_BYTES) {
    throw new Error("CV file size must be between 1 byte and 5MB.");
  }
}

export async function persistCvFile(fileName, data, mimeType) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_CV_BUCKET || "cvs";

  if (!supabaseUrl || !serviceKey) {
    throw new Error(
      `Missing Supabase env: SUPABASE_URL=${Boolean(supabaseUrl)}, SUPABASE_SERVICE_ROLE_KEY=${Boolean(serviceKey)}`
    );
  }

  const cleanName = path.basename(String(fileName || "cv.pdf")).trim() || "cv.pdf";
  const ext = path.extname(cleanName).toLowerCase();
  const storedName = `${crypto.randomUUID()}${ext}`;
  const objectPath = `applications/${storedName}`;

  const buffer = Buffer.isBuffer(data)
    ? data
    : data instanceof ArrayBuffer
      ? Buffer.from(data)
      : Buffer.from(data);

  const contentType = mimeType || guessMimeType(ext);
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`;

  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": contentType,
      "x-upsert": "true",
    },
    body: buffer,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Supabase Storage upload failed (${res.status}): ${errText}`);
  }

  return {
    cvFileName: cleanName,
    cvFilePath: `${bucket}/${objectPath}`,
  };
}