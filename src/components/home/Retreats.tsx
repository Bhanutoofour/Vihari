export default function Retreats() {
  return (
    <section id="activities" className="py-28 bg-[#DCD7CD]">
      {/* Narrow Heading Container */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2 className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-6xl font-light text-[#354E41] mb-4">
          The Courtyard Retreat Series
        </h2>

        <p className="font-['Cormorant_Garamond'] italic text-[#354E41]/80 text-xl mb-4">
          The next retreat may be the one you've been waiting for.
        </p>

        <p className="text-[#354E41]/70">
          Vihara will periodically open its doors for thoughtfully curated
          retreats.
        </p>
      </div>

      {/* Wide Green Container */}
      <div className="max-w-7xl mx-auto px-2">
        <div className="bg-[#354E41] rounded-[16px] px-4 md:px-16 py-16 text-center">
          <p className="font-['Cormorant_Garamond'] italic text-[#DCD7CD] text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
            From wellness and creativity to slow-living experiences, each
            retreat is designed to bring people together in a calm and inspiring
            setting.
          </p>

          <a
            href="#activities"
            className="inline-flex items-center gap-3 bg-[#D9B59D] text-[#354E41] px-10 py-4 rounded-xl font-medium hover:bg-[#e6c6b1] transition-all duration-300"
          >
            Explore Retreats & Activities
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
