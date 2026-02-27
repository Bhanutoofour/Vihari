import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities | Vihara - The Courtyard",
  description: "Discover endless ways to relax and rejuvenate at Vihara.",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&q=80";

const featured = [
  {
    icon: "💧",
    title: "Waterfall Experience",
    desc: "Enjoy the soothing sounds and refreshing mist of our natural waterfall. Perfect for meditation and relaxation.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    icon: "🧘",
    title: "Yoga & Meditation",
    desc: "Start your day with guided yoga sessions in serene natural surroundings. Find inner peace and rejuvenation.",
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
  },
  {
    icon: "🏊",
    title: "Swimming Pool",
    desc: "Take a refreshing dip in our infinity pool surrounded by coconut trees and tropical gardens.",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
  },
  {
    icon: "💒",
    title: "Wedding Activities",
    desc: "Celebrate your special moments in our traditional wedding pavilion. Perfect for ceremonies and celebrations.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    icon: "🌴",
    title: "Coconut Grove",
    desc: "Stroll through our lush coconut grove and experience the authentic tropical ambiance of Kerala.",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  },
  {
    icon: "🐦",
    title: "Sun & Bird Watching",
    desc: "Wake up to melodious bird songs and watch stunning sunrises. Perfect for nature enthusiasts and photographers.",
    img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
  },
  {
    icon: "🗺️",
    title: "City Outskirts Exploration",
    desc: "Explore the scenic beauty of Hyderabad's outskirts with guided nature walks and local village tours.",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  },
  {
    icon: "🚴",
    title: "Cycling & Nature Trails",
    desc: "Explore scenic cycling routes and nature trails around the property. Bicycles available on request.",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
  },
];

const moreActivities = [
  { name: "Spa & Wellness Treatments", status: "Available" },
  { name: "Traditional Kerala Cuisine", status: "Available" },
  { name: "Outdoor Dining Experiences", status: "Available" },
  { name: "Photography Sessions", status: "Available" },
  { name: "Cultural Performances", status: "On Request" },
  { name: "Bonfire Evenings", status: "Available" },
  { name: "Stargazing", status: "Available" },
  { name: "Cooking Classes", status: "On Request" },
];

const dayPlan = [
  { time: "Morning", items: "Yoga, Bird Watching, Breakfast", icon: "🌅" },
  { time: "Afternoon", items: "Pool, Spa, Nature Trails", icon: "☀️" },
  { time: "Evening", items: "Bonfire, Stargazing, Dining", icon: "🌙" },
];

export default function ActivitiesPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ height: "52vh", minHeight: "300px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-[rgba(10,22,16,0.55)]" />
        <div className="relative z-10 px-4">
          <h1
            className="text-white font-normal mb-2 leading-tight"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(36px, 5vw, 64px)",
            }}
          >
            Activities
          </h1>
          <p
            className="text-white/75 italic"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(13px, 1.8vw, 18px)",
            }}
          >
            Discover endless ways to relax and rejuvenate
          </p>
        </div>
      </section>

      {/* FEATURED EXPERIENCES */}
      <section className="py-20 px-6 md:px-14 bg-[#F5F1EA]">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2
            className="font-normal text-[#1a1a1a] mb-2"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(24px, 3vw, 38px)",
            }}
          >
            Featured Experiences
          </h2>
          <p className="text-sm text-[#888] italic">
            From tranquil retreats to adventurous explorations, find your
            perfect activity
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map((a) => (
            <div
              key={a.title}
              className="bg-white overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#2D4A3E] flex items-center justify-center text-sm">
                  {a.icon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-medium text-[#1a1a1a] mb-2 text-sm">
                  {a.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed font-light">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MORE TO EXPLORE */}
      <section className="py-20 px-6 md:px-14 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2
            className="font-normal text-[#1a1a1a] mb-2"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(24px, 3vw, 38px)",
            }}
          >
            More To Explore
          </h2>
          <p className="text-sm text-[#888] italic">
            Additional activities and services available during your stay
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {moreActivities.map((a) => (
            <div
              key={a.name}
              className="bg-[#F5F1EA] p-5 hover:bg-[#EDE8DC] transition-colors"
            >
              <p className="text-sm font-medium text-[#1a1a1a] mb-1">
                {a.name}
              </p>
              <p className="text-xs text-[#2D4A3E] font-medium">{a.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLAN YOUR PERFECT DAY */}
      <section className="py-20 px-6 md:px-14 bg-[#2D4A3E] text-center">
        <h2
          className="font-normal text-white mb-2"
          style={{
            fontFamily: "var(--font-dm-serif, serif)",
            fontSize: "clamp(24px, 3vw, 38px)",
          }}
        >
          Plan Your Perfect Day
        </h2>
        <p className="text-sm text-white/60 italic mb-12 max-w-xl mx-auto">
          Our team is happy to help you plan your activities and experiences.
          Let us know your preferences and we'll create a personalized schedule
          for your stay.
        </p>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
          {dayPlan.map((d) => (
            <div
              key={d.time}
              className="bg-[rgba(255,255,255,0.08)] border border-white/10 p-8"
            >
              <div className="text-2xl mb-3">{d.icon}</div>
              <h3
                className="text-white font-normal mb-2"
                style={{
                  fontFamily: "var(--font-dm-serif, serif)",
                  fontSize: "20px",
                }}
              >
                {d.time}
              </h3>
              <p className="text-white/60 text-xs">{d.items}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
