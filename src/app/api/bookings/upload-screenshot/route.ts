import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("screenshot") as File;
    const booking_ref = formData.get("booking_ref") as string;
    const payment_ref = formData.get("payment_ref") as string;

    if (!file || !booking_ref)
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 },
      );

    const ext = file.name.split(".").pop();
    const fileName = `${booking_ref}-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabaseAdmin.storage
      .from("payment-screenshots")
      .upload(fileName, buffer, { contentType: file.type });

    if (uploadError) throw uploadError;

    const { data: urlData } = await supabaseAdmin.storage
      .from("payment-screenshots")
      .createSignedUrl(fileName, 60 * 60 * 24 * 365);

    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({
        status: "payment_uploaded",
        payment_screenshot_url: urlData?.signedUrl,
        payment_ref: payment_ref || null,
      })
      .eq("booking_ref", booking_ref);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
