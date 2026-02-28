import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Amenities | Vihara - The Courtyard",
  description: "Everything thoughtfully curated for your stay at Vihara.",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80";
const POOL_IMG =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=80";
const INTERIOR_IMG =
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80";
const ARCH_IMG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

const IconContainer = ({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: "#354E41" | "#D9B59D";
}) => (
  <div
    style={{
      display: "flex",
      width: 64,
      height: 64,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "9999px",
      background: bg,
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

const IconBedroom = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M20 28V17.3333C20 16.9797 19.8595 16.6406 19.6095 16.3905C19.3594 16.1405 19.0203 16 18.6667 16H13.3333C12.9797 16 12.6406 16.1405 12.3905 16.3905C12.1405 16.6406 12 16.9797 12 17.3333V28"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 13.3333C3.99991 12.9454 4.08445 12.5622 4.24772 12.2103C4.41099 11.8584 4.64906 11.5464 4.94533 11.296L14.2787 3.29733C14.76 2.89054 15.3698 2.66736 16 2.66736C16.6302 2.66736 17.24 2.89054 17.7213 3.29733L27.0547 11.296C27.3509 11.5464 27.589 11.8584 27.7523 12.2103C27.9156 12.5622 28.0001 12.9454 28 13.3333V25.3333C28 26.0406 27.719 26.7189 27.219 27.2189C26.7189 27.719 26.0406 28 25.3333 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.2189C4.28095 26.7189 4 26.0406 4 25.3333V13.3333Z"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconBathroom = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M13.3334 5.33331L10.6667 7.99998"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6667 25.3333V28"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66675 16H29.3334"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33325 25.3333V28"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9999 6.66667L10.1613 4.828C9.77567 4.44063 9.2861 4.17329 8.75176 4.05832C8.21742 3.94336 7.66122 3.9857 7.15044 4.18022C6.63967 4.37474 6.1962 4.71311 5.8737 5.15439C5.5512 5.59566 5.36348 6.12094 5.33325 6.66667V22.6667C5.33325 23.3739 5.6142 24.0522 6.1143 24.5523C6.6144 25.0524 7.29267 25.3333 7.99992 25.3333H23.9999C24.7072 25.3333 25.3854 25.0524 25.8855 24.5523C26.3856 24.0522 26.6666 23.3739 26.6666 22.6667V16"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconAC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M17.0667 26.1333C17.4048 26.3868 17.7982 26.5564 18.2146 26.628C18.6311 26.6997 19.0585 26.6713 19.4619 26.5453C19.8652 26.4194 20.2328 26.1993 20.5344 25.9034C20.836 25.6075 21.063 25.2441 21.1966 24.8433C21.3302 24.4424 21.3666 24.0155 21.3029 23.5978C21.2392 23.1801 21.0771 22.7835 20.8301 22.4408C20.583 22.098 20.258 21.8188 19.8819 21.6263C19.5058 21.4337 19.0893 21.3333 18.6667 21.3333H2.66675"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.3334 10.6666C23.6743 10.2121 24.1258 9.85223 24.6449 9.62123C25.164 9.39023 25.7335 9.29576 26.2994 9.34678C26.8653 9.39781 27.4088 9.59264 27.8782 9.91278C28.3476 10.2329 28.7274 10.6677 28.9815 11.1759C29.2356 11.6841 29.3556 12.2489 29.33 12.8165C29.3045 13.3841 29.1343 13.9358 28.8356 14.4191C28.5369 14.9024 28.1196 15.3014 27.6233 15.5781C27.127 15.8547 26.5683 16 26.0001 16H2.66675"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0667 5.86665C13.4048 5.61312 13.7982 5.44356 14.2146 5.37192C14.6311 5.30028 15.0585 5.32862 15.4619 5.45461C15.8652 5.5806 16.2328 5.80062 16.5344 6.09655C16.836 6.39249 17.063 6.75585 17.1966 7.15671C17.3302 7.55756 17.3666 7.98443 17.3029 8.40214C17.2392 8.81984 17.0771 9.21643 16.8301 9.55921C16.583 9.90199 16.258 10.1812 15.8819 10.3737C15.5058 10.5662 15.0893 10.6666 14.6667 10.6666H2.66675"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconTV = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M26.6667 9.33331H5.33341C3.86066 9.33331 2.66675 10.5272 2.66675 12V26.6666C2.66675 28.1394 3.86066 29.3333 5.33341 29.3333H26.6667C28.1395 29.3333 29.3334 28.1394 29.3334 26.6666V12C29.3334 10.5272 28.1395 9.33331 26.6667 9.33331Z"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6666 2.66669L15.9999 9.33335L9.33325 2.66669"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPool = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M2.66675 8.00008C3.46675 8.66675 4.26675 9.33341 6.00008 9.33341C9.33341 9.33341 9.33341 6.66675 12.6667 6.66675C16.1334 6.66675 15.8667 9.33341 19.3334 9.33341C22.6667 9.33341 22.6667 6.66675 26.0001 6.66675C27.7334 6.66675 28.5334 7.33341 29.3334 8.00008"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66675 16.0001C3.46675 16.6667 4.26675 17.3334 6.00008 17.3334C9.33341 17.3334 9.33341 14.6667 12.6667 14.6667C16.1334 14.6667 15.8667 17.3334 19.3334 17.3334C22.6667 17.3334 22.6667 14.6667 26.0001 14.6667C27.7334 14.6667 28.5334 15.3334 29.3334 16.0001"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66675 24.0001C3.46675 24.6667 4.26675 25.3334 6.00008 25.3334C9.33341 25.3334 9.33341 22.6667 12.6667 22.6667C16.1334 22.6667 15.8667 25.3334 19.3334 25.3334C22.6667 25.3334 22.6667 22.6667 26.0001 22.6667C27.7334 22.6667 28.5334 23.3334 29.3334 24.0001"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconSun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M16.0001 21.3334C18.9456 21.3334 21.3334 18.9456 21.3334 16.0001C21.3334 13.0546 18.9456 10.6667 16.0001 10.6667C13.0546 10.6667 10.6667 13.0546 10.6667 16.0001C10.6667 18.9456 13.0546 21.3334 16.0001 21.3334Z"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2.66675V5.33341"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 26.6667V29.3334"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.57324 6.57324L8.45324 8.45324"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.5466 23.5466L25.4266 25.4266"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66675 16H5.33341"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.6667 16H29.3334"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.45324 23.5466L6.57324 25.4266"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.4266 6.57324L23.5466 8.45324"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconFork = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M4 2.66675V12.0001C4 13.4667 5.2 14.6667 6.66667 14.6667H12C12.7072 14.6667 13.3855 14.3858 13.8856 13.8857C14.3857 13.3856 14.6667 12.7073 14.6667 12.0001V2.66675"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33325 2.66675V29.3334"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.9999 20.0001V2.66675C26.2318 2.66675 24.5361 3.36913 23.2859 4.61937C22.0356 5.86961 21.3333 7.5653 21.3333 9.33341V17.3334C21.3333 18.8001 22.5333 20.0001 23.9999 20.0001H27.9999ZM27.9999 20.0001V29.3334"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M25.3334 22.6666H28.0001C28.8001 22.6666 29.3334 22.1333 29.3334 21.3333V17.3333C29.3334 16.1333 28.4001 15.0666 27.3334 14.7999C24.9334 14.1333 21.3334 13.3333 21.3334 13.3333C21.3334 13.3333 19.6001 11.4666 18.4001 10.2666C17.7334 9.73325 16.9334 9.33325 16.0001 9.33325H6.66675C5.86675 9.33325 5.20008 9.86659 4.80008 10.5333L2.93341 14.3999C2.75685 14.9149 2.66675 15.4555 2.66675 15.9999V21.3333C2.66675 22.1333 3.20008 22.6666 4.00008 22.6666H6.66675"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33341 25.3333C10.8062 25.3333 12.0001 24.1394 12.0001 22.6667C12.0001 21.1939 10.8062 20 9.33341 20C7.86066 20 6.66675 21.1939 6.66675 22.6667C6.66675 24.1394 7.86066 25.3333 9.33341 25.3333Z"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22.6667H20"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6667 25.3333C24.1394 25.3333 25.3333 24.1394 25.3333 22.6667C25.3333 21.1939 24.1394 20 22.6667 20C21.1939 20 20 21.1939 20 22.6667C20 24.1394 21.1939 25.3333 22.6667 25.3333Z"
      stroke="#354E41"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPeople = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M21.3334 28V25.3333C21.3334 23.9188 20.7715 22.5623 19.7713 21.5621C18.7711 20.5619 17.4146 20 16.0001 20H8.00008C6.58559 20 5.22904 20.5619 4.22885 21.5621C3.22865 22.5623 2.66675 23.9188 2.66675 25.3333V28"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.0001 14.6667C14.9456 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9456 4 12.0001 4C9.05456 4 6.66675 6.38781 6.66675 9.33333C6.66675 12.2789 9.05456 14.6667 12.0001 14.6667Z"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.3333 28V25.3333C29.3324 24.1516 28.9391 23.0037 28.2151 22.0698C27.4911 21.1358 26.4774 20.4688 25.3333 20.1733"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3333 4.17334C22.4805 4.46707 23.4973 5.13427 24.2234 6.06975C24.9496 7.00523 25.3437 8.15578 25.3437 9.34001C25.3437 10.5242 24.9496 11.6748 24.2234 12.6103C23.4973 13.5457 22.4805 14.2129 21.3333 14.5067"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconShield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M26.6666 17.3333C26.6666 23.9999 21.9999 27.3333 16.4533 29.2666C16.1628 29.365 15.8473 29.3603 15.5599 29.2533C9.99992 27.3333 5.33325 23.9999 5.33325 17.3333V7.99995C5.33325 7.64633 5.47373 7.30719 5.72378 7.05714C5.97383 6.80709 6.31296 6.66662 6.66659 6.66662C9.33325 6.66662 12.6666 5.06662 14.9866 3.03995C15.2691 2.79861 15.6284 2.66602 15.9999 2.66602C16.3714 2.66602 16.7308 2.79861 17.0133 3.03995C19.3466 5.07995 22.6666 6.66662 25.3333 6.66662C25.6869 6.66662 26.026 6.80709 26.2761 7.05714C26.5261 7.30719 26.6666 7.64633 26.6666 7.99995V17.3333Z"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWifi = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M16 26.6667H16.0133"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66675 11.7601C6.33356 8.48042 11.0805 6.66724 16.0001 6.66724C20.9196 6.66724 25.6666 8.48042 29.3334 11.7601"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66675 17.1454C9.15913 14.7024 12.51 13.334 16.0001 13.334C19.4901 13.334 22.841 14.7024 25.3334 17.1454"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3333 21.9052C12.5794 20.6837 14.2549 19.9995 15.9999 19.9995C17.7449 19.9995 19.4204 20.6837 20.6666 21.9052"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M13.2493 20.6666C13.1303 20.2052 12.8898 19.7841 12.5528 19.4471C12.2159 19.1101 11.7948 18.8696 11.3333 18.7506L3.15333 16.6413C3.01378 16.6016 2.89095 16.5176 2.80348 16.4019C2.71602 16.2861 2.6687 16.145 2.6687 15.9999C2.6687 15.8549 2.71602 15.7137 2.80348 15.598C2.89095 15.4823 3.01378 15.3982 3.15333 15.3586L11.3333 13.2479C11.7946 13.129 12.2156 12.8887 12.5525 12.552C12.8895 12.2153 13.1301 11.7944 13.2493 11.3333L15.3587 3.15326C15.3979 3.01315 15.4818 2.88971 15.5978 2.80178C15.7137 2.71386 15.8552 2.66626 16.0007 2.66626C16.1462 2.66626 16.2877 2.71386 16.4036 2.80178C16.5195 2.88971 16.6035 3.01315 16.6427 3.15326L18.7507 11.3333C18.8697 11.7947 19.1102 12.2158 19.4472 12.5527C19.7841 12.8897 20.2052 13.1302 20.6667 13.2493L28.8467 15.3573C28.9873 15.3961 29.1114 15.4799 29.1998 15.596C29.2882 15.7121 29.3361 15.854 29.3361 15.9999C29.3361 16.1458 29.2882 16.2877 29.1998 16.4038C29.1114 16.5199 28.9873 16.6038 28.8467 16.6426L20.6667 18.7506C20.2052 18.8696 19.7841 19.1101 19.4472 19.4471C19.1102 19.7841 18.8697 20.2052 18.7507 20.6666L16.6413 28.8466C16.6021 28.9867 16.5182 29.1101 16.4022 29.1981C16.2863 29.286 16.1448 29.3336 15.9993 29.3336C15.8538 29.3336 15.7123 29.286 15.5964 29.1981C15.4805 29.1101 15.3965 28.9867 15.3573 28.8466L13.2493 20.6666Z"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.6667 4V9.33333"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.3333 6.66675H24"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.33325 22.6667V25.3334"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66667 24H4"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPot = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M13.3333 2.66675V5.33341"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.6667 2.66675V5.33341"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3333 10.6667C21.687 10.6667 22.0261 10.8072 22.2761 11.0573C22.5262 11.3073 22.6667 11.6465 22.6667 12.0001V22.6667C22.6667 24.0812 22.1048 25.4378 21.1046 26.438C20.1044 27.4382 18.7478 28.0001 17.3333 28.0001H9.33333C7.91885 28.0001 6.56229 27.4382 5.5621 26.438C4.5619 25.4378 4 24.0812 4 22.6667V12.0001C4 11.6465 4.14048 11.3073 4.39052 11.0573C4.64057 10.8072 4.97971 10.6667 5.33333 10.6667H24C25.4145 10.6667 26.771 11.2287 27.7712 12.2288C28.7714 13.229 29.3333 14.5856 29.3333 16.0001C29.3333 17.4146 28.7714 18.7711 27.7712 19.7713C26.771 20.7715 25.4145 21.3334 24 21.3334H22.6667"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 2.66675V5.33341"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconDining = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M4 2.66675V12.0001C4 13.4667 5.2 14.6667 6.66667 14.6667H12C12.7072 14.6667 13.3855 14.3858 13.8856 13.8857C14.3857 13.3856 14.6667 12.7073 14.6667 12.0001V2.66675"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33325 2.66675V29.3334"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.9999 20.0001V2.66675C26.2318 2.66675 24.5361 3.36913 23.2859 4.61937C22.0356 5.86961 21.3333 7.5653 21.3333 9.33341V17.3334C21.3333 18.8001 22.5333 20.0001 23.9999 20.0001H27.9999ZM27.9999 20.0001V29.3334"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWater = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M9.33333 21.7333C12.2667 21.7333 14.6667 19.2933 14.6667 16.3333C14.6667 14.7867 13.9067 13.32 12.3867 12.08C10.8667 10.84 9.72 8.99998 9.33333 7.06665C8.94667 8.99998 7.81333 10.8533 6.28 12.08C4.74667 13.3067 4 14.8 4 16.3333C4 19.2933 6.4 21.7333 9.33333 21.7333Z"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.7468 8.79994C17.6638 7.33478 18.3139 5.71867 18.6668 4.02661C19.3335 7.35994 21.3335 10.5599 24.0001 12.6933C26.6668 14.8266 28.0001 17.3599 28.0001 20.0266C28.0077 21.8697 27.4679 23.6735 26.4492 25.2094C25.4304 26.7453 23.9785 27.9441 22.2776 28.6539C20.5767 29.3637 18.7033 29.5525 16.895 29.1963C15.0867 28.8401 13.4248 27.9551 12.1201 26.6533"
      stroke="#D9B59D"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const accommodationData = [
  {
    icon: <IconBedroom />,
    bg: "#354E41" as const,
    title: "Five A/C Bedrooms",
    desc: "Spacious air-conditioned bedrooms with comfortable beds and modern furnishings",
  },
  {
    icon: <IconBathroom />,
    bg: "#354E41" as const,
    title: "Five Attached Bathrooms",
    desc: "Private bathrooms with hot water and premium toiletries",
  },
  {
    icon: <IconAC />,
    bg: "#354E41" as const,
    title: "Fully Air-Conditioned",
    desc: "Climate control throughout all living spaces",
  },
  {
    icon: <IconTV />,
    bg: "#354E41" as const,
    title: "Entertainment System",
    desc: "Smart TV and indoor games for your leisure",
  },
];

const outdoorData = [
  {
    icon: <IconPool />,
    bg: "#D9B59D" as const,
    title: "Swimming Pool",
    desc: "Pristine pool surrounded by terracotta walls and open sky",
  },
  {
    icon: <IconSun />,
    bg: "#D9B59D" as const,
    title: "Open Courtyard",
    desc: "Private courtyard spaces with ambient lighting and seating",
  },
  {
    icon: <IconFork />,
    bg: "#D9B59D" as const,
    title: "Outdoor Dining Area",
    desc: "Al fresco dining spaces perfect for gatherings",
  },
  {
    icon: <IconCar />,
    bg: "#D9B59D" as const,
    title: "Ample Parking",
    desc: "Secure parking space for multiple vehicles",
  },
];

const servicesData = [
  {
    icon: <IconPeople />,
    bg: "#354E41" as const,
    title: "Caretaker Assistance",
    desc: "Friendly caretaker available throughout your stay",
  },
  {
    icon: <IconShield />,
    bg: "#354E41" as const,
    title: "24/7 Power Backup",
    desc: "Uninterrupted power supply with generator backup",
  },
  {
    icon: <IconWifi />,
    bg: "#354E41" as const,
    title: "High-Speed Wi-Fi",
    desc: "Complimentary internet access throughout the property",
  },
  {
    icon: <IconStar />,
    bg: "#354E41" as const,
    title: "Daily Housekeeping",
    desc: "Professional cleaning and maintenance services",
  },
];

const kitchenData = [
  {
    icon: <IconPot />,
    bg: "#354E41" as const,
    title: "Fully Equipped Kitchen",
    desc: "Modern kitchen with all necessary appliances and utensils",
  },
  {
    icon: <IconDining />,
    bg: "#354E41" as const,
    title: "Dining Areas",
    desc: "Multiple dining spaces — indoor and outdoor options",
  },
  {
    icon: <IconWater />,
    bg: "#354E41" as const,
    title: "Filtered Water",
    desc: "Clean drinking water system available",
  },
];

const additional = [
  "Private property with exclusive access",
  "Terracotta architecture with modern design",
  "Natural lighting throughout",
  "Indoor & outdoor seating areas",
  "Event-ready spaces",
  "Ambient lighting for evening ambiance",
  "Lush greenery and landscaping",
  "Wheelchair accessible ground floor",
  "First aid kit and safety equipment",
  "Fire extinguishers",
];

type CardItem = {
  icon: React.ReactNode;
  bg: "#354E41" | "#D9B59D";
  title: string;
  desc: string;
};

function WhiteCard({ icon, bg, title, desc }: CardItem) {
  return (
    <div className="bg-white p-8 rounded-2xl">
      <IconContainer bg={bg}>{icon}</IconContainer>
      <h3 className="text-xl text-[#354E41] mt-6 mb-3">{title}</h3>
      <p className="text-[#354E41]/70 leading-relaxed">{desc}</p>
    </div>
  );
}

function DarkCard({ icon, bg, title, desc }: CardItem) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
      <IconContainer bg={bg}>{icon}</IconContainer>
      <h3 className="text-xl text-white mt-6 mb-3">{title}</h3>
      <p className="text-white/70 leading-relaxed">{desc}</p>
    </div>
  );
}

function SectionHeading({
  title,
  light = false,
}: {
  title: string;
  light?: boolean;
}) {
  return (
    <h2
      className={`text-4xl mb-12 text-center ${light ? "text-white" : "text-[#354E41]"}`}
    >
      {title}
    </h2>
  );
}

export default function AmenitiesPage() {
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
            className="text-5xl md:text-6xl text-white mb-4"
            style={{
              fontWeight: 700,
              letterSpacing: "0.02em",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Amenities
          </h1>
          <p
            className="text-2xl text-[#DCD7CD] italic"
            style={{ fontFamily: "serif" }}
          >
            Everything you need for a memorable stay
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-5xl font-light text-[#354E41] mb-6">
            Thoughtfully Designed for Your Comfort
          </h2>
          <p className="text-xl text-[#354E41]/80 leading-relaxed max-w-3xl mx-auto">
            At Vihara - The Courtyard, every detail has been carefully
            considered to ensure your stay is comfortable, memorable, and
            effortless. From modern conveniences to serene spaces, we've created
            an environment where you can truly relax and reconnect.
          </p>
        </div>
      </section>

      {/* ACCOMMODATION */}
      <section className="py-24 bg-[#DCD7CD]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <SectionHeading title=<b>Accommodation </b> />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {accommodationData.map((a) => (
              <WhiteCard key={a.title} {...a} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                img: INTERIOR_IMG,
                title: "Private Courtyard Spaces",
                desc: "Intimate seating areas for relaxation and conversation",
              },
              {
                img: ARCH_IMG,
                title: "Contemporary Design",
                desc: "Terracotta walls meet modern glass and steel",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="relative overflow-hidden rounded-2xl"
                style={{ height: "280px" }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 rounded-2xl">
                  <h3 className="text-2xl text-white mb-2">{c.title}</h3>
                  <p className="text-[#DCD7CD]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTDOOR SPACES */}
      <section className="bg-[#354E41] pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <SectionHeading title="Outdoor Spaces" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {outdoorData.map((a) => (
              <DarkCard key={a.title} {...a} />
            ))}
          </div>
        </div>
        <div className="relative w-full" style={{ height: "420px" }}>
          <img
            src={POOL_IMG}
            alt="The Heart of the Courtyard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
            <h2
              className="font-['Cormorant_Garamond'] font-semibold text-5xl md:text-6xl font-light text-white mb-4 italic"
              style={{ fontFamily: "serif" }}
            >
              The Heart of the Courtyard
            </h2>
            <p className="text-xl text-[#DCD7CD] max-w-2xl">
              A serene swimming pool surrounded by terracotta walls and ambient
              lighting
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES & SUPPORT */}
      <section className="py-24 bg-[#DCD7CD]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <SectionHeading title=<b>Services & Support</b> />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {servicesData.map((a) => (
              <WhiteCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* KITCHEN & DINING */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <SectionHeading title=<b> Kitchen & Dining </b> />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {kitchenData.map((a) => (
              <WhiteCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* ADDITIONAL FEATURES */}
      <section className="py-24 bg-[#354E41]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="text-4xl text-white mb-12 font-semibold text-center">
            Additional Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {additional.map((f) => (
              <div
                key={f}
                className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-xl"
              >
                <span
                  className="flex-shrink-0 rounded-full bg-[#354E41] border-2 border-[#DCD7CD]"
                  style={{ width: 10, height: 10 }}
                />
                <span className="text-[#DCD7CD]">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#DCD7CD] text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="text-5xl font-semibold text-[#354E41] mb-6">
            Ready to Experience Vihara?
          </h2>
          <p
            className="text-xl text-[#354E41]/80 mb-10 italic max-w-2xl mx-auto"
            style={{ fontFamily: "serif" }}
          >
            Book your stay and enjoy all these amenities in the comfort of your
            private courtyard retreat.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/booking"
              className="bg-[#354E41] text-[#DCD7CD] px-10 py-4 text-lg font-medium no-underline hover:bg-[#2a3f34] transition-colors"
            >
              Check Availability
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#354E41] text-[#354E41] px-10 py-4 text-lg font-medium no-underline hover:bg-[#354E41] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
