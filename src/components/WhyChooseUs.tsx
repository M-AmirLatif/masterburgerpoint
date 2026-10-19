"use client";

import { motion } from "framer-motion";
import { Truck, Moon, HeartHandshake, Users, Award, ShieldCheck, Flame } from "lucide-react";

const FEATURES = [
  {
    icon: Award,
    title: "Kasur's Oldest Burger Shop",
    desc: "A true landmark in Kasur city. Our veteran cooks have decades of authentic burger-making mastery passed down through generations.",
    badge: "Decades of Heritage",
  },
  {
    icon: Moon,
    title: "Open Till 4:00 AM Daily",
    desc: "Late-night cravings? We've got you covered. From 12:00 PM noon right up to 4:00 AM midnight, 7 days a week.",
    badge: "16 Hours Daily",
  },
  {
    icon: Flame,
    title: "100% Halal, Fresh & Handcrafted",
    desc: "Special Master Burgers, Kasuri Bun Plaster, crispy Zinger, tender mutton & beef patties, and fresh chicken shawarma.",
    badge: "Master Taste",
  },
  {
    icon: Truck,
    title: "Dine-in, Takeout & Delivery",
    desc: "Conveniently located at Chandni Chowk, Railway Road, near Raja Centre. Grab a quick bite, take away, or order home delivery.",
    badge: "Fast Service",
  },
];

const STATS = [
  {
    value: "4.1 ★",
    label: "Google Rating",
    detail: "Loved by Kasur foodies & local guides",
  },
  {
    value: "12 PM – 4 AM",
    label: "Operating Hours",
    detail: "Open late night till 4:00 AM daily",
  },
  {
    value: "50+",
    label: "Menu Varieties",
    detail: "Burgers, shawarma, rolls & sandwiches",
  },
  {
    value: "Oldest",
    label: "Fast Food Point",
    detail: "Decades of authentic cooking heritage",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-8 sm:py-16 md:py-20 bg-[#FFFDF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5D9] border border-[#FFC20E] text-xs font-black text-[#8B1A1A] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#FFC20E] fill-[#FFC20E]" />
            <span>The Master Burger Point Promise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#141414] leading-tight">
            Why Kasur Loves Master Burger Point
          </h2>
          <p className="text-sm sm:text-base text-[#5C4E4B]">
            From our legendary Bun Plaster and Special Master Burger to freshly rolled shawarmas and club sandwiches, taste the legacy that Kasuris swear by!
          </p>
        </div>

        {/* 4 Feature Icon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 border border-[#8B1A1A]/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5D9] text-[#8B1A1A] flex items-center justify-center mb-4 border border-[#FFC20E]/40">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFF5D9] text-[#8B1A1A] inline-block mb-2">
                    {feat.badge}
                  </span>
                  <h3 className="text-lg font-bold text-[#141414] mb-2 leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#5C4E4B] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row Banner */}
        <div className="bg-[#8B1A1A] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-4 border-[#FFC20E]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC20E]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl md:text-5xl font-display text-[#FFC20E] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-xs text-white/70">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
