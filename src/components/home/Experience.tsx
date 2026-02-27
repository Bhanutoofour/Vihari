const amenities = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M6 24L10 20M10 20L24 6L38 20M10 20V40C10 40.5304 10.2107 41.0391 10.5858 41.4142C10.9609 41.7893 11.4696 42 12 42H18M38 20L42 24M38 20V40C38 40.5304 37.7893 41.0391 37.4142 41.4142C37.0391 41.7893 36.5304 42 36 42H30M18 42C18.5304 42 19.0391 41.7893 19.4142 41.4142C19.7893 41.0391 20 40.5304 20 40V32C20 31.4696 20.2107 30.9609 20.5858 30.5858C20.9609 30.2107 21.4696 30 22 30H26C26.5304 30 27.0391 30.2107 27.4142 30.5858C27.7893 30.9609 28 31.4696 28 32V40C28 40.5304 28.2107 41.0391 28.5858 41.4142C28.9609 41.7893 29.4696 42 30 42M18 42H30"
          stroke="#354E41"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Five A/C Bedrooms",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M10 6V14M6 10H14M12 34V42M8 38H16M26 6L30.572 19.714L42 24L30.572 28.286L26 42L21.428 28.286L10 24L21.428 19.714L26 6Z"
          stroke="#354E41"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Swimming Pool",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M6 20H42M14 30H16M24 30H26M12 38H36C37.5913 38 39.1174 37.3679 40.2426 36.2426C41.3679 35.1174 42 33.5913 42 32V16C42 14.4087 41.3679 12.8826 40.2426 11.7574C39.1174 10.6321 37.5913 10 36 10H12C10.4087 10 8.88258 10.6321 7.75736 11.7574C6.63214 12.8826 6 14.4087 6 16V32C6 33.5913 6.63214 35.1174 7.75736 36.2426C8.88258 37.3679 10.4087 38 12 38Z"
          stroke="#354E41"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Indoor Games",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M25.9999 20V6L7.99994 28H21.9999V42L39.9999 20H25.9999Z"
          stroke="#354E41"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Power Backup",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M34 40H44V36C43.9999 34.7531 43.6113 33.5371 42.8883 32.5213C42.1652 31.5054 41.1436 30.74 39.9655 30.3315C38.7874 29.923 37.5112 29.8918 36.3145 30.242C35.1178 30.5923 34.0599 31.3067 33.288 32.286M34 40H14M34 40V36C34 34.688 33.748 33.434 33.288 32.286M33.288 32.286C32.5453 30.4299 31.2635 28.8389 29.608 27.7182C27.9525 26.5976 25.9992 25.9986 24 25.9986C22.0008 25.9986 20.0475 26.5976 18.392 27.7182C16.7365 28.8389 15.4547 30.4299 14.712 32.286M14 40H4V36C4.00009 34.7531 4.38867 33.5371 5.11172 32.5213C5.83477 31.5054 6.85637 30.74 8.0345 30.3315C9.21263 29.923 10.4888 29.8918 11.6855 30.242C12.8822 30.5923 13.9401 31.3067 14.712 32.286M14 40V36C14 34.688 14.252 33.434 14.712 32.286M30 14C30 15.5913 29.3679 17.1174 28.2426 18.2426C27.1174 19.3679 25.5913 20 24 20C22.4087 20 20.8826 19.3679 19.7574 18.2426C18.6321 17.1174 18 15.5913 18 14C18 12.4087 18.6321 10.8826 19.7574 9.75736C20.8826 8.63214 22.4087 8 24 8C25.5913 8 27.1174 8.63214 28.2426 9.75736C29.3679 10.8826 30 12.4087 30 14ZM42 20C42 21.0609 41.5786 22.0783 40.8284 22.8284C40.0783 23.5786 39.0609 24 38 24C36.9391 24 35.9217 23.5786 35.1716 22.8284C34.4214 22.0783 34 21.0609 34 20C34 18.9391 34.4214 17.9217 35.1716 17.1716C35.9217 16.4214 36.9391 16 38 16C39.0609 16 40.0783 16.4214 40.8284 17.1716C41.5786 17.9217 42 18.9391 42 20ZM14 20C14 21.0609 13.5786 22.0783 12.8284 22.8284C12.0783 23.5786 11.0609 24 10 24C8.93913 24 7.92172 23.5786 7.17157 22.8284C6.42143 22.0783 6 21.0609 6 20C6 18.9391 6.42143 17.9217 7.17157 17.1716C7.92172 16.4214 8.93913 16 10 16C11.0609 16 12.0783 16.4214 12.8284 17.1716C13.5786 17.9217 14 18.9391 14 20Z"
          stroke="#354E41"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Caretaker Assistance",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M16 28V34M24 28V34M32 28V34M6 42H42M6 20H42M6 14L24 6L42 14M8 20H40V42H8V20Z"
          stroke="#354E41"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Dining Areas",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M18 24L22 28L30 20M42 24C42 26.3638 41.5344 28.7044 40.6298 30.8883C39.7252 33.0722 38.3994 35.0565 36.7279 36.7279C35.0565 38.3994 33.0722 39.7252 30.8883 40.6298C28.7044 41.5344 26.3638 42 24 42C21.6362 42 19.2956 41.5344 17.1117 40.6298C14.9278 39.7252 12.9435 38.3994 11.2721 36.7279C9.60062 35.0565 8.27475 33.0722 7.37017 30.8883C6.46558 28.7044 6 26.3638 6 24C6 19.2261 7.89642 14.6477 11.2721 11.2721C14.6477 7.89642 19.2261 6 24 6C28.7739 6 33.3523 7.89642 36.7279 11.2721C40.1036 14.6477 42 19.2261 42 24Z"
          stroke="#354E41"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Courtyard Access",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M10 16H38M10 16C8.93913 16 7.92172 15.5786 7.17157 14.8284C6.42143 14.0783 6 13.0609 6 12C6 10.9391 6.42143 9.92172 7.17157 9.17157C7.92172 8.42143 8.93913 8 10 8H38C39.0609 8 40.0783 8.42143 40.8284 9.17157C41.5786 9.92172 42 10.9391 42 12C42 13.0609 41.5786 14.0783 40.8284 14.8284C40.0783 15.5786 39.0609 16 38 16M10 16V36C10 37.0609 10.4214 38.0783 11.1716 38.8284C11.9217 39.5786 12.9391 40 14 40H34C35.0609 40 36.0783 39.5786 36.8284 38.8284C37.5786 38.0783 38 37.0609 38 36V16M20 24H28"
          stroke="#354E41"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    label: "Parking",
  },
];

