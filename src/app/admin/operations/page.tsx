"use client";

import { useEffect, useMemo, useState } from "react";
import { Booking } from "@/lib/supabase";
import { ADMIN_TOKEN } from "@/components/admin/config";

export default function AdminOperationsPage() {
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

  const upcoming = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings
      .filter((booking) => new Date(`${booking.check_in}T00:00:00`) >= today)
      .sort((a, b) => a.check_in.localeCompare(b.check_in))
      .slice(0, 10);
  }, [bookings]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#B28B72] mb-2">
          On-ground prep
        </p>
        <h1 className="text-2xl font-medium text-[#1a1a1a]">Operations</h1>
        <p className="text-sm text-[#6f6a63] mt-1">
          Upcoming arrivals, guest notes, and housekeeping visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        <div className="bg-white border border-[#eee] rounded-[16px] p-4">
          <p className="text-xs text-[#888] mb-1">Upcoming arrivals</p>
          <p className="text-2xl font-medium text-[#1a1a1a]">{upcoming.length}</p>
        </div>
        <div className="bg-white border border-[#eee] rounded-[16px] p-4">
          <p className="text-xs text-[#888] mb-1">Bookings with requests</p>
          <p className="text-2xl font-medium text-[#1a1a1a]">
            {bookings.filter((booking) => Boolean(booking.requests)).length}
          </p>
        </div>
        <div className="bg-white border border-[#eee] rounded-[16px] p-4">
          <p className="text-xs text-[#888] mb-1">Manual payments</p>
          <p className="text-2xl font-medium text-[#1a1a1a]">
            {bookings.filter((booking) => booking.payment_method === "manual").length}
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#eee] rounded-[16px] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#eee]">
          <h2 className="text-sm font-medium text-[#1a1a1a]">Upcoming guest checklist</h2>
        </div>
        {upcoming.length === 0 ? (
          <div className="px-5 py-12 text-sm text-[#888] text-center">
            No upcoming bookings found.
          </div>
        ) : (
          upcoming.map((booking) => (
            <div
              key={booking.id}
              className="px-5 py-4 border-b border-[#f2f2f2] last:border-0"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">{booking.name}</p>
                  <p className="text-xs text-[#888]">
                    {booking.check_in}
                    {booking.check_out ? ` -> ${booking.check_out}` : ""} · {booking.guests} guests
                  </p>
                </div>
                <span className="text-xs font-mono text-[#2D4A3E]">
                  {booking.booking_ref}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#666]">
                <div className="rounded-lg bg-[#f9f7f4] px-3 py-2">
                  Phone: {booking.phone}
                </div>
                <div className="rounded-lg bg-[#f9f7f4] px-3 py-2">
                  Payment: {booking.payment_method || "-"}
                </div>
                <div className="rounded-lg bg-[#f9f7f4] px-3 py-2">
                  Notes: {booking.requests || "No special requests"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
