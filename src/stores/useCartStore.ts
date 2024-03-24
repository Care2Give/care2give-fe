import { CampaignDetails } from "@/types/CampaignDetails";
import { CampaignDonationAmount } from "@/types/prismaSchema";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CartItem {
  campaign: CampaignDetails;
  donationAmount: number;
  isSelected: boolean;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  toggleItem: (item: CartItem) => void;
  clearCart: () => void;
  mutateItemPrice: (item: CartItem, donationAmount: number) => void;
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
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
        mutateItemPrice: (item: CartItem, donationAmount: number) => {
          set((state) => ({
            items: state.items.map((i) =>
              i.campaign !== item.campaign
                ? i
                : { ...i, donationAmount: donationAmount }
            ),
          }));
        },
      }),
      { name: "cart-store" }
    )
  )
);

export default useCartStore;
