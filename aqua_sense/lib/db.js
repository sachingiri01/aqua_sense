// setupDatabase.js
// ---------------------------------------------------------
// RUN THIS ONE FILE to push schema + seeds to Neon DB.
// Usage (local):   DATABASE_URL="postgresql://..." node setupDatabase.js
// ---------------------------------------------------------

import fs from "fs";
import path from "path";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("ERROR: Missing DATABASE_URL environment variable. Set it and retry.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  // Neon requires ssl mode; depending on your environment you may set rejectUnauthorized false
  ssl: { rejectUnauthorized: false },
});

async function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, { encoding: "utf8" });
  // simple split: allows multiple statements; for complex setups consider using pg-format or running as a single query
  return pool.query(sql);
}

async function main() {
  console.log("⏳ Connecting to Neon...");
  const client = await pool.connect();
  try {
    console.log("🚀 Applying schema (db/schema.sql)...");
    await runSqlFile(path.join(process.cwd(), "db", "schema.sql"));
    console.log("✅ Schema applied.");

    console.log("🚀 Applying seeds (db/seed.sql)...");
    await runSqlFile(path.join(process.cwd(), "db", "seed.sql"));
    console.log("✅ Seeds applied.");

    console.log("🎉 Done.");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
