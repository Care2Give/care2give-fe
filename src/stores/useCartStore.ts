import { CampaignDetails } from "@/types/CampaignDetails";
import { CampaignDonationAmount } from "@/types/prismaSchema";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CartItem {
  campaign: CampaignDetails;
  donationOption: { value: number } & CampaignDonationAmount;
  donationAmount: number;
  isSelected: boolean;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  toggleItem: (item: CartItem) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  devtools((set) => ({
    items: [],
    addItem: (item: CartItem) => {
      set((state) => ({ items: [...state.items, item] }));
    },
    removeItem: (item: CartItem) => {
      set((state) => ({ items: state.items.filter((i) => i !== item) }));
    },
    toggleItem: (item: CartItem) => {
      set((state) => ({
        items: state.items.map((i) =>
          i !== item ? i : { ...i, isSelected: !i.isSelected }
        ),
      }));
    },
    clearCart: () => {
      set({ items: [] });
    },
  }))
);
export default useCartStore;
