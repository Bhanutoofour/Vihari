import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendGuestBookingConfirmed, sendGuestBookingRejected } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${process.env.ADMIN_SECRET_TOKEN}`)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { booking_id, status, admin_notes, name, email, phone, check_in, check_out, guests, total_amount, requests } = body;

    // Build update object — only include fields that were sent
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (check_in !== undefined) updateData.check_in = check_in;
    if (check_out !== undefined) updateData.check_out = check_out || null;
    if (guests !== undefined) updateData.guests = guests;
    if (total_amount !== undefined) updateData.total_amount = total_amount;
    if (requests !== undefined) updateData.requests = requests;

    // Update DB
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update(updateData)
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
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
