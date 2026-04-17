import { NextResponse } from "next/server";
import pool from "../../../../lib/db.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route.js";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = session.user.id;
    const body = await req.json();

    // Map frontend keys → DB column keys
    const data = {
      initial_ph: body.pH,
      initial_turbidity: body.turbidity,
      initial_tds: body.TDS,
      initial_do: body.DO,
      initial_temperature: body.temperature,
      initial_conductivity: body.conductivity || null,
      flow_rate: body.flowRate,
      intended_reuse: body.intendedReuse || null,
      ai_predicted_reuse: body.aiPredictedReuse || null,
      final_result: body.finalResult || null
    };

    const result = await pool.query(
      `INSERT INTO batches (
        user_id, initial_ph, initial_turbidity, initial_tds,
        initial_do, initial_temperature, initial_conductivity,
        intended_reuse, ai_predicted_reuse, final_result, flow_rate
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING batch_id`,
      [
        userId,
        data.initial_ph,
        data.initial_turbidity,
        data.initial_tds,
        data.initial_do,
        data.initial_temperature,
        data.initial_conductivity,
        data.intended_reuse,
        data.ai_predicted_reuse,
        data.final_result,
        data.flow_rate,
      ]
    );

    return NextResponse.json({ success: true, batch_id: result.rows[0].batch_id });
  } catch (err) {
    console.error("INSERT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
