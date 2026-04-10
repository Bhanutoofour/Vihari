import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  sendGuestBookingReceived,
  sendAdminNewBookingAlert,
} from "@/lib/email";
import {
  BLOCKING_BOOKING_STATUSES,
  bookingRangesOverlap,
  isInvalidBookingRange,
} from "@/lib/booking-rules";

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

    if (isInvalidBookingRange({ check_in, check_out })) {
      return NextResponse.json(
        {
          success: false,
          error: "Check-out must be after check-in. Stay bookings run from 3 PM to 11 AM next day.",
        },
        { status: 400 },
      );
    }

    const { data: existingBookings, error: existingError } = await supabaseAdmin
      .from("bookings")
      .select("id, booking_ref, check_in, check_out, status")
      .in("status", [...BLOCKING_BOOKING_STATUSES]);

    if (existingError) throw existingError;

    const conflictingBooking = (existingBookings || []).find((booking) =>
      bookingRangesOverlap(
        { check_in, check_out },
        { check_in: booking.check_in, check_out: booking.check_out },
      ),
    );

    if (conflictingBooking) {
      return NextResponse.json(
        {
          success: false,
          error: `Already booked for the selected check-in date range. Booking ${conflictingBooking.booking_ref} blocks that slot.`,
        },
        { status: 409 },
      );
    }

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
    console.error("Create booking error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
