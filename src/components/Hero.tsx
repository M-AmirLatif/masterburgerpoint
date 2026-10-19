"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { getRestaurantStatus } from "@/lib/restaurantStatus";
import {
  Star,
  Truck,
  Clock,
  Send,
  ChevronDown,
  Sparkles,
  Flame,
  Phone,
  Award,
} from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

const TYPEWRITER_WORDS = [
  "Special Master Burger.",
  "Bun Plaster Burger.",
  "Zinger & Shawarma.",
  "Kasur's Oldest Taste!",
];

export function Hero() {
  const { currentText, isReducedMotion } = useTypewriter({
    words: TYPEWRITER_WORDS,
    typingSpeed: 85,
    deletingSpeed: 45,
    pauseDuration: 1900,
  });

  const [status, setStatus] = useState({
    isOpen: true,
    statusText: "Open Now • Closes 4:00 AM",
    badgeLabel: "Open Now",
  });

  useEffect(() => {
    setStatus(getRestaurantStatus());
    const interval = setInterval(() => setStatus(getRestaurantStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-20 sm:pt-24 pb-8 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#FFF5D9]/80 via-[#FFFDF7] to-[#FFFDF7]"
      aria-label="Hero Introduction"
    >
      {/* Decorative Warm Backdrops */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FFC20E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-[#8B1A1A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Copy, Typing Headline & CTAs */}
          <motion.div
            initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left pt-1 lg:pt-0"
          >
            {/* Official Mascot Badge & Tagline */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <div
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#FFC20E] shadow-md overflow-hidden bg-[#141414] shrink-0 hover:scale-105 transition-transform"
                style={{ position: "relative" }}
              >
                <Image
                  src="/mascot-badge.svg"
                  alt="Master Burger Point Official Mascot"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <span className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#8B1A1A]">
                  The Oldest Shop in Kasur • Railway Road
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#141414] italic">
                  &ldquo;Authentic Taste by Highly Experienced Master Cooks&rdquo;
                </span>
              </div>
            </div>

            {/* Badges Bar: Symmetrical on mobile, single seamless row on desktop */}
            <div className="w-full max-w-md sm:max-w-xl lg:max-w-none mx-auto lg:mx-0 pt-0.5">
              <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center lg:justify-start gap-2">
                {/* Live Hours Badge */}
                <div
                  className={`col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold shadow-sm ${
                    status.isOpen
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-amber-100 text-amber-900 border border-amber-300"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="whitespace-nowrap">{status.badgeLabel} • Closes 4 AM</span>
                </div>

                {/* Real 4.1 Google Rating Badge */}
                <div className="col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#FFC20E] text-[11px] sm:text-xs font-bold text-[#141414] shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-[#FFC20E] text-[#FFC20E] shrink-0" />
                  <span className="font-extrabold text-[#8B1A1A]">4.1</span>
                  <span className="text-[10px] sm:text-[11px] text-[#5C4E4B] font-semibold whitespace-nowrap">(24 Reviews)</span>
                </div>

                {/* Service Chip */}
                <div className="col-span-2 sm:col-span-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8B1A1A] text-[#FFF6DC] text-[11px] sm:text-xs font-bold shadow-sm whitespace-nowrap">
                  <Truck className="w-3.5 h-3.5 text-[#FFC20E] shrink-0" />
                  <span>Dine-In • Takeout • Delivery</span>
                </div>
              </div>
            </div>

            {/* Headline with Typewriter */}
            <div className="space-y-1 sm:space-y-2">
              <span className="block text-[11px] sm:text-sm md:text-base font-black tracking-wider text-[#8B1A1A] uppercase">
                Kasur&apos;s Legendary Burger Hub 🍔
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-display text-[#141414] leading-[1.12] sm:leading-[1.08] tracking-tight">
                Authentic, Fresh &amp; Famous{" "}
                <span className="relative inline-block text-[#8B1A1A]">
                  <span className="text-[#8B1A1A] drop-shadow-sm">
                    {currentText}
                  </span>
                  {!isReducedMotion && (
                    <span className="inline-block w-1 h-[0.85em] bg-[#FFC20E] ml-1 align-baseline animate-pulse" />
                  )}
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-xs sm:text-base md:text-lg text-[#2E1E1C] max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              <span className="sm:hidden">
                Master Burger Point is the oldest burger shop in Kasur. Savor Special Master Burgers, Bun Plaster, Zinger, Shawarma &amp; Club Sandwiches. Open till 4:00 AM!
              </span>
              <span className="hidden sm:inline">
                &ldquo;The Oldest Burger Shop in Kasur&rdquo; — Made by veteran cooks with decades of culinary heritage. Feast on our Special Master Burger, Bun Plaster, crispy Zinger, sizzling Shawarma platters, and loaded fries at Chandni Chowk, Railway Road, Kasur. Open daily till 4:00 AM!
              </span>
            </p>

            {/* Primary Action Buttons (2-Column Grid on Mobile for compact height) */}
            <div className="grid grid-cols-2 sm:flex items-center justify-center lg:justify-start gap-2.5 pt-1 sm:pt-2">
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all active:scale-95 cursor-pointer border border-white/20"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
                <span>WhatsApp Order</span>
              </a>

              <Link
                href="/menu"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#8B1A1A] hover:bg-[#630F0F] text-[#FFFDF7] font-extrabold text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#8B1A1A]/20 transition-all active:scale-95 cursor-pointer border border-[#FFC20E]/40"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC20E] shrink-0" />
                <span>Explore Menu</span>
              </Link>
            </div>

            {/* Quick Contact Line (Unified Single-Line Badge) */}
            <div className="flex items-center justify-center lg:justify-start pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-[#8B1A1A]/15 text-[11px] sm:text-xs font-bold text-[#5C4E4B] shadow-sm">
                <Phone className="w-3.5 h-3.5 text-[#8B1A1A] shrink-0" />
                <span>Call Hotline:</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phonePrimary}`}
                  className="text-[#8B1A1A] font-black hover:underline font-mono"
                >
                  {RESTAURANT_INFO.phonePrimary}
                </a>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">Railway Road, Kasur</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Impact Photography with Floating Badges */}
          <motion.div
            initial={isReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Media Card */}
            <div className="relative mx-auto max-w-[480px] lg:max-w-none">
              <div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFF5D9] bg-white group"
                style={{ position: "relative" }}
              >
                <Image
                  src="/images/hero-food.jpg"
                  alt="Master Burger Point signature burgers, chicken shawarma, fries and starters spread"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Bottom caption overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-display text-[#FFC20E]">MASTER BURGER POINT</p>
                    <p className="text-[11px] text-white/90 font-medium">Special Master Burger • Bun Plaster • Shawarma</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFC20E] text-[#8B1A1A] text-[11px] font-black">
                    Est. Kasur
                  </span>
                </div>
              </div>

              {/* Floating Badge Top Right */}
              <motion.div
                animate={isReducedMotion ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 sm:-right-4 bg-white px-3.5 py-2 rounded-2xl shadow-xl border-2 border-[#FFC20E] flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFF5D9] text-[#8B1A1A] flex items-center justify-center font-bold">
                  🍔
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-[#8B1A1A]">Kasuri Specialty</p>
                  <p className="text-xs font-extrabold text-[#141414]">Bun Plaster Burger</p>
                </div>
              </motion.div>

              {/* Floating Badge Bottom Left */}
              <motion.div
                animate={isReducedMotion ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-2 sm:-left-4 bg-[#8B1A1A] text-white px-3.5 py-2 rounded-2xl shadow-xl border-2 border-[#FFC20E] flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFC20E] text-[#8B1A1A] flex items-center justify-center font-bold">
                  ⭐
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-[#FFC20E]">Kasur&apos;s Heritage</p>
                  <p className="text-xs font-extrabold text-white">Oldest Shop in Town</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div className="pt-12 text-center hidden md:block">
          <Link
            href="#marquee"
            className="inline-flex flex-col items-center text-xs font-bold text-[#8B1A1A]/70 hover:text-[#8B1A1A] transition-colors"
          >
            <span>Scroll to Taste the Menu</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-[#8B1A1A]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
