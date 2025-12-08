// app/api/broadcasts/list/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Reuse pool across hot reloads in development to avoid too many clients.
const pool = globalThis.__pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
});

if (!globalThis.__pgPool) globalThis.__pgPool = pool;

export async function GET(req) {
  try {
    const client = await pool.connect();

    try {
      const q = `
        SELECT
          b.broadcast_id,
          b.user_id,
          b.broadcast_type,
          b.title,
          b.message,
          b.created_at,
          b.updated_at,
          -- optional author info
          u.name    AS author_name,
          u.email   AS author_email,
          u.image   AS author_image
        FROM broadcasts b
        LEFT JOIN "User" u ON b.user_id = u.id
        ORDER BY b.created_at DESC
        LIMIT 100
      `;

      const r = await client.query(q);

      // return rows as JSON
      return NextResponse.json(r.rows, { status: 200 });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('GET /api/broadcasts/list error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
