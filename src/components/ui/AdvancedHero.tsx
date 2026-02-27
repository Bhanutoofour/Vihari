interface AdvancedHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  align?: "center" | "left";
}

export default function AdvancedHero({
  title,
  subtitle,
  backgroundImage,
  align = "center",
}: AdvancedHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Overlay — Same tone as Home */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#354E41]/90 via-[#354E41]/60 to-black/40" />

      {/* Content */}
      <div
        className={`relative z-10 w-full px-6 md:px-14 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white mb-4 font-bold tracking-wide animate-fadeInUp">
            {title}
          </h1>

          {subtitle && (
            <p className="text-[#D9B59D] italic text-lg md:text-xl animate-fadeInUp delay-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
