"use client";

import { useEffect, useMemo, useState } from "react";
import { Booking, BookingStatus } from "@/lib/supabase";
import { ADMIN_TOKEN } from "@/components/admin/config";

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
  payment_uploaded: { bg: "#f0f4ff", text: "#3B5AC8", label: "Under Review" },
  confirmed: { bg: "#f0f9f4", text: "#2D7A4E", label: "Confirmed" },
  rejected: { bg: "#fff0f0", text: "#C83B3B", label: "Rejected" },
  cancelled: { bg: "#f5f5f5", text: "#888", label: "Cancelled" },
};

function bookingOverlapsMonth(booking: Booking, year: number, month: number) {
  const monthStart = new Date(year, month, 1, 0, 0, 0, 0);
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);
  const bookingStart = new Date(`${booking.check_in}T00:00:00`);
  const bookingEnd = booking.check_out
    ? new Date(`${booking.check_out}T23:59:59.999`)
    : new Date(`${booking.check_in}T23:59:59.999`);

  return bookingStart <= monthEnd && bookingEnd >= monthStart;
}

function bookingIncludesDay(booking: Booking, date: Date) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);
  const bookingStart = new Date(`${booking.check_in}T00:00:00`);
  const bookingEnd = booking.check_out
    ? new Date(`${booking.check_out}T23:59:59.999`)
    : new Date(`${booking.check_in}T23:59:59.999`);

  return bookingStart <= dayEnd && bookingEnd >= dayStart;
}

export default function AdminCalendarPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<"calendar" | "list">("calendar");

  useEffect(() => {
    fetchBookings();
  }, [currentYear, currentMonth]);

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
      const start = new Date(`${booking.check_in}T00:00:00`);
      const end = booking.check_out
        ? new Date(`${booking.check_out}T00:00:00`)
        : new Date(`${booking.check_in}T00:00:00`);
      const cursor = new Date(start);

      while (cursor <= end) {
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
            Monthly view of active bookings and occupied dates.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
    </div>
  );
}
