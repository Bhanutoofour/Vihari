"use client";
import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      />
      {/* Dark green gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(53,78,65,0.88) 0%, rgba(53,78,65,0.55) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-3xl mx-auto">
        <p
          className="text-[#D9B59D] font-['Jost'] text-sm tracking-[0.25em] uppercase mb-3 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          Welcome to
        </p>

        <div className="flex justify-center">
          <Image
            src="/vihara-heading.png"
            alt="Vihara"
            width={300}
            height={100}
            className="w-[280px] md:w-[450px] lg:w-[600px] h-auto object-contain"
            priority
          />
        </div>
        <h2
          className="text-[#D9B59D] font-['Cormorant_Garamond'] font-semibold text-2xl md:text-3xl tracking-[0.2em] uppercase mb-4 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          The Courtyard
        </h2>
        <p
          className="text-white font-['Cormorant_Garamond'] italic text-xl md:text-2xl mb-2 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
        >
          A Courtyard That Brings People Together
        </p>
        <p
          className="text-[#DCD7CD] font-['Jost'] text-sm tracking-widest italic mb-10 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
        >
          Not a farmhouse. Not a resort!
        </p>
        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}
        >
          <Link
            href="#booking"
            className="px-8 py-3 bg-[#D9B59D] text-[#354E41] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-white transition-colors duration-300 rounded-sm"
          >
            Reserve Your Stay
          </Link>
          <a
            href="/brochure.pdf"
            download
            className="px-8 py-3 border border-white text-white font-['Jost'] font-medium text-sm tracking-widest uppercase hover:bg-white hover:text-[#354E41] transition-all duration-300 rounded-sm flex items-center gap-2 justify-center"
          >
            Download Brochure
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom info bar */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-[rgba(53,78,65,0.85)] border-t border-[rgba(217,181,157,0.3)] opacity-0 animate-fadeInUp"
        style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
          <InfoBadge
            icon={<PinIcon />}
            label="Kothur"
            sub="Near Hyderabad International Airport"
          />
          <div className="hidden sm:block w-px h-8 bg-[rgba(217,181,157,0.3)]" />
          <InfoBadge
            icon={<GuestIcon />}
            label="Up to 200 Guests"
            sub="For Events &amp; Celebrations"
          />
          <div className="hidden sm:block w-px h-8 bg-[rgba(217,181,157,0.3)]" />
          <InfoBadge
            icon={<StarIcon />}
            label="Private Events"
            sub="One Celebration at a Time"
          />
        </div>
      </div>
    </section>
  );
}

function InfoBadge({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#D9B59D]">{icon}</span>
      <div className="text-left">
        <p className="text-white font-['Jost'] text-sm font-medium">{label}</p>
        <p className="text-[#DCD7CD] font-['Jost'] text-xs opacity-80">{sub}</p>
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GuestIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
