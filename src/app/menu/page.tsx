import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { MenuSection } from "@/components/MenuSection";
import { DealsSection } from "@/components/DealsSection";
import { Footer } from "@/components/Footer";
import { Utensils, Sparkles, Clock, Truck, MapPin } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Full Menu & Deals | Master Burger Point Kasur",
  description:
    "Explore the complete Master Burger Point menu in Kasur: Special Master Burger, Bun Plaster, Zinger, Beef & Mutton Burgers, Chicken Shawarma, Paratha Rolls, Club Sandwiches & Loaded Fries. Open till 4 AM.",
  openGraph: {
    title: "Master Burger Point Full Menu & Deals | Kasur",
    description:
      "Kasur's Oldest Burger Shop menu: Burgers, Shawarma, Paratha Rolls, Club Sandwiches, Injected Broast & Value Deals. Railway Road, Kasur.",
    url: `${SITE_URL}/menu`,
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
        alt: "Master Burger Point Kasur Full Feast Menu & Combo Deals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Burger Point Full Menu & Deals | Kasur",
    description:
      "Kasur's Oldest Burger Shop: Special Master Burger, Bun Plaster, Shawarma & Late Night Food.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
};

export default function MenuPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FFFDF7]">
      <Navbar />

      {/* Menu Header Banner */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-[#FFF5D9] to-[#FFFDF7] border-b border-[#8B1A1A]/10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1A1A] text-[#FFF6DC] text-xs font-black uppercase tracking-wider shadow">
            <Utensils className="w-3.5 h-3.5 text-[#FFC20E]" />
            <span>Official Dining, Takeout &amp; Delivery Menu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#141414] leading-tight">
            Master Burger Point Menu
          </h1>

          <p className="text-sm sm:text-base text-[#5C4E4B] max-w-2xl mx-auto font-medium">
            &ldquo;The Oldest &amp; Best Burger Shop in Kasur&rdquo; — Experience iconic Kasuri taste crafted by veteran master cooks. Burgers, Shawarmas, Paratha Rolls, Club Sandwiches &amp; Crispy Broast freshly made to order!
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-[#8B1A1A]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#FFC20E] shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>12:00 PM – 4:00 AM Daily</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#FFC20E] shadow-sm">
              <Truck className="w-3.5 h-3.5" />
              <span>Dine-In • Takeout • Late Night Delivery</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#FFC20E] shadow-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>Chandni Chowk, Railway Road, Kasur</span>
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Menu Filtering & Items */}
      <MenuSection />

      {/* Value Combo Deals */}
      <DealsSection />

      <Footer />
    </main>
  );
}
