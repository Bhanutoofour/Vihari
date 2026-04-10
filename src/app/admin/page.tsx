"use client";

import { useEffect, useState } from "react";
import { Booking, BookingStatus } from "@/lib/supabase";
import { ADMIN_TOKEN } from "@/components/admin/config";

const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string; label: string }> = {
  pending_payment: { bg: "#fff8f0", text: "#B85C38", label: "Pending Payment" },
  payment_uploaded: { bg: "#f0f4ff", text: "#3B5AC8", label: "Payment Uploaded" },
  confirmed: { bg: "#f0f9f4", text: "#2D7A4E", label: "Confirmed" },
  rejected: { bg: "#fff0f0", text: "#C83B3B", label: "Rejected" },
  cancelled: { bg: "#f5f5f5", text: "#888", label: "Cancelled" },
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
      });
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  const filtered = bookings
    .filter((booking) => filter === "all" || booking.status === filter)
    .filter(
      (booking) =>
        !search ||
        booking.name.toLowerCase().includes(search.toLowerCase()) ||
        booking.booking_ref.toLowerCase().includes(search.toLowerCase()) ||
        booking.phone.includes(search),
    );

  const counts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const confirmedRevenue = bookings
    .filter((booking) => booking.status === "confirmed")
    .reduce((sum, booking) => sum + booking.total_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#B28B72] mb-2">
            Guest booking control
          </p>
          <h1 className="text-2xl font-medium text-[#1a1a1a]">Bookings</h1>
          <p className="text-sm text-[#6f6a63] mt-1">
            Review direct bookings, payment status, and guest details.
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className="bg-[#2D4A3E] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#1C3028] transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
        {[
          { label: "Total", value: bookings.length, bg: "#fff" },
          { label: "Confirmed", value: counts.confirmed || 0, bg: "#f0f9f4" },
          { label: "Pending", value: counts.pending_payment || 0, bg: "#fff8f0" },
          { label: "Uploaded", value: counts.payment_uploaded || 0, bg: "#f0f4ff" },
          {
            label: "Revenue",
            value: `Rs. ${(confirmedRevenue / 1000).toFixed(0)}K`,
            bg: "#fff",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-[#eee] rounded-[12px] p-4"
            style={{ background: stat.bg }}
          >
            <p className="text-2xl font-medium text-[#1a1a1a]">{stat.value}</p>
            <p className="text-xs text-[#888] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by guest, reference or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-[#2D4A3E] transition-colors flex-1 rounded-lg"
        />
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending_payment", "payment_uploaded", "confirmed", "rejected", "cancelled"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                filter === status
                  ? "bg-[#2D4A3E] text-white border-[#2D4A3E]"
                  : "bg-white text-[#555] border-[#ddd] hover:border-[#2D4A3E]"
              }`}
            >
              {status === "all"
                ? `All (${bookings.length})`
                : `${STATUS_COLORS[status].label} (${counts[status] || 0})`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-[#eee] rounded-[16px] px-6 py-16 text-center text-sm text-[#888]">
          Loading bookings...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#eee] rounded-[16px] px-6 py-16 text-center text-sm text-[#888]">
          No bookings found.
        </div>
      ) : (
        <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#eee] bg-[#fafafa]">
                  {["Ref", "Guest", "Stay", "Payment", "Status", "Amount"].map((heading) => (
                    <th
                      key={heading}
                      className="text-left px-4 py-3 text-xs text-[#888] uppercase tracking-wider font-medium whitespace-nowrap"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#2D4A3E] font-medium whitespace-nowrap">
                      {booking.booking_ref}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-[#1a1a1a]">{booking.name}</p>
                      <p className="text-xs text-[#888]">{booking.phone}</p>
                      <p className="text-xs text-[#888]">{booking.email}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#555] whitespace-nowrap">
                      <p>{booking.plan_label}</p>
                      <p className="mt-1">
                        {booking.check_in}
                        {booking.check_out ? ` -> ${booking.check_out}` : ""}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#555] whitespace-nowrap">
                      <p>{booking.payment_method || "-"}</p>
                      <p className="mt-1">
                        {booking.payment_ref || booking.razorpay_payment_id || "-"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex px-2 py-1 rounded text-xs whitespace-nowrap"
                        style={{
                          background: STATUS_COLORS[booking.status].bg,
                          color: STATUS_COLORS[booking.status].text,
                        }}
                      >
                        {STATUS_COLORS[booking.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-[#1a1a1a] whitespace-nowrap">
                      Rs. {booking.total_amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
