import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // 1️⃣ FETCH LATEST BATCH
    const batchResult = await pool.query(
      `SELECT *
       FROM batches
       ORDER BY created_at DESC
       LIMIT 1`
    );

    if (batchResult.rows.length === 0) {
      return NextResponse.json({ message: "No batches found" });
    }

    const batch = batchResult.rows[0];
    const batch_id = batch.batch_id;

    // 2️⃣ FETCH PRIMARY
    const primaryResult = await pool.query(
      `SELECT *
       FROM primary_stage_readings
       WHERE batch_id = $1
       ORDER BY id DESC
       LIMIT 1`,
      [batch_id]
    );

    // 3️⃣ FETCH SECONDARY
    const secondaryResult = await pool.query(
      `SELECT *
       FROM secondary_stage_readings
       WHERE batch_id = $1
       ORDER BY id DESC
       LIMIT 1`,
      [batch_id]
    );

    // 4️⃣ FETCH TERTIARY
    const tertiaryResult = await pool.query(
      `SELECT *
       FROM tertiary_stage_readings
       WHERE batch_id = $1
       ORDER BY id DESC
       LIMIT 1`,
      [batch_id]
    );

    return NextResponse.json({
      batch,
      primary: primaryResult.rows[0] || null,
      secondary: secondaryResult.rows[0] || null,
      tertiary: tertiaryResult.rows[0] || null
    });

  } catch (err) {
    console.error("Error fetching full latest batch:", err);
    return NextResponse.json(
      { error: "Failed to fetch latest batch data" },
      { status: 500 }
    );
  }
}
