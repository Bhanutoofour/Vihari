"use client";
import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/919032169777?text=Hi%20Vihara!%20I%27d%20like%20to%20know%20more%20about%20bookings."
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      aria-label="Chat with us on WhatsApp"
    >
   
      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:bg-[#20BA5A] transition-colors duration-300 hover:scale-110 transform">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
        >
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.824.738 5.476 2.027 7.785L0 32l8.469-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.538a13.5 13.5 0 0 1-6.88-1.884l-.494-.293-5.026 1.188 1.224-4.895-.322-.504A13.46 13.46 0 0 1 2.462 16C2.462 8.514 8.514 2.462 16 2.462S29.538 8.514 29.538 16 23.486 29.538 16 29.538zm7.406-10.117c-.406-.203-2.4-1.184-2.772-1.319-.372-.135-.643-.203-.913.203-.27.406-1.048 1.319-1.285 1.59-.237.27-.474.304-.88.101-.406-.203-1.714-.632-3.265-2.015-1.207-1.077-2.022-2.407-2.259-2.813-.237-.406-.025-.625.178-.827.182-.182.406-.474.609-.711.203-.237.27-.406.406-.677.135-.27.068-.507-.034-.71-.101-.203-.913-2.2-1.25-3.012-.329-.79-.663-.683-.913-.695l-.778-.014c-.27 0-.71.101-1.082.507-.372.406-1.42 1.387-1.42 3.384s1.454 3.927 1.657 4.198c.203.27 2.862 4.37 6.933 6.126.969.418 1.725.668 2.314.855.972.309 1.857.265 2.556.161.78-.116 2.4-.981 2.738-1.928.338-.947.338-1.76.237-1.928-.1-.168-.372-.27-.778-.473z" />
        </svg>
      </div>
    </a>
  );
}
