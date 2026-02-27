"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden "
    >
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center scale-105 bg-no-repeat bg-[url('/hero-bg.jpg')]" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#354E41]/90 via-[#354E41]/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-3xl mx-auto">
        <p className="text-[#D9B59D] text-sm tracking-[0.25em] uppercase mb-3 animate-fadeInUp delay-1">
          Welcome to
        </p>

        <div className="flex justify-center animate-fadeInUp delay-2">
          <Image
            src="/vihara-heading.png"
            alt="Vihara"
            width={450}
            height={120}
            className="w-[220px] md:w-[340px] lg:w-[450px] h-auto"
            priority
          />
        </div>

        <h2 className="text-[#D9B59D] font-semibold text-2xl md:text-3xl tracking-[0.2em] uppercase mb-4 animate-fadeInUp delay-3">
          The Courtyard
        </h2>

        <p className="text-white italic text-xl md:text-2xl mb-2 animate-fadeInUp delay-4">
          A Courtyard That Brings People Together
        </p>

        <p className="text-[#DCD7CD] text-sm tracking-widest italic mb-10 animate-fadeInUp delay-4">
          Not a farmhouse. Not a resort!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-4 ">
          <Button href="#booking">Reserve Your Stay</Button>

          <a
            href="/brochure.pdf"
            download
            className="px-8 py-3 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-[#354E41] transition-all duration-300 rounded-[16px] flex items-center gap-2 justify-center"
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

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#354E41]/90 border-t border-[#D9B59D]/30 animate-fadeInUp delay-4">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
          <InfoBadge
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M23.3333 11.6666C23.3333 17.4918 16.8712 23.5585 14.7012 25.4321C14.499 25.5842 14.2529 25.6664 14 25.6664C13.7471 25.6664 13.501 25.5842 13.2988 25.4321C11.1288 23.5585 4.66667 17.4918 4.66667 11.6666C4.66667 9.19129 5.65 6.81732 7.40034 5.06698C9.15068 3.31664 11.5247 2.33331 14 2.33331C16.4754 2.33331 18.8493 3.31664 20.5997 5.06698C22.35 6.81732 23.3333 9.19129 23.3333 11.6666Z"
                  stroke="#D9B59D"
                  strokeWidth="2.33333"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 15.1667C15.933 15.1667 17.5 13.5997 17.5 11.6667C17.5 9.73369 15.933 8.16669 14 8.16669C12.067 8.16669 10.5 9.73369 10.5 11.6667C10.5 13.5997 12.067 15.1667 14 15.1667Z"
                  stroke="#D9B59D"
                  strokeWidth="2.33333"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            label="Kothur"
            sub="Near Hyderabad International Airport"
          />

          <Divider />

          <InfoBadge
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M18.6666 24.5V22.1667C18.6666 20.929 18.175 19.742 17.2998 18.8668C16.4246 17.9917 15.2377 17.5 14 17.5H6.99998C5.7623 17.5 4.57532 17.9917 3.70015 18.8668C2.82498 19.742 2.33331 20.929 2.33331 22.1667V24.5"
                  stroke="#D9B59D"
                  stroke-width="2.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5 12.8333C13.0773 12.8333 15.1666 10.744 15.1666 8.16667C15.1666 5.58934 13.0773 3.5 10.5 3.5C7.92265 3.5 5.83331 5.58934 5.83331 8.16667C5.83331 10.744 7.92265 12.8333 10.5 12.8333Z"
                  stroke="#D9B59D"
                  stroke-width="2.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M25.6667 24.5V22.1667C25.6659 21.1327 25.3218 20.1282 24.6883 19.311C24.0548 18.4938 23.1678 17.9102 22.1667 17.6517"
                  stroke="#D9B59D"
                  stroke-width="2.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.6667 3.65167C19.6705 3.90869 20.5602 4.49249 21.1956 5.31103C21.831 6.12958 22.1758 7.13631 22.1758 8.17251C22.1758 9.2087 21.831 10.2154 21.1956 11.034C20.5602 11.8525 19.6705 12.4363 18.6667 12.6933"
                  stroke="#D9B59D"
                  stroke-width="2.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            label="Up to 200 Guests"
            sub="For Events & Celebrations"
          />

          <Divider />

          <InfoBadge
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M9.33331 2.33331V6.99998"
                  stroke="#D9B59D"
                  stroke-width="2.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.6667 2.33331V6.99998"
                  stroke="#D9B59D"
                  stroke-width="2.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.1667 4.66669H5.83333C4.54467 4.66669 3.5 5.71136 3.5 7.00002V23.3334C3.5 24.622 4.54467 25.6667 5.83333 25.6667H22.1667C23.4553 25.6667 24.5 24.622 24.5 23.3334V7.00002C24.5 5.71136 23.4553 4.66669 22.1667 4.66669Z"
                  stroke="#D9B59D"
                  stroke-width="2.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 11.6667H24.5"
                  stroke="#D9B59D"
                  stroke-width="2.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            label="Private Events"
            sub="One Celebration at a Time"
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- */
/* Reusable Pieces */
/* -------------------------------- */

function Divider() {
  return <div className="hidden sm:block w-px h-8 bg-[#D9B59D]/30" />;
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
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left max-w-[260px]">
      <span className="text-[#D9B59D] flex-shrink-0">{icon}</span>
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-[#DCD7CD] text-xs opacity-80 leading-snug">{sub}</p>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* Icons */
/* -------------------------------- */

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
