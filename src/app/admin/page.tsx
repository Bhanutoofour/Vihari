"use client";
import { useEffect, useState } from "react";
import { supabaseAdmin, Booking, BookingStatus } from "@/lib/supabase";

const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "vihara-admin-2024";
const ADMIN_PASSWORD = "vihara@admin2024";

const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string; label: string }> = {
  pending_payment:  { bg: "#fff8f0", text: "#B85C38", label: "Pending Payment" },
  payment_uploaded: { bg: "#f0f4ff", text: "#3B5AC8", label: "Screenshot Uploaded" },
  confirmed:        { bg: "#f0f9f4", text: "#2D7A4E", label: "Confirmed" },
  rejected:         { bg: "#fff0f0", text: "#C83B3B", label: "Rejected" },
  cancelled:        { bg: "#f5f5f5", text: "#888",    label: "Cancelled" },
};

const PLANS = [
  { label: "Up to 10 Guests", type: "staycation", weekday: 30000, weekend: 35000 },
  { label: "Up to 15 Guests", type: "staycation", weekday: 40000, weekend: 48000 },
  { label: "Up to 20 Guests", type: "staycation", weekday: 50000, weekend: 60000 },
  { label: "Up to 50 Guests", type: "event",      weekday: 60000, weekend: 75000 },
  { label: "Up to 100 Guests", type: "event",     weekday: 80000, weekend: 95000 },
  { label: "4 Hours",          type: "movie",     weekday: 15000, weekend: 25000 },
];

function generateRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "VH-";
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "edit">("details");
  const [showManual, setShowManual] = useState(false);

  // Edit form
  const [editForm, setEditForm] = useState<Partial<Booking>>({});

  // Manual booking form
  const [mForm, setMForm] = useState({
    name: "", email: "", phone: "", requests: "",
    check_in: "", check_out: "",
    plan_label: PLANS[0].label,
    booking_type: "staycation" as "staycation" | "event" | "movie",
    day_type: "weekday" as "weekday" | "weekend",
    guests: 10, status: "confirmed" as BookingStatus,
    payment_method: "manual" as "manual" | "razorpay",
    total_amount: 30000,
  });
  const [mSaving, setMSaving] = useState(false);
  const [mError, setMError] = useState("");
  const [mSuccess, setMSuccess] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_authed");
    if (saved === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) fetchBookings();
  }, [authed]);

  useEffect(() => {
    if (!authed) return;
    const channel = supabaseAdmin
      .channel("admin-bookings")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => fetchBookings())
      .subscribe();
    return () => { supabaseAdmin.removeChannel(channel); };
  }, [authed]);

  // Auto-calc total for manual booking
  useEffect(() => {
    const plan = PLANS.find(p => p.label === mForm.plan_label);
    if (plan) {
      const nights = mForm.check_in && mForm.check_out
        ? Math.max(1, Math.round((new Date(mForm.check_out).getTime() - new Date(mForm.check_in).getTime()) / 86400000))
        : 1;
      const base = mForm.day_type === "weekday" ? plan.weekday : plan.weekend;
      setMForm(f => ({ ...f, total_amount: base * (plan.type === "movie" ? 1 : nights), booking_type: plan.type as any }));
    }
  }, [mForm.plan_label, mForm.day_type, mForm.check_in, mForm.check_out]);

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "1");
      setAuthed(true);
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  }

  async function fetchBookings() {
    setLoading(true);
    const { data } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    setBookings((data as Booking[]) || []);
    setLoading(false);
  }

  async function updateStatus(booking: Booking, status: BookingStatus) {
    setUpdating(true);
    await fetch("/api/admin/update-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${ADMIN_TOKEN}` },
      body: JSON.stringify({ booking_id: booking.id, status, admin_notes: adminNote }),
    });
    await fetchBookings();
    setSelected(prev => prev ? { ...prev, status, admin_notes: adminNote } : null);
    setUpdating(false);
  }

  async function saveEdit() {
    if (!selected) return;
    setUpdating(true);
    await supabaseAdmin.from("bookings").update(editForm).eq("id", selected.id);
    await fetchBookings();
    setSelected(prev => prev ? { ...prev, ...editForm } : null);
    setActiveTab("details");
    setUpdating(false);
  }

  async function handleManualBooking() {
    setMError("");
    if (!mForm.name || !mForm.email || !mForm.phone || !mForm.check_in) {
      setMError("Name, email, phone and check-in are required.");
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
        setMForm({ name: "", email: "", phone: "", requests: "", check_in: "", check_out: "", plan_label: PLANS[0].label, booking_type: "staycation", day_type: "weekday", guests: 10, status: "confirmed", payment_method: "manual", total_amount: 30000 });
      }, 2000);
    } catch (e: any) { setMError(e.message || "Failed to create booking."); }
    setMSaving(false);
  }

  const filtered = bookings
    .filter(b => filter === "all" || b.status === filter)
    .filter(b => !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.booking_ref.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search));

  const counts = bookings.reduce((acc, b) => { acc[b.status] = (acc[b.status] || 0) + 1; return acc; }, {} as Record<string, number>);
  const revenue = bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.total_amount, 0);

  // ── LOGIN ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center px-4">
        <div className="bg-white border border-[#eee] p-8 w-full max-w-sm rounded-[16px]">
          <div className="w-12 h-12 bg-[#2D4A3E] rounded-[12px] flex items-center justify-center mb-4">
            <span className="text-white text-xl">V</span>
          </div>
          <p className="text-[#D9B59D] text-xs uppercase tracking-widest mb-1">Vihara</p>
          <h1 className="text-2xl font-normal text-[#1a1a1a] mb-1">Admin Dashboard</h1>
          <p className="text-xs text-[#888] mb-6">Sign in to manage bookings</p>
          <label className="text-xs text-[#555] mb-1 block">Password</label>
          <input type="password" placeholder="Enter admin password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            className="w-full border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors mb-3 rounded-lg" />
          {loginError && <p className="text-xs text-red-500 mb-3">{loginError}</p>}
          <button onClick={handleLogin}
            className="w-full bg-[#2D4A3E] text-white py-2.5 text-sm font-medium rounded-lg hover:bg-[#1C3028] transition-colors">
            Sign In →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Header */}
      <div className="bg-[#2D4A3E] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[#D9B59D] text-xs uppercase tracking-widest">Vihara</p>
          <h1 className="text-white text-lg font-medium">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setShowManual(true)}
            className="bg-[#D9B59D] text-[#1a1a1a] text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#c9a08d] transition-colors">
            + Manual Booking
          </button>
          <a href="/admin/calendar"
            className="text-white/70 text-xs hover:text-white transition-colors border border-white/20 px-3 py-2 rounded-lg">
            📅 Calendar
          </a>
          <button onClick={fetchBookings} className="text-white/70 text-xs hover:text-white transition-colors">↻ Refresh</button>
          <button onClick={() => { sessionStorage.removeItem("admin_authed"); setAuthed(false); }}
            className="text-white/40 text-xs hover:text-white transition-colors">Logout</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length, bg: "#fff" },
            { label: "Confirmed Revenue", value: `₹${(revenue/1000).toFixed(0)}K`, bg: "#f0f9f4" },
            { label: "Pending", value: counts["pending_payment"] || 0, bg: "#fff8f0" },
            { label: "Screenshot Uploaded", value: counts["payment_uploaded"] || 0, bg: "#f0f4ff" },
            { label: "Confirmed", value: counts["confirmed"] || 0, bg: "#f0f9f4" },
            { label: "Rejected", value: counts["rejected"] || 0, bg: "#fff0f0" },
          ].map(s => (
            <div key={s.label} className="border border-[#eee] rounded-[12px] p-4" style={{ background: s.bg }}>
              <p className="text-2xl font-medium text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs text-[#888] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input type="text" placeholder="Search by name, ref or phone..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="bg-white border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] transition-colors flex-1 rounded-lg" />
          <div className="flex gap-2 flex-wrap">
            {(["all", "pending_payment", "payment_uploaded", "confirmed", "rejected", "cancelled"] as const).map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-2 text-xs rounded-lg border transition-colors ${filter === s ? "bg-[#2D4A3E] text-white border-[#2D4A3E]" : "bg-white text-[#555] border-[#ddd] hover:border-[#2D4A3E]"}`}>
                {s === "all" ? `All (${bookings.length})` : `${STATUS_COLORS[s].label} (${counts[s] || 0})`}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="text-center py-16 text-sm text-[#888]">Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-[#888]">No bookings found.</div>
        ) : (
          <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#eee] bg-[#fafafa]">
                    {["Ref", "Guest", "Package", "Dates", "Guests", "Amount", "Payment", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs text-[#888] uppercase tracking-wider font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => {
                    const st = STATUS_COLORS[b.status];
                    return (
                      <tr key={b.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-[#2D4A3E] font-medium whitespace-nowrap">{b.booking_ref}</td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-[#1a1a1a]">{b.name}</p>
                          <p className="text-xs text-[#888]">{b.email}</p>
                          <p className="text-xs text-[#888]">{b.phone}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-[#1a1a1a] whitespace-nowrap">{b.plan_label}</p>
                          <p className="text-xs text-[#888] capitalize">{b.booking_type} · {b.day_type}</p>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#555] whitespace-nowrap">
                          {b.check_in}{b.check_out && b.check_out !== b.check_in ? <><br />→ {b.check_out}</> : ""}
                        </td>
                        <td className="px-4 py-3 text-xs text-[#555]">{b.guests}</td>
                        <td className="px-4 py-3 text-xs font-medium text-[#1a1a1a] whitespace-nowrap">₹{b.total_amount.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded ${b.payment_method === "razorpay" ? "bg-[#2D4A3E]/10 text-[#2D4A3E]" : "bg-orange-50 text-orange-700"}`}>
                            {b.payment_method === "razorpay" ? "Razorpay" : "Manual"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded whitespace-nowrap" style={{ background: st.bg, color: st.text }}>
                            {st.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => { setSelected(b); setAdminNote(b.admin_notes || ""); setActiveTab("details"); setEditForm({ name: b.name, email: b.email, phone: b.phone, check_in: b.check_in, check_out: b.check_out || "", guests: b.guests, total_amount: b.total_amount, requests: b.requests || "" }); }}
                              className="text-xs text-[#2D4A3E] hover:underline font-medium whitespace-nowrap">
                              View
                            </button>
                            <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(b.name)}%2C%20regarding%20your%20Vihara%20booking%20${b.booking_ref}`}
                              target="_blank" rel="noreferrer"
                              className="text-xs text-[#25D366] hover:underline whitespace-nowrap">
                              WA
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8 px-4"
          onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div className="bg-white w-full max-w-2xl rounded-[16px] overflow-hidden shadow-xl">
            {/* Modal header */}
            <div className="bg-[#2D4A3E] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[#D9B59D] text-xs uppercase tracking-widest">Booking</p>
                <p className="text-white font-medium text-lg font-mono">{selected.booking_ref}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white text-xl leading-none">✕</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#eee]">
              {(["details", "edit"] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === t ? "text-[#2D4A3E] border-b-2 border-[#2D4A3E]" : "text-[#888] hover:text-[#555]"}`}>
                  {t === "details" ? "Booking Details" : "Edit Booking"}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "details" ? (
                <div className="space-y-5">
                  {/* Status badge */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm px-3 py-1 rounded-lg font-medium" style={{ background: STATUS_COLORS[selected.status].bg, color: STATUS_COLORS[selected.status].text }}>
                      {STATUS_COLORS[selected.status].label}
                    </span>
                    <span className="text-xs text-[#888]">Booked on {new Date(selected.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>

                  {/* Guest */}
                  <div>
                    <p className="text-xs text-[#888] uppercase tracking-wider mb-2">Guest Information</p>
                    <div className="grid grid-cols-2 gap-3 bg-[#fafafa] rounded-lg p-4">
                      <div><p className="text-xs text-[#888]">Name</p><p className="text-sm font-medium">{selected.name}</p></div>
                      <div><p className="text-xs text-[#888]">Phone</p><p className="text-sm font-medium">{selected.phone}</p></div>
                      <div className="col-span-2"><p className="text-xs text-[#888]">Email</p><p className="text-sm font-medium">{selected.email}</p></div>
                      {selected.requests && <div className="col-span-2"><p className="text-xs text-[#888]">Requests</p><p className="text-sm text-[#555]">{selected.requests}</p></div>}
                    </div>
                  </div>

                  {/* Booking */}
                  <div>
                    <p className="text-xs text-[#888] uppercase tracking-wider mb-2">Booking Details</p>
                    <div className="grid grid-cols-2 gap-3 bg-[#fafafa] rounded-lg p-4">
                      <div><p className="text-xs text-[#888]">Package</p><p className="text-sm font-medium">{selected.plan_label}</p></div>
                      <div><p className="text-xs text-[#888]">Type</p><p className="text-sm font-medium capitalize">{selected.booking_type} · {selected.day_type}</p></div>
                      <div><p className="text-xs text-[#888]">Check In</p><p className="text-sm font-medium">{selected.check_in}</p></div>
                      <div><p className="text-xs text-[#888]">Check Out</p><p className="text-sm font-medium">{selected.check_out || "—"}</p></div>
                      <div><p className="text-xs text-[#888]">Guests</p><p className="text-sm font-medium">{selected.guests}</p></div>
                      <div><p className="text-xs text-[#888]">Amount</p><p className="text-sm font-medium text-[#B85C38]">₹{selected.total_amount.toLocaleString("en-IN")}</p></div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <p className="text-xs text-[#888] uppercase tracking-wider mb-2">Payment</p>
                    <div className="grid grid-cols-2 gap-3 bg-[#fafafa] rounded-lg p-4">
                      <div><p className="text-xs text-[#888]">Method</p><p className="text-sm font-medium capitalize">{selected.payment_method || "—"}</p></div>
                      {selected.payment_ref && <div><p className="text-xs text-[#888]">UTR / Ref</p><p className="text-sm font-mono">{selected.payment_ref}</p></div>}
                      {selected.razorpay_payment_id && <div className="col-span-2"><p className="text-xs text-[#888]">Razorpay ID</p><p className="text-xs font-mono">{selected.razorpay_payment_id}</p></div>}
                    </div>
                    {selected.payment_screenshot_url && (
                      <a href={selected.payment_screenshot_url} target="_blank" rel="noreferrer"
                        className="inline-block mt-2 bg-[#2D4A3E] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#1C3028] transition-colors">
                        View Screenshot ↗
                      </a>
                    )}
                  </div>

                  {/* Admin notes */}
                  <div>
                    <label className="text-xs text-[#888] uppercase tracking-wider mb-1 block">Admin Notes</label>
                    <textarea rows={2} value={adminNote} onChange={e => setAdminNote(e.target.value)}
                      placeholder="Add internal notes..."
                      className="w-full bg-[#fafafa] border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] transition-colors resize-none rounded-lg" />
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {selected.status !== "confirmed" && (
                      <button onClick={() => updateStatus(selected, "confirmed")} disabled={updating}
                        className="bg-[#2D7A4E] text-white py-2.5 text-xs font-medium rounded-lg hover:bg-[#1f5c3a] transition-colors disabled:opacity-50">
                        ✓ Confirm
                      </button>
                    )}
                    {selected.status !== "rejected" && (
                      <button onClick={() => updateStatus(selected, "rejected")} disabled={updating}
                        className="bg-[#C83B3B] text-white py-2.5 text-xs font-medium rounded-lg hover:bg-[#a02e2e] transition-colors disabled:opacity-50">
                        ✕ Reject
                      </button>
                    )}
                    {selected.status !== "cancelled" && (
                      <button onClick={() => updateStatus(selected, "cancelled")} disabled={updating}
                        className="bg-[#888] text-white py-2.5 text-xs font-medium rounded-lg hover:bg-[#666] transition-colors disabled:opacity-50">
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(selected.name)}%2C%20this%20is%20Vihara%20The%20Courtyard%20regarding%20your%20booking%20${selected.booking_ref}.`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full border border-[#25D366] text-[#25D366] py-2.5 text-xs font-medium rounded-lg hover:bg-[#25D366] hover:text-white transition-colors">
                    WhatsApp Guest
                  </a>
                </div>
              ) : (
                /* EDIT TAB */
                <div className="space-y-4">
                  <p className="text-xs text-[#888]">Edit booking details and save changes.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Guest Name", key: "name", type: "text" },
                      { label: "Phone", key: "phone", type: "tel" },
                      { label: "Email", key: "email", type: "email" },
                      { label: "Guests", key: "guests", type: "number" },
                      { label: "Check In", key: "check_in", type: "date" },
                      { label: "Check Out", key: "check_out", type: "date" },
                      { label: "Total Amount (₹)", key: "total_amount", type: "number" },
                    ].map(f => (
                      <div key={f.key} className={f.key === "email" || f.key === "total_amount" ? "col-span-2" : ""}>
                        <label className="text-xs text-[#555] mb-1 block">{f.label}</label>
                        <input type={f.type} value={(editForm as any)[f.key] || ""}
                          onChange={e => setEditForm(ef => ({ ...ef, [f.key]: f.type === "number" ? +e.target.value : e.target.value }))}
                          className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg transition-colors" />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="text-xs text-[#555] mb-1 block">Special Requests</label>
                      <textarea rows={2} value={(editForm as any).requests || ""}
                        onChange={e => setEditForm(ef => ({ ...ef, requests: e.target.value }))}
                        className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg transition-colors resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setActiveTab("details")}
                      className="flex-1 border border-[#ddd] text-[#555] py-2.5 text-sm rounded-lg hover:bg-[#f5f5f5] transition-colors">
                      Cancel
                    </button>
                    <button onClick={saveEdit} disabled={updating}
                      className="flex-1 bg-[#2D4A3E] text-white py-2.5 text-sm rounded-lg hover:bg-[#1C3028] transition-colors disabled:opacity-40">
                      {updating ? "Saving..." : "Save Changes →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MANUAL BOOKING MODAL ── */}
      {showManual && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setShowManual(false); }}>
          <div className="bg-white rounded-[16px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="bg-[#2D4A3E] px-6 py-4 rounded-t-[16px] flex items-center justify-between sticky top-0">
              <div>
                <p className="text-[#D9B59D] text-xs uppercase tracking-widest">Admin</p>
                <p className="text-white font-medium">Create Manual Booking</p>
              </div>
              <button onClick={() => setShowManual(false)} className="text-white/60 hover:text-white text-xl leading-none">✕</button>
            </div>
            <div className="p-6 space-y-5">
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
              </div>
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
                      {PLANS.map(p => <option key={p.label} value={p.label}>{p.label} — {p.type}</option>)}
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
                    <label className="text-xs text-[#555] mb-1 block">Guests</label>
                    <input type="number" min={1} max={200} value={mForm.guests}
                      onChange={e => setMForm(m => ({ ...m, guests: +e.target.value }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Total Amount (₹)</label>
                    <input type="number" value={mForm.total_amount}
                      onChange={e => setMForm(m => ({ ...m, total_amount: +e.target.value }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">Status</label>
                    <select value={mForm.status}
                      onChange={e => setMForm(m => ({ ...m, status: e.target.value as BookingStatus }))}
                      className="w-full border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] rounded-lg bg-white">
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
              <div className="bg-[#2D4A3E] rounded-lg px-4 py-3">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>{mForm.plan_label} · {mForm.day_type}</span>
                  <span>{mForm.check_in}{mForm.check_out ? ` → ${mForm.check_out}` : ""}</span>
                </div>
                <div className="flex justify-between text-white font-medium">
                  <span>Total Amount</span>
                  <span>₹{mForm.total_amount.toLocaleString("en-IN")}</span>
                </div>
              </div>
              {mError && <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{mError}</p>}
              {mSuccess && <p className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">✓ {mSuccess}</p>}
              <div className="flex gap-3">
                <button onClick={() => setShowManual(false)}
                  className="flex-1 border border-[#ddd] text-[#555] py-2.5 text-sm rounded-lg hover:bg-[#f5f5f5] transition-colors">
                  Cancel
                </button>
                <button onClick={handleManualBooking} disabled={mSaving}
                  className="flex-1 bg-[#2D4A3E] text-white py-2.5 text-sm rounded-lg hover:bg-[#1C3028] transition-colors disabled:opacity-40">
                  {mSaving ? "Creating..." : "Create Booking →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
