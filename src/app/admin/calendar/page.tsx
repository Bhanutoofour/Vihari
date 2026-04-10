"use client";

import { useEffect, useMemo, useState } from "react";
import { Booking, BookingStatus } from "@/lib/supabase";
import { ADMIN_TOKEN } from "@/components/admin/config";
import { getBookingRange, isInvalidBookingRange } from "@/lib/booking-rules";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string; label: string }> = {
  pending_payment: { bg: "#fff8f0", text: "#B85C38", label: "Pending" },
  half_payment_done: { bg: "#fff6e6", text: "#C27A1A", label: "Half Paid" },
  payment_uploaded: { bg: "#f0f4ff", text: "#3B5AC8", label: "Under Review" },
  confirmed: { bg: "#f0f9f4", text: "#2D7A4E", label: "Confirmed" },
  rejected: { bg: "#fff0f0", text: "#C83B3B", label: "Rejected" },
  cancelled: { bg: "#f5f5f5", text: "#888", label: "Cancelled" },
};

const PLANS = [
  { label: "Up to 10 Guests", type: "staycation", weekday: 30000, weekend: 35000 },
  { label: "Up to 15 Guests", type: "staycation", weekday: 40000, weekend: 48000 },
  { label: "Up to 20 Guests", type: "staycation", weekday: 50000, weekend: 60000 },
  { label: "Up to 50 Guests", type: "event", weekday: 60000, weekend: 75000 },
  { label: "Up to 100 Guests", type: "event", weekday: 80000, weekend: 95000 },
  { label: "4 Hours", type: "movie", weekday: 15000, weekend: 25000 },
];

function generateRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "VH-";
  for (let i = 0; i < 8; i += 1) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

function bookingOverlapsMonth(booking: Booking, year: number, month: number) {
  const monthStart = new Date(year, month, 1, 0, 0, 0, 0);
  const monthEndExclusive = new Date(year, month + 1, 1, 0, 0, 0, 0);
  const bookingRange = getBookingRange(booking);

  return (
    bookingRange.start < monthEndExclusive &&
    bookingRange.endExclusive > monthStart
  );
}

function bookingIncludesDay(booking: Booking, date: Date) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEndExclusive = new Date(dayStart);
  dayEndExclusive.setDate(dayEndExclusive.getDate() + 1);
  const bookingRange = getBookingRange(booking);

  return bookingRange.start < dayEndExclusive && bookingRange.endExclusive > dayStart;
}

