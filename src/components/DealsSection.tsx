"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tag, Check, Users, ShoppingBag, Sparkles, Share2 } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { DEALS, DealItem } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

export function DealsSection() {
  const { addItem, showToast } = useCartStore();
  const [addedDealId, setAddedDealId] = useState<string | null>(null);

  const handleShareDeal = async (deal: DealItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/#deals` : `${SITE_URL}/#deals`;
    const text = `Check out ${deal.title} at Master Burger Point Kasur! 🍔 ${deal.description} — Only Rs ${deal.price}:`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `${deal.title} | Master Burger Point Kasur`, text, url });
        return;
      } catch {
        // Fallback
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        showToast(`Copied ${deal.title} link! Share it in any chat 🍔`);
        return;
      } catch {
        // Fallback
      }
    }

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
  };

  const handleAddDeal = (deal: DealItem) => {
    addItem({
      id: deal.id,
      name: deal.title,
      price: deal.price,
      image: deal.image,
      isDeal: true,
    });

    setAddedDealId(deal.id);
    setTimeout(() => setAddedDealId(null), 1000);
  };

  return (
    <section id="deals" className="py-8 sm:py-16 md:py-20 bg-[#FFF5D9]/70 relative overflow-hidden">
      {/* Decorative Warm Wave Divider Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8B1A1A] text-[#FFF6DC] text-xs font-black uppercase tracking-wider shadow">
            <Tag className="w-3.5 h-3.5 text-[#FFC20E]" />
            <span>Mega Savings • Master Value Deals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#141414] leading-tight">
            Special Value Combo Deals
          </h2>
          <p className="text-sm sm:text-base text-[#5C4E4B]">
            Hand-picked combinations offering unbeatable value for solo diners, friends, and family gatherings. Prepared fresh by Kasur&apos;s oldest master cooks!
          </p>
        </div>

        {/* 4 Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEALS.map((deal, index) => {
            const isAdded = addedDealId === deal.id;
            const isFeatured = index === 2 || index === 3; // Mega deals

            return (
              <motion.div
                key={deal.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className={`rounded-3xl p-5 flex flex-col justify-between transition-all relative group ${
                  isFeatured
                    ? "bg-[#FFFDF7] border-2 border-[#8B1A1A] shadow-xl"
                    : "bg-white border border-[#8B1A1A]/15 shadow-md hover:shadow-xl"
                }`}
              >
                {/* Popular Pill */}
                {deal.badge && (
                  <div className="absolute -top-3 left-6 bg-[#FFC20E] text-[#730C0C] px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{deal.badge}</span>
                  </div>
                )}

                <div>
                  {/* Deal Image */}
                  <div
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#FFF5D9] mb-4 mt-1"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-white flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#FFC20E]" />
                      <span>{deal.serves}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-display text-[#141414] leading-tight mb-1">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-[#5C4E4B] mb-4 line-clamp-2">
                    {deal.description}
                  </p>

                  {/* Checklist Items */}
                  <div className="space-y-2 py-3 border-y border-gray-100">
                    {deal.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#141414] font-medium leading-tight">
                        <div className="w-4 h-4 rounded-full bg-[#FFF5D9] text-[#8B1A1A] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Price & Order Deal Button */}
                <div className="mt-5 pt-2">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500 uppercase">Combo Price</span>
                    <span className="text-2xl font-display text-[#8B1A1A] tracking-tight">
                      Rs {deal.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddDeal(deal)}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[#8B1A1A] hover:bg-[#630F0F] text-[#FFFDF7]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Feast Bag!
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-[#FFC20E]" /> Order This Deal
                        </>
                      )}
                    </button>
                    <button
                      onClick={(e) => handleShareDeal(deal, e)}
                      className="p-3 rounded-xl bg-white hover:bg-[#FFF5D9] text-[#8B1A1A] border border-[#8B1A1A]/20 shadow-sm active:scale-95 transition-all cursor-pointer"
                      title="Share deal link on chat"
                      aria-label={`Share ${deal.title} on chat`}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
