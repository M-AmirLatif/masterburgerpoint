"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Star, Flame, Sparkles, Check, Share2 } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { MENU_ITEMS, MenuItem } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

// Filter the 6 featured signatures from Master Burger Point
const SIGNATURE_IDS = [
  "special-master-burger",
  "bun-plaster-burger",
  "zinger-burger",
  "zinger-chicken-mix-platter",
  "golu-molu-club-sandwich",
  "injected-broast",
];

const ITEM_HIGHLIGHTS: Record<string, string[]> = {
  "special-master-burger": ["Double Juicy Patty", "Cheddar Cheese", "Farm Fresh Egg"],
  "bun-plaster-burger": ["Kasuri Tawa Style", "Golden Egg Crust", "Tangy Chutney"],
  "zinger-burger": ["Whole Chicken Fillet", "Fiery Crispy Batter", "Garlic Mayo"],
  "zinger-chicken-mix-platter": ["Zinger & Roasted Chicken", "2 Pita Breads", "Garlic Dip & Fries"],
  "golu-molu-club-sandwich": ["Triple Decker Jumbo", "Melted Cheese", "Fresh Salad Slaw"],
};

export function BestSellers() {
  const { addItem, showToast } = useCartStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedItemAnim, setAddedItemAnim] = useState<string | null>(null);

  const handleShareItem = async (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? window.location.origin : SITE_URL;
    const text = `Check out ${item.name} at Master Burger Point Kasur! 🍔 ${item.description} — Only Rs ${item.price}:`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: `${item.name} | Master Burger Point Kasur`, text, url });
        return;
      } catch {
        // Fallback
      }
    }
    
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        showToast(`Copied ${item.name} link! Share it in any chat 🍔`);
        return;
      } catch {
        // Fallback
      }
    }

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
  };

  const signatureItems = MENU_ITEMS.filter((item) =>
    SIGNATURE_IDS.includes(item.id)
  );

  const handleAddToCart = (item: MenuItem) => {
    const chosenSizeName = selectedSizes[item.id] || (item.sizes ? item.sizes[0].name : undefined);
    const chosenPrice = item.sizes
      ? item.sizes.find((s) => s.name === chosenSizeName)?.price || item.price
      : item.price;

    addItem({
      id: item.id,
      name: item.name,
      price: chosenPrice,
      sizeName: chosenSizeName,
      flavour: item.flavours ? item.flavours[0] : undefined,
      image: item.image,
    });

    setAddedItemAnim(item.id);
    setTimeout(() => setAddedItemAnim(null), 900);
  };

  return (
    <section id="signatures" className="py-8 sm:py-16 md:py-20 bg-[#FFFDF7] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FFC20E]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5D9] border border-[#FFC20E] text-xs font-black text-[#8B1A1A] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#FFC20E] fill-[#FFC20E]" />
            <span>Kasur&apos;s Legendary Tastes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#141414] leading-tight">
            Famous Signatures &amp; Best Sellers
          </h2>
          <p className="text-sm sm:text-base text-[#5C4E4B]">
            Hand-crafted with traditional spices and decades of culinary heritage by Kasur&apos;s oldest burger point. These are the legendary favorites you cannot miss.
          </p>
        </div>

        {/* Product Cards: Swipeable on mobile, Grid on desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
          {signatureItems.map((item) => {
            const currentSizeName =
              selectedSizes[item.id] || (item.sizes ? item.sizes[0].name : undefined);
            const displayPrice = item.sizes
              ? item.sizes.find((s) => s.name === currentSizeName)?.price || item.price
              : item.price;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="min-w-[285px] sm:min-w-[320px] md:min-w-0 snap-center bg-white rounded-3xl p-4 border border-[#8B1A1A]/10 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Food Image with Zoom on Hover */}
                  <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF5D9] mb-4"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 80vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-[#8B1A1A] text-[#FFF6DC] px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md">
                        {item.badge}
                      </div>
                    )}

                    {/* Share Button */}
                    <button
                      onClick={(e) => handleShareItem(item, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#8B1A1A] flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer border border-[#8B1A1A]/10"
                      title="Share link with preview on chat"
                      aria-label={`Share ${item.name} link`}
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#8B1A1A]" />
                    </button>

                    {/* Quality Star Rating */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 border border-white/20">
                      <Star className="w-3 h-3 text-[#FFC20E] fill-[#FFC20E]" />
                      <span>5.0</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold text-[#141414] group-hover:text-[#8B1A1A] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#5C4E4B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Size Selector if available, or Chef Highlights */}
                  {item.sizes && item.sizes.length > 1 ? (
                    <div className="mt-3 pt-2.5 border-t border-gray-100">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                        Select Serving Size:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {item.sizes.map((s) => (
                          <button
                            key={s.name}
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [item.id]: s.name,
                              }))
                            }
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              currentSizeName === s.name
                                ? "bg-[#8B1A1A] text-white shadow-sm"
                                : "bg-[#FFF5D9] text-[#630F0F] hover:bg-[#FFEBB5]"
                            }`}
                          >
                            {s.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : ITEM_HIGHLIGHTS[item.id] ? (
                    <div className="mt-3 pt-2.5 border-t border-gray-100">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                        Chef Highlights:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {ITEM_HIGHLIGHTS[item.id].map((chip) => (
                          <span
                            key={chip}
                            className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FFF5D9] text-[#630F0F] text-[10px] font-semibold border border-[#E86014]/15"
                          >
                            • {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Bottom Row: Price & Add Button */}
                <div className="mt-5 pt-3 border-t border-[#8B1A1A]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 block uppercase">Price</span>
                    <span className="text-lg font-display text-[#8B1A1A] tracking-tight">
                      Rs {displayPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 ${
                      addedItemAnim === item.id
                        ? "bg-emerald-600 text-white"
                        : "bg-[#FFC20E] hover:bg-[#E5AC00] text-[#730C0C]"
                    }`}
                    aria-label={`Add ${item.name} to feast bag`}
                  >
                    {addedItemAnim === item.id ? (
                      <>
                        <Check className="w-4 h-4" /> Added!
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[3]" /> Add to Bag
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
