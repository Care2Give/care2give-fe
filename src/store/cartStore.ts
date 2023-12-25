import { CampaignData, DonationOption } from "@/lib/campaignSample";
import { set } from "react-hook-form";
import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

interface CartItem {
  campaign: CampaignData;
  donationOption: DonationOption;
  otherAmount: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        items: [] as CartItem[],
        addItem: (item: CartItem) => {
          set((state) => ({ items: [...state.items, item] }));
        },
        removeItem: (item: CartItem) => {
          set((state) => ({ items: state.items.filter((i) => i !== item) }));
        },
        clearCart: () => {
          set({ items: [] });
        },
      }),
      { name: "cart-store" }
    )
  )
);
