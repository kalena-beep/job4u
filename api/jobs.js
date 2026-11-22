import { pool, jsonResponse } from "./_db.js";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim().toLowerCase();
    const location = (url.searchParams.get("location") || "").trim().toLowerCase();
    const type = (url.searchParams.get("type") || "").trim().toLowerCase();

    const conditions = [`COALESCE("published", true) = true`];
    const params = [];

    if (q) {
      params.push(`%${q}%`);
      const idx = params.length;
      conditions.push(
        `(LOWER(COALESCE("title", '')) LIKE $${idx} OR LOWER(COALESCE("company", '')) LIKE $${idx} OR LOWER(COALESCE("location", '')) LIKE $${idx})`
      );
    }

    if (location) {
      params.push(`%${location}%`);
      const idx = params.length;
      conditions.push(
        `(LOWER(COALESCE("location", '')) LIKE $${idx} OR LOWER(COALESCE("workMode", '')) LIKE $${idx})`
      );
    }

    if (type) {
      params.push(type);
      const idx = params.length;
      conditions.push(`LOWER(COALESCE("employmentType", '')) = $${idx}`);
    }

    const sql = `
      SELECT *
      FROM "Job"
      WHERE ${conditions.join(" AND ")}
      ORDER BY "featured" DESC NULLS LAST, "createdAt" DESC NULLS LAST, "id" DESC
    `;

    const { rows } = await pool.query(sql, params);
    return jsonResponse({ jobs: rows }, 200);
  } catch (err) {
    return jsonResponse(
      { message: err instanceof Error ? err.message : "Failed to load jobs." },
      500
    );
  }
}