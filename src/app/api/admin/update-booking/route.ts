import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  sendGuestBookingConfirmed,
  sendGuestBookingRejected,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${process.env.ADMIN_SECRET_TOKEN}`)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { booking_id, status, admin_notes } = await req.json();

    // Update DB
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update({ status, admin_notes })
      .eq("id", booking_id)
      .select()
      .single();

    if (error) throw error;

    const b = data;

    // Send relevant email to guest
    if (status === "confirmed") {
      sendGuestBookingConfirmed({
        name: b.name,
        email: b.email,
        booking_ref: b.booking_ref,
        plan_label: b.plan_label,
        check_in: b.check_in,
        check_out: b.check_out,
        guests: b.guests,
        total_amount: b.total_amount,
        admin_notes: admin_notes || undefined,
      }).catch(console.error);
    }

    if (status === "rejected") {
      sendGuestBookingRejected({
        name: b.name,
        email: b.email,
        booking_ref: b.booking_ref,
        admin_notes: admin_notes || undefined,
      }).catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
