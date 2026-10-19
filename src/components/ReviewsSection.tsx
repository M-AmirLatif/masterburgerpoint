"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, ExternalLink } from "lucide-react";
import { REVIEWS, RESTAURANT_INFO } from "@/data/menu";

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <section id="reviews" className="py-8 sm:py-16 md:py-20 bg-[#FFF5D9]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8B1A1A] text-[#FFF6DC] text-xs font-black uppercase tracking-wider shadow">
            <Star className="w-3.5 h-3.5 text-[#FFC20E] fill-[#FFC20E]" />
            <span>4.1 Rating on Google (24 Reviews)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#141414] leading-tight">
            Loved By Food Lovers Across Kasur
          </h2>
          <p className="text-sm sm:text-base text-[#5C4E4B]">
            Authentic Google Reviews from Local Guides and loyal customers who celebrate Master Burger Point as Kasur&apos;s oldest burger landmark.
          </p>
        </div>

        {/* Testimonials Display (Grid for Desktop, Carousel Controller for Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.id}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                rev.isReal
                  ? "bg-white border-2 border-[#8B1A1A] shadow-xl relative"
                  : "bg-white/90 border border-[#8B1A1A]/10 shadow-md"
              }`}
            >
              {rev.isReal && (
                <div className="absolute -top-3 left-6 bg-[#8B1A1A] text-[#FFC20E] px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#FFC20E]" />
                  <span>Real Google Review</span>
                </div>
              )}


              <div className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-[#FFC20E]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC20E]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[#141414] font-medium italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF5D9] text-[#8B1A1A] font-extrabold flex items-center justify-center text-sm border border-[#FFC20E]/40">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#141414] leading-tight">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-[#5C4E4B]">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Callout & Leave Review Link */}
        <div className="text-center pt-2">
          <a
            href={RESTAURANT_INFO.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FFF5D9] text-[#8B1A1A] font-bold text-xs uppercase tracking-wider border border-[#8B1A1A]/20 shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Rate Us / Leave a Review on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
