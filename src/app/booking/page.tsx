"use client";
import { useState } from "react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80";

const rooms = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    guests: "2 Guests",
    price: 5000,
    features: [
      "King Size Bed",
      "Private Bathroom",
      "Air Conditioning",
      "Garden View",
    ],
  },
  {
    id: "premium",
    name: "Premium Suite",
    guests: "4 Guests",
    price: 8500,
    features: ["Two Bedrooms", "Living Area", "Private Balcony", "Pool View"],
  },
  {
    id: "villa",
    name: "Luxury Villa",
    guests: "6 Guests",
    price: 15000,
    features: [
      "Three Bedrooms",
      "Private Kitchen",
      "Garden Access",
      "Premium Amenities",
    ],
  },
  {
    id: "estate",
    name: "Full Estate",
    guests: "20 Guests",
    price: 35000,
    features: [
      "Entire Property",
      "All Facilities",
      "Personal Chef",
      "Event Support",
    ],
  },
];

const packages = [
  { id: "none", name: "No Package", sub: "Room only", extra: 0, features: [] },
  {
    id: "weekend",
    name: "Weekend Getaway",
    sub: "2 Days / 1 Night",
    extra: 0,
    features: ["Breakfast", "Pool Access", "Wi-Fi"],
  },
  {
    id: "wellness",
    name: "Wellness Retreat",
    sub: "3 Days / 2 Nights",
    extra: 3000,
    features: ["All Meals", "Yoga Sessions", "Spa Treatment", "Nature Walks"],
  },
  {
    id: "celebration",
    name: "Celebration Package",
    sub: "Custom",
    extra: 8000,
    features: ["Event Setup", "Catering", "Decoration", "Photography"],
  },
];

const addons = [
  { id: "spa", name: "Spa & Massage", price: 2000 },
  { id: "chef", name: "Personal Chef", price: 3500 },
  { id: "photo", name: "Professional Photography", price: 5000 },
  { id: "transfer", name: "Airport Transfer", price: 1500 },
  { id: "adventure", name: "Adventure Activities", price: 2500 },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState("none");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const room = rooms.find((r) => r.id === selectedRoom);
  const pkg = packages.find((p) => p.id === selectedPackage);
  const addonTotal = addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((s, a) => s + a.price, 0);
  const total = (room?.price ?? 0) + (pkg?.extra ?? 0) + addonTotal;

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

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
            Booking Confirmed!
          </h2>
          <p className="text-sm text-[#666] mb-2">
            Thank you, <strong>{details.name}</strong>. Your reservation at
            Vihara has been received.
          </p>
          <p className="text-sm text-[#666] mb-6">
            We'll contact you at <strong>{details.email}</strong> within 24
            hours to confirm availability.
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
            Reserve your tranquil escape
          </p>
        </div>
      </section>

      {/* STEP INDICATOR */}
      <div className="bg-white border-b border-[#eee] sticky top-[60px] z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center gap-4">
          {[
            { n: 1, label: "Room & Package" },
            { n: 2, label: "Details" },
            { n: 3, label: "Payment" },
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
            {/* Check availability bar */}
            <div className="bg-[#2D4A3E] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-white text-sm font-medium flex items-center gap-2">
                  ℹ Check Availability
                </p>
                <p className="text-white/55 text-xs mt-1">
                  View our availability calendar to see booked dates and select
                  your preferred dates.
                </p>
              </div>
              <button className="bg-[#B85C38] text-white px-5 py-2.5 text-xs whitespace-nowrap hover:bg-[#c96a40] transition-colors flex items-center gap-2">
                📅 View Calendar
              </button>
            </div>

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
                  {[2, 4, 6, 8, 10, 12, 15, 20].map((n) => (
                    <option key={n} value={n}>
                      {n} Guests
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rooms */}
            <div>
              <h2
                className="font-normal text-[#1a1a1a] mb-5"
                style={{
                  fontFamily: "var(--font-dm-serif, serif)",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                }}
              >
                Select Your Accommodation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rooms.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRoom(r.id)}
                    className={`text-left p-6 border-2 transition-all bg-white ${selectedRoom === r.id ? "border-[#2D4A3E]" : "border-transparent hover:border-[#2D4A3E]/30"}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-[#1a1a1a]">
                        {r.name}
                      </span>
                      <span
                        className="font-normal text-[#B85C38]"
                        style={{
                          fontFamily: "var(--font-dm-serif, serif)",
                          fontSize: "20px",
                        }}
                      >
                        ₹{r.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#888] mb-4">
                      {r.guests} &nbsp;·&nbsp; per night
                    </p>
                    <ul className="space-y-1">
                      {r.features.map((f) => (
                        <li
                          key={f}
                          className="text-xs text-[#555] flex items-center gap-2"
                        >
                          <span className="text-[#2D4A3E]">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Packages */}
            <div>
              <h2
                className="font-normal text-[#1a1a1a] mb-5"
                style={{
                  fontFamily: "var(--font-dm-serif, serif)",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                }}
              >
                Choose a Package{" "}
                <span className="text-[#888] text-sm font-light">
                  (Optional)
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {packages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPackage(p.id)}
                    className={`text-left p-5 border-2 bg-white transition-all ${selectedPackage === p.id ? "border-[#2D4A3E]" : "border-transparent hover:border-[#2D4A3E]/30"}`}
                  >
                    <p className="font-medium text-sm text-[#1a1a1a] mb-1">
                      {p.name}
                    </p>
                    <p className="text-xs text-[#888] mb-3">{p.sub}</p>
                    {p.extra > 0 && (
                      <p className="text-sm text-[#B85C38] mb-3">
                        + ₹ {p.extra.toLocaleString()}
                      </p>
                    )}
                    <ul className="space-y-1">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="text-xs text-[#555] flex items-center gap-2"
                        >
                          <span className="text-[#2D4A3E]">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h2
                className="font-normal text-[#1a1a1a] mb-5"
                style={{
                  fontFamily: "var(--font-dm-serif, serif)",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                }}
              >
                Enhance Your Stay
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {addons.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    className={`p-4 border-2 bg-white text-left transition-all ${selectedAddons.includes(a.id) ? "border-[#2D4A3E]" : "border-transparent hover:border-[#2D4A3E]/30"}`}
                  >
                    <p className="text-xs font-medium text-[#1a1a1a] mb-1">
                      {a.name}
                    </p>
                    <p className="text-sm text-[#B85C38]">
                      ₹{a.price.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedRoom}
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
              <h3 className="text-sm font-medium mb-3 text-[#C4965A]">
                Booking Summary
              </h3>
              <div className="space-y-1 text-xs text-white/75">
                <div className="flex justify-between">
                  <span>{room?.name}</span>
                  <span>₹{room?.price.toLocaleString()}/night</span>
                </div>
                {pkg && pkg.extra > 0 && (
                  <div className="flex justify-between">
                    <span>{pkg.name}</span>
                    <span>+ ₹{pkg.extra.toLocaleString()}</span>
                  </div>
                )}
                {addons
                  .filter((a) => selectedAddons.includes(a.id))
                  .map((a) => (
                    <div key={a.id} className="flex justify-between">
                      <span>{a.name}</span>
                      <span>+ ₹{a.price.toLocaleString()}</span>
                    </div>
                  ))}
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
                Continue to Payment →
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
              Payment
            </h2>

            {/* Final summary */}
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
                  <span>Room</span>
                  <span>{room?.name}</span>
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
