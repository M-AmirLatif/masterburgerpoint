"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock, Send, Heart, Sparkles, ExternalLink } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

export function Footer() {
  return (
    <footer className="bg-[#6B1212] text-[#FFFDF7] pt-16 pb-24 md:pb-12 border-t-4 border-[#FFC20E] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFC20E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-52 h-14" style={{ position: "relative" }}>
                <Image
                  src="/logo-white.svg"
                  alt="Master Burger Point Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-[#FFF6DC]/90 leading-relaxed max-w-sm font-medium">
              &ldquo;The Oldest &amp; Best Burger Shop in Kasur&rdquo; — Experience iconic Kasuri street food crafted by veteran master cooks. Special Master Burger, Bun Plaster, Shawarma, and loaded fries.
            </p>
            <div className="space-y-1.5 text-xs text-[#FFF6DC]/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFC20E] shrink-0" />
                <span>Chandni Chowk, Railway Road, Kasur</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFC20E] shrink-0" />
                <span>{RESTAURANT_INFO.phonePrimary}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FFC20E] shrink-0" />
                <span>12:00 PM – 4:00 AM Daily</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-display text-[#FFC20E] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/#home" className="hover:text-[#FFC20E] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#FFC20E] transition-colors">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link href="/#deals" className="hover:text-[#FFC20E] transition-colors">
                  Value Combo Deals
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#FFC20E] transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#FFC20E] transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FFC20E] transition-colors">
                  Location &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Signatures */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-display text-[#FFC20E] uppercase tracking-wider">
              Famous Signatures
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF6DC]/90 font-medium">
              <li>Special Master Burger (Signature)</li>
              <li>Bun Plaster Burger (Kasuri Classic)</li>
              <li>Zinger &amp; Grill Cheese Burger</li>
              <li>Zinger Chicken Mix Platter Shawarma</li>
              <li>Golu Molu Club Sandwich</li>
              <li>Injected Broast &amp; Loaded Fries</li>
            </ul>
          </div>

          {/* Column 4: Hours & Delivery */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-display text-[#FFC20E] uppercase tracking-wider">
              Late-Night Service
            </h4>
            <div className="p-4 rounded-2xl bg-black/25 border border-white/10 space-y-2 text-xs">
              <p className="font-bold text-[#FFC20E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Open Till 4:00 AM
              </p>
              <p className="text-white/80 leading-relaxed">
                Enjoy Dine-in, Takeout, or Home Delivery till 4 AM every night across Kasur!
              </p>
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#FFC20E] font-bold hover:underline pt-1 cursor-pointer"
              >
                <span>Order on WhatsApp now &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sales Demo Attribution & CTA */}
        <div className="pt-8 flex flex-col items-center justify-between gap-5 text-xs text-[#FFF6DC]/90">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:px-6 sm:py-3.5 rounded-2xl bg-[#141414] border-2 border-[#FFC20E]/40 shadow-2xl">
            <div className="flex items-center gap-2 text-white text-center sm:text-left">
              <span className="w-7 h-7 rounded-full bg-[#8B1A1A] flex items-center justify-center shrink-0 border border-[#FFC20E]/50">
                <Heart className="w-3.5 h-3.5 text-[#FFC20E] fill-[#FFC20E]" />
              </span>
              <div>
                <p className="text-[11px] text-white/70 uppercase tracking-wider font-bold">Restaurant Ordering Platform</p>
                <p className="text-xs sm:text-sm font-extrabold text-white">Master Burger Point • Official Website</p>
              </div>
            </div>

            <a
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FFC20E] hover:bg-[#E5AC00] text-[#730C0C] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>Order Direct on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          <p className="text-center text-[11px] text-[#FFF6DC]/70">
            &copy; 2026 Master Burger Point Kasur. &ldquo;The Oldest &amp; Best Burger Shop in Kasur&rdquo;. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
