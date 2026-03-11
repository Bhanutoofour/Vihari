"use client";
import { useState, useEffect } from "react";
import { supabase, Booking, BookingStatus } from "@/lib/supabase";

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending_payment: "Pending Payment",
  payment_uploaded: "Payment Under Review",
  confirmed: "Confirmed ✓",
  rejected: "Not Confirmed",
  cancelled: "Cancelled",
};

const STATUS_COLOR: Record<
  BookingStatus,
  { bg: string; text: string; border: string }
> = {
  pending_payment: { bg: "#fff8f0", text: "#B85C38", border: "#f0e0c8" },
  payment_uploaded: { bg: "#f0f4ff", text: "#3B5AC8", border: "#c8d4f8" },
  confirmed: { bg: "#f0f9f4", text: "#2D7A4E", border: "#c8e8d4" },
  rejected: { bg: "#fff0f0", text: "#C83B3B", border: "#f8c8c8" },
  cancelled: { bg: "#f5f5f5", text: "#888", border: "#e0e0e0" },
};

export default function MyBookingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [session, setSession] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [selected, setSelected] = useState<Booking | null>(null);

  // Check existing session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s),
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch bookings when logged in
  useEffect(() => {
    if (!session) return;
    fetchBookings();
  }, [session]);

  async function fetchBookings() {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });
    setBookings((data as Booking[]) || []);
    setLoading(false);
  }

  async function handleLogin() {
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (err)
      setError(
        "Incorrect email or password. Try resetting your password below.",
      );
    setLoading(false);
  }

  async function handleResetPassword() {
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/my-booking`,
    });
    if (err) setError(err.message);
    else setResetSent(true);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setBookings([]);
    setSelected(null);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EA]">
        <p className="text-sm text-[#888]">Loading...</p>
      </div>
    );
  }

  // ── LOGIN / RESET ──
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EA] px-4">
        <div className="bg-white border border-[#eee] p-8 w-full max-w-sm">
          <h1
            className="font-normal text-[#1a1a1a] mb-1"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "26px",
            }}
          >
            My Booking
          </h1>
          <p className="text-xs text-[#888] mb-6">
            {mode === "login"
              ? "Sign in with the email you used to book."
              : "We'll send a link to set your password."}
          </p>

          {resetSent ? (
            <div className="bg-[#f0f9f4] border border-[#c8e8d4] px-4 py-3 text-sm text-[#2D7A4E] mb-4">
              ✓ Check your inbox for a password reset link.
            </div>
          ) : (
            <>
              <label className="text-xs text-[#555] mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && mode === "login" && handleLogin()
                }
                className="w-full bg-white border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors mb-3"
              />

              {mode === "login" && (
                <>
                  <label className="text-xs text-[#555] mb-1 block">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full bg-white border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors mb-4"
                  />
                </>
              )}

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 mb-3">
                  {error}
                </p>
              )}

              <button
                onClick={mode === "login" ? handleLogin : handleResetPassword}
                disabled={loading || !email}
                className="w-full bg-[#2D4A3E] text-white py-2.5 text-sm font-medium hover:bg-[#1C3028] transition-colors disabled:opacity-40 mb-3"
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                    ? "Sign In →"
                    : "Send Reset Link →"}
              </button>
            </>
          )}

          <button
            onClick={() => {
              setMode(mode === "login" ? "reset" : "login");
              setError("");
              setResetSent(false);
            }}
            className="w-full text-xs text-[#2D4A3E] hover:underline text-center"
          >
            {mode === "login"
              ? "Forgot password / First time? Reset it here"
              : "← Back to sign in"}
          </button>
        </div>
      </div>
    );
  }

  // ── BOOKINGS VIEW ──
  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Top bar */}
      <div className="bg-[#2D4A3E] px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#D9B59D] text-xs uppercase tracking-widest">
            Vihara
          </p>
          <p
            className="text-white font-medium"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "18px",
            }}
          >
            My Bookings
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-white/60 text-xs hidden sm:block">
            {session.user.email}
          </p>
          <button
            onClick={handleLogout}
            className="text-white/60 text-xs hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-sm text-[#888] text-center py-16">
            Loading your bookings...
          </p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-[#888] mb-4">
              No bookings found for this account.
            </p>
            <a
              href="/booking"
              className="inline-block bg-[#2D4A3E] text-white px-8 py-3 text-sm no-underline hover:bg-[#1C3028] transition-colors"
            >
              Make a Booking →
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => {
              const s = STATUS_COLOR[b.status];
              return (
                <div key={b.id} className="bg-white border border-[#eee]">
                  <div className="px-6 py-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-sm font-medium text-[#2D4A3E]">
                          {b.booking_ref}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5"
                          style={{
                            background: s.bg,
                            color: s.text,
                            border: `1px solid ${s.border}`,
                          }}
                        >
                          {STATUS_LABEL[b.status]}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[#1a1a1a]">
                        {b.plan_label}
                      </p>
                      <p className="text-xs text-[#888] capitalize">
                        {b.booking_type} · {b.day_type}
                      </p>
                      <div className="flex gap-4 mt-2 flex-wrap">
                        <span className="text-xs text-[#555]">
                          📅 {b.check_in}
                          {b.check_out ? ` → ${b.check_out}` : ""}
                        </span>
                        <span className="text-xs text-[#555]">
                          👥 {b.guests} guests
                        </span>
                        <span className="text-xs text-[#555] font-medium">
                          ₹{b.total_amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setSelected(selected?.id === b.id ? null : b)
                      }
                      className="text-xs text-[#2D4A3E] hover:underline whitespace-nowrap font-medium mt-1"
                    >
                      {selected?.id === b.id ? "Hide" : "Details"}
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {selected?.id === b.id && (
                    <div className="border-t border-[#f0f0f0] px-6 py-4 bg-[#fafafa] space-y-3">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <p className="text-xs text-[#888]">Payment</p>
                          <p className="font-medium capitalize">
                            {b.payment_method || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#888]">Booked On</p>
                          <p className="font-medium">
                            {new Date(b.created_at).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                        {b.payment_ref && (
                          <div className="col-span-2">
                            <p className="text-xs text-[#888]">
                              Payment Ref / UTR
                            </p>
                            <p className="font-mono font-medium">
                              {b.payment_ref}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Status messages */}
                      {b.status === "pending_payment" && (
                        <div className="text-xs text-[#B85C38] bg-[#fff8f0] border border-[#f0e0c8] px-3 py-2">
                          {b.payment_method === "manual"
                            ? "⏳ Please complete your bank/UPI transfer and upload your payment screenshot if you haven't already."
                            : "⏳ Payment not yet received. Please complete your payment."}
                        </div>
                      )}
                      {b.status === "payment_uploaded" && (
                        <div className="text-xs text-[#3B5AC8] bg-[#f0f4ff] border border-[#c8d4f8] px-3 py-2">
                          ⏳ Your payment screenshot has been received. Our team
                          will verify and confirm within 2–4 hours.
                        </div>
                      )}
                      {b.status === "confirmed" && (
                        <div className="text-xs text-[#2D7A4E] bg-[#f0f9f4] border border-[#c8e8d4] px-3 py-2">
                          ✓ Your booking is confirmed! Check-in at 2:00 PM.
                          Location: Kothur, ORR Exit 15 or 16.
                        </div>
                      )}
                      {b.admin_notes && (
                        <div className="text-xs text-[#555] bg-white border border-[#eee] px-3 py-2">
                          <span className="font-medium text-[#888] uppercase tracking-wider">
                            Note:{" "}
                          </span>
                          {b.admin_notes}
                        </div>
                      )}

                      {/* WhatsApp support */}
                      <a
                        href="https://wa.me/919032169777"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-[#25D366] hover:underline"
                      >
                        <span>💬</span> Contact us on WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="text-center pt-6">
              <a
                href="/booking"
                className="inline-block border border-[#2D4A3E] text-[#2D4A3E] px-8 py-3 text-sm no-underline hover:bg-[#2D4A3E] hover:text-white transition-colors"
              >
                + Make Another Booking
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
