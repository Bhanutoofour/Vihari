"use client";
import { useState, useEffect } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { Booking, BookingStatus } from "@/lib/supabase";

const SOURCES = [
  {
    id: "vihara",
    label: "Vihara (Direct)",
    color: "#2D4A3E",
    textColor: "#fff",
  },
  { id: "airbnb", label: "Airbnb", color: "#FF5A5F", textColor: "#fff" },
  {
    id: "makemytrip",
    label: "MakeMyTrip",
    color: "#E74C3C",
    textColor: "#fff",
  },
  { id: "goibibo", label: "Goibibo", color: "#E67E22", textColor: "#fff" },
];

const STATUS_COLORS: Record<
  BookingStatus,
  { bg: string; text: string; label: string }
> = {
  pending_payment: { bg: "#fff8f0", text: "#B85C38", label: "Pending" },
  payment_uploaded: { bg: "#f0f4ff", text: "#3B5AC8", label: "Under Review" },
  confirmed: { bg: "#f0f9f4", text: "#2D7A4E", label: "Confirmed" },
  rejected: { bg: "#fff0f0", text: "#C83B3B", label: "Rejected" },
  cancelled: { bg: "#f5f5f5", text: "#888", label: "Cancelled" },
};

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

interface CalBooking extends Booking {
  source: string;
}

