export default function Retreats() {
  return (
    <section id="activities" className="py-24 bg-[#DCD7CD]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-[#D9B59D] font-['Jost'] text-xs tracking-[0.3em] uppercase mb-4">
          Curated Experiences
        </p>
        <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#354E41] mb-4">
          The Courtyard Retreat Series
        </h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#354E41] text-2xl mb-8">
          The next retreat may be the one you've been waiting for.
        </p>

        {/* Description card */}
        <div className="bg-[rgba(53,78,65,0.08)] border border-[rgba(53,78,65,0.15)] rounded-sm px-8 py-10 mb-10 max-w-3xl mx-auto">
          <p className="text-[#354E41] font-['Jost'] text-sm leading-relaxed mb-4">
            Vihara will periodically open its doors for thoughtfully curated retreats.
          </p>
          <p className="font-['Cormorant_Garamond'] italic text-[#354E41] text-xl leading-relaxed">
            From wellness and creativity to slow-living experiences, each retreat is designed to bring people together in a calm and inspiring setting.
          </p>
        </div>

        <a
          href="#activities"
          className="inline-flex items-center gap-2 px-10 py-3.5 bg-[#354E41] text-white font-['Jost'] text-sm tracking-widest uppercase hover:bg-[#2a3e33] transition-colors duration-300 rounded-sm"
        >
          Explore Retreats &amp; Activities
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
