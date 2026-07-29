import { NextResponse } from "next/server";
import crypto from "crypto";
import { DatabaseService } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const {
      payment_id,
      order_id,
      signature,
      donor_name,
      donor_email,
      donor_phone,
      campaign_id,
      amount,
      is_anonymous,
    } = await request.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    // Verify cryptographic signature
    const text = order_id + "|" + payment_id;
    const generated_signature = crypto
      .createHmac("sha256", keySecret)
      .update(text)
      .digest("hex");

    const isSignatureValid = generated_signature === signature;

    if (!isSignatureValid) {
      return NextResponse.json(
        { error: "Cryptographic signature verification failed" },
        { status: 400 }
      );
    }

    // Register donation in database
    const dbResult = await DatabaseService.registerDonation({
      payment_id,
      amount,
      donor_name,
      donor_email,
      donor_phone,
      campaign_id,
      status: "success",
      is_anonymous,
    });

    if (dbResult.success) {
      return NextResponse.json({
        success: true,
        receiptId: dbResult.receiptId,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to record transaction in database" },
        { status: 500 }
      );
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify transaction" },
      { status: 500 }
    );
  }
}
