import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  sendGuestBookingReceived,
  sendAdminNewBookingAlert,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      booking_ref,
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
      status,
      payment_method,
    } = body;

    // Create or find user account
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
        payment_method,
        status,
        user_id,
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
      payment_method,
      requests,
    };
    Promise.all([
      sendGuestBookingReceived(emailPayload).catch((e) =>
        console.error("GUEST EMAIL ERROR:", e),
      ),
      sendAdminNewBookingAlert(emailPayload).catch((e) =>
        console.error("ADMIN EMAIL ERROR:", e),
      ),
    ]);

    return NextResponse.json({
      success: true,
      booking_ref,
      booking_id: data.id,
    });
  } catch (err: any) {
    console.error("Manual booking error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
