const stayPlans = [
  {
    label: 'UP TO 10 GUESTS',
    weekday: '₹40,000',
    weekend: '₹48,000',
    tagline: 'Ideal for family getaways and intimate gatherings',
  },
  {
    label: 'UP TO 12 GUESTS',
    weekday: '₹44,000',
    weekend: '₹53,000',
    tagline: 'Perfect for pre-wedding stays and creative escapes',
  },
  {
    label: 'UP TO 15 GUESTS',
    weekday: '₹50,000',
    weekend: '₹60,000',
    tagline: 'Ideal for extended family celebrations',
  },
];

export default function StaysPricing() {
  return (
    <section id="booking" className="py-24 bg-[#354E41]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-white mb-3">
            Stays at Vihara
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#DCD7CD] text-xl opacity-80">
            Experience the property as a private courtyard retreat
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stayPlans.map((plan) => (
            <div
              key={plan.label}
              className="bg-[rgba(255,255,255,0.07)] border border-[rgba(217,181,157,0.25)] rounded-sm p-7 hover:bg-[rgba(217,181,157,0.1)] transition-colors duration-300"
            >
              <p className="text-[#D9B59D] font-['Jost'] text-xs tracking-[0.2em] uppercase mb-5">
                {plan.label}
              </p>
              <div className="space-y-2 mb-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[#DCD7CD] font-['Jost'] text-sm">Weekday:</span>
                  <span className="text-white font-['Cormorant_Garamond'] text-3xl font-light">{plan.weekday}</span>
                </div>
                <div className="h-px bg-[rgba(255,255,255,0.1)]" />
                <div className="flex items-baseline justify-between">
                  <span className="text-[#DCD7CD] font-['Jost'] text-sm">Weekend:</span>
                  <span className="text-white font-['Cormorant_Garamond'] text-3xl font-light">{plan.weekend}</span>
                </div>
              </div>
              <p className="text-[#DCD7CD] font-['Jost'] text-xs opacity-60 leading-relaxed">{plan.tagline}</p>
            </div>
          ))}
        </div>

        {/* Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <InfoChip label="Check-in" value="2:00 PM" sub="Check-out: 11:00 AM" />
          <InfoChip label="Security Deposit" value="₹10,000" sub="Refundable" />
          <InfoChip label="Additional Guests" value="₹1,500" sub="Weekday · ₹2,000 Weekend" />
        </div>

        {/* Tagline + CTA */}
        <div className="text-center">
          <p className="font-['Cormorant_Garamond'] italic text-[#DCD7CD] text-lg mb-6">
            Stay a little longer. The courtyard changes with time.
          </p>
          <a
            href="#booking"
            className="inline-block px-10 py-3.5 border border-[#D9B59D] text-[#D9B59D] font-['Jost'] text-sm tracking-widest uppercase hover:bg-[#D9B59D] hover:text-[#354E41] transition-all duration-300 rounded-sm"
          >
            Check Availability →
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoChip({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(217,181,157,0.15)] rounded-sm px-6 py-5 text-center">
      <p className="text-[#D9B59D] font-['Jost'] text-xs tracking-widest uppercase mb-1">{label}</p>
      <p className="text-white font-['Cormorant_Garamond'] text-3xl">{value}</p>
      <p className="text-[#DCD7CD] font-['Jost'] text-xs opacity-60 mt-1">{sub}</p>
    </div>
  );
}
