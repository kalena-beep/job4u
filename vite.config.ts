// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Pool } from "pg";
import "dotenv/config";

import { validateCvUpload, persistCvFile } from "./src/server/cv-storage";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

function job4uDevApiPlugin() {
  return {
    name: "job4u-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const cleanUrl = (req.url ?? "").split("?")[0];
        const method = req.method ?? "GET";

        if (!cleanUrl.startsWith("/api/")) {
          return next();
        }

        const sendJson = (status: number, payload: unknown) => {
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(payload));
        };

        try {
          if (cleanUrl === "/api/jobs" && method === "GET") {
            const { rows } = await pool.query(
              `SELECT * FROM "Job" ORDER BY "createdAt" DESC, "id" DESC`
            );
            return sendJson(200, { jobs: rows });
          }

          if (cleanUrl.startsWith("/api/jobs/") && method === "GET") {
            const slug = decodeURIComponent(cleanUrl.replace("/api/jobs/", ""));
            const { rows } = await pool.query(
              `SELECT * FROM "Job" WHERE "slug" = $1 LIMIT 1`,
              [slug]
            );
            if (!rows[0]) {
              return sendJson(404, { message: "Job not found." });
            }
            return sendJson(200, { job: rows[0] });
          }

          if (cleanUrl === "/api/applications" && method === "POST") {
            const origin = `http://${req.headers.host || "localhost:8080"}`;
            const webRequest = new Request(new URL(cleanUrl, origin), {
              method: "POST",
              headers: req.headers as Record<string, string>,
              body: req as unknown as BodyInit,
              // @ts-expect-error Node fetch/Request duplex required for request body stream
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
              return sendJson(400, { message: "All required fields must be filled." });
            }

            if (!(cvEntry instanceof File)) {
              return sendJson(400, { message: "CV file is required." });
            }

            validateCvUpload({
              name: cvEntry.name,
              type: cvEntry.type,
              size: cvEntry.size,
            });

            const bytes = Buffer.from(await cvEntry.arrayBuffer());
            const { cvFileName, cvFilePath } = await persistCvFile(cvEntry.name, bytes);

            const parsedJobId = Number(jobIdRaw);
            const { rows } = await pool.query(
              `INSERT INTO "Application" (
                "jobId", "fullName", "email", "phone", "coverLetter",
                "cvFileName", "cvFilePath", "status", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'NEW', NOW())
              RETURNING *`,
              [
                Number.isNaN(parsedJobId) ? jobIdRaw : parsedJobId,
                fullName,
                email,
                phone,
                coverLetter,
                cvFileName,
                cvFilePath,
              ]
            );

            return sendJson(201, { application: rows[0] });
          }

          return next();
        } catch (err) {
          return sendJson(500, {
            message: err instanceof Error ? err.message : "Internal server error",
          });
        }
      });
    },
  };
}

export default defineConfig({
  vite: {
    base: "./",
    plugins: [
      job4uDevApiPlugin(),
    ],
  },

  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: true,
      onSuccess: async () => {
        const staticHtml = resolve("dist/client/index.html");
        const html = await readFile(staticHtml, "utf8");
        await writeFile(
          staticHtml,
          html.replace(/(src|href)=(["'])\/\.\//g, "$1=$2./")
        );
      },
    },
  },

  nitro: false,
});