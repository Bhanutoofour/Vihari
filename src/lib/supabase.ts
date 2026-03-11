import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export type BookingStatus =
  | "pending_payment"
  | "payment_uploaded"
  | "confirmed"
  | "rejected"
  | "cancelled";

export type BookingType = "staycation" | "event" | "movie";

export interface Booking {
  id: string;
  created_at: string;
  booking_ref: string;
  booking_type: BookingType;
  plan_label: string;
  day_type: "weekday" | "weekend";
  check_in: string;
  check_out: string | null;
  guests: number;
  total_amount: number;
  name: string;
  email: string;
  phone: string;
  requests: string | null;
  payment_method: "razorpay" | "manual" | null;
  payment_screenshot_url: string | null;
  payment_ref: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  status: BookingStatus;
  admin_notes: string | null;
}
