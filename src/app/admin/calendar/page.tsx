"use client";
import { useState, useEffect } from "react";
import { Booking, BookingStatus } from "@/lib/supabase";

const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN!;

const SOURCES = [
  { id: "vihara", label: "Vihara (Direct)", color: "#2D4A3E", textColor: "#fff" },
  { id: "airbnb", label: "Airbnb", color: "#FF5A5F", textColor: "#fff" },
  { id: "makemytrip", label: "MakeMyTrip", color: "#E74C3C", textColor: "#fff" },
  { id: "goibibo", label: "Goibibo", color: "#E67E22", textColor: "#fff" },
];

const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string; label: string }> = {
  pending_payment: { bg: "#fff8f0", text: "#B85C38", label: "Pending" },
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

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

interface CalBooking extends Booking { source: string; }

function generateRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "VH-";
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export default function CalendarPage() {
  const now = new Date();
  const [authed, setAuthed] = useState(false);
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [bookings, setBookings] = useState<CalBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<"cal" | "list">("cal");
  const [activeSources, setActiveSources] = useState(new Set(["vihara"]));
  const [selected, setSelected] = useState<CalBooking | null>(null);
  const [showManual, setShowManual] = useState(false);

  const [mForm, setMForm] = useState({
    name: "", email: "", phone: "", requests: "",
    check_in: "", check_out: "",
    plan_label: PLANS[0].label,
    booking_type: "staycation" as "staycation" | "event" | "movie",
    day_type: "weekday" as "weekday" | "weekend",
    guests: 10,
    status: "confirmed" as BookingStatus,
    payment_method: "manual" as "manual" | "razorpay",
    total_amount: 30000,
    paid_amount: 0,
    balance_amount: 30000,
  });
  const [mSaving, setMSaving] = useState(false);
  const [mError, setMError] = useState("");
  const [mSuccess, setMSuccess] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("cal_authed");
    if (saved === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) fetchBookings();
  }, [authed, currentYear, currentMonth]);

  useEffect(() => {
    const plan = PLANS.find(p => p.label === mForm.plan_label);
    if (plan) {
      const nights = mForm.check_in && mForm.check_out
        ? Math.max(1, Math.round((new Date(mForm.check_out).getTime() - new Date(mForm.check_in).getTime()) / 86400000))
        : 1;
      const base = mForm.day_type === "weekday" ? plan.weekday : plan.weekend;
      setMForm((f) => ({
        ...f,
        total_amount: base * (plan.type === "movie" ? 1 : nights),
        balance_amount: Math.max(
          0,
          base * (plan.type === "movie" ? 1 : nights) - f.paid_amount,
        ),
        booking_type: plan.type as any,
      }));
    }
  }, [mForm.plan_label, mForm.day_type, mForm.check_in, mForm.check_out]);

  function handleLogin() {
    if (loginPass === ADMIN_TOKEN) {
      sessionStorage.setItem("cal_authed", "1");
      setAuthed(true);
    } else {
      setLoginError("Incorrect password.");
    }
  }

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch(`/admin/bookings?year=${currentYear}&month=${currentMonth}`, {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
      });
      const data = await res.json();
      if (data.bookings) setBookings(data.bookings.map((b: Booking) => ({ ...b, source: "vihara" })));
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  async function handleManualBooking() {
    setMError("");
    if (!mForm.name || !mForm.email || !mForm.phone || !mForm.check_in) {
      setMError("Name, email, phone and check-in date are required.");
      return;
    }
    setMSaving(true);
    try {
      const booking_ref = generateRef();
      const res = await fetch("/api/admin/manual-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ADMIN_TOKEN}` },
        body: JSON.stringify({ ...mForm, booking_ref }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMSuccess(`Booking created! Ref: ${booking_ref}`);
      fetchBookings();
      setTimeout(() => {
        setShowManual(false);
        setMSuccess("");
        setMForm({
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
          status: "confirmed",
          payment_method: "manual",
          total_amount: 30000,
          paid_amount: 0,
          balance_amount: 30000,
        });
      }, 2000);
    } catch (e: any) {
      setMError(e.message || "Failed to create booking.");
    }
    setMSaving(false);
  }

  function getBookingsForDay(date: Date): CalBooking[] {
    return bookings.filter((b) => {
      if (!activeSources.has(b.source)) return false;
      const ci = new Date(b.check_in + "T00:00:00");
      const co = b.check_out ? new Date(b.check_out + "T23:59:59") : new Date(b.check_in + "T23:59:59");
      return date >= ci && date <= co;
    });
  }

  function toggleSource(sid: string) {
    const next = new Set(activeSources);
    if (next.has(sid)) next.delete(sid); else next.add(sid);
    setActiveSources(next);
  }

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  }

  // LOGIN
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center px-4">
        <div className="bg-white border border-[#eee] p-8 w-full max-w-sm rounded-[16px]">
          <p className="text-[#D9B59D] text-xs uppercase tracking-widest mb-1">Vihara Admin</p>
          <h1 className="text-2xl font-normal text-[#1a1a1a] mb-6">Booking Calendar</h1>
          <label className="text-xs text-[#555] mb-1 block">Admin Password</label>
          <input type="password" placeholder="Enter password" value={loginPass}
            onChange={e => setLoginPass(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            className="w-full border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors mb-3 rounded-lg" />
          {loginError && <p className="text-xs text-red-500 mb-3">{loginError}</p>}
          <button onClick={handleLogin} className="w-full bg-[#2D4A3E] text-white py-2.5 text-sm rounded-lg hover:bg-[#1C3028] transition-colors">
            Sign In ->
          </button>
        </div>
      </div>
    );
  }

  const visibleBookings = bookings.filter(b => activeSources.has(b.source));
  const confirmed = visibleBookings.filter(b => b.status === "confirmed");
  const pending = visibleBookings.filter(b => b.status === "pending_payment" || b.status === "payment_uploaded");
  const revenue = confirmed.reduce((s, b) => s + b.total_amount, 0);
  const occupiedDays = new Set<number>();
  visibleBookings.forEach(b => {
    const d = new Date(b.check_in + "T00:00:00");
    const end = b.check_out ? new Date(b.check_out + "T00:00:00") : new Date(b.check_in + "T00:00:00");
    while (d <= end) { if (d.getMonth() === currentMonth) occupiedDays.add(d.getDate()); d.setDate(d.getDate() + 1); }
  });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Header */}
      <div className="bg-[#2D4A3E] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[#D9B59D] text-xs uppercase tracking-widest">Vihara Admin</p>
          <p className="text-white text-lg font-medium">Booking Calendar</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setShowManual(true)}
            className="bg-[#D9B59D] text-[#1a1a1a] text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#c9a08d] transition-colors">
            + Manual Booking
          </button>
          <a href="/admin" className="text-white/60 text-xs hover:text-white transition-colors"><- Dashboard</a>
          <button onClick={() => { sessionStorage.removeItem("cal_authed"); setAuthed(false); }}
            className="text-white/40 text-xs hover:text-white transition-colors">Logout</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Bookings", value: visibleBookings.length, sub: "this month" },
            { label: "Revenue", value: `Rs. ${(revenue / 1000).toFixed(0)}K`, sub: "confirmed only" },
            { label: "Occupied Days", value: occupiedDays.size, sub: `out of ${daysInMonth}` },
            { label: "Pending", value: pending.length, sub: "awaiting confirmation" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#eee] rounded-[16px] p-4">
              <p className="text-xs text-[#888] mb-1">{s.label}</p>
              <p className="text-2xl font-medium text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs text-[#888]">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg">&lt;</button>
            <span className="text-base font-medium text-[#1a1a1a] min-w-[180px] text-center">{MONTHS[currentMonth]} {currentYear}</span>
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg">&gt;</button>
            <button onClick={() => { setCurrentMonth(now.getMonth()); setCurrentYear(now.getFullYear()); }}
              className="px-3 py-1.5 text-xs border border-[#ddd] bg-white hover:bg-[#f5f5f5] rounded-lg">Today</button>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={() => setShowManual(true)}
              className="px-4 py-1.5 text-xs rounded-lg border border-[#2D4A3E] bg-[#2D4A3E] text-white hover:bg-[#1C3028] transition-colors font-medium">
              + Manual Booking
            </button>
            {(["cal", "list"] as const).map(v => (
              <button key={v} onClick={() => setActiveView(v)}
                className={`px-4 py-1.5 text-xs rounded-lg border transition-colors ${activeView === v ? "bg-[#2D4A3E] text-white border-[#2D4A3E]" : "bg-white border-[#ddd] text-[#555]"}`}>
                {v === "cal" ? "Calendar" : "List"}
              </button>
            ))}
          </div>
        </div>

        {/* Source filters */}
        <div className="flex gap-2 flex-wrap mb-4">
          {SOURCES.map(s => (
            <button key={s.id} onClick={() => toggleSource(s.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-colors"
              style={activeSources.has(s.id) ? { borderColor: s.color, color: s.color, background: s.color + "15" } : { borderColor: "#ddd", color: "#888", background: "#fff" }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }}></span>
              {s.label}{s.id !== "vihara" && <span className="opacity-50 ml-1">(soon)</span>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-sm text-[#888]">Loading bookings...</div>
        ) : activeView === "cal" ? (
          <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#eee]">
                  {DAYS.map(d => <th key={d} className="text-xs text-[#888] font-normal p-3 text-left">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalCells / 7 }).map((_, rowIdx) => (
                  <tr key={rowIdx}>
                    {Array.from({ length: 7 }).map((_, colIdx) => {
                      const cellIdx = rowIdx * 7 + colIdx;
                      const dayNum = cellIdx - firstDay + 1;
                      const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
                      const displayDay = isCurrentMonth ? dayNum : cellIdx < firstDay ? prevMonthDays - firstDay + cellIdx + 1 : dayNum - daysInMonth;
                      const date = new Date(currentYear, currentMonth, dayNum);
                      const isToday = isCurrentMonth && date.toDateString() === now.toDateString();
                      const dayBookings = isCurrentMonth ? getBookingsForDay(date) : [];
                      return (
                        <td key={colIdx} className={`border border-[#f0f0f0] p-2 align-top ${!isCurrentMonth ? "bg-[#fafafa]" : ""}`} style={{ height: "96px", width: "calc(100%/7)" }}>
                          <div className={`text-xs mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? "bg-[#2D4A3E] text-white" : isCurrentMonth ? "text-[#555]" : "text-[#ccc]"}`}>
                            {displayDay}
                          </div>
                          {dayBookings.slice(0, 2).map(b => {
                            const src = SOURCES.find(s => s.id === b.source)!;
                            return (
                              <div key={b.id} onClick={() => setSelected(b)}
                                className="text-[10px] px-1.5 py-0.5 rounded mb-0.5 truncate cursor-pointer hover:opacity-80 transition-opacity"
                                style={{ background: src.color, color: src.textColor }}>
                                {b.name.split(" ")[0]}
                              </div>
                            );
                          })}
                          {dayBookings.length > 2 && <div className="text-[10px] text-[#888]">+{dayBookings.length - 2} more</div>}
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
              <div className="text-center py-16 text-sm text-[#888]">No bookings this month.</div>
            ) : visibleBookings.map(b => {
              const src = SOURCES.find(s => s.id === b.source)!;
              const st = STATUS_COLORS[b.status];
              return (
                <div key={b.id} onClick={() => setSelected(b)}
                  className="flex items-center gap-4 px-6 py-4 border-b border-[#f0f0f0] cursor-pointer hover:bg-[#fafafa] transition-colors last:border-0">
                  <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ background: src.color }}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-medium text-[#1a1a1a]">{b.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: st.bg, color: st.text }}>{st.label}</span>
                      <span className="font-mono text-xs text-[#888]">{b.booking_ref}</span>
                    </div>
                    <div className="text-xs text-[#888]">{b.plan_label} - {b.guests} guests - {b.check_in}{b.check_out && b.check_out !== b.check_in ? ` -> ${b.check_out}` : ""}</div>
                  </div>
                  <div className="text-sm font-medium text-[#1a1a1a] whitespace-nowrap">Rs. {b.total_amount.toLocaleString("en-IN")}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detail Panel */}
        {selected && (
          <div className="bg-white border border-[#eee] rounded-[16px] p-6 mt-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: SOURCES.find(s => s.id === selected.source)!.color, color: "#fff" }}>
                    {SOURCES.find(s => s.id === selected.source)!.label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: STATUS_COLORS[selected.status].bg, color: STATUS_COLORS[selected.status].text }}>
                    {STATUS_COLORS[selected.status].label}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#1a1a1a]">{selected.name}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#888] hover:text-[#1a1a1a] text-xl leading-none">x</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { label: "Booking Ref", value: selected.booking_ref },
                { label: "Package", value: selected.plan_label },
                { label: "Check In", value: selected.check_in },
                { label: "Check Out", value: selected.check_out || "-" },
                { label: "Guests", value: String(selected.guests) },
                { label: "Amount", value: `Rs. ${selected.total_amount.toLocaleString("en-IN")}` },
                { label: "Phone", value: selected.phone },
                { label: "Payment", value: selected.payment_method || "-" },
              ].map(r => (
                <div key={r.label}>
                  <p className="text-xs text-[#888] mb-0.5">{r.label}</p>
                  <p className="text-sm font-medium text-[#1a1a1a]">{r.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-[#f9f7f4] border border-[#eee] px-4 py-3 rounded-lg">
                <p className="text-xs text-[#888] mb-1">Paid Amount</p>
                <p className="text-sm font-medium text-[#1a1a1a]">
                  Rs. {(selected.paid_amount ?? 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-[#f9f7f4] border border-[#eee] px-4 py-3 rounded-lg">
                <p className="text-xs text-[#888] mb-1">Balance Amount</p>
                <p className="text-sm font-medium text-[#1a1a1a]">
                  Rs.
                  {(
                    selected.balance_amount ??
                    Math.max(0, selected.total_amount - (selected.paid_amount ?? 0))
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            {selected.requests && (
              <div className="bg-[#f9f7f4] border border-[#eee] px-4 py-3 rounded-lg mb-4">
                <p className="text-xs text-[#888] mb-1">Special Requests</p>
                <p className="text-sm text-[#555]">{selected.requests}</p>
              </div>
            )}
            <div className="flex gap-3">
              <a href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer"
                className="text-xs text-[#25D366] border border-[#25D366] px-4 py-2 rounded-lg hover:bg-[#f0fdf4] transition-colors">
                WhatsApp Guest
              </a>
              <a href="/admin" className="text-xs text-[#2D4A3E] border border-[#2D4A3E] px-4 py-2 rounded-lg hover:bg-[#f0f9f4] transition-colors">
                Manage in Dashboard
              </a>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex gap-4 flex-wrap mt-4">
          {SOURCES.map(s => (
            <div key={s.id} className="flex items-center gap-1.5 text-xs text-[#888]">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: s.color }}></span>{s.label}
            </div>
          ))}
        </div>
      </div>

      {/* MANUAL BOOKING MODAL */}
      {showManual && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setShowManual(false); }}>
          <div className="bg-white rounded-[16px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="bg-[#2D4A3E] px-6 py-4 rounded-t-[16px] flex items-center justify-between sticky top-0">
              <div>
                <p className="text-[#D9B59D] text-xs uppercase tracking-widest">Admin</p>
                <p className="text-white font-medium">Create Manual Booking</p>
              </div>
              <button onClick={() => setShowManual(false)} className="text-white/60 hover:text-white text-xl leading-none">x</button>
            </div>

            <div className="p-6 space-y-5">
              {/* Guest Details */}
              <div>
                <p className="text-xs text-[#888] uppercase tracking-widest mb-3">Guest Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Full Name *", key: "name", type: "text", placeholder: "Guest full name" },
                    { label: "Phone *", key: "phone", type: "tel", placeholder: "+91 98765 43210" },
                    { label: "Email *", key: "email", type: "email", placeholder: "guest@email.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs text-[#555] mb-1 block">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        value={(mForm as any)[f.key]}
                        onChange={e => setMForm(m => ({ ...m, [f.key]: e.target.value }))}
                        className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg transition-colors" />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Special Requests</label>
                    <textarea rows={2} placeholder="Any notes..."
                      value={mForm.requests}
                      onChange={e => setMForm(m => ({ ...m, requests: e.target.value }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg transition-colors resize-none" />
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-white/70">
                  <span>Paid: Rs. {mForm.paid_amount.toLocaleString("en-IN")}</span>
                  <span>
                    Balance: Rs. {mForm.balance_amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <p className="text-xs text-[#888] uppercase tracking-widest mb-3">Booking Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Check In *</label>
                    <input type="date" value={mForm.check_in}
                      onChange={e => setMForm(m => ({ ...m, check_in: e.target.value, check_out: m.check_out && m.check_out <= e.target.value ? "" : m.check_out }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Check Out</label>
                    <input type="date" value={mForm.check_out}
                      min={mForm.check_in ? new Date(new Date(mForm.check_in).getTime() + 86400000).toISOString().split("T")[0] : ""}
                      disabled={!mForm.check_in}
                      onChange={e => setMForm(m => ({ ...m, check_out: e.target.value }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg transition-colors disabled:opacity-40" />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Package</label>
                    <select value={mForm.plan_label}
                      onChange={e => setMForm(m => ({ ...m, plan_label: e.target.value }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg bg-white">
                      {PLANS.map(p => <option key={p.label} value={p.label}>{p.label} - {p.type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Day Type</label>
                    <select value={mForm.day_type}
                      onChange={e => setMForm(m => ({ ...m, day_type: e.target.value as any }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg bg-white">
                      <option value="weekday">Weekday</option>
                      <option value="weekend">Weekend</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Number of Guests</label>
                    <input type="number" min={1} max={200} value={mForm.guests}
                      onChange={e => setMForm(m => ({ ...m, guests: +e.target.value }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">
                      Total Amount (Rs.)
                    </label>
                    <input
                      type="number"
                      value={mForm.total_amount}
                      onChange={(e) =>
                        setMForm((m) => ({
                          ...m,
                          total_amount: +e.target.value,
                          balance_amount: Math.max(
                            0,
                            +e.target.value - m.paid_amount,
                          ),
                        }))
                      }
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">
                      Paid Amount (Rs.)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={mForm.total_amount}
                      value={mForm.paid_amount}
                      onChange={(e) => {
                        const paid = Math.max(0, +e.target.value || 0);
                        setMForm((m) => ({
                          ...m,
                          paid_amount: paid,
                          balance_amount: Math.max(0, m.total_amount - paid),
                        }));
                      }}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">
                      Balance Amount (Rs.)
                    </label>
                    <input
                      type="number"
                      value={mForm.balance_amount}
                      readOnly
                      className="w-full border border-[#ddd] bg-[#f9f7f4] px-3 py-2 text-sm outline-none rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">
                      Booking Status
                    </label>
                    <select
                      value={mForm.status}
                      onChange={(e) =>
                        setMForm((m) => ({
                          ...m,
                          status: e.target.value as BookingStatus,
                        }))
                      }
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg bg-white"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending_payment">Pending Payment</option>
                      <option value="payment_uploaded">Payment Uploaded</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Payment Method</label>
                    <select value={mForm.payment_method}
                      onChange={e => setMForm(m => ({ ...m, payment_method: e.target.value as any }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg bg-white">
                      <option value="manual">Manual / Cash / Bank Transfer</option>
                      <option value="razorpay">Razorpay</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-[#2D4A3E] rounded-lg px-4 py-3">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>{mForm.plan_label} · {mForm.day_type}</span>
                  <span>{mForm.check_in}{mForm.check_out ? ` to ${mForm.check_out}` : ""}</span>
                </div>
                <div className="flex justify-between text-white font-medium">
                  <span>Total Amount</span>
                  <span>Rs. {mForm.total_amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-2 flex justify-between text-xs text-white/70">
                <span>Paid: Rs. {mForm.paid_amount.toLocaleString("en-IN")}</span>
                <span>
                  Balance: Rs. {mForm.balance_amount.toLocaleString("en-IN")}
                </span>
              </div>

              {mError && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                  {mError}
                </p>
              )}
              {mSuccess && (
                <p className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                  Success: {mSuccess}
                </p>
              )}
              <div className="flex gap-3">
                <button onClick={() => setShowManual(false)}
                  className="flex-1 border border-[#ddd] text-[#555] py-2.5 text-sm rounded-lg hover:bg-[#f5f5f5] transition-colors">
                  Cancel
                </button>
                <button onClick={handleManualBooking} disabled={mSaving}
                  className="flex-1 bg-[#2D4A3E] text-white py-2.5 text-sm rounded-lg hover:bg-[#1C3028] transition-colors disabled:opacity-40">
                  {mSaving ? "Creating..." : "Create Booking ->"}
                </button>
              </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}



