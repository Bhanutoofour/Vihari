export default function About() {
  return (
    <section id="about" className="py-24 bg-[#DCD7CD]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-[#D9B59D] font-['Jost'] font-bold text-xs tracking-[0.5em] uppercase mb-4">
              A Private Courtyard Estate
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#354E41] leading-tight mb-6">
              Designed for intimate celebrations, gatherings and slow stays.
            </h2>
            <p className="font-['Jost'] text-[#354E41] text-base leading-relaxed mb-4 opacity-80">
              Built with terracotta walls, open skies and calm architecture,
              Vihara invites people to celebrate, pause and reconnect.
            </p>
            <p className="font-['Cormorant_Garamond'] italic text-[#354E41] text-xl mb-8">
              Where architecture, light and people come together.
            </p>
            <a
              href="about"
              className="inline-flex items-center gap-2 text-[#354E41] font-['Jost'] text-sm font-medium tracking-widest uppercase border-b border-[#354E41] pb-1 hover:text-[#D9B59D] hover:border-[#D9B59D] transition-colors duration-300"
            >
              Learn More About Vihara
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#354E41"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Image stack */}
          <div className="relative">
            {/* Main image */}
            <div className="relative w-full aspect-[4/5] bg-[#354E41] rounded-[16px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/about-main.jpg')" }}
              />
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[rgba(53,78,65,0.9)] backdrop-blur-sm px-5 py-4 rounded-sm">
                <p className="text-[#D9B59D] font-['Jost'] text-xs tracking-widest uppercase mb-1">
                  Experience the property as a
                </p>
                <p className="text-white font-['Cormorant_Garamond'] text-2xl italic">
                  Private Courtyard Retreat
                </p>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-[#D9B59D] opacity-40 rounded-sm pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#D9B59D] opacity-10 rounded-sm pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
