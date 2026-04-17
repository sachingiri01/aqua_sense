import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { batch_number } = body;

    if (!batch_number) {
      return NextResponse.json(
        { success: false, message: "Batch number is required" },
        { status: 400 }
      );
    }

    // ✅ For now just return the received batch number
    return NextResponse.json({
      success: true,
      message: "Batch received successfully",
      batch_number: batch_number
    });

  } catch (err) {
    console.error("BATCH API ERROR 👉", err);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
