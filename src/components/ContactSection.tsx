"use client";

import { MapPin, Phone, Send, Clock, Navigation, CheckCircle } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

export function ContactSection() {
  return (
    <section id="contact" className="py-8 sm:py-16 md:py-20 bg-[#FFFDF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5D9] border border-[#FFC20E] text-xs font-black text-[#8B1A1A] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#FFC20E] fill-[#FFC20E]" />
            <span>Visit Us In Kasur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#141414] leading-tight">
            Location, Hours &amp; Contact
          </h2>
          <p className="text-sm sm:text-base text-[#5C4E4B]">
            Visit Master Burger Point at Chandni Chowk, Railway Road, Kasur or order fast late-night delivery till 4:00 AM!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details, Phone Numbers & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#8B1A1A]/10 shadow-md space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF5D9] text-[#8B1A1A] flex items-center justify-center shrink-0 border border-[#FFC20E]/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141414]">Restaurant Address</h3>
                  <p className="text-xs sm:text-sm text-[#5C4E4B] mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs font-mono font-bold text-[#8B1A1A] mt-1.5">
                    Plus Code: {RESTAURANT_INFO.plusCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Calling & WhatsApp Action Buttons */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#8B1A1A]/10 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#141414] uppercase tracking-wider">
                  Direct Order &amp; Delivery
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Live Hotline
                </span>
              </div>

              {/* High-Impact WhatsApp Primary Button */}
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white flex items-center justify-between shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all cursor-pointer border border-emerald-400/30 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5 fill-white text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-100">WhatsApp Order</p>
                    <p className="text-sm font-black text-white font-mono">{RESTAURANT_INFO.phonePrimary}</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 text-xs font-black uppercase tracking-wider shrink-0 shadow-sm group-hover:bg-emerald-50 transition-colors">
                  Chat &rarr;
                </span>
              </a>

              {/* Direct Calling Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Phone 1 */}
                <a
                  href={`tel:${RESTAURANT_INFO.phonePrimary}`}
                  className="p-3.5 rounded-2xl bg-[#FFFDF7] hover:bg-[#FFF5D9] text-[#141414] flex items-center gap-3 border-2 border-[#8B1A1A]/15 hover:border-[#8B1A1A] transition-all cursor-pointer group active:scale-98 shadow-sm"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#8B1A1A] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-[#FFC20E]" />
                  </span>
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#8B1A1A]">Hotline (Call &amp; WA)</span>
                    <span className="text-xs sm:text-sm font-black font-mono text-[#141414]">{RESTAURANT_INFO.phonePrimary}</span>
                  </div>
                </a>

                {/* Phone 2 */}
                <a
                  href={`tel:${RESTAURANT_INFO.phoneSecondary}`}
                  className="p-3.5 rounded-2xl bg-[#FFFDF7] hover:bg-[#FFF5D9] text-[#141414] flex items-center gap-3 border-2 border-[#8B1A1A]/15 hover:border-[#8B1A1A] transition-all cursor-pointer group active:scale-98 shadow-sm"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#8B1A1A] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-[#FFC20E]" />
                  </span>
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#8B1A1A]">Alternate Line</span>
                    <span className="text-xs sm:text-sm font-black font-mono text-[#141414]">{RESTAURANT_INFO.phoneSecondary}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#8B1A1A]/10 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF5D9] text-[#8B1A1A] flex items-center justify-center shrink-0 border border-[#FFC20E]/40">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#141414]">Operating Schedule</h3>
                  <p className="text-xs text-[#5C4E4B]">Open 7 Days a Week • Closes 4 AM</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF7] border border-[#8B1A1A]/10">
                  <span className="font-semibold text-gray-700">Monday – Sunday</span>
                  <span className="font-extrabold text-[#8B1A1A]">12:00 PM – 4:00 AM</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF7] border border-[#8B1A1A]/10">
                  <span className="font-semibold text-gray-700">Home Delivery Hours</span>
                  <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    12:00 PM – 4:00 AM
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF7] border border-[#8B1A1A]/10">
                  <span className="font-semibold text-gray-700">Service Options</span>
                  <span className="font-extrabold text-[#8B1A1A] bg-[#FFF5D9] px-2 py-0.5 rounded-md border border-[#FFC20E]/40">
                    Dine-In • Takeout • Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Restaurant Features Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {RESTAURANT_INFO.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-white border border-[#8B1A1A]/12 text-[11px] sm:text-xs font-bold text-[#141414] shadow-sm flex items-center gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Embedded Google Map & Directions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-[#8B1A1A]/10 shadow-xl overflow-hidden">
              <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden bg-gray-100">
                <iframe
                  title="Master Burger Point Kasur Railway Road Google Map"
                  src={RESTAURANT_INFO.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Map Footer Bar */}
              <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-[#141414]">Chandni Chowk, Railway Road</p>
                  <p className="text-[11px] text-[#5C4E4B]">Near Raja Centre, Kasur, 55050</p>
                </div>

                <a
                  href={RESTAURANT_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8B1A1A] hover:bg-[#630F0F] text-[#FFFDF7] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#FFC20E]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
