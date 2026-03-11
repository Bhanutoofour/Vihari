import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  sendGuestBookingReceived,
  sendAdminNewBookingAlert,
} from "@/lib/email";

function generateRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "VH-";
  for (let i = 0; i < 8; i++)
    ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      booking_type,
      plan_label,
      day_type,
      check_in,
      check_out,
      guests,
      total_amount,
      name,
      email,
      phone,
      requests,
    } = body;

    const booking_ref = generateRef();

    // Create or find Supabase auth account
    let user_id: string | null = null;

    const { data: signUpData, error: signUpError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: Math.random().toString(36).slice(-10) + "A1!",
        email_confirm: true,
        user_metadata: { name, phone },
      });

    if (signUpError?.message?.includes("already been registered")) {
      const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
      const existing = listData?.users?.find((u) => u.email === email);
      user_id = existing?.id ?? null;
    } else if (signUpData?.user) {
      user_id = signUpData.user.id;
      await supabaseAdmin.auth.admin.generateLink({
        type: "recovery",
        email,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/my-booking`,
        },
      });
    }

    // Save booking
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        booking_ref,
        booking_type,
        plan_label,
        day_type,
        check_in,
        check_out: check_out || null,
        guests,
        total_amount,
        name,
        email,
        phone,
        requests: requests || null,
        payment_method: "manual",
        user_id,
        status: "pending_payment",
      })
      .select()
      .single();

    if (error) throw error;

    // Send emails non-blocking
    const emailPayload = {
      name,
      email,
      phone,
      booking_ref,
      plan_label,
      booking_type,
      day_type,
      check_in,
      check_out,
      guests,
      total_amount,
      payment_method: "manual",
      requests,
    };
    Promise.all([
      sendGuestBookingReceived(emailPayload).catch(console.error),
      sendAdminNewBookingAlert(emailPayload).catch(console.error),
    ]);

    return NextResponse.json({
      success: true,
      booking_ref,
      booking_id: data.id,
    });
  } catch (err: any) {
    console.error("Create booking error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
