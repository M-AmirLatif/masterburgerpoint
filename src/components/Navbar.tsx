"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import { getRestaurantStatus } from "@/lib/restaurantStatus";
import { Menu, X, ShoppingBag, Phone, Send, Sparkles, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RESTAURANT_INFO } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

const NAV_LINKS = [
  { name: "Home", href: "/#home" },
  { name: "Menu", href: "/menu" },
  { name: "Deals", href: "/#deals" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Visit & Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState({ isOpen: true, badgeLabel: "Open Now" });
  const [copied, setCopied] = useState(false);
  const { getTotalCount, openCart, showToast } = useCartStore();
  const cartCount = getTotalCount();

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : SITE_URL;
    const shareData = {
      title: "Master Burger Point | The Oldest & Best Burger Shop in Kasur",
      text: "Check out Master Burger Point Kasur! Savor Special Master Burger, Bun Plaster, Zinger, Shawarma & Club Sandwiches 🍔🔥",
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fall through to clipboard if user dismissed or cancelled
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        showToast("Link copied to clipboard! Paste in any chat to view the preview 🍔");
        setTimeout(() => setCopied(false), 2500);
        return;
      } catch {
        // Fall through
      }
    }

    // Direct WhatsApp share fallback
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareData.text} ${shareData.url}`
      )}`,
      "_blank"
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    setStatus(getRestaurantStatus());
    const interval = setInterval(() => setStatus(getRestaurantStatus()), 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-lg py-2"
            : "bg-[#FFFDF7]/95 backdrop-blur-sm py-3.5 border-b border-[#8B1A1A]/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform active:scale-95"
              aria-label="Master Burger Point Home"
            >
              <div
                className="relative w-44 sm:w-52 h-11 sm:h-12"
                style={{ position: "relative" }}
              >
                <Image
                  src="/logo.svg"
                  alt="Master Burger Point — Kasur's Oldest Burger Shop"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-2 rounded-xl text-sm font-bold text-[#231815] hover:text-[#8B1A1A] hover:bg-[#FFF5D9] transition-all cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Action Right Area */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Status Indicator */}
              <div
                className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  status.isOpen
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                <span>{status.badgeLabel} • Closes 4 AM</span>
              </div>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl bg-[#FFF5D9] hover:bg-[#FFEBB5] text-[#8B1A1A] transition-all transform active:scale-95 cursor-pointer flex items-center gap-2 border border-[#FFC20E]/40"
                aria-label={`View shopping cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden md:inline text-xs font-extrabold uppercase">Bag</span>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#8B1A1A] text-white text-[11px] font-black flex items-center justify-center shadow-md border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Share Website Link Button */}
              <button
                onClick={handleShare}
                className="relative p-2.5 rounded-xl bg-white hover:bg-[#FFF5D9] text-[#8B1A1A] transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5 border border-[#8B1A1A]/15 shadow-sm"
                aria-label="Share Master Burger Point link on WhatsApp or chat"
                title="Share link on WhatsApp or chat"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4 text-[#8B1A1A]" />
                )}
                <span className="hidden xl:inline text-xs font-bold text-[#141414]">
                  {copied ? "Copied!" : "Share"}
                </span>
              </button>

              {/* WhatsApp CTA Button */}
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#8B1A1A] hover:bg-[#630F0F] text-[#FFFDF7] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#FFC20E]/30"
              >
                <Send className="w-3.5 h-3.5 text-[#FFC20E] fill-[#FFC20E]" />
                <span>Order Now</span>
              </a>
            </div>

            {/* Mobile Controls (Bag + Hamburger) */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={openCart}
                className="relative p-2 rounded-xl bg-[#FFF5D9] text-[#8B1A1A] border border-[#FFC20E]/40"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8B1A1A] text-white text-[10px] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-[#8B1A1A] text-white focus:outline-none cursor-pointer"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[60px] left-0 right-0 z-30 bg-[#FFFDF7] border-b-2 border-[#8B1A1A]/15 shadow-2xl overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {/* Timing Banner */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF5D9] border border-[#FFC20E]/40 text-xs font-bold text-[#8B1A1A]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{status.badgeLabel} • Closes 4:00 AM</span>
                </div>
                <span className="text-[11px] text-[#630F0F]">Fast Delivery</span>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-white border border-[#8B1A1A]/10 text-sm font-bold text-[#141414] hover:bg-[#FFF5D9] hover:text-[#8B1A1A] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Quick Contacts & Sharing */}
              <div className="pt-2 border-t border-[#8B1A1A]/10 flex flex-col gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-[#FFC20E] text-[#8B1A1A] text-xs font-bold cursor-pointer hover:bg-[#FFF5D9] transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4 text-[#8B1A1A]" />
                  )}
                  <span>{copied ? "Link Copied to Clipboard!" : "Share Link to WhatsApp / Chat"}</span>
                </button>
                <a
                  href={`tel:${RESTAURANT_INFO.phonePrimary}`}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#8B1A1A] text-white text-xs font-bold cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#FFC20E]" />
                  <span>Call {RESTAURANT_INFO.phonePrimary}</span>
                </a>
                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#25D366] text-white text-xs font-bold cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Order Directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
