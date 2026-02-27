interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  align?: "center" | "left";
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  align = "center",
}: PageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[420px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div
        className={`relative z-10 w-full px-6 md:px-14 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white mb-4 animate-fadeInUp">{title}</h1>

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
