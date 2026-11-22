import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
import "dotenv/config";

import { validateCvUpload, persistCvFile } from "./src/server/cv-storage.mjs";

const __dirname = path.resolve();
const PORT = Number(process.env.PORT || 8080);
const DIST_CLIENT_DIR = path.resolve(__dirname, "dist/client");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function serveStatic(res, pathname) {
  const relPath = pathname === "/" ? "/index.html" : pathname;
  const safePath = path.normalize(relPath).replace(/^(\.\.[/\\])+/, "");
  let fullPath = path.join(DIST_CLIENT_DIR, safePath);

  if (!fullPath.startsWith(DIST_CLIENT_DIR + path.sep) && fullPath !== DIST_CLIENT_DIR) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  try {
    let stat = await fsp.stat(fullPath);
    if (stat.isDirectory()) {
      fullPath = path.join(fullPath, "index.html");
      stat = await fsp.stat(fullPath);
    }
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(fullPath).pipe(res);
  } catch {
    // Fallback SPA / public route ke index.html jika file statis tidak ditemukan
    const indexHtml = path.join(DIST_CLIENT_DIR, "index.html");
    try {
      await fsp.access(indexHtml, fs.constants.R_OK);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      fs.createReadStream(indexHtml).pipe(res);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  }
}

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url || "/", `http://${req.headers.host || `localhost:${PORT}`}`);
  const cleanUrl = urlObj.pathname;
  const method = req.method || "GET";

  if (!cleanUrl.startsWith("/api/")) {
    return serveStatic(res, cleanUrl);
  }

  try {
    if (cleanUrl === "/api/jobs" && method === "GET") {
      const { rows } = await pool.query(
        `SELECT * FROM "Job" WHERE COALESCE("published", true) = true ORDER BY "createdAt" DESC, "id" DESC`
      );
      return sendJson(res, 200, { jobs: rows });
    }

    if (cleanUrl.startsWith("/api/jobs/") && method === "GET") {
      const slug = decodeURIComponent(cleanUrl.replace("/api/jobs/", ""));
      const { rows } = await pool.query(
        `SELECT * FROM "Job" WHERE "slug" = $1 AND COALESCE("published", true) = true LIMIT 1`,
        [slug]
      );
      if (!rows[0]) {
        return sendJson(404, { message: "Job not found." });
      }
      return sendJson(res, 200, { job: rows[0] });
    }

    if (cleanUrl === "/api/applications" && method === "POST") {
      const origin = `http://${req.headers.host || `localhost:${PORT}`}`;
      const webRequest = new Request(new URL(cleanUrl, origin), {
        method: "POST",
        headers: req.headers,
        body: req,
        duplex: "half",
      });

      const formData = await webRequest.formData();
      const jobIdRaw = String(formData.get("jobId") ?? "").trim();
      const fullName = String(formData.get("fullName") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const phone = String(formData.get("phone") ?? "").trim();
      const coverLetter = String(formData.get("coverLetter") ?? "").trim();
      const cvEntry = formData.get("cv");

      if (!jobIdRaw || !fullName || !email || !phone || !coverLetter) {
        return sendJson(res, 400, { message: "All required fields must be filled." });
      }

      if (!cvEntry || typeof cvEntry.arrayBuffer !== "function") {
        return sendJson(res, 400, { message: "CV file is required." });
      }

      validateCvUpload({
        name: cvEntry.name,
        type: cvEntry.type,
        size: cvEntry.size,
      });

      const bytes = Buffer.from(await cvEntry.arrayBuffer());
      const { cvFileName, cvFilePath } = await persistCvFile(cvEntry.name, bytes);

      const parsedJobId = Number(jobIdRaw);
        if (!Number.isInteger(parsedJobId) || parsedJobId <= 0) {
        return sendJson(400, { message: "Invalid jobId." });
        }

        const { rows } = await pool.query(
        `INSERT INTO "Application" (
            "jobId", "fullName", "email", "phone", "coverLetter",
            "cvFileName", "cvFilePath", "status", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'NEW', NOW())
        RETURNING *`,
        [
            parsedJobId,
            fullName,
            email,
            phone,
            coverLetter,
            cvFileName,
            cvFilePath,
        ]
        );

      return sendJson(res, 201, { application: rows[0] });
    }

    return sendJson(res, 404, { message: "API endpoint not found." });
  } catch (err) {
    return sendJson(500, {
      message: err instanceof Error ? err.message : "Internal server error",
    });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Jobs4U public server running on port ${PORT}`);
});