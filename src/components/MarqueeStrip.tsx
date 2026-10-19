"use client";

const MARQUEE_ITEMS = [
  "SPECIAL MASTER BURGER",
  "BUN PLASTER BURGER",
  "CHICKEN & ZINGER SHAWARMA",
  "ZINGER CHEESE PARATHA ROLL",
  "GOLU MOLU CLUB SANDWICH",
  "MUTTON & BEEF BURGERS",
  "INJECTED BROAST",
  "CHEESE LOADED FRIES",
  "KASUR'S OLDEST BURGER SHOP",
  "OPEN TILL 4:00 AM",
  "VETERAN MASTER COOKS",
];

export function MarqueeStrip() {
  return (
    <div
      id="marquee"
      className="relative w-full overflow-hidden bg-[#FFC20E] text-[#630F0F] py-3.5 border-y-2 border-[#8B1A1A] shadow-md select-none"
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* First Loop */}
        {MARQUEE_ITEMS.map((item, index) => (
          <div key={`m1-${index}`} className="flex items-center gap-8 font-display text-sm sm:text-base tracking-wider">
            <span className="hover:text-[#8B1A1A] transition-colors">{item}</span>
            <span className="text-[#8B1A1A] text-lg">★</span>
          </div>
        ))}

        {/* Duplicate for Seamless Loop */}
        {MARQUEE_ITEMS.map((item, index) => (
          <div key={`m2-${index}`} className="flex items-center gap-8 font-display text-sm sm:text-base tracking-wider">
            <span className="hover:text-[#8B1A1A] transition-colors">{item}</span>
            <span className="text-[#8B1A1A] text-lg">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
