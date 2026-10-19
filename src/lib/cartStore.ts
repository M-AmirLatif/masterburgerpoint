"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RESTAURANT_INFO } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

export interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  sizeName?: string;
  flavour?: string;
  image: string;
  isDeal?: boolean;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  toast: string | null;
  customerAddress: string;
  orderType: "delivery" | "takeaway";
  
  // Actions
  addItem: (item: {
    id: string;
    name: string;
    price: number;
    sizeName?: string;
    flavour?: string;
    image: string;
    isDeal?: boolean;
  }) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCustomerAddress: (address: string) => void;
  setOrderType: (type: "delivery" | "takeaway") => void;
  showToast: (message: string) => void;
  hideToast: () => void;
  
  // Computed helpers
  getTotalCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getFinalTotal: () => number;
  getAmountUntilFreeDelivery: () => number;
  generateWhatsAppUrl: () => string;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toast: null,
      customerAddress: "",
      orderType: "delivery",

      addItem: ({ id, name, price, sizeName, flavour, image, isDeal }) => {
        const cartItemId = `${id}-${sizeName || "std"}-${flavour || "none"}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.cartItemId === cartItemId
        );

        let updatedItems: CartItem[];
        if (existingIndex > -1) {
          updatedItems = currentItems.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [
            ...currentItems,
            {
              cartItemId,
              id,
              name,
              price,
              quantity: 1,
              sizeName,
              flavour,
              image,
              isDeal,
            },
          ];
        }

        const toastDesc = sizeName ? `${name} (${sizeName})` : name;
        set({
          items: updatedItems,
          toast: `Added ${toastDesc} to your cart! 🍔`,
        });

        // Auto hide toast after 3s
        setTimeout(() => {
          if (get().toast?.includes(name)) {
            set({ toast: null });
          }
        }, 3200);
      },

      removeItem: (cartItemId) => {
        set({
          items: get().items.filter((item) => item.cartItemId !== cartItemId),
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setCustomerAddress: (address) => set({ customerAddress: address }),
      setOrderType: (type) => set({ orderType: type }),
      showToast: (message) => set({ toast: message }),
      hideToast: () => set({ toast: null }),

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (get().orderType === "takeaway" || subtotal === 0) return 0;
        return subtotal >= RESTAURANT_INFO.minimumOrder ? 0 : 150;
      },

      getFinalTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee();
      },

      getAmountUntilFreeDelivery: () => {
        const subtotal = get().getSubtotal();
        const diff = RESTAURANT_INFO.minimumOrder - subtotal;
        return diff > 0 ? diff : 0;
      },

      generateWhatsAppUrl: () => {
        const { items, orderType, customerAddress } = get();
        const subtotal = get().getSubtotal();
        const deliveryFee = get().getDeliveryFee();
        const finalTotal = get().getFinalTotal();

        if (items.length === 0) return RESTAURANT_INFO.whatsappUrl;

        let message = `*🍔 MASTER BURGER POINT ORDER — KASUR 🍔*\n`;
        message += `_The Oldest & Best Burger Shop in Kasur_\n`;
        message += `--------------------------------------\n`;
        message += `*Order Type:* ${orderType === "delivery" ? "🚀 Home Delivery" : "🛍️ Takeaway / Pickup"}\n\n`;
        message += `*ITEMS:*\n`;

        items.forEach((item, index) => {
          let itemLine = `${index + 1}. *${item.quantity}x ${item.name}*`;
          if (item.sizeName) itemLine += ` (${item.sizeName})`;
          if (item.flavour) itemLine += ` [Flavor: ${item.flavour}]`;
          itemLine += ` — Rs ${item.price * item.quantity}`;
          message += `${itemLine}\n`;
        });

        message += `\n--------------------------------------\n`;
        message += `*Subtotal:* Rs ${subtotal.toLocaleString()}\n`;
        if (orderType === "delivery") {
          message += `*Delivery:* ${deliveryFee === 0 ? "FREE (Order >= Rs 500)" : `Rs ${deliveryFee}`}\n`;
        }
        message += `*GRAND TOTAL: Rs ${finalTotal.toLocaleString()}*\n`;
        message += `--------------------------------------\n`;

        if (customerAddress.trim()) {
          message += `*Delivery Address / Notes:*\n${customerAddress.trim()}\n\n`;
        } else {
          message += `*Customer Note:* Please share delivery address.\n\n`;
        }

        message += `_Sent via Master Burger Point Official Website_ 🌟`;

        return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
          message
        )}`;
      },
    }),
    {
      name: "masterburger-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        customerAddress: state.customerAddress,
        orderType: state.orderType,
      }),
    }
  )
);
