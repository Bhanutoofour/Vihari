import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vihara – The Courtyard | Private Estate near Hyderabad",
  description:
    "A private courtyard estate designed for intimate celebrations, gatherings and slow stays. Built with terracotta walls, open skies and calm architecture.",
  keywords:
    "vihara, courtyard, hyderabad, staycation, private events, celebrations, kothur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
