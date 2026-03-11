"use client";
import { useState } from "react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80";

type BookingType = "staycation" | "event" | "movie";
type PaymentMethod = "razorpay" | "manual";

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
const moviePlan = [
  {
    id: "movie-4hr",
    label: "4 Hours",
    weekday: 15000,
    weekend: 25000,
    tagline: "Complete house access, including common spaces and one bedroom",
  },
];

const BANK_DETAILS = {
  bank: "HDFC Bank",
  name: "Vihara The Courtyard",
  account: "XXXX XXXX XXXX 4521",
  ifsc: "HDFC0001234",
  upi: "vihara@hdfcbank",
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [paymentRef, setPaymentRef] = useState("");
  const [uploading, setUploading] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const allPlans = [...staycationPlans, ...eventPlans, ...moviePlan];
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
        : moviePlan;

  function loadRazorpay(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve();
        return;
      }
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve();
      document.body.appendChild(s);
    });
  }

  async function handleProceedPayment() {
    setError("");
    setUploading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_type: bookingType,
          plan_label: plan?.label,
          day_type: dayType,
          check_in: checkIn,
          check_out: checkOut || null,
          guests,
          total_amount: total,
          name: details.name,
          email: details.email,
          phone: details.phone,
          requests: details.requests || null,
          payment_method: paymentMethod,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setBookingRef(data.booking_ref);

      if (paymentMethod === "razorpay") {
        await loadRazorpay();
        const rzp = new (window as any).Razorpay({
          key: data.razorpay_key,
          amount: data.amount,
          currency: "INR",
          name: "Vihara — The Courtyard",
          description: `${plan?.label} · ${dayType}`,
          order_id: data.razorpay_order_id,
          prefill: {
            name: details.name,
            email: details.email,
            contact: details.phone,
          },
          theme: { color: "#354E41" },
          handler: async (response: any) => {
            const vRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_ref: data.booking_ref,
              }),
            });
            const vData = await vRes.json();
            if (vData.success) setSubmitted(true);
            else setError("Payment verification failed. Please contact us.");
          },
        });
        rzp.open();
      } else {
        setStep(4);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleUploadScreenshot() {
    if (!screenshot) {
      setError("Please upload your payment screenshot");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("screenshot", screenshot);
      fd.append("booking_ref", bookingRef);
      fd.append("payment_ref", paymentRef);
      const res = await fetch("/api/bookings/upload-screenshot", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  // ── CONFIRMED ──
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EA] px-6">
        <div className="text-center max-w-md w-full">
          <div className="text-5xl mb-5">
            {paymentMethod === "razorpay" ? "✅" : "📩"}
          </div>
          <h2
            className="font-normal text-[#1a1a1a] mb-3"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "32px",
            }}
          >
            {paymentMethod === "razorpay"
              ? "Booking Confirmed!"
              : "Request Received!"}
          </h2>
          <div className="bg-white border border-[#eee] px-6 py-4 mb-5 text-left">
            <p className="text-xs text-[#888] uppercase tracking-widest mb-1">
              Booking Reference
            </p>
            <p className="text-2xl font-medium text-[#2D4A3E]">{bookingRef}</p>
          </div>
          <p className="text-sm text-[#666] mb-6">
            {paymentMethod === "manual" ? (
              <>
                Our team will verify your payment and confirm within{" "}
                <strong>2–4 hours</strong>. We'll reach you on{" "}
                <strong>{details.phone}</strong>.
              </>
            ) : (
              <>
                Your booking is confirmed! Details sent to{" "}
                <strong>{details.email}</strong>.
              </>
            )}
          </p>
          <a
            href="/"
            className="inline-block bg-[#2D4A3E] text-white px-8 py-3 text-sm no-underline hover:bg-[#1C3028] transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const stepLabels = [
    "Select Package",
    "Your Details",
    "Payment",
    "Upload Proof",
  ];

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
              fontSize: "clamp(32px,5vw,60px)",
            }}
          >
            Book Your Stay
          </h1>
          <p
            className="italic text-white/70"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(13px,1.8vw,18px)",
            }}
          >
            Reserve your tranquil escape at Vihara
          </p>
        </div>
      </section>

      {/* STEP BAR */}
      <div className="bg-white border-b border-[#eee] sticky top-[60px] z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center gap-3">
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const active = step >= n;
            const done = step > n;
            // Hide step 4 label if manual payment not selected yet
            if (n === 4 && paymentMethod !== "manual" && step < 4) return null;
            return (
              <div key={n} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`h-px w-8 md:w-14 ${active ? "bg-[#2D4A3E]" : "bg-[#ddd]"}`}
                  />
                )}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${active ? "bg-[#2D4A3E] text-white" : "bg-[#eee] text-[#999]"}`}
                  >
                    {done ? "✓" : n}
                  </div>
                  <span
                    className={`text-xs hidden md:block ${active ? "text-[#2D4A3E] font-medium" : "text-[#999]"}`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* ══ STEP 1: PACKAGE ══ */}
        {step === 1 && (
          <div className="space-y-10">
            {/* Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Check In",
                  type: "date",
                  val: checkIn,
                  set: setCheckIn,
                },
                {
                  label: "Check Out",
                  type: "date",
                  val: checkOut,
                  set: setCheckOut,
                },
              ].map((f) => (
                <div key={f.label} className="bg-white p-4">
                  <label className="text-xs text-[#888] block mb-1">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    className="w-full text-sm outline-none border-b border-[#eee] pb-1 bg-transparent"
                  />
                </div>
              ))}
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

            {/* Day type */}
            <div>
              <p className="text-xs text-[#888] mb-2 uppercase tracking-widest">
                Pricing For
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

            {/* Package type tabs */}
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

            {/* Plan cards */}
            <div>
              <h2
                className="font-normal text-[#1a1a1a] mb-5"
                style={{
                  fontFamily: "var(--font-dm-serif, serif)",
                  fontSize: "clamp(20px,2.5vw,28px)",
                }}
              >
                {bookingType === "staycation"
                  ? "Staycation Packages"
                  : bookingType === "event"
                    ? "Courtyard Event Packages"
                    : "Movies & Pre-Wedding"}
              </h2>
              {bookingType === "event" && (
                <div className="bg-[#2D4A3E] px-5 py-4 mb-5 text-xs text-white/80 leading-relaxed">
                  <span className="text-[#D9B59D] font-medium uppercase tracking-widest">
                    ★ Overnight Stay Note —{" "}
                  </span>
                  Overnight stays with events are strictly limited to a maximum
                  of 20 guests.
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
                      <p className="mt-3 text-[#2D4A3E] text-xs font-medium">
                        ✓ Selected
                      </p>
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

        {/* ══ STEP 2: DETAILS ══ */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2
              className="font-normal text-[#1a1a1a] mb-6"
              style={{
                fontFamily: "var(--font-dm-serif, serif)",
                fontSize: "clamp(22px,2.8vw,34px)",
              }}
            >
              Your Details
            </h2>

            {/* Mini summary */}
            <div className="bg-[#2D4A3E] p-6 text-white">
              <h3 className="text-xs font-medium mb-3 text-[#D9B59D] uppercase tracking-widest">
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
                  placeholder="Any special requirements..."
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

        {/* ══ STEP 3: CHOOSE PAYMENT ══ */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-normal text-[#1a1a1a] mb-6"
              style={{
                fontFamily: "var(--font-dm-serif, serif)",
                fontSize: "clamp(22px,2.8vw,34px)",
              }}
            >
              Choose Payment Method
            </h2>

            {/* Amount banner */}
            <div className="bg-white border border-[#eee] px-6 py-4 mb-8 flex justify-between items-center">
              <div>
                <p className="text-xs text-[#888] uppercase tracking-widest mb-0.5">
                  Amount Due
                </p>
                <p className="text-xs text-[#555]">
                  {plan?.label} · {dayType}
                </p>
              </div>
              <span
                className="text-[#B85C38] font-medium"
                style={{
                  fontFamily: "var(--font-dm-serif, serif)",
                  fontSize: "28px",
                }}
              >
                ₹{total.toLocaleString()}
              </span>
            </div>

            {/* Payment cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Razorpay */}
              <button
                onClick={() => setPaymentMethod("razorpay")}
                className={`p-6 border-2 bg-white text-left transition-all ${paymentMethod === "razorpay" ? "border-[#2D4A3E]" : "border-[#eee] hover:border-[#2D4A3E]/40"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#2D4A3E] flex items-center justify-center text-white text-xl">
                    💳
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">
                      Pay Online
                    </p>
                    <p className="text-xs text-[#888]">
                      via Razorpay — Instant confirmation
                    </p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "UPI / GPay / PhonePe",
                    "Credit & Debit Card",
                    "Net Banking",
                    "Instant booking confirmed",
                  ].map((f) => (
                    <li
                      key={f}
                      className="text-xs text-[#555] flex items-center gap-2"
                    >
                      <span className="text-[#2D4A3E] font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {paymentMethod === "razorpay" && (
                  <div className="mt-4 bg-[#2D4A3E] text-white text-xs text-center py-1.5">
                    ✓ Selected
                  </div>
                )}
              </button>

              {/* Manual */}
              <button
                onClick={() => setPaymentMethod("manual")}
                className={`p-6 border-2 bg-white text-left transition-all ${paymentMethod === "manual" ? "border-[#2D4A3E]" : "border-[#eee] hover:border-[#2D4A3E]/40"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#B85C38] flex items-center justify-center text-white text-xl">
                    🏦
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">
                      Bank / UPI Transfer
                    </p>
                    <p className="text-xs text-[#888]">
                      Manual — confirmed in 2–4 hrs
                    </p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Bank Transfer (NEFT/IMPS/RTGS)",
                    "UPI to our ID",
                    "Upload payment screenshot",
                    "Team confirms within 2–4 hours",
                  ].map((f) => (
                    <li
                      key={f}
                      className="text-xs text-[#555] flex items-center gap-2"
                    >
                      <span className="text-[#B85C38] font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {paymentMethod === "manual" && (
                  <div className="mt-4 bg-[#2D4A3E] text-white text-xs text-center py-1.5">
                    ✓ Selected
                  </div>
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs mb-4 bg-red-50 px-4 py-2 border border-red-200">
                {error}
              </p>
            )}

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setStep(2)}
                className="border border-[#2D4A3E] text-[#2D4A3E] px-8 py-3 text-sm hover:bg-[#2D4A3E] hover:text-white transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleProceedPayment}
                disabled={!paymentMethod || uploading}
                className="bg-[#2D4A3E] text-white px-10 py-3 text-sm font-medium hover:bg-[#1C3028] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {uploading
                  ? "Processing..."
                  : paymentMethod === "razorpay"
                    ? `Pay ₹${total.toLocaleString()} →`
                    : "Get Bank Details →"}
              </button>
            </div>
          </div>
        )}

        {/* ══ STEP 4: MANUAL UPLOAD ══ */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-normal text-[#1a1a1a] mb-2"
              style={{
                fontFamily: "var(--font-dm-serif, serif)",
                fontSize: "clamp(22px,2.8vw,34px)",
              }}
            >
              Complete Your Payment
            </h2>
            <p className="text-sm text-[#888] mb-6">
              Transfer the amount to the details below, then upload your
              screenshot to confirm your booking.
            </p>

            {/* Booking ref */}
            <div className="bg-[#2D4A3E] px-6 py-4 mb-6">
              <p className="text-xs text-[#D9B59D] uppercase tracking-widest mb-1">
                Your Booking Reference
              </p>
              <p className="text-white text-2xl font-medium tracking-widest">
                {bookingRef}
              </p>
              <p className="text-white/60 text-xs mt-1">
                Please include this in your payment remarks / description
              </p>
            </div>

            {/* Bank details */}
            <div className="bg-white border border-[#eee] p-6 mb-6">
              <p className="text-xs text-[#888] uppercase tracking-widest mb-4">
                Transfer Details
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mb-4">
                {[
                  { label: "Bank", value: BANK_DETAILS.bank },
                  { label: "Account Name", value: BANK_DETAILS.name },
                  { label: "Account Number", value: BANK_DETAILS.account },
                  { label: "IFSC Code", value: BANK_DETAILS.ifsc },
                ].map((r) => (
                  <div key={r.label}>
                    <p className="text-xs text-[#888] mb-0.5">{r.label}</p>
                    <p className="font-medium text-[#1a1a1a]">{r.value}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#eee] pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#888] mb-0.5">UPI ID</p>
                  <p className="font-medium text-[#1a1a1a]">
                    {BANK_DETAILS.upi}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#888] mb-0.5">
                    Amount to Transfer
                  </p>
                  <p
                    className="text-[#B85C38] font-medium"
                    style={{
                      fontFamily: "var(--font-dm-serif, serif)",
                      fontSize: "22px",
                    }}
                  >
                    ₹{total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Upload form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs text-[#555] mb-1 block">
                  Payment Reference / UTR Number (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. UTR123456789012"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full bg-white border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#555] mb-2 block">
                  Payment Screenshot *
                </label>
                <div
                  className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${screenshot ? "border-[#2D4A3E] bg-[#2D4A3E]/5" : "border-[#ddd] hover:border-[#2D4A3E]/50 bg-white"}`}
                  onClick={() =>
                    document.getElementById("screenshot-input")?.click()
                  }
                >
                  {screenshot ? (
                    <div>
                      <p className="text-2xl mb-2">✅</p>
                      <p className="text-sm text-[#2D4A3E] font-medium">
                        {screenshot.name}
                      </p>
                      <p className="text-xs text-[#888] mt-1">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-3xl mb-2">📸</p>
                      <p className="text-sm text-[#555] font-medium">
                        Upload payment screenshot
                      </p>
                      <p className="text-xs text-[#888] mt-1">
                        JPG, PNG — up to 5MB
                      </p>
                    </div>
                  )}
                  <input
                    id="screenshot-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs mb-4 bg-red-50 px-4 py-2 border border-red-200">
                {error}
              </p>
            )}

            <button
              onClick={handleUploadScreenshot}
              disabled={!screenshot || uploading}
              className="w-full bg-[#2D4A3E] text-white py-3.5 text-sm font-medium hover:bg-[#1C3028] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {uploading ? "Submitting..." : "Submit Payment Proof →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
