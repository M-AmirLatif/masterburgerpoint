"use client";

import { useCartStore } from "@/lib/cartStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Send,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  Truck,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { RESTAURANT_INFO } from "@/data/menu";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    orderType,
    setOrderType,
    customerAddress,
    setCustomerAddress,
    getSubtotal,
    getDeliveryFee,
    getFinalTotal,
    getAmountUntilFreeDelivery,
    generateWhatsAppUrl,
  } = useCartStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const finalTotal = getFinalTotal();
  const amountToFree = getAmountUntilFreeDelivery();
  const progressPercent = Math.min(100, Math.round((subtotal / RESTAURANT_INFO.minimumOrder) * 100));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="w-screen max-w-md bg-[#FFFDF7] shadow-2xl flex flex-col border-l border-[#8B1A1A]/10"
            >
              {/* Header */}
              <div className="px-5 py-4 bg-[#8B1A1A] text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC20E] text-[#8B1A1A] flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display tracking-wide flex items-center gap-2">
                      Your Feast Bag
                      <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-[#FFC20E] text-[#8B1A1A]">
                        {items.reduce((acc, i) => acc + i.quantity, 0)} items
                      </span>
                    </h2>
                    <p className="text-xs text-white/80 font-medium">Master Burger Point • Railway Road, Kasur</p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Meter */}
              <div className="bg-[#FFF5D9] px-5 py-3 border-b border-[#FFC20E]/30">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5 text-[#630F0F]">
                    <Truck className="w-4 h-4 text-[#8B1A1A]" />
                    {amountToFree === 0 ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> FREE Home Delivery Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#8B1A1A]">Rs {amountToFree}</strong> more for{" "}
                        <strong className="text-emerald-700">FREE Delivery</strong>
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-bold text-[#8B1A1A]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#E5D7B5] h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      amountToFree === 0 ? "bg-emerald-600" : "bg-[#FFC20E]"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Order Mode Toggle */}
              <div className="p-4 bg-white border-b border-[#8B1A1A]/10">
                <div className="grid grid-cols-2 p-1 bg-[#FFF5D9] rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === "delivery"
                        ? "bg-[#8B1A1A] text-white shadow-sm"
                        : "text-[#630F0F] hover:text-[#8B1A1A]"
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" /> Home Delivery
                  </button>
                  <button
                    onClick={() => setOrderType("takeaway")}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === "takeaway"
                        ? "bg-[#8B1A1A] text-white shadow-sm"
                        : "text-[#630F0F] hover:text-[#8B1A1A]"
                    }`}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" /> Takeaway / Pickup
                  </button>
                </div>
              </div>

              {/* Items List or Empty State */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#FFF5D9] border-2 border-dashed border-[#FFC20E] flex items-center justify-center text-3xl">
                      🍔
                    </div>
                    <div>
                      <h3 className="text-lg font-display text-[#141414]">Your Bag is Empty!</h3>
                      <p className="text-xs text-[#5C4E4B] max-w-xs mt-1">
                        Hungry? Explore our juicy Beef Smash Burgers, Injected Broast, or Chicago Deep Dish Pizza!
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="px-5 py-2.5 rounded-xl bg-[#FFC20E] hover:bg-[#E5AC00] text-[#730C0C] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                    >
                      Explore Menu <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-white rounded-2xl p-3 border border-[#8B1A1A]/10 shadow-sm flex items-center gap-3"
                    >
                      <div
                        className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#FFF5D9]"
                        style={{ position: "relative" }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-[#141414] truncate leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                          {item.sizeName && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFF5D9] text-[#8B1A1A]">
                              {item.sizeName}
                            </span>
                          )}
                          {item.flavour && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                              {item.flavour}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-[#8B1A1A]">
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2 bg-[#FFFDF7] border border-[#8B1A1A]/15 rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#8B1A1A] hover:bg-[#FFF5D9] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-[#141414]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#8B1A1A] hover:bg-[#FFF5D9] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Checkout Controls */}
              {items.length > 0 && (
                <div className="p-4 bg-white border-t border-[#8B1A1A]/10 space-y-3">
                  {/* Address Input */}
                  <div>
                    <label className="text-xs font-bold text-[#630F0F] flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8B1A1A]" />
                      {orderType === "delivery" ? "Delivery Address in Kasur:" : "Special Pickup Note:"}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        orderType === "delivery"
                          ? "e.g. House #12, Street 3, Near Chandni Chowk"
                          : "e.g. Packing as takeaway, pick up in 20 mins"
                      }
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#8B1A1A]/20 bg-[#FFFDF7] focus:border-[#8B1A1A] focus:outline-none"
                    />
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#5C4E4B] pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#141414]">Rs {subtotal.toLocaleString()}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between items-center">
                        <span>Home Delivery</span>
                        <span className="font-semibold">
                          {deliveryFee === 0 ? (
                            <span className="text-emerald-700 font-bold">FREE (Above Rs 700)</span>
                          ) : (
                            <span>Rs {deliveryFee}</span>
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-[#8B1A1A] pt-1 border-t border-[#8B1A1A]/10">
                      <span>Total Amount</span>
                      <span>Rs {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* WhatsApp Order Button */}
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all transform active:scale-[0.99] cursor-pointer"
                  >
                    <Send className="w-4 h-4 fill-white" />
                    <span>Send Order on WhatsApp</span>
                    <span className="ml-auto bg-black/15 px-2 py-0.5 rounded text-xs">
                      Rs {finalTotal.toLocaleString()}
                    </span>
                  </a>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                    <span>Direct WhatsApp: {RESTAURANT_INFO.phonePrimary}</span>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Clear Bag
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
