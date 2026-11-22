import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const CV_UPLOAD_DIR = path.resolve(process.cwd(), "secure_uploads", "cvs");
const MAX_CV_BYTES = 5 * 1024 * 1024; // 5MB

const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function validateCvUpload(file) {
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext) || !ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("CV must be a PDF, DOC, or DOCX file.");
  }
  if (file.size <= 0 || file.size > MAX_CV_BYTES) {
    throw new Error("CV file size must be between 1 byte and 5MB.");
  }
}

export async function persistCvFile(fileName, data) {
  await fs.mkdir(CV_UPLOAD_DIR, { recursive: true });
  const ext = path.extname(fileName).toLowerCase();
  const storedName = `${crypto.randomUUID()}${ext}`;
  const absolutePath = path.join(CV_UPLOAD_DIR, storedName);

  await fs.writeFile(absolutePath, data);

  return {
    cvFileName: path.basename(fileName),
    cvFilePath: path.relative(process.cwd(), absolutePath),
  };
}