export default function Experience() {
  return (
    <section id="amenities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-6xl font-light text-[#354E41] mb-4">
            The Vihara Experience
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#354E41] text-xl opacity-70">
            Intimate gatherings and milestone moments unfold differently when
            the setting is personal.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 rounded-[16px] ">
          <FeatureCard
            title="Open Sky Courtyard"
            description="A serene swimming pool surrounded by terracotta walls and ambient lighting"
            imageBg="bg-[#354E41]"
            bgImage="/opensky.png"
          />
          <FeatureCard
            title="Modern Architecture"
            description="Contemporary design with traditional terracotta elements and expansive glass"
            imageBg="bg-[#4a6655]"
            bgImage="ma.png"
          />
        </div>

        {/* Amenities Grid */}
        <div className="bg-[#f7f5f2] rounded-[16px] px-8 py-10">
          <h3 className="font-['Cormorant_Garamond'] font-semibold text-3xl text-[#354E41] text-center mb-8">
            Included With Your Stay
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4">
            {amenities.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="font-['Jost'] text-xs text-[#354E41] font-medium tracking-wide">
                  {item.label}
                </p>
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
    <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] group">
      <div
        className={`absolute inset-0 ${imageBg} bg-cover bg-center transition-transform duration-700 group-hover:scale-105`}
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 30%, rgba(53,78,65,0.92) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white font-['Cormorant_Garamond'] text-2xl mb-1">
          {title}
        </h3>
        <p className="text-[#DCD7CD] font-['Jost'] text-sm opacity-90">
          {description}
        </p>
      </div>
    </div>
  );
}
