"use client";

import { useEffect, useState } from "react";
import { Booking } from "@/lib/supabase";
import { ADMIN_TOKEN } from "@/components/admin/config";

export default function AdminFinancePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
      });
      const data = await res.json();
      setBookings(data.bookings || []);
    }

    load().catch(console.error);
  }, []);

  const confirmed = bookings.filter((booking) => booking.status === "confirmed");
  const pending = bookings.filter(
    (booking) =>
      booking.status === "pending_payment" ||
      booking.status === "payment_uploaded",
  );

  const grossRevenue = confirmed.reduce(
    (sum, booking) => sum + booking.total_amount,
    0,
  );
  const paidRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.paid_amount || 0),
    0,
  );
  const outstanding = bookings.reduce(
    (sum, booking) =>
      sum +
      (booking.balance_amount ||
        Math.max(0, booking.total_amount - (booking.paid_amount || 0))),
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#B28B72] mb-2">
          Money overview
        </p>
        <h1 className="text-2xl font-medium text-[#1a1a1a]">Finance</h1>
        <p className="text-sm text-[#6f6a63] mt-1">
          Snapshot of revenue, collections, and unpaid balances.
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: "Gross Revenue", value: grossRevenue },
          { label: "Collected", value: paidRevenue },
          { label: "Outstanding", value: outstanding },
          { label: "Pending Bookings", value: pending.length, plain: true },
        ].map((card) => (
          <div key={card.label} className="bg-white border border-[#eee] rounded-[16px] p-4">
            <p className="text-xs text-[#888] mb-1">{card.label}</p>
            <p className="text-2xl font-medium text-[#1a1a1a]">
              {card.plain ? card.value : `Rs. ${Number(card.value).toLocaleString("en-IN")}`}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#eee]">
          <h2 className="text-sm font-medium text-[#1a1a1a]">Recent confirmed bookings</h2>
        </div>
        {confirmed.slice(0, 8).map((booking) => (
          <div
            key={booking.id}
            className="px-5 py-4 border-b border-[#f2f2f2] last:border-0 flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]">{booking.name}</p>
              <p className="text-xs text-[#888]">
                {booking.booking_ref} · {booking.check_in}
                {booking.check_out ? ` -> ${booking.check_out}` : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[#1a1a1a]">
                Rs. {booking.total_amount.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-[#888]">
                Paid: Rs. {(booking.paid_amount || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
