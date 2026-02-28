"use client";
import { useState } from "react";
import Link from "next/link";

const HERO_IMG =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80";

const categories = [
  "All",
  "Property",
  "Nature",
  "Amenities",
  "Activities",
  "Rooms",
  "Dining",
  "Views",
];

const photos = [
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    cat: "Property",
    title: "The Estate",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    cat: "Nature",
    title: "Waterfall",
  },
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    cat: "Amenities",
    title: "Swimming Pool",
  },
  {
    src: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
    cat: "Activities",
    title: "Yoga Session",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    cat: "Rooms",
    title: "Bedroom Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    cat: "Property",
    title: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    cat: "Property",
    title: "Courtyard",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    cat: "Nature",
    title: "Coconut Grove",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    cat: "Views",
    title: "Scenic Views",
  },
  {
    src: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    cat: "Activities",
    title: "Cycling Trails",
  },
  {
    src: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80",
    cat: "Nature",
    title: "Bird Watching",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    cat: "Dining",
    title: "Event Space",
  },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    active === "All" ? photos : photos.filter((p) => p.cat === active);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ height: "52vh", minHeight: "320px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4">
          <h1
            className="text-4xl md:text-6xl text-white mb-4"
            style={{
              fontWeight: 700,
              letterSpacing: "0.02em",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Gallery
          </h1>
          <p className="text-xl text-[#DCD7CD]">
            Glimpses of serenity and natural beauty
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="bg-white border-b border-[#DCD7CD] sticky top-[60px] z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-10 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                active === cat
                  ? "bg-[#354E41] text-white"
                  : "bg-[#DCD7CD]/40 text-[#354E41] hover:bg-[#DCD7CD]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PHOTO GRID */}
      <section className="py-16 bg-[#DCD7CD] ">
        <div className="max-w-6xl mx-auto px-10 md:px-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {filtered.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(photo.src)}
                className="group relative overflow-hidden aspect-[4/3] focus:outline-none rounded-[16px]"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <div className="p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sm text-[#D9B59D] mb-1">{photo.cat}</p>
                    <p className="text-xl text-white">{photo.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-lg text-[#354E41]/60">
                No photos in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#354E41] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Experience It In Person
          </h2>
          <p className="text-lg text-[#DCD7CD] mb-10">
            These images only capture a glimpse of what awaits you at Vihara.
            Book your stay and create your own beautiful memories.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-[#D9B59D] text-[#354E41] px-10 py-4 rounded-[16px] text-lg font-medium no-underline hover:opacity-90 transition-opacity"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-8 text-white text-4xl leading-none hover:text-[#D9B59D] transition-colors"
          >
            ×
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
