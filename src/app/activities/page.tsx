import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities | Vihara - The Courtyard",
  description: "Discover endless ways to relax and rejuvenate at Vihara.",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&q=80";

const featured = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7 16.3C9.2 16.3 11 14.47 11 12.25C11 11.09 10.43 9.98999 9.29 9.05999C8.15 8.12999 7.29 6.74999 7 5.29999C6.71 6.74999 5.86 8.13999 4.71 9.05999C3.56 9.97999 3 11.1 3 12.25C3 14.47 4.8 16.3 7 16.3Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5598 6.60002C13.2476 5.50114 13.7351 4.28906 13.9998 3.02002C14.4998 5.52002 15.9998 7.92002 17.9998 9.52002C19.9998 11.12 20.9998 13.02 20.9998 15.02C21.0056 16.4023 20.6007 17.7552 19.8366 18.9071C19.0726 20.059 17.9837 20.9582 16.708 21.4905C15.4323 22.0229 14.0273 22.1644 12.671 21.8973C11.3148 21.6302 10.0684 20.9664 9.08984 19.99"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Waterfall Experience",
    desc: "Enjoy the soothing sounds and refreshing mist of our natural waterfall. Perfect for meditation and relaxation.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22 12H19.52C19.083 11.9991 18.6577 12.1413 18.3091 12.405C17.9606 12.6686 17.708 13.0392 17.59 13.46L15.24 21.82C15.2249 21.8719 15.1933 21.9175 15.15 21.95C15.1067 21.9825 15.0541 22 15 22C14.9459 22 14.8933 21.9825 14.85 21.95C14.8067 21.9175 14.7751 21.8719 14.76 21.82L9.24 2.18C9.22485 2.12807 9.19327 2.08246 9.15 2.05C9.10673 2.01754 9.05409 2 9 2C8.94591 2 8.89327 2.01754 8.85 2.05C8.80673 2.08246 8.77515 2.12807 8.76 2.18L6.41 10.54C6.29246 10.9592 6.04138 11.3285 5.69486 11.592C5.34835 11.8555 4.92532 11.9988 4.49 12H2"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Yoga & Meditation",
    desc: "Start your day with guided yoga sessions in serene natural surroundings. Find inner peace and rejuvenation.",
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7 16.3C9.2 16.3 11 14.47 11 12.25C11 11.09 10.43 9.98999 9.29 9.05999C8.15 8.12999 7.29 6.74999 7 5.29999C6.71 6.74999 5.86 8.13999 4.71 9.05999C3.56 9.97999 3 11.1 3 12.25C3 14.47 4.8 16.3 7 16.3Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5598 6.60002C13.2476 5.50114 13.7351 4.28906 13.9998 3.02002C14.4998 5.52002 15.9998 7.92002 17.9998 9.52002C19.9998 11.12 20.9998 13.02 20.9998 15.02C21.0056 16.4023 20.6007 17.7552 19.8366 18.9071C19.0726 20.059 17.9837 20.9582 16.708 21.4905C15.4323 22.0229 14.0273 22.1644 12.671 21.8973C11.3148 21.6302 10.0684 20.9664 9.08984 19.99"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Swimming Pool",
    desc: "Take a refreshing dip in our infinity pool surrounded by LUCH greens trees and tropical gardens.",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9.93694 15.5C9.84766 15.1539 9.66728 14.8381 9.41456 14.5854C9.16184 14.3327 8.84601 14.1523 8.49994 14.063L2.36494 12.481C2.26027 12.4513 2.16815 12.3883 2.10255 12.3014C2.03696 12.2146 2.00146 12.1088 2.00146 12C2.00146 11.8912 2.03696 11.7854 2.10255 11.6986C2.16815 11.6118 2.26027 11.5487 2.36494 11.519L8.49994 9.93601C8.84589 9.84681 9.16163 9.66658 9.41434 9.41404C9.66705 9.16151 9.84751 8.84589 9.93694 8.50001L11.5189 2.36501C11.5483 2.25992 11.6113 2.16735 11.6983 2.1014C11.7852 2.03545 11.8913 1.99976 12.0004 1.99976C12.1096 1.99976 12.2157 2.03545 12.3026 2.1014C12.3896 2.16735 12.4525 2.25992 12.4819 2.36501L14.0629 8.50001C14.1522 8.84608 14.3326 9.1619 14.5853 9.41462C14.838 9.66734 15.1539 9.84773 15.4999 9.93701L21.6349 11.518C21.7404 11.5471 21.8335 11.61 21.8998 11.6971C21.9661 11.7841 22.002 11.8906 22.002 12C22.002 12.1094 21.9661 12.2159 21.8998 12.3029C21.8335 12.39 21.7404 12.4529 21.6349 12.482L15.4999 14.063C15.1539 14.1523 14.838 14.3327 14.5853 14.5854C14.3326 14.8381 14.1522 15.1539 14.0629 15.5L12.4809 21.635C12.4515 21.7401 12.3886 21.8327 12.3016 21.8986C12.2147 21.9646 12.1086 22.0003 11.9994 22.0003C11.8903 22.0003 11.7842 21.9646 11.6973 21.8986C11.6103 21.8327 11.5473 21.7401 11.5179 21.635L9.93694 15.5Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 3V7"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 5H18"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 17V19"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 18H3"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Wedding Activities",
    desc: "Celebrate your special moments in our traditional wedding pavilion. Perfect for ceremonies and celebrations.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M16.9998 14L19.9998 17.3C20.1369 17.4398 20.2299 17.6167 20.2673 17.8088C20.3048 18.001 20.285 18.1998 20.2105 18.3808C20.1359 18.5618 20.0099 18.717 19.848 18.8271C19.6862 18.9371 19.4955 18.9973 19.2998 19H4.69982C4.5041 18.9973 4.31348 18.9371 4.15161 18.8271C3.98973 18.717 3.86372 18.5618 3.78919 18.3808C3.71466 18.1998 3.69489 18.001 3.73233 17.8088C3.76977 17.6167 3.86278 17.4398 3.99982 17.3L6.99982 14H6.69982C6.5041 13.9973 6.31348 13.9371 6.15161 13.8271C5.98973 13.717 5.86372 13.5619 5.78919 13.3808C5.71466 13.1998 5.69489 13.001 5.73233 12.8088C5.76977 12.6167 5.86278 12.4398 5.99982 12.3L8.99982 9H8.79982C8.59557 9.01843 8.39059 8.97361 8.21267 8.87162C8.03475 8.76963 7.89248 8.6154 7.80516 8.42984C7.71784 8.24428 7.68968 8.03636 7.7245 7.83425C7.75932 7.63215 7.85544 7.44564 7.99982 7.3L11.9998 3L15.9998 7.3C16.1442 7.44564 16.2403 7.63215 16.2751 7.83425C16.31 8.03636 16.2818 8.24428 16.1945 8.42984C16.1072 8.6154 15.9649 8.76963 15.787 8.87162C15.6091 8.97361 15.4041 9.01843 15.1998 9H14.9998L17.9998 12.3C18.1369 12.4398 18.2299 12.6167 18.2673 12.8088C18.3048 13.001 18.285 13.1998 18.2105 13.3808C18.1359 13.5619 18.0099 13.717 17.848 13.8271C17.6862 13.9371 17.4955 13.9973 17.2998 14H16.9998Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 22V19"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "farm Grove",
    desc: "Stroll through our lush farm grove and experience the authentic tropical ambiance of farms.",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2V4"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 20V22"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.93018 4.93005L6.34018 6.34005"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.6602 17.66L19.0702 19.07"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12H4"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 12H22"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.34018 17.66L4.93018 19.07"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.0702 4.93005L17.6602 6.34005"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Sun & Bird Watching",
    desc: "Wake up to melodious bird songs and watch stunning sunrises. Perfect for nature enthusiasts and photographers.",
    img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8 3L12 11L17 6L22 21H2L8 3Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "City Outskirts Exploration",
    desc: "Explore the scenic beauty of Hyderabad's outskirts with guided nature walks and local village tours.",
    img: "https://images.unsplash.com/photo-1566237242515-8540394e1993?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHlkZXJhYmFkJTIwY2l0eSUyMG91dHNraXJ0c3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M18.5 21C20.433 21 22 19.433 22 17.5C22 15.567 20.433 14 18.5 14C16.567 14 15 15.567 15 17.5C15 19.433 16.567 21 18.5 21Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 21C7.433 21 9 19.433 9 17.5C9 15.567 7.433 14 5.5 14C3.567 14 2 15.567 2 17.5C2 19.433 3.567 21 5.5 21Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 6C15.5523 6 16 5.55228 16 5C16 4.44772 15.5523 4 15 4C14.4477 4 14 4.44772 14 5C14 5.55228 14.4477 6 15 6Z"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 17.5V14L9 11L13 8L15 11H17"
          stroke="#D9B59D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Snookers and Games",
    desc: "Unwind with snooker and curated indoor games in a calm, comfortable setting. Game equipment is available upon request.",
    img: "https://images.unsplash.com/photo-1761591847985-2184afaab747?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNub29rZXJzfGVufDB8fDB8fHww",
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
  { time: "Morning", items: "Yoga, Bird Watching, Breakfast" },
  { time: "Afternoon", items: "Pool, Snooker, City OutSkirts" },
  { time: "Evening", items: "Bonfire, Stargazing, Dining" },
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
      <section className="py-20 bg-[#F5F1EA]">
        <div className="max-w-7xl mx-auto px-6 rounded-[16px]md:px-16">
          <div className="text-center mb-12">
            <h2
              className="font-semibold text-[#354E41] mb-2"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {featured.map((a) => (
              <div
                key={a.title}
                className="bg-white overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-[16px]"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={a.img}
                    alt={a.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-[16px]"
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
        </div>
      </section>

      {/* MORE TO EXPLORE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto rounded-[16px]px-6 md:px-16">
          <div className="text-center mb-12">
            <h2
              className="font-semibold text-[#354E41] mb-2"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
            {moreActivities.map((a) => (
              <div
                key={a.name}
                className="bg-[#F5F1EA] p-5 hover:bg-[#EDE8DC] rounded-[16px] transition-colors"
              >
                <p className="text-sm font-medium text-[#1a1a1a] mb-1">
                  {a.name}
                </p>
                <p className="text-xs text-[#2D4A3E] font-medium">{a.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN YOUR PERFECT DAY */}
      <section className="py-20 bg-[#2D4A3E] text-center">
        <div className="max-w-8xl mx-auto px-0 md:px-16">
          <h2
            className="font-semibold text-white mb-2"
            style={{
              fontFamily: "var(--font-dm-serif, serif)",
              fontSize: "clamp(24px, 3vw, 38px)",
            }}
          >
            Plan Your Perfect Day
          </h2>
          <p className="text-sm text-white/70 italic mb-14 max-w-xl mx-auto">
            Our team is happy to help you plan your activities and experiences.
            Let us know your preferences and we'll create a personalized
            schedule for your stay.
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
            {dayPlan.map((d) => (
              <div
                key={d.time}
                className="bg-[rgba(255,255,255,0.08)] border border-white/10 p-8"
              >
                <h3
                  className="text-white font-normal mb-2"
                  style={{
                    fontFamily: "var(--font-dm-serif, serif)",
                    fontSize: "24px",
                  }}
                >
                  {d.time}
                </h3>
                <p className="text-white/60 text-xs">{d.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
