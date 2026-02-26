"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Activities", href: "#activities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Booking", href: "#booking" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setActive(window.location.hash || "#home");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#354E41] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center">
          <Image
            src="/vihara-logo.svg"
            alt="Vihara The Courtyard"
            width={120}
            height={60}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              <Link
                href={link.href}
                className={`text-sm tracking-wide font-medium transition-colors duration-300 ${
                  active === link.href
                    ? "text-[#D9B59D]"
                    : "text-white hover:text-[#D9B59D]"
                }`}
              >
                {link.label}
              </Link>

              {/* Active underline */}
              {active === link.href && (
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#D9B59D]" />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 bg-[#354E41]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  active === link.href
                    ? "text-[#D9B59D]"
                    : "text-white hover:text-[#D9B59D]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