export default function CalendarPage() {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [bookings, setBookings] = useState<CalBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"cal" | "list">("cal");
  const [activeSources, setActiveSources] = useState(new Set(["vihara"]));
  const [selected, setSelected] = useState<CalBooking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [currentYear, currentMonth]);

  async function fetchBookings() {
    setLoading(true);
    const startDate = new Date(currentYear, currentMonth, 1)
      .toISOString()
      .split("T")[0];
    const endDate = new Date(currentYear, currentMonth + 1, 0)
      .toISOString()
      .split("T")[0];

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .or(`check_in.lte.${endDate},check_out.gte.${startDate}`)
      .order("check_in", { ascending: true });

    if (!error && data) {
      setBookings(data.map((b: Booking) => ({ ...b, source: "vihara" })));
    }
    setLoading(false);
  }

  function getBookingsForDay(date: Date): CalBooking[] {
    return bookings.filter((b) => {
      if (!activeSources.has(b.source)) return false;
      const ci = new Date(b.check_in + "T00:00:00");
      const co = b.check_out
        ? new Date(b.check_out + "T23:59:59")
        : new Date(b.check_in + "T23:59:59");
      return date >= ci && date <= co;
    });
  }

  function toggleSource(sid: string) {
    const next = new Set(activeSources);
    if (next.has(sid)) next.delete(sid);
    else next.add(sid);
    setActiveSources(next);
  }

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  }

  const visibleBookings = bookings.filter((b) => activeSources.has(b.source));
  const confirmed = visibleBookings.filter((b) => b.status === "confirmed");
  const pending = visibleBookings.filter(
    (b) => b.status === "pending_payment" || b.status === "payment_uploaded",
  );
  const revenue = confirmed.reduce((s, b) => s + b.total_amount, 0);

  const occupiedDays = new Set<number>();
  visibleBookings.forEach((b) => {
    const d = new Date(b.check_in + "T00:00:00");
    const end = b.check_out
      ? new Date(b.check_out + "T00:00:00")
      : new Date(b.check_in + "T00:00:00");
    while (d <= end) {
      if (d.getMonth() === currentMonth) occupiedDays.add(d.getDate());
      d.setDate(d.getDate() + 1);
    }
  });

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Header */}
      <div className="bg-[#2D4A3E] px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#D9B59D] text-xs uppercase tracking-widest">
            Vihara Admin
          </p>
          <p className="text-white text-lg font-medium">Booking Calendar</p>
        </div>
        <a
          href="/admin"
          className="text-white/60 text-xs hover:text-white transition-colors"
        >
          ← Dashboard
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            {
              label: "Total Bookings",
              value: visibleBookings.length,
              sub: "this month",
            },
            {
              label: "Revenue",
              value: `₹${(revenue / 1000).toFixed(0)}K`,
              sub: "confirmed only",
            },
            {
              label: "Occupied Days",
              value: occupiedDays.size,
              sub: `out of ${daysInMonth}`,
            },
            {
              label: "Pending",
              value: pending.length,
              sub: "awaiting confirmation",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-[#eee] rounded-[16px] p-4"
            >
              <p className="text-xs text-[#888] mb-1">{s.label}</p>
              <p className="text-2xl font-medium text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs text-[#888]">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg"
            >
              ‹
            </button>
            <span className="text-base font-medium text-[#1a1a1a] min-w-[180px] text-center">
              {MONTHS[currentMonth]} {currentYear}
            </span>
            <button
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg"
            >
              ›
            </button>
            <button
              onClick={() => {
                setCurrentMonth(now.getMonth());
                setCurrentYear(now.getFullYear());
              }}
              className="px-3 py-1.5 text-xs border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg"
            >
              Today
            </button>
          </div>
          <div className="flex gap-2">
            {(["cal", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`px-4 py-1.5 text-xs rounded-lg border transition-colors ${activeView === v ? "bg-[#2D4A3E] text-white border-[#2D4A3E]" : "bg-white border-[#ddd] text-[#555]"}`}
              >
                {v === "cal" ? "Calendar" : "List"}
              </button>
            ))}
          </div>
        </div>

        {/* Source filters */}
        <div className="flex gap-2 flex-wrap mb-4">
          {SOURCES.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleSource(s.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-colors"
              style={
                activeSources.has(s.id)
                  ? {
                      borderColor: s.color,
                      color: s.color,
                      background: s.color + "15",
                    }
                  : { borderColor: "#ddd", color: "#888", background: "#fff" }
              }
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: s.color }}
              ></span>
              {s.label}
              {s.id !== "vihara" && <span className="opacity-50">(soon)</span>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-sm text-[#888]">
            Loading bookings...
          </div>
        ) : activeView === "cal" ? (
          <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#eee]">
                  {DAYS.map((d) => (
                    <th
                      key={d}
                      className="text-xs text-[#888] font-normal p-3 text-left"
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalCells / 7 }).map((_, rowIdx) => (
                  <tr key={rowIdx}>
                    {Array.from({ length: 7 }).map((_, colIdx) => {
                      const cellIdx = rowIdx * 7 + colIdx;
                      const dayNum = cellIdx - firstDay + 1;
                      const isCurrentMonth =
                        dayNum >= 1 && dayNum <= daysInMonth;
                      const displayDay = isCurrentMonth
                        ? dayNum
                        : cellIdx < firstDay
                          ? prevMonthDays - firstDay + cellIdx + 1
                          : dayNum - daysInMonth;
                      const date = new Date(currentYear, currentMonth, dayNum);
                      const isToday =
                        isCurrentMonth &&
                        date.toDateString() === now.toDateString();
                      const dayBookings = isCurrentMonth
                        ? getBookingsForDay(date)
                        : [];

                      return (
                        <td
                          key={colIdx}
                          className={`border border-[#f0f0f0] p-2 align-top ${!isCurrentMonth ? "bg-[#fafafa]" : ""}`}
                          style={{ height: "96px", width: "calc(100%/7)" }}
                        >
                          <div
                            className={`text-xs mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? "bg-[#2D4A3E] text-white" : isCurrentMonth ? "text-[#555]" : "text-[#ccc]"}`}
                          >
                            {displayDay}
                          </div>
                          {dayBookings.slice(0, 2).map((b) => {
                            const src = SOURCES.find((s) => s.id === b.source)!;
                            return (
                              <div
                                key={b.id}
                                onClick={() => setSelected(b)}
                                className="text-[10px] px-1.5 py-0.5 rounded mb-0.5 truncate cursor-pointer hover:opacity-80 transition-opacity"
                                style={{
                                  background: src.color,
                                  color: src.textColor,
                                }}
                              >
                                {b.name.split(" ")[0]}
                              </div>
                            );
                          })}
                          {dayBookings.length > 2 && (
                            <div className="text-[10px] text-[#888]">
                              +{dayBookings.length - 2} more
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
        ) : (
          <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
            {visibleBookings.length === 0 ? (
              <div className="text-center py-16 text-sm text-[#888]">
                No bookings this month.
              </div>
            ) : (
              visibleBookings.map((b) => {
                const src = SOURCES.find((s) => s.id === b.source)!;
                const st = STATUS_COLORS[b.status];
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelected(b)}
                    className="flex items-center gap-4 px-6 py-4 border-b border-[#f0f0f0] cursor-pointer hover:bg-[#fafafa] transition-colors last:border-0"
                  >
                    <div
                      className="w-1 h-12 rounded-full flex-shrink-0"
                      style={{ background: src.color }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-medium text-[#1a1a1a]">
                          {b.name}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: st.bg, color: st.text }}
                        >
                          {st.label}
                        </span>
                        <span className="font-mono text-xs text-[#888]">
                          {b.booking_ref}
                        </span>
                      </div>
                      <div className="text-xs text-[#888]">
                        {b.plan_label} · {b.guests} guests · {b.check_in}
                        {b.check_out && b.check_out !== b.check_in
                          ? ` → ${b.check_out}`
                          : ""}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-[#1a1a1a] whitespace-nowrap">
                      ₹{b.total_amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Detail Panel */}
        {selected && (
          <div className="bg-white border border-[#eee] rounded-[16px] p-6 mt-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: SOURCES.find((s) => s.id === selected.source)!
                        .color,
                      color: "#fff",
                    }}
                  >
                    {SOURCES.find((s) => s.id === selected.source)!.label}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: STATUS_COLORS[selected.status].bg,
                      color: STATUS_COLORS[selected.status].text,
                    }}
                  >
                    {STATUS_COLORS[selected.status].label}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#1a1a1a]">
                  {selected.name}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-[#888] hover:text-[#1a1a1a] text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { label: "Booking Ref", value: selected.booking_ref },
                { label: "Package", value: selected.plan_label },
                { label: "Check In", value: selected.check_in },
                { label: "Check Out", value: selected.check_out || "—" },
                { label: "Guests", value: String(selected.guests) },
                {
                  label: "Amount",
                  value: `₹${selected.total_amount.toLocaleString("en-IN")}`,
                },
                { label: "Phone", value: selected.phone },
                { label: "Payment", value: selected.payment_method || "—" },
              ].map((r) => (
                <div key={r.label}>
                  <p className="text-xs text-[#888] mb-0.5">{r.label}</p>
                  <p className="text-sm font-medium text-[#1a1a1a]">
                    {r.value}
                  </p>
                </div>
              ))}
            </div>
            {selected.requests && (
              <div className="bg-[#f9f7f4] border border-[#eee] px-4 py-3 rounded-lg mb-4">
                <p className="text-xs text-[#888] mb-1">Special Requests</p>
                <p className="text-sm text-[#555]">{selected.requests}</p>
              </div>
            )}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#25D366] border border-[#25D366] px-4 py-2 rounded-lg hover:bg-[#f0fdf4] transition-colors"
              >
                WhatsApp Guest
              </a>
              <a
                href="/admin"
                className="text-xs text-[#2D4A3E] border border-[#2D4A3E] px-4 py-2 rounded-lg hover:bg-[#f0f9f4] transition-colors"
              >
                Manage in Dashboard
              </a>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex gap-4 flex-wrap mt-4">
          {SOURCES.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-1.5 text-xs text-[#888]"
            >
              <span
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ background: s.color }}
              ></span>
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