export default function AdminCalendarPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<"calendar" | "list">("calendar");
  const [showManual, setShowManual] = useState(false);
  const [manualError, setManualError] = useState("");
  const [manualSaving, setManualSaving] = useState(false);
  const [manualForm, setManualForm] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
    check_in: "",
    check_out: "",
    plan_label: PLANS[0].label,
    booking_type: "staycation" as "staycation" | "event" | "movie",
    day_type: "weekday" as "weekday" | "weekend",
    guests: 10,
    status: "half_payment_done" as BookingStatus,
    payment_method: "manual" as "manual" | "razorpay",
    total_amount: 30000,
    paid_amount: 15000,
    balance_amount: 15000,
  });

  useEffect(() => {
    fetchBookings();
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const plan = PLANS.find((item) => item.label === manualForm.plan_label);
    if (!plan) return;
    const nights =
      manualForm.check_in && manualForm.check_out
        ? Math.max(
            1,
            Math.round(
              (new Date(manualForm.check_out).getTime() -
                new Date(manualForm.check_in).getTime()) /
                86400000,
            ),
          )
        : 1;
    const base = manualForm.day_type === "weekday" ? plan.weekday : plan.weekend;
    const total = base * (plan.type === "movie" ? 1 : nights);
    const paid = Math.min(total, manualForm.paid_amount);
    setManualForm((current) => ({
      ...current,
      total_amount: total,
      booking_type: plan.type as "staycation" | "event" | "movie",
      paid_amount: paid,
      balance_amount: Math.max(0, total - paid),
    }));
  }, [
    manualForm.plan_label,
    manualForm.day_type,
    manualForm.check_in,
    manualForm.check_out,
  ]);

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
      });
      const data = await res.json();
      const allBookings = (data.bookings || []) as Booking[];
      setBookings(
        allBookings.filter((booking) =>
          bookingOverlapsMonth(booking, currentYear, currentMonth),
        ),
      );
    } catch (error) {
      console.error(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  async function createManualBooking() {
    setManualError("");
    if (!manualForm.name.trim()) {
      setManualError("Guest name is required.");
      return;
    }
    if (!manualForm.email.trim()) {
      setManualError("Email is required.");
      return;
    }
    if (!manualForm.phone.trim()) {
      setManualError("Phone number is required.");
      return;
    }
    if (!manualForm.check_in) {
      setManualError("Check-in date is required.");
      return;
    }
    if (isInvalidBookingRange(manualForm)) {
      setManualError("Check-out must be after check-in.");
      return;
    }

    setManualSaving(true);
    try {
      const booking_ref = generateRef();
      const res = await fetch("/api/admin/manual-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ADMIN_TOKEN}`,
        },
        body: JSON.stringify({
          ...manualForm,
          booking_ref,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setManualError(data.error || "Failed to create booking.");
        return;
      }
      setShowManual(false);
      setManualForm({
        name: "",
        email: "",
        phone: "",
        requests: "",
        check_in: "",
        check_out: "",
        plan_label: PLANS[0].label,
        booking_type: "staycation",
        day_type: "weekday",
        guests: 10,
        status: "half_payment_done",
        payment_method: "manual",
        total_amount: 30000,
        paid_amount: 15000,
        balance_amount: 15000,
      });
      await fetchBookings();
    } catch (error: any) {
      console.error(error);
      setManualError(error.message || "Failed to create booking.");
    } finally {
      setManualSaving(false);
    }
  }

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
      return;
    }
    setCurrentMonth((month) => month - 1);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
      return;
    }
    setCurrentMonth((month) => month + 1);
  }

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const confirmed = bookings.filter((booking) => booking.status === "confirmed");
  const occupiedDays = useMemo(() => {
    const occupied = new Set<number>();
    bookings.forEach((booking) => {
      const range = getBookingRange(booking);
      const cursor = new Date(range.start);

      while (cursor < range.endExclusive) {
        if (
          cursor.getFullYear() === currentYear &&
          cursor.getMonth() === currentMonth
        ) {
          occupied.add(cursor.getDate());
        }
        cursor.setDate(cursor.getDate() + 1);
      }
    });
    return occupied;
  }, [bookings, currentMonth, currentYear]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#B28B72] mb-2">
            Occupancy planner
          </p>
          <h1 className="text-2xl font-medium text-[#1a1a1a]">Calendar</h1>
          <p className="text-sm text-[#6f6a63] mt-1">
            Monthly view of active bookings and manual booking creation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowManual(true)}
            className="px-4 py-2 text-xs rounded-lg border border-[#2D4A3E] bg-[#2D4A3E] text-white"
          >
            + Manual Booking
          </button>
          <button
            onClick={() => setActiveView("calendar")}
            className={`px-4 py-2 text-xs rounded-lg border ${
              activeView === "calendar"
                ? "bg-[#2D4A3E] border-[#2D4A3E] text-white"
                : "bg-white border-[#ddd] text-[#555]"
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveView("list")}
            className={`px-4 py-2 text-xs rounded-lg border ${
              activeView === "list"
                ? "bg-[#2D4A3E] border-[#2D4A3E] text-white"
                : "bg-white border-[#ddd] text-[#555]"
            }`}
          >
            List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: "Bookings", value: bookings.length, sub: "active this month" },
          {
            label: "Confirmed Revenue",
            value: `Rs. ${(confirmed.reduce((sum, booking) => sum + booking.total_amount, 0) / 1000).toFixed(0)}K`,
            sub: "confirmed only",
          },
          { label: "Occupied Days", value: occupiedDays.size, sub: `of ${daysInMonth}` },
          {
            label: "Awaiting Action",
            value: bookings.filter((booking) => booking.status !== "confirmed").length,
            sub: "pending or review",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#eee] rounded-[16px] p-4">
            <p className="text-xs text-[#888] mb-1">{stat.label}</p>
            <p className="text-2xl font-medium text-[#1a1a1a]">{stat.value}</p>
            <p className="text-xs text-[#888]">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg"
          >
            {"<"}
          </button>
          <span className="text-base font-medium text-[#1a1a1a] min-w-[180px] text-center">
            {MONTHS[currentMonth]} {currentYear}
          </span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg"
          >
            {">"}
          </button>
        </div>

        <button
          onClick={() => {
            setCurrentMonth(today.getMonth());
            setCurrentYear(today.getFullYear());
          }}
          className="px-3 py-2 text-xs border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg"
        >
          Jump to Today
        </button>
      </div>

      {loading ? (
        <div className="bg-white border border-[#eee] rounded-[16px] px-6 py-16 text-center text-sm text-[#888]">
          Loading bookings...
        </div>
      ) : activeView === "calendar" ? (
        <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#eee]">
                {DAYS.map((day) => (
                  <th key={day} className="text-xs text-[#888] font-normal p-3 text-left">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: totalCells / 7 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 7 }).map((__, columnIndex) => {
                    const cellIndex = rowIndex * 7 + columnIndex;
                    const dayNum = cellIndex - firstDay + 1;
                    const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
                    const displayDay = isCurrentMonth
                      ? dayNum
                      : cellIndex < firstDay
                        ? prevMonthDays - firstDay + cellIndex + 1
                        : dayNum - daysInMonth;
                    const date = new Date(currentYear, currentMonth, dayNum);
                    const isToday =
                      isCurrentMonth && date.toDateString() === today.toDateString();
                    const dayBookings = isCurrentMonth
                      ? bookings.filter((booking) => bookingIncludesDay(booking, date))
                      : [];

                    return (
                      <td
                        key={columnIndex}
                        className={`border border-[#f0f0f0] p-2 align-top ${
                          !isCurrentMonth ? "bg-[#fafafa]" : ""
                        }`}
                        style={{ height: "110px", width: "calc(100%/7)" }}
                      >
                        <div
                          className={`text-xs mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                            isToday
                              ? "bg-[#2D4A3E] text-white"
                              : isCurrentMonth
                                ? "text-[#555]"
                                : "text-[#ccc]"
                          }`}
                        >
                          {displayDay}
                        </div>
                        {dayBookings.slice(0, 3).map((booking) => (
                          <div
                            key={`${booking.id}-${displayDay}`}
                            className="text-[10px] px-1.5 py-0.5 rounded mb-1 truncate"
                            style={{
                              background: STATUS_COLORS[booking.status].bg,
                              color: STATUS_COLORS[booking.status].text,
                            }}
                          >
                            {booking.name} ({booking.booking_ref})
                          </div>
                        ))}
                        {dayBookings.length > 3 && (
                          <div className="text-[10px] text-[#888]">
                            +{dayBookings.length - 3} more
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white border border-[#eee] rounded-[16px] px-6 py-16 text-center text-sm text-[#888]">
          No bookings this month.
        </div>
      ) : (
        <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center gap-4 px-6 py-4 border-b border-[#f0f0f0] last:border-0"
            >
              <div className="w-1 h-12 rounded-full bg-[#2D4A3E] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-medium text-[#1a1a1a]">
                    {booking.name}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: STATUS_COLORS[booking.status].bg,
                      color: STATUS_COLORS[booking.status].text,
                    }}
                  >
                    {STATUS_COLORS[booking.status].label}
                  </span>
                  <span className="font-mono text-xs text-[#888]">
                    {booking.booking_ref}
                  </span>
                </div>
                <div className="text-xs text-[#888]">
                  {booking.plan_label} - {booking.guests} guests - {booking.check_in}
                  {booking.check_out ? ` -> ${booking.check_out}` : ""}
                </div>
              </div>
              <div className="text-sm font-medium text-[#1a1a1a] whitespace-nowrap">
                Rs. {booking.total_amount.toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>
      )}

      {showManual && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowManual(false);
          }}
        >
          <div className="bg-white w-full max-w-2xl rounded-[16px] overflow-hidden shadow-xl">
            <div className="bg-[#2D4A3E] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[#D9B59D] text-xs uppercase tracking-widest">
                  Calendar
                </p>
                <p className="text-white font-medium text-lg">Create Manual Booking</p>
              </div>
              <button
                onClick={() => setShowManual(false)}
                className="text-white/60 hover:text-white text-xl leading-none"
              >
                x
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: "Name", key: "name", type: "text" },
                  { label: "Phone", key: "phone", type: "text" },
                  { label: "Email", key: "email", type: "email" },
                  { label: "Guests", key: "guests", type: "number" },
                  { label: "Check In", key: "check_in", type: "date" },
                  { label: "Check Out", key: "check_out", type: "date" },
                  { label: "Total Amount", key: "total_amount", type: "number" },
                  { label: "Paid Amount", key: "paid_amount", type: "number" },
                  { label: "Balance Amount", key: "balance_amount", type: "number" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs text-[#555] mb-1 block">{field.label}</label>
                    <input
                      type={field.type}
                      value={(manualForm as any)[field.key] ?? ""}
                      onChange={(e) =>
                        setManualForm((current) => {
                          const value =
                            field.type === "number" ? +e.target.value : e.target.value;
                          const next = { ...current, [field.key]: value } as typeof current;
                          if (
                            field.key === "check_in" &&
                            next.check_out &&
                            next.check_out <= String(value)
                          ) {
                            next.check_out = "";
                          }
                          if (field.key === "paid_amount") {
                            next.balance_amount = Math.max(0, next.total_amount - Number(value || 0));
                          }
                          if (field.key === "total_amount") {
                            next.balance_amount = Math.max(0, Number(value || 0) - next.paid_amount);
                          }
                          return next;
                        })
                      }
                      min={
                        field.key === "check_in"
                          ? new Date().toISOString().split("T")[0]
                          : field.key === "check_out" && manualForm.check_in
                            ? new Date(
                                new Date(manualForm.check_in).getTime() + 86400000,
                              )
                                .toISOString()
                                .split("T")[0]
                            : undefined
                      }
                      className={`w-full border px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg ${
                        (field.key === "name" && manualError && !manualForm.name.trim()) ||
                        (field.key === "email" && manualError && !manualForm.email.trim()) ||
                        (field.key === "phone" && manualError && !manualForm.phone.trim()) ||
                        (field.key === "check_in" && manualError && !manualForm.check_in)
                          ? "border-red-300 bg-red-50"
                          : "border-[#ddd]"
                      }`}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-[#555] mb-1 block">Package</label>
                  <select
                    value={manualForm.plan_label}
                    onChange={(e) =>
                      setManualForm((current) => ({
                        ...current,
                        plan_label: e.target.value,
                      }))
                    }
                    className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg bg-white"
                  >
                    {PLANS.map((plan) => (
                      <option key={plan.label} value={plan.label}>
                        {plan.label} - {plan.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block">Day Type</label>
                  <select
                    value={manualForm.day_type}
                    onChange={(e) =>
                      setManualForm((current) => ({
                        ...current,
                        day_type: e.target.value as "weekday" | "weekend",
                      }))
                    }
                    className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg bg-white"
                  >
                    <option value="weekday">Weekday</option>
                    <option value="weekend">Weekend</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block">Status</label>
                  <select
                    value={manualForm.status}
                    onChange={(e) =>
                      setManualForm((current) => ({
                        ...current,
                        status: e.target.value as BookingStatus,
                      }))
                    }
                    className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg bg-white"
                  >
                    <option value="half_payment_done">Half Payment Done</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending_payment">Pending Payment</option>
                    <option value="payment_uploaded">Payment Uploaded</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#555] mb-1 block">Special Requests</label>
                <textarea
                  rows={3}
                  value={manualForm.requests}
                  onChange={(e) =>
                    setManualForm((current) => ({
                      ...current,
                      requests: e.target.value,
                    }))
                  }
                  className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg resize-none"
                />
              </div>

              {manualError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                  {manualError}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowManual(false)}
                  className="flex-1 border border-[#ddd] text-[#555] py-2.5 text-sm rounded-lg hover:bg-[#f5f5f5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createManualBooking}
                  disabled={manualSaving}
                  className="flex-1 bg-[#2D4A3E] text-white py-2.5 text-sm rounded-lg hover:bg-[#1C3028] transition-colors disabled:opacity-40"
                >
                  {manualSaving ? "Creating..." : "Create Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
