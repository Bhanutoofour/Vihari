export default function ContactCTA() {
  return (
    <section id="contact" className="py-24 bg-[#354E41]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-[#D9B59D] font-['Jost'] text-xs tracking-[0.3em] uppercase mb-4">
          Reserve Your Moment
        </p>
        <h2 className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-6xl font-light text-white mb-4">
          Reserve Your Moment at The Courtyard
        </h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#DCD7CD] text-xl mb-12 opacity-80">
          Private events. One celebration at a time.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <ContactCard
            icon={<PhoneIcon />}
            label="Call Us"
            value="+91 9032169777"
            href="tel:+919032169777"
          />
          <ContactCard
            icon={<MailIcon />}
            label="Email Us"
            value="info@vihara.homes"
            href="mailto:info@vihara.homes"
            small
          />
          <ContactCard
            icon={<InstagramIcon />}
            label="Follow Us"
            value="@viharathecourtyard"
            href="https://instagram.com/viharathecourtyard"
          />
        </div>

        <a
          href="#contact"
          className="inline-block px-10 py-3.5 border border-[#D9B59D] text-[#D9B59D] font-['Jost'] text-sm tracking-widest uppercase hover:bg-[#D9B59D] hover:text-[#354E41] transition-all duration-300 rounded-[16px]"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(217,181,157,0.1)] border border-[rgba(217,181,157,0.25)] rounded-[16px] px-6 py-7 flex flex-col items-center gap-3 hover:bg-[rgba(217,181,157,0.2)] transition-colors duration-300 group"
    >
      <span className="text-[#D9B59D] group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <p className="text-[#DCD7CD] font-['Jost'] text-xs tracking-widest uppercase opacity-70">
        {label}
      </p>
      <p
        className={`text-white font-['Jost'] font-medium text-center leading-tight ${small ? "text-sm" : "text-base"}`}
      >
        {value}
      </p>
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.62 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
