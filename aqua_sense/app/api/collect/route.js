// app/api/collect/route.js
import { NextResponse } from 'next/server';
import pool from '../../../lib/db.js';

// require server-side API key header
async function requireApiKey(req) {
  const key = req.headers.get('x-api-key') || req.headers.get('X-API-KEY');
  return !!(key && key === process.env.NEON_API_KEY);
}

function normalizeNumber(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function safeJsonCandidate(obj) {
  // If already an object, return it. If it's a string that looks like JSON, try parse.
  if (obj === null || obj === undefined) return null;
  if (typeof obj === 'object') return obj;
  if (typeof obj === 'string') {
    try {
      return JSON.parse(obj);
    } catch {
      // not JSON string — wrap it as text
      return { value: obj };
    }
  }
  // other primitives — return as-is
  return { value: obj };
}

export async function POST(req) {
  // Basic protection
  if (!await requireApiKey(req)) {
    return NextResponse.json({ success: false, error: 'unauthorized - missing or invalid x-api-key' }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error('collect: invalid JSON body', err);
    return NextResponse.json({ success: false, error: 'invalid_json' }, { status: 400 });
  }

  // normalize incoming arrays (accept single object or array)
  const batchInput = body?.batch ?? {};
  const primary_readings = Array.isArray(body?.primary_readings) ? body.primary_readings : (body?.primary_readings ? [body.primary_readings] : []);
  const secondary_readings = Array.isArray(body?.secondary_readings) ? body.secondary_readings : (body?.secondary_readings ? [body.secondary_readings] : []);
  const tertiary_readings = Array.isArray(body?.tertiary_readings) ? body.tertiary_readings : (body?.tertiary_readings ? [body.tertiary_readings] : []);
  const final_reading = body?.final_reading ?? null;
  const update_batch = body?.update_batch ?? null;

  // sanity check: require at least a batch or one reading
  if ((!batchInput || Object.keys(batchInput).length === 0) &&
      primary_readings.length === 0 &&
      secondary_readings.length === 0 &&
      tertiary_readings.length === 0 &&
      !final_reading
  ) {
    return NextResponse.json({ success: false, error: 'empty_payload - supply batch or readings' }, { status: 400 });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Idempotency: if client passed batch_number, try reuse existing batch (avoid duplicates)
    let batchId = batchInput.batchId ?? null;
    if (!batchId && batchInput.batch_number) {
      const row = await client.query('SELECT batch_id FROM batches WHERE batch_number = $1 LIMIT 1', [batchInput.batch_number]);
      if (row.rowCount > 0) {
        batchId = row.rows[0].batch_id;
        console.log('collect: reusing batch by batch_number', batchInput.batch_number, batchId);
      }
    }

    // 1) create batch if not provided
    if (!batchId) {
      const insertBatchSql = `
        INSERT INTO batches (
          initial_ph, initial_turbidity, initial_tds, initial_do, initial_temperature, initial_conductivity,
          intended_reuse, ai_predicted_reuse, required_stages, current_stage, status, batch_number
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::text[],$10,$11,$12)
        RETURNING batch_id;
      `;
      const vals = [
        normalizeNumber(batchInput.pH),
        normalizeNumber(batchInput.turbidity),
        normalizeNumber(batchInput.TDS),
        normalizeNumber(batchInput.DO),
        normalizeNumber(batchInput.temperature),
        normalizeNumber(batchInput.flowRate),
        batchInput.intended_reuse ?? null,
        batchInput.ai_predicted_reuse ?? null,
        Array.isArray(batchInput.required_stages) ? batchInput.required_stages : (batchInput.required_stages ? [batchInput.required_stages] : null),
        batchInput.current_stage ?? 'PRIMARY',
        batchInput.status ?? 'PROCESSING',
        batchInput.batch_number ?? null
      ];

      const res = await client.query(insertBatchSql, vals);
      if (!res?.rows?.length) throw new Error('failed to create batch');
      batchId = res.rows[0].batch_id;
      console.log('collect: created batch', batchId);
    } else {
      // verify batch exists
      const check = await client.query('SELECT batch_id FROM batches WHERE batch_id = $1', [batchId]);
      if (check.rowCount === 0) {
        await client.query('ROLLBACK');
        return NextResponse.json({ success: false, error: 'batchId not found' }, { status: 404 });
      }
    }

    // 2) insert primary readings (if any)
    const primaryIds = [];
    for (const r of primary_readings) {
      const q = `INSERT INTO primary_stage_readings
        (batch_id, timestamp, "window", flow, level, turbidity, pressure, temperature, raw_json)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`;
      const vals = [
        batchId,
        r.timestamp ?? new Date(),
        r.window ?? 'normal',
        normalizeNumber(r.flow),
        normalizeNumber(r.level),
        normalizeNumber(r.turbidity),
        normalizeNumber(r.pressure),
        normalizeNumber(r.temperature),
        safeJsonCandidate(r.raw_json ? r.raw_json : r)
      ];
      const rr = await client.query(q, vals);
      primaryIds.push(rr.rows[0].id);
    }

    // 3) insert secondary readings (if any)
    const secondaryIds = [];
    for (const r of secondary_readings) {
      const q = `INSERT INTO secondary_stage_readings
        (batch_id, timestamp, "window", "do", ph, orp, tss_mlss, ammonia, sludge_level, secondary_flow, raw_json)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`;
      const vals = [
        batchId,
        r.timestamp ?? new Date(),
        r.window ?? 'normal',
        normalizeNumber(r.do),
        normalizeNumber(r.ph),
        normalizeNumber(r.orp),
        normalizeNumber(r.tss_mlss),
        normalizeNumber(r.ammonia),
        normalizeNumber(r.sludge_level),
        normalizeNumber(r.secondary_flow),
        safeJsonCandidate(r.raw_json ? r.raw_json : r)
      ];
      const rr = await client.query(q, vals);
      secondaryIds.push(rr.rows[0].id);
    }

    // 4) insert tertiary readings (if any)
    const tertiaryIds = [];
    for (const r of tertiary_readings) {
      const q = `INSERT INTO tertiary_stage_readings
        (batch_id, timestamp, "window", conductivity, tds, nitrate, residual_chlorine, turbidity_final, differential_pressure, salinity, oil_in_water, uvt, raw_json)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id`;
      const vals = [
        batchId,
        r.timestamp ?? new Date(),
        r.window ?? 'normal',
        normalizeNumber(r.conductivity),
        normalizeNumber(r.tds),
        normalizeNumber(r.nitrate),
        normalizeNumber(r.residual_chlorine),
        normalizeNumber(r.turbidity_final),
        normalizeNumber(r.differential_pressure),
        normalizeNumber(r.salinity),
        normalizeNumber(r.oil_in_water),
        normalizeNumber(r.uvt),
        safeJsonCandidate(r.raw_json ? r.raw_json : r)
      ];
      const rr = await client.query(q, vals);
      tertiaryIds.push(rr.rows[0].id);
    }

    // 5) final reading (optional)
    let finalId = null;
    if (final_reading) {
      const q = `INSERT INTO final_stage_readings
        (batch_id, timestamp, final_ph, final_turbidity, final_tds, final_do, final_temperature, final_conductivity, ai_final_label, raw_json)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`;
      const vals = [
        batchId,
        final_reading.timestamp ?? new Date(),
        normalizeNumber(final_reading.final_ph),
        normalizeNumber(final_reading.final_turbidity),
        normalizeNumber(final_reading.final_tds),
        normalizeNumber(final_reading.final_do),
        normalizeNumber(final_reading.final_temperature),
        normalizeNumber(final_reading.final_conductivity),
        final_reading.ai_final_label ?? null,
        safeJsonCandidate(final_reading.raw_json ? final_reading.raw_json : final_reading)
      ];
      const rr = await client.query(q, vals);
      finalId = rr.rows[0].id;
    }

    // 6) optional batch update (only allowed fields)
    if (update_batch && typeof update_batch === 'object' && Object.keys(update_batch).length > 0) {
      const allowed = ['current_stage','status','final_result','final_report_url','ai_predicted_reuse','required_stages','intended_reuse','batch_number'];
      const sets = [];
      const vals = [];
      let i = 1;
      for (const k of Object.keys(update_batch)) {
        if (allowed.includes(k)) {
          if (k === 'required_stages' && Array.isArray(update_batch[k])) {
            sets.push(`"${k}" = $${i}::text[]`);
            vals.push(update_batch[k]);
            i++;
          } else {
            sets.push(`"${k}" = $${i}`);
            vals.push(update_batch[k]);
            i++;
          }
        }
      }
      if (sets.length > 0) {
        vals.push(batchId);
        const sql = `UPDATE batches SET ${sets.join(', ')} WHERE batch_id = $${i} RETURNING *`;
        const upd = await client.query(sql, vals);
        console.log('collect: updated batch', upd?.rows?.[0]?.batch_id);
      }
    }

    await client.query('COMMIT');

    return NextResponse.json({
      success: true,
      batchId,
      inserted: { primaryIds, secondaryIds, tertiaryIds, finalId }
    }, { status: 201 });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('API /api/collect error', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  } finally {
    try { client.release(); } catch (_) {}
  }
}
