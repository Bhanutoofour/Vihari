"use client";
import { useState } from "react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80";

type BookingType = "staycation" | "event" | "movie";

const staycationPlans = [
  {
    id: "stay-10",
    label: "Up to 10 Guests",
    weekday: 30000,
    weekend: 35000,
    tagline: "Ideal for family getaways and intimate gatherings",
  },
  {
    id: "stay-15",
    label: "Up to 15 Guests",
    weekday: 40000,
    weekend: 48000,
    tagline: "Perfect for pre-wedding stays and creative escapes",
  },
  {
    id: "stay-20",
    label: "Up to 20 Guests",
    weekday: 50000,
    weekend: 60000,
    tagline: "Ideal for extended family celebrations",
  },
];

const eventPlans = [
  {
    id: "event-50",
    label: "Up to 50 Guests",
    weekday: 60000,
    weekend: 75000,
    tagline: "Full courtyard access — Entire Courtyard",
  },
  {
    id: "event-100",
    label: "Up to 100 Guests",
    weekday: 80000,
    weekend: 95000,
    tagline: "Full courtyard access — Entire Courtyard",
  },
];

const moviePlan = {
  id: "movie-4hr",
  label: "4 Hours",
  weekday: 15000,
  weekend: 25000,
  tagline: "Complete house access, including common spaces and one bedroom",
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<BookingType>("staycation");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [dayType, setDayType] = useState<"weekday" | "weekend">("weekday");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(10);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const allPlans = [...staycationPlans, ...eventPlans, { ...moviePlan }];
  const plan = allPlans.find((p) => p.id === selectedPlan);
  const total = plan
    ? dayType === "weekday"
      ? plan.weekday
      : plan.weekend
    : 0;

  const currentPlans =
    bookingType === "staycation"
      ? staycationPlans
      : bookingType === "event"
        ? eventPlans
        : [moviePlan];

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EA] px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🎉</div>
          <h2
            className="font-normal text-[#1a1a1a] mb-3"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "32px",
            }}
          >
            Booking Request Sent!
          </h2>
          <p className="text-sm text-[#666] mb-2">
            Thank you, <strong>{details.name}</strong>. Your reservation request
            at Vihara has been received.
          </p>
          <p className="text-sm text-[#666] mb-6">
            We'll contact you at <strong>{details.email}</strong> within 24
            hours to confirm availability and share payment details.
          </p>
          <a
            href="/"
            className="bg-[#2D4A3E] text-white px-8 py-3 text-sm no-underline hover:bg-[#1C3028] transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EA] overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ height: "45vh", minHeight: "260px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-[rgba(10,22,16,0.6)]" />
        <div className="relative z-10 px-4">
          <h1
            className="text-white font-normal mb-2"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(32px, 5vw, 60px)",
            }}
          >
            Book Your Stay
          </h1>
          <p
            className="italic text-white/70"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(13px, 1.8vw, 18px)",
            }}
          >
            Reserve your tranquil escape at Vihara
          </p>
        </div>
      </section>

      {/* STEP INDICATOR */}
      <div className="bg-white border-b border-[#eee] sticky top-[60px] z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center gap-4">
          {[
            { n: 1, label: "Select Package" },
            { n: 2, label: "Your Details" },
            { n: 3, label: "Confirm" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-3">
              {i > 0 && (
                <div
                  className={`h-px w-12 md:w-24 ${step > i ? "bg-[#2D4A3E]" : "bg-[#ddd]"}`}
                />
              )}
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${step >= s.n ? "bg-[#2D4A3E] text-white" : "bg-[#eee] text-[#999]"}`}
                >
                  {step > s.n ? "✓" : s.n}
                </div>
                <span
                  className={`text-xs hidden md:block ${step >= s.n ? "text-[#2D4A3E] font-medium" : "text-[#999]"}`}
                >
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="space-y-10">
            {/* Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-4">
                <label className="text-xs text-[#888] block mb-1">
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-sm outline-none border-b border-[#eee] pb-1 bg-transparent"
                />
              </div>
              <div className="bg-white p-4">
                <label className="text-xs text-[#888] block mb-1">
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-sm outline-none border-b border-[#eee] pb-1 bg-transparent"
                />
              </div>
              <div className="bg-white p-4">
                <label className="text-xs text-[#888] block mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(+e.target.value)}
                  className="w-full text-sm outline-none border-b border-[#eee] pb-1 bg-transparent"
                >
                  {[2, 4, 6, 8, 10, 15, 20, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      {n} Guests
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weekday / Weekend toggle */}
            <div>
              <p className="text-xs text-[#888] mb-2 uppercase tracking-widest">
                Pricing for
              </p>
              <div className="flex gap-2">
                {(["weekday", "weekend"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDayType(d)}
                    className={`px-5 py-2 text-xs font-medium uppercase tracking-widest border transition-colors ${dayType === d ? "bg-[#2D4A3E] text-white border-[#2D4A3E]" : "bg-white text-[#555] border-[#ddd] hover:border-[#2D4A3E]"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Type Tabs */}
            <div>
              <p className="text-xs text-[#888] mb-3 uppercase tracking-widest">
                Package Type
              </p>
              <div className="flex gap-2 flex-wrap">
                {(
                  [
                    { key: "staycation", label: "Staycation" },
                    { key: "event", label: "Courtyard Event" },
                    { key: "movie", label: "Movies & Pre-Wedding" },
                  ] as { key: BookingType; label: string }[]
                ).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      setBookingType(t.key);
                      setSelectedPlan(null);
                    }}
                    className={`px-5 py-2 text-xs font-medium uppercase tracking-widest border transition-colors ${bookingType === t.key ? "bg-[#2D4A3E] text-white border-[#2D4A3E]" : "bg-white text-[#555] border-[#ddd] hover:border-[#2D4A3E]"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Cards */}
            <div>
              <h2
                className="font-normal text-[#1a1a1a] mb-5"
                style={{
                  fontFamily: "var(--font-dm-serif, serif)",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                }}
              >
                {bookingType === "staycation" && "Staycation Packages"}
                {bookingType === "event" && "Courtyard Event Packages"}
                {bookingType === "movie" && "Movies & Pre-Wedding"}
              </h2>

              {/* Overnight note for events */}
              {bookingType === "event" && (
                <div className="bg-[#2D4A3E] px-5 py-4 mb-5 text-white text-xs leading-relaxed">
                  <span className="text-[#D9B59D] font-medium uppercase tracking-widest">
                    ★ Overnight Stay Note —{" "}
                  </span>
                  Overnight stays with events are strictly limited to a maximum
                  of 20 guests. This policy applies to all event packages
                  without exception.
                </div>
              )}

              <div
                className={`grid gap-3 ${currentPlans.length === 1 ? "grid-cols-1 max-w-sm" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}
              >
                {currentPlans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className={`text-left p-6 border-2 transition-all bg-white ${selectedPlan === p.id ? "border-[#2D4A3E]" : "border-transparent hover:border-[#2D4A3E]/30"}`}
                  >
                    <p className="text-xs text-[#888] uppercase tracking-widest mb-3">
                      {p.label}
                    </p>
                    <p
                      className="font-normal text-[#B85C38] mb-1"
                      style={{
                        fontFamily: "var(--font-dm-serif, serif)",
                        fontSize: "28px",
                      }}
                    >
                      ₹
                      {(dayType === "weekday"
                        ? p.weekday
                        : p.weekend
                      ).toLocaleString()}
                    </p>
                    <p className="text-xs text-[#888] mb-4">
                      {dayType === "weekday" ? "Weekday rate" : "Weekend rate"}
                    </p>
                    <p className="text-xs text-[#555] leading-relaxed">
                      {p.tagline}
                    </p>
                    {selectedPlan === p.id && (
                      <div className="mt-3 flex items-center gap-1 text-[#2D4A3E] text-xs font-medium">
                        <span>✓</span> Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Info chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Check-in & out",
                  value: "Check-in: 2:00 PM",
                  sub: "Check-out: 11:00 AM",
                },
                {
                  label: "Security Deposit",
                  value: "₹10,000",
                  sub: "Refundable",
                },
                {
                  label: "Additional Guests",
                  value: "₹1,500 Weekday",
                  sub: "₹2,000 Weekend",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="bg-white border border-[#eee] px-5 py-4 text-center"
                >
                  <p className="text-xs text-[#888] uppercase tracking-widest mb-1">
                    {c.label}
                  </p>
                  <p className="text-sm text-[#1a1a1a] font-medium">
                    {c.value}
                  </p>
                  <p className="text-xs text-[#888]">{c.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedPlan}
                className="bg-[#2D4A3E] text-white px-10 py-3 text-sm font-medium hover:bg-[#1C3028] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to Details →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2
              className="font-normal text-[#1a1a1a] mb-6"
              style={{
                fontFamily: "var(--font-dm-serif, serif)",
                fontSize: "clamp(22px, 2.8vw, 34px)",
              }}
            >
              Your Details
            </h2>

            {/* Summary */}
            <div className="bg-[#2D4A3E] p-6 text-white mb-6">
              <h3 className="text-sm font-medium mb-3 text-[#D9B59D] uppercase tracking-widest">
                Booking Summary
              </h3>
              <div className="space-y-1 text-xs text-white/75">
                <div className="flex justify-between">
                  <span>{plan?.label}</span>
                  <span className="capitalize">{dayType} rate</span>
                </div>
                {checkIn && (
                  <div className="flex justify-between">
                    <span>Check In</span>
                    <span>{checkIn}</span>
                  </div>
                )}
                {checkOut && (
                  <div className="flex justify-between">
                    <span>Check Out</span>
                    <span>{checkOut}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>{guests}</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2 flex justify-between text-white font-medium text-sm">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Full Name *",
                  key: "name",
                  type: "text",
                  placeholder: "Your full name",
                },
                {
                  label: "Email *",
                  key: "email",
                  type: "email",
                  placeholder: "your@email.com",
                },
                {
                  label: "Phone *",
                  key: "phone",
                  type: "tel",
                  placeholder: "+91 98765 43210",
                },
              ].map((f) => (
                <div
                  key={f.key}
                  className={f.key === "phone" ? "sm:col-span-2" : ""}
                >
                  <label className="text-xs text-[#555] mb-1 block">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={(details as any)[f.key]}
                    onChange={(e) =>
                      setDetails({ ...details, [f.key]: e.target.value })
                    }
                    className="w-full bg-white border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-xs text-[#555] mb-1 block">
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Any special requirements or requests..."
                  value={details.requests}
                  onChange={(e) =>
                    setDetails({ ...details, requests: e.target.value })
                  }
                  className="w-full bg-white border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setStep(1)}
                className="border border-[#2D4A3E] text-[#2D4A3E] px-8 py-3 text-sm hover:bg-[#2D4A3E] hover:text-white transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!details.name || !details.email || !details.phone}
                className="bg-[#2D4A3E] text-white px-10 py-3 text-sm font-medium hover:bg-[#1C3028] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to Confirm →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-normal text-[#1a1a1a] mb-6"
              style={{
                fontFamily: "var(--font-dm-serif, serif)",
                fontSize: "clamp(22px, 2.8vw, 34px)",
              }}
            >
              Confirm Booking
            </h2>

            <div className="bg-white p-6 mb-6">
              <h3 className="text-sm font-medium text-[#1a1a1a] mb-4">
                Final Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#555]">
                  <span>Guest</span>
                  <span>{details.name}</span>
                </div>
                <div className="flex justify-between text-[#555]">
                  <span>Phone</span>
                  <span>{details.phone}</span>
                </div>
                <div className="flex justify-between text-[#555]">
                  <span>Package</span>
                  <span>{plan?.label}</span>
                </div>
                <div className="flex justify-between text-[#555]">
                  <span>Type</span>
                  <span className="capitalize">
                    {bookingType} · {dayType}
                  </span>
                </div>
                {checkIn && (
                  <div className="flex justify-between text-[#555]">
                    <span>Check In</span>
                    <span>{checkIn}</span>
                  </div>
                )}
                {checkOut && (
                  <div className="flex justify-between text-[#555]">
                    <span>Check Out</span>
                    <span>{checkOut}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#555]">
                  <span>Guests</span>
                  <span>{guests}</span>
                </div>
                <div className="border-t border-[#eee] pt-3 mt-3 flex justify-between font-medium text-[#1a1a1a]">
                  <span>Total Amount</span>
                  <span
                    className="text-[#B85C38]"
                    style={{
                      fontFamily: "var(--font-dm-serif, serif)",
                      fontSize: "22px",
                    }}
                  >
                    ₹{total.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-[#888]">
                  + ₹10,000 security deposit (refundable)
                </p>
              </div>
            </div>

            <div className="bg-[#F5F1EA] border border-[#ddd] p-6 mb-6 text-center">
              <p className="text-sm text-[#555] mb-1">
                Payment via bank transfer or UPI
              </p>
              <p className="text-xs text-[#888]">
                Our team will send payment details after confirming
                availability.
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setStep(2)}
                className="border border-[#2D4A3E] text-[#2D4A3E] px-8 py-3 text-sm hover:bg-[#2D4A3E] hover:text-white transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="bg-[#B85C38] text-white px-10 py-3 text-sm font-medium hover:bg-[#c96a40] transition-colors"
              >
                Confirm Booking →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
