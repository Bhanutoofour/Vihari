const amenities = [
  { icon: '🛏', label: 'Five A/C Bedrooms' },
  { icon: '🏊', label: 'Swimming Pool' },
  { icon: '🎮', label: 'Indoor Games' },
  { icon: '⚡', label: 'Power Backup' },
  { icon: '👨‍🍳', label: 'Caretaker Assistance' },
  { icon: '🍽', label: 'Dining Areas' },
  { icon: '🏡', label: 'Courtyard Access' },
  { icon: '🚗', label: 'Parking' },
];

export default function Experience() {
  return (
    <section id="amenities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#354E41] mb-4">
            The Vihara Experience
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#354E41] text-xl opacity-70">
            Intimate gatherings and milestone moments unfold differently when the setting is personal.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FeatureCard
            title="Open Sky Courtyard"
            description="A serene swimming pool surrounded by terracotta walls and ambient lighting"
            imageBg="bg-[#354E41]"
            bgImage="/courtyard.jpg"
          />
          <FeatureCard
            title="Modern Architecture"
            description="Contemporary design with traditional terracotta elements and expansive glass"
            imageBg="bg-[#4a6655]"
            bgImage="/architecture.jpg"
          />
        </div>

        {/* Amenities Grid */}
        <div className="bg-[#f7f5f2] rounded-sm px-8 py-10">
          <h3 className="font-['Cormorant_Garamond'] text-3xl text-[#354E41] text-center mb-8">
            Included With Your Stay
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4">
            {amenities.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <span className="text-2xl">{item.icon}</span>
                <p className="font-['Jost'] text-xs text-[#354E41] font-medium tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  imageBg,
  bgImage,
}: {
  title: string;
  description: string;
  imageBg: string;
  bgImage: string;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-sm group">
      <div
        className={`absolute inset-0 ${imageBg} bg-cover bg-center transition-transform duration-700 group-hover:scale-105`}
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 30%, rgba(53,78,65,0.92) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white font-['Cormorant_Garamond'] text-2xl mb-1">{title}</h3>
        <p className="text-[#DCD7CD] font-['Jost'] text-sm opacity-90">{description}</p>
      </div>
    </div>
  );
}
