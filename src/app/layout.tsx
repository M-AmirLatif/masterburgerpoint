import type { Metadata, Viewport } from "next";
import { Lilita_One, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/CartDrawer";
import { CartToast } from "@/components/CartToast";
import { MobileActionBar } from "@/components/MobileActionBar";
import { RESTAURANT_INFO } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#FFC20E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Master Burger Point | The Oldest & Best Burger Shop in Kasur",
  description:
    "Master Burger Point (ماسٹر برگر پوائنٹ) — Kasur's oldest and most famous burger spot on Railway Road, Chandni Chowk. Famous for Special Master Burgers, Bun Plaster, Zinger, Chicken Shawarma, Paratha Rolls & Club Sandwiches. Dine-in, Takeout & Delivery till 4 AM.",
  keywords: [
    "Master Burger Point",
    "Master Burger Kasur",
    "Oldest Burger Shop in Kasur",
    "Best Burger in Kasur",
    "Bun Plaster Kasur",
    "Railway Road Kasur food",
    "Chandni Chowk Kasur burger",
    "Zinger Burger Kasur",
    "Shawarma Kasur",
    "Late night delivery Kasur 4 AM",
  ],
  authors: [{ name: "Master Burger Point" }],
  creator: "Master Burger Point",
  publisher: "Master Burger Point",
  formatDetection: {
    telephone: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Master Burger Point | The Oldest & Best Burger Shop in Kasur",
    description:
      "Kasur's legendary burger destination on Railway Road! Special Master Burger, Bun Plaster, Zinger, Shawarma, Club Sandwiches & Injected Broast. Open daily 12 PM till 4 AM.",
    url: SITE_URL,
    siteName: "Master Burger Point",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        secureUrl: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Master Burger Point Kasur — The Oldest & Best Burger Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Burger Point Kasur | The Oldest Burger Shop",
    description: "Special Master Burgers, Bun Plaster, Shawarma & Late-Night Delivery till 4 AM.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    name: RESTAURANT_INFO.name,
    alternateName: RESTAURANT_INFO.urduName,
    image: `${SITE_URL}/images/hero-food.jpg`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: RESTAURANT_INFO.phonePrimary,
    servesCuisine: ["Fast Food", "Burgers", "Shawarma", "Sandwiches", "Broast", "Pakistani Fast Food"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chandni Chowk, Railway Road, near Raja Centre",
      addressLocality: "Kasur",
      addressRegion: "Punjab",
      addressCountry: "PK",
      postalCode: "55050",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.1165,
      longitude: 74.4485,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "12:00",
        closes: "04:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.1",
      reviewCount: "24",
      bestRating: "5",
      worstRating: "1",
    },
    menu: `${SITE_URL}/menu`,
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: RESTAURANT_INFO.whatsappUrl,
        inLanguage: "en-PK",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  return (
    <html lang="en" className={`${lilita.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Chat / WhatsApp / Social Crawlers Static Fallbacks */}
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:secure_url" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Master Burger Point Kasur - The Oldest & Best Burger Shop" />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <link rel="image_src" href={`${SITE_URL}/images/og-image.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col pb-16 md:pb-0 bg-[#FFFDF7] text-[#231815] selection:bg-[#FFC20E] selection:text-[#730C0C]">
        {children}
        <CartDrawer />
        <CartToast />
        <MobileActionBar />
      </body>
    </html>
  );
}
