"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ZoomIn, Eye } from "lucide-react";
import { GALLERY_IMAGES } from "@/data/menu";

export function GallerySection() {
  const [activePhoto, setActivePhoto] = useState<{
    title: string;
    category: string;
    image: string;
  } | null>(null);

  return (
    <section id="gallery" className="py-8 sm:py-16 md:py-20 bg-[#FFFDF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5D9] border border-[#FFC20E] text-xs font-black text-[#8B1A1A] uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-[#FFC20E] fill-[#FFC20E]" />
            <span>Feast For Your Eyes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#141414] leading-tight">
            Master Burger Point Visual Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#5C4E4B]">
            Take a visual tour of our air-conditioned family sitting hall, welcoming dine-in ambience, live tawa grilling, and legendary handcrafted fast food at Railway Road, Kasur.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.015 }}
              onClick={() => setActivePhoto(item)}
              className="relative aspect-square sm:aspect-auto sm:h-72 rounded-3xl overflow-hidden bg-[#FFF5D9] cursor-pointer group shadow-sm hover:shadow-2xl transition-all border border-[#8B1A1A]/10"
              style={{ position: "relative" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Hover Overlay Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <span className="self-start text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFC20E] text-[#8B1A1A] shadow">
                  {item.category}
                </span>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-medium">Click to view full photo</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#FFC20E] group-hover:text-[#8B1A1A] transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-4xl w-full bg-[#141414] rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              {/* Image Container */}
              <div
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black"
                style={{ position: "relative" }}
              >
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Caption Bar */}
              <div className="p-4 sm:p-6 bg-[#1a1412] text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#FFC20E] uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <h4 className="text-lg sm:text-xl font-display text-white">
                    {activePhoto.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
