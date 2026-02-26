import Image from 'next/image';
import Link from 'next/link';

const quickLinks = ['Home', 'About Us', 'Activities', 'Gallery', 'Booking', 'Contact'];

export default function Footer() {
  return (
    <footer className="bg-[#1e2e26] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image src="/vihara-logo.svg" alt="Vihara" width={110} height={55} className="mb-4 opacity-90" />
            <p className="font-['Jost'] text-sm text-[#DCD7CD] leading-relaxed opacity-70 max-w-xs">
              A tranquil retreat amidst nature, blending Kerala's traditional charm with modern comfort. Experience serenity at Vihara - The Courtyard.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-[#D9B59D] mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="font-['Jost'] text-sm text-[#DCD7CD] opacity-70 hover:opacity-100 hover:text-[#D9B59D] transition-all duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-[#D9B59D] mb-5">Contact</p>
            <div className="space-y-3">
              <p className="font-['Jost'] text-sm text-[#DCD7CD] opacity-70">
                Vihara, Kothur<br />Near Hyderabad International Airport
              </p>
              <p className="font-['Jost'] text-sm text-[#DCD7CD] opacity-70">+91 9032169777</p>
              <p className="font-['Jost'] text-sm text-[#DCD7CD] opacity-70">viharahospitality@gmail.com</p>
              <div className="flex gap-4 pt-2">
                <a href="https://instagram.com/viharathecourtyard" target="_blank" rel="noopener noreferrer"
                  className="text-[#DCD7CD] opacity-60 hover:opacity-100 hover:text-[#D9B59D] transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.1)] pt-8 text-center">
          <p className="font-['Jost'] text-xs text-[#DCD7CD] opacity-40">
            © 2026 Vihara - The Courtyard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
