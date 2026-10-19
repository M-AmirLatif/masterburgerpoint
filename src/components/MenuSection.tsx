"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Check, Star, Sparkles, Filter, X } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { MENU_ITEMS, CATEGORIES, MenuItem } from "@/data/menu";

export function MenuSection() {
  const { addItem } = useCartStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedFlavours, setSelectedFlavours] = useState<Record<string, string>>({});
  const [addedItemAnim, setAddedItemAnim] = useState<string | null>(null);

  // Filter items based on active category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all"
          ? true
          : activeCategory === "signature"
          ? item.isSignature
          : item.category === activeCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (item: MenuItem) => {
    const currentSize =
      selectedSizes[item.id] || (item.sizes ? item.sizes[0].name : undefined);
    const currentFlavour =
      selectedFlavours[item.id] || (item.flavours ? item.flavours[0] : undefined);

    const price = item.sizes
      ? item.sizes.find((s) => s.name === currentSize)?.price || item.price
      : item.price;

    addItem({
      id: item.id,
      name: item.name,
      price,
      sizeName: currentSize,
      flavour: currentFlavour,
      image: item.image,
    });

    setAddedItemAnim(item.id);
    setTimeout(() => setAddedItemAnim(null), 900);
  };

  return (
    <section id="menu" className="py-8 sm:py-16 md:py-20 bg-[#FFFDF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5D9] border border-[#FFC20E] text-xs font-black text-[#8B1A1A] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC20E] fill-[#FFC20E]" />
            <span>Prepared Fresh To Order</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#141414] leading-tight">
            Full Interactive Restaurant Menu
          </h2>
          <p className="text-sm sm:text-base text-[#5C4E4B]">
            From the legendary Special Master Burger and Bun Plaster to sizzling Shawarma platters and Club Sandwiches, every item is prepared fresh by Kasur&apos;s veteran master cooks.
          </p>
        </div>

        {/* Sticky Search & Category Bar */}
        <div className="sticky top-[68px] z-20 bg-[#FFFDF7]/95 backdrop-blur-md py-3.5 px-3 sm:px-5 rounded-2xl border border-[#8B1A1A]/15 shadow-md mb-8 space-y-3">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, shawarma, paratha rolls, sandwiches..."
              className="w-full pl-10 pr-10 py-2.5 rounded-full border border-[#8B1A1A]/20 bg-white text-xs sm:text-sm text-[#141414] placeholder-gray-400 focus:outline-none focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/20 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Chips Bar: Clean horizontal scroll with safe padding and no clipping */}
          <div className="w-full overflow-x-auto pb-1 pt-0.5 scrollbar-none scroll-smooth">
            <div className="flex items-center gap-2 min-w-max px-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={(e) => {
                      setActiveCategory(cat.id);
                      setSearchQuery("");
                      e.currentTarget.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                        block: "nearest",
                      });
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#8B1A1A] text-white shadow-md border border-[#8B1A1A]"
                        : "bg-white text-[#4A3B32] hover:text-[#8B1A1A] hover:bg-[#FFF5D9] border border-[#8B1A1A]/15"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Count & Current Filter Info */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#5C4E4B] mb-6">
          <span>
            Showing <strong className="text-[#8B1A1A]">{filteredItems.length}</strong> delicious items
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          {activeCategory !== "all" && (
            <button
              onClick={() => setActiveCategory("all")}
              className="text-[#8B1A1A] hover:underline cursor-pointer font-bold"
            >
              Reset Category
            </button>
          )}
        </div>

        {/* Menu Items Grid: Silky smooth instant fade without grid thrashing */}
        <motion.div
          key={activeCategory + searchQuery}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filteredItems.map((item) => {
            const currentSize =
              selectedSizes[item.id] || (item.sizes ? item.sizes[0].name : undefined);
            const currentFlavour =
              selectedFlavours[item.id] || (item.flavours ? item.flavours[0] : undefined);

            const currentPrice = item.sizes
              ? item.sizes.find((s) => s.name === currentSize)?.price || item.price
              : item.price;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-[#8B1A1A]/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                  <div>
                    {/* Item Image */}
                    <div
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF5D9] mb-3"
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.badge && (
                        <div className="absolute top-2.5 left-2.5 bg-[#8B1A1A] text-[#FFF6DC] px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                          {item.badge}
                        </div>
                      )}
                      {item.spicyLevel && (
                        <div className="absolute top-2.5 right-2.5 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                          {"🌶️".repeat(item.spicyLevel)}
                        </div>
                      )}
                    </div>

                    {/* Name & Description */}
                    <h3 className="text-base font-extrabold text-[#141414] group-hover:text-[#8B1A1A] transition-colors leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#5C4E4B] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Size Selector Buttons */}
                    {item.sizes && item.sizes.length > 1 && (
                      <div className="mt-2.5 pt-2 border-t border-gray-100">
                        <label className="text-[10px] font-bold text-gray-500 block mb-1">
                          Size Options:
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {item.sizes.map((s) => (
                            <button
                              key={s.name}
                              onClick={() =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [item.id]: s.name,
                                }))
                              }
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                                currentSize === s.name
                                  ? "bg-[#8B1A1A] text-white"
                                  : "bg-[#FFF5D9] text-[#630F0F] hover:bg-[#FFEBB5]"
                              }`}
                            >
                              {s.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Flavour Selector for Deep Dish */}
                    {item.flavours && (
                      <div className="mt-2 pt-1.5 border-t border-gray-100">
                        <label className="text-[10px] font-bold text-gray-500 block mb-1">
                          Flavour:
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {item.flavours.map((fl) => (
                            <button
                              key={fl}
                              onClick={() =>
                                setSelectedFlavours((prev) => ({
                                  ...prev,
                                  [item.id]: fl,
                                }))
                              }
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors cursor-pointer ${
                                currentFlavour === fl
                                  ? "bg-[#FFC20E] text-[#730C0C]"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {fl}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Price & Add Button */}
                  <div className="mt-4 pt-2.5 border-t border-[#8B1A1A]/10 flex items-center justify-between">
                    <div>
                      <span className="text-base font-display text-[#8B1A1A] tracking-tight">
                        Rs {currentPrice.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95 ${
                        addedItemAnim === item.id
                          ? "bg-emerald-600 text-white"
                          : "bg-[#FFC20E] hover:bg-[#E5AC00] text-[#730C0C]"
                      }`}
                      aria-label={`Add ${item.name} to order`}
                    >
                      {addedItemAnim === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
        </motion.div>

        {/* Empty Search Result Fallback */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <p className="text-4xl">🔍</p>
            <h3 className="text-lg font-bold text-[#141414]">No items found</h3>
            <p className="text-xs text-[#5C4E4B] max-w-sm mx-auto">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching for &quot;master&quot;, &quot;zinger&quot;, &quot;broast&quot;, or &quot;shawarma&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-[#8B1A1A] text-white text-xs font-bold cursor-pointer"
            >
              View Full Menu
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
