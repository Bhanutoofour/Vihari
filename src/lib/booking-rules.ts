export type BookingDateInput = {
  check_in: string;
  check_out?: string | null;
};

export const BLOCKING_BOOKING_STATUSES = [
  "pending_payment",
  "half_payment_done",
  "payment_uploaded",
  "confirmed",
] as const;

function startOfDay(value: string) {
  return new Date(`${value}T00:00:00`);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function getBookingRange(input: BookingDateInput) {
  const start = startOfDay(input.check_in);
  const endExclusive = input.check_out
    ? startOfDay(input.check_out)
    : addDays(start, 1);

  return { start, endExclusive };
}

export function bookingRangesOverlap(
  left: BookingDateInput,
  right: BookingDateInput,
) {
  const leftRange = getBookingRange(left);
  const rightRange = getBookingRange(right);
  return (
    leftRange.start < rightRange.endExclusive &&
    leftRange.endExclusive > rightRange.start
  );
}

export function isInvalidBookingRange(input: BookingDateInput) {
  if (!input.check_in) return true;
  if (!input.check_out) return false;
  return startOfDay(input.check_out) <= startOfDay(input.check_in);
}
