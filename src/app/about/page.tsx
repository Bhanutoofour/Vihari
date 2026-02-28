import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Vihara - The Courtyard",
  description: "Learn about Vihara - The Courtyard.",
};

const HERO_IMG = "/about1.webp";
const IMG_BLUEPRINT = "about.png";
const IMG_WATERFALL = "interior.png";
const IMG_GARDEN = "opensk.png";
const IMG_POOL = "ramb.png";
const IMG_YOGA = "ac.webp";

const amenities = [
  "Traditional Kerala Architecture",
  "Swimming Pool & Waterfall",
  "Yoga & Meditation Spaces",
  "Wedding & Event Facilities",
  "Tropical Gardens",
  "Modern Luxury Rooms",
  "Outdoor Dining Areas",
  "Nature Trails & Bird Watching",
  "Spa & Wellness Services",
  "Coconut Grove",
  "City Outskirts Views",
  "Cultural Activities",
];

export default function AboutPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ height: "60vh", minHeight: "360px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4">
          <h1
            className="text-4xl md:text-6xl text-white mb-4"
            style={{
              fontWeight: 700,
              letterSpacing: "0.02em",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            About Vihara
          </h1>
          <p className="text-xl text-[#DCD7CD]">The Courtyard of Tranquility</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 bg-[#DCD7CD]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="w-48 h-32 overflow-hidden mb-6 opacity-80 rounded-[16px]">
              <img
                src="/about.png"
                alt="blueprint"
                className="w-full h-full object-fullr"
              />
            </div>
            <h2 className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-6xl font-light text-[#354E41] mb-4">
              Our Story
            </h2>
            <p className="text-lg text-[#354E41]/80 mb-4 leading-relaxed">
              Vihara, meaning "dwelling" in Sanskrit, embodies our vision of
              creating a serene haven where tradition meets tranquility.
              Inspired by the architectural beauty of Kerala and the peaceful
              outskirts of Hyderabad, we have crafted a unique retreat that
              celebrates nature and heritage.
            </p>
            <p className="text-lg text-[#354E41]/80 mb-4 leading-relaxed">
              Our property features intricately designed elements reminiscent of
              Kerala's structural aesthetics, seamlessly blended with the serene
              backdrop of Hyderabad's natural landscape. Each corner of Vihara
              tells a story — from the cascading waterfall to the traditional
              wedding pavilion, from the meditation spaces to the lush coconut
              groves.
            </p>
            <p className="text-lg text-[#354E41]/80 leading-relaxed">
              Whether you seek solitude for reflection, quality time with loved
              ones, or a venue for life's special moments, Vihara invites you to
              unwind and reconnect with nature.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[IMG_WATERFALL, IMG_GARDEN, IMG_POOL, IMG_YOGA].map((src, i) => (
              <div
                key={i}
                className="aspect-[4/3] overflow-hidden rounded-[16px]"
              >
                <img
                  src={src}
                  alt={`vihara-${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-6xl font-light text-[#354E41] mb-3">
            Our Values
          </h2>
          <p
            className="text-lg text-[#354E41]/80 mb-12 max-w-3xl mx-auto italic"
            style={{ fontFamily: "serif" }}
          >
            The principles that guide us in creating your perfect staycation
            experience
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* 1 — Authentic Experience */}
            <div className="bg-[#DCD7CD]/40 p-6 flex flex-col rounded-[16px] items-center text-center">
              <div
                style={{
                  display: "flex",
                  width: 64,
                  height: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "9999px",
                  background: "#354E41",
                  flexShrink: 0,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="27"
                  viewBox="0 0 30 27"
                  fill="none"
                >
                  <path
                    d="M24 16C25.9867 14.0534 28 11.72 28 8.66671C28 6.72179 27.2274 4.85652 25.8522 3.48126C24.4769 2.10599 22.6116 1.33337 20.6667 1.33337C18.32 1.33337 16.6667 2.00004 14.6667 4.00004C12.6667 2.00004 11.0134 1.33337 8.66671 1.33337C6.72179 1.33337 4.85652 2.10599 3.48126 3.48126C2.10599 4.85652 1.33337 6.72179 1.33337 8.66671C1.33337 11.7334 3.33337 14.0667 5.33337 16L14.6667 25.3334L24 16Z"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-[#354E41] mt-5 mb-2">
                Authentic Experience
              </h3>
              <p className="text-[#354E41]/70 leading-relaxed text-sm">
                We preserve Kerala's traditional charm while offering modern
                comfort
              </p>
            </div>

            {/* 2 — Sustainable Living */}
            <div className="bg-[#DCD7CD]/40 p-6 flex flex-col items-center rounded-[16px] text-center">
              <div
                style={{
                  display: "flex",
                  width: 64,
                  height: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "9999px",
                  background: "#354E41",
                  flexShrink: 0,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M14.6667 26.6666C12.3254 26.6737 10.067 25.8006 8.33937 24.2205C6.61172 22.6404 5.54103 20.4687 5.33966 18.1361C5.13829 15.8035 5.82093 13.4804 7.25221 11.6276C8.68349 9.77479 10.7589 8.52756 13.0667 8.13329C20.6667 6.66663 22.6667 5.97329 25.3333 2.66663C26.6667 5.33329 28 8.23996 28 13.3333C28 20.6666 21.6267 26.6666 14.6667 26.6666Z"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.66663 28C2.66663 24 5.13329 20.8533 9.43996 20C12.6666 19.36 16 17.3333 17.3333 16"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-[#354E41] mt-5 mb-2">
                Sustainable Living
              </h3>
              <p className="text-[#354E41]/70 leading-relaxed text-sm">
                Eco-friendly practices that respect and nurture our natural
                surroundings
              </p>
            </div>

            {/* 3 — Warm Hospitality */}
            <div className="bg-[#DCD7CD]/40 p-6 flex flex-col items-center rounded-[16px] text-center">
              <div
                style={{
                  display: "flex",
                  width: 64,
                  height: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "9999px",
                  background: "#354E41",
                  flexShrink: 0,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M21.3334 28V25.3333C21.3334 23.9188 20.7715 22.5623 19.7713 21.5621C18.7711 20.5619 17.4145 20 16 20H8.00002C6.58553 20 5.22898 20.5619 4.22878 21.5621C3.22859 22.5623 2.66669 23.9188 2.66669 25.3333V28"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14.6667C14.9455 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9455 4 12 4C9.0545 4 6.66669 6.38781 6.66669 9.33333C6.66669 12.2789 9.0545 14.6667 12 14.6667Z"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29.3333 28V25.3333C29.3324 24.1516 28.9391 23.0037 28.2151 22.0698C27.4911 21.1358 26.4775 20.4688 25.3333 20.1733"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.3333 4.17334C22.4805 4.46707 23.4974 5.13427 24.2235 6.06975C24.9496 7.00523 25.3438 8.15578 25.3438 9.34001C25.3438 10.5242 24.9496 11.6748 24.2235 12.6103C23.4974 13.5457 22.4805 14.2129 21.3333 14.5067"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-[#354E41] mt-5 mb-2">
                Warm Hospitality
              </h3>
              <p className="text-[#354E41]/70 leading-relaxed text-sm">
                Personalized service that makes every guest feel at home
              </p>
            </div>

            {/* 4 — Quality Excellence */}
            <div className="bg-[#DCD7CD]/40 p-6 flex flex-col items-center rounded-[16px] text-center">
              <div
                style={{
                  display: "flex",
                  width: 64,
                  height: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "9999px",
                  background: "#354E41",
                  flexShrink: 0,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M20.636 17.1866L22.656 28.5546C22.6786 28.6885 22.6598 28.8261 22.6021 28.949C22.5445 29.0719 22.4506 29.1742 22.3332 29.2424C22.2158 29.3105 22.0804 29.3412 21.945 29.3303C21.8097 29.3193 21.681 29.2674 21.576 29.1813L16.8026 25.5986C16.5722 25.4265 16.2923 25.3335 16.0046 25.3335C15.717 25.3335 15.4371 25.4265 15.2066 25.5986L10.4253 29.18C10.3204 29.2659 10.1918 29.3178 10.0566 29.3287C9.92148 29.3396 9.7862 29.3091 9.66886 29.2411C9.55151 29.1732 9.45767 29.0711 9.39987 28.9484C9.34206 28.8258 9.32302 28.6884 9.34531 28.5546L11.364 17.1866"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 18.6666C20.4183 18.6666 24 15.0849 24 10.6666C24 6.24835 20.4183 2.66663 16 2.66663C11.5817 2.66663 8 6.24835 8 10.6666C8 15.0849 11.5817 18.6666 16 18.6666Z"
                    stroke="#D9B59D"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-[#354E41] mt-5 mb-2">
                Quality Excellence
              </h3>
              <p className="text-[#354E41]/70 leading-relaxed text-sm">
                Commitment to the highest standards in accommodation and
                amenities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES & FEATURES */}
      <section className="py-16 bg-[#354E41] text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-6xl font-light text-white mb-3">
            Amenities &amp; Features
          </h2>
          <p
            className="text-lg text-white/70 mb-12 italic"
            style={{ fontFamily: "serif" }}
          >
            Everything you need for a comfortable and memorable stay
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {amenities.map((a) => (
              <div
                key={a}
                className="border border-white/20 rounded-[16px] text-[#DCD7CD] py-3 px-4 hover:bg-white/10 hover:border-white/40 transition-all duration-200 text-sm"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR LOCATION */}
      <section className="py-16 bg-[#DCD7CD] text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-6xl font-light text-[#354E41] mb-3">
            Our Location
          </h2>
          <p
            className="text-lg text-[#354E41]/80 mb-10 italic"
            style={{ fontFamily: "serif" }}
          >
            Nestled in the peaceful outskirts of Hyderabad, easily accessible
            yet far from the city's chaos
          </p>
          <div className="max-w-2xl mx-auto bg-[#354E41] px-12 py-10 rounded-[16px] text-center">
            <p className="text-xl text-white mb-2">Vihara - The Courtyard</p>
            <p className="text-lg text-[#DCD7CD]/80 mb-2">
              Hyderabad Outskirts, Telangana
            </p>
            <p className="text-sm text-[#DCD7CD]/60 italic">
              Just 45 minutes from the city center, surrounded by nature
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
