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

function isMissingColumnError(message?: string) {
  return Boolean(
    message &&
      (message.includes("'paid_amount'") || message.includes("'balance_amount'")),
  );
}

function isStatusConstraintError(message?: string) {
  return Boolean(message && message.includes("bookings_status_check"));
}

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
      paid_amount,
      name,
      email,
      phone,
      requests,
      status,
      payment_method,
    } = body;

    if (isInvalidBookingRange({ check_in, check_out })) {
      return NextResponse.json(
        {
          success: false,
          error: "Check-out must be after check-in. A stay occupies 3 PM to 11 AM next day, and the next guest can check in from 3 PM on checkout day.",
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
          error: `Slot already booked by ${conflictingBooking.booking_ref}. Checkout day remains available for the next guest after 3 PM, but overlapping check-in dates are blocked.`,
        },
        { status: 409 },
      );
    }

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
    const baseInsert = {
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
    };

    let query = supabaseAdmin
      .from("bookings")
      .insert({
        ...baseInsert,
        paid_amount: paid_amount ?? 0,
      })
      .select()
      .single();

    let { data, error } = await query;

    if (error && isMissingColumnError(error.message)) {
      const fallback = await supabaseAdmin
        .from("bookings")
        .insert(baseInsert)
        .select()
        .single();
      data = fallback.data;
      error = fallback.error;
    }

    if (error && isStatusConstraintError(error.message) && status === "half_payment_done") {
      return NextResponse.json(
        {
          success: false,
          error: "Database schema update required: add 'half_payment_done' to the bookings status constraint before using this status.",
        },
        { status: 400 },
      );
    }

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
