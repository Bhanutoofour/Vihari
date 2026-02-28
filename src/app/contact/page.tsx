"use client";
import { useState } from "react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80";

const contactInfo = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Location",
    lines: [
      "Vihara - The Courtyard",
      "Hyderabad Outskirts",
      "Telangana, India",
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22.0004 16.92V19.92C22.0016 20.1985 21.9445 20.4741 21.8329 20.7293C21.7214 20.9845 21.5577 21.2136 21.3525 21.4018C21.1473 21.5901 20.905 21.7335 20.6412 21.8227C20.3773 21.9119 20.0978 21.945 19.8204 21.92C16.7433 21.5856 13.7874 20.5341 11.1904 18.85C8.77425 17.3146 6.72576 15.2661 5.19042 12.85C3.5004 10.2412 2.44866 7.27097 2.12042 4.17997C2.09543 3.90344 2.1283 3.62474 2.21692 3.3616C2.30555 3.09846 2.44799 2.85666 2.63519 2.6516C2.82238 2.44653 3.05023 2.28268 3.30421 2.1705C3.5582 2.05831 3.83276 2.00024 4.11042 1.99997H7.11042C7.59573 1.9952 8.06621 2.16705 8.43418 2.48351C8.80215 2.79996 9.0425 3.23942 9.11042 3.71997C9.23704 4.68004 9.47187 5.6227 9.81042 6.52997C9.94497 6.8879 9.97408 7.27689 9.89433 7.65086C9.81457 8.02482 9.62928 8.36809 9.36042 8.63998L8.09042 9.90997C9.51398 12.4135 11.5869 14.4864 14.0904 15.91L15.3604 14.64C15.6323 14.3711 15.9756 14.1858 16.3495 14.1061C16.7235 14.0263 17.1125 14.0554 17.4704 14.19C18.3777 14.5285 19.3204 14.7634 20.2804 14.89C20.7662 14.9585 21.2098 15.2032 21.527 15.5775C21.8441 15.9518 22.0126 16.4296 22.0004 16.92Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Phone",
    lines: ["+91 98765 43210", "+91 98765 43211"],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Email",
    lines: ["info@vihara.homes", "bookings@vihara.homes"],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6V12L16 14"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
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
      <section className="py-20 bg-[#F5F1EA]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 ">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 ">
            {/* Left: contact cards */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((c) => (
                <div key={c.title} className="bg-white p-5">
                  <div className="flex items-center gap-3 mb-3 rounded-[16px]">
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
                      className="text-m text-[#354E41] leading-relaxed font-normal "
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
                className="font-semibold text-[#354E41] mb-6"
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
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-16 rounded-[16px]">
          <h2
            className="font-semibold text-[#354E41] mb-2"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(22px, 2.8vw, 34px)",
            }}
          >
            Find Us
          </h2>
          <p className="text-M text-[#354E41] italic mb-8">
            Located in the peaceful outskirts of Hyderabad
          </p>
          <div className="bg-[#F5F1EA] border border-[#ddd] rounded-2xl overflow-hidden">
            {/* Google Map */}
            <div className="h-72 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.9302723300193!2d78.3014963749289!3d17.142305083703626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbb949e12a8061%3A0x2c255e90dcae432e!2sVihara%20The%20Courtyard!5e1!3m2!1sen!2sin!4v1772238086510!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Location Info Below Map */}
            <div className="text-center py-6 px-4">
              <p className="text-sm text-[#2D4A3E] font-medium">
                Vihara – The Courtyard
              </p>
              <p className="text-xs text-[#777] mt-1">
                Hyderabad Outskirts, Telangana
              </p>

              <a
                href="https://maps.app.goo.gl/rD45xAr26b9vtqAj6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs text-[#2D4A3E] underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#2D4A3E]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2
            className="font-normal text-white mb-10 text-center"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(22px, 2.8vw, 34px)",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto flex flex-col gap-2">
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
