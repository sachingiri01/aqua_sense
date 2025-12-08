// app/api/broadcasts/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js';

// init pg pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Small helper
async function getSession() {
  return await getServerSession(authOptions);
}

/* ------------------ CHECK ADMIN (UI Hint Only) ------------------ */
export async function GET(req) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }

    const email = session.user.email;
    const client = await pool.connect();

    try {
      const r = await client.query(
        'SELECT role FROM "User" WHERE email = $1 LIMIT 1',
        [email]
      );

      if (r.rowCount === 0) {
        return NextResponse.json({ isAdmin: false }, { status: 200 });
      }

      return NextResponse.json({ isAdmin: r.rows[0].role === 'admin' });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('check-admin error:', err);
    return NextResponse.json({ isAdmin: false }, { status: 200 });
  }
}

/* ------------------------- CREATE BROADCAST ------------------------- */
export async function POST(req) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const email = session.user.email;
    const { broadcast_type, title, message } = await req.json();

    if (!broadcast_type || !title || !message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const client = await pool.connect();

    try {
      // Find user
      const userRes = await client.query(
        'SELECT id, role FROM "User" WHERE email = $1 LIMIT 1',
        [email]
      );

      if (userRes.rowCount === 0) {
        return new NextResponse('User not found', { status: 403 });
      }

      const user = userRes.rows[0];

      // Enforce admin
      if (user.role !== 'admin') {
        return new NextResponse('Forbidden: requires admin role', { status: 403 });
      }

      // INSERT broadcast (NO image_url)
      const insertQ = `
        INSERT INTO broadcasts (broadcast_id, user_id, broadcast_type, title, message, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())
        RETURNING broadcast_id, user_id, broadcast_type, title, message, created_at, updated_at
      `;

      const insertRes = await client.query(insertQ, [
        user.id,
        broadcast_type,
        title,
        message,
      ]);

      return NextResponse.json(insertRes.rows[0], { status: 201 });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('POST /api/broadcasts error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
