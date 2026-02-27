"use client";
import { useState } from "react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80";

const contactInfo = [
  {
    icon: "📍",
    title: "Location",
    lines: [
      "Vihara - The Courtyard",
      "Hyderabad Outskirts",
      "Telangana, India",
    ],
  },
  {
    icon: "📞",
    title: "Phone",
    lines: ["+91 98765 43210", "+91 98765 43211"],
  },
  {
    icon: "✉️",
    title: "Email",
    lines: ["info@viharacourtyard.com", "bookings@viharacourtyard.com"],
  },
  {
    icon: "🕐",
    title: "Office Hours",
    lines: [
      "Monday - Sunday",
      "9:00 AM - 8:00 PM",
      "(24/7 support for guests)",
    ],
  },
];

const faqs = [
  {
    q: "How far is Vihara from the city?",
    a: "Vihara is approximately 45 minutes from Hyderabad city center, nestled in the peaceful outskirts surrounded by nature.",
  },
  {
    q: "What is the booking process?",
    a: "Submit a booking request through our booking page or contact us directly. We'll confirm availability and provide you with a detailed quote and payment options.",
  },
  {
    q: "Do you host events and weddings?",
    a: "Yes! We have dedicated facilities for weddings and special events. Contact us for event planning and customized packages.",
  },
  {
    q: "Is food included in the stay?",
    a: "Complimentary breakfast is included. We also offer lunch and dinner options featuring traditional Kerala cuisine and other cuisines upon request.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ height: "52vh", minHeight: "300px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-[rgba(10,22,16,0.55)]" />
        <div className="relative z-10 px-4">
          <h1
            className="text-white font-normal mb-2"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(36px, 5vw, 64px)",
            }}
          >
            Contact Us
          </h1>
          <p
            className="italic text-white/75"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(13px, 1.8vw, 18px)",
            }}
          >
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* CONTACT + FORM */}
      <section className="py-20 px-6 md:px-14 bg-[#F5F1EA]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
          {/* Left: contact cards */}
          <div className="flex flex-col gap-3">
            {contactInfo.map((c) => (
              <div key={c.title} className="bg-white p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#2D4A3E] flex items-center justify-center text-sm">
                    {c.icon}
                  </div>
                  <h3 className="font-medium text-sm text-[#1a1a1a]">
                    {c.title}
                  </h3>
                </div>
                {c.lines.map((l) => (
                  <p
                    key={l}
                    className="text-xs text-[#555] leading-relaxed font-light"
                  >
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Right: form */}
          <div className="bg-white p-8">
            <h2
              className="font-normal text-[#1a1a1a] mb-6"
              style={{
                fontFamily: "var(--font-dm-serif, serif)",
                fontSize: "clamp(20px, 2.5vw, 28px)",
              }}
            >
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-medium text-[#2D4A3E] mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-[#666]">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] mb-1 block">
                      Subject *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#2D4A3E] text-white py-3 text-sm font-medium hover:bg-[#1C3028] transition-colors flex items-center justify-center gap-2"
                >
                  ✈ Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="py-16 px-6 md:px-14 bg-white text-center">
        <h2
          className="font-normal text-[#1a1a1a] mb-2"
          style={{
            fontFamily: "var(--font-dm-serif, serif)",
            fontSize: "clamp(22px, 2.8vw, 34px)",
          }}
        >
          Find Us
        </h2>
        <p className="text-sm text-[#888] italic mb-8">
          Located in the peaceful outskirts of Hyderabad
        </p>
        {/* Replace src with your actual Google Maps embed URL */}
        <div className="max-w-4xl mx-auto bg-[#F5F1EA] h-72 flex items-center justify-center border border-[#ddd]">
          <div className="text-center">
            <div className="text-3xl mb-3">📍</div>
            <p className="text-sm text-[#555]">Vihara - The Courtyard</p>
            <p className="text-xs text-[#888]">
              Hyderabad Outskirts, Telangana
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-[#2D4A3E] underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 md:px-14 bg-[#2D4A3E]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-normal text-white mb-10 text-center"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(22px, 2.8vw, 34px)",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center"
                >
                  <span className="text-sm font-medium text-white">
                    {faq.q}
                  </span>
                  <span className="text-white/50 text-lg ml-4">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-white/65 leading-relaxed font-light">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
