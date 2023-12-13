import Image from "next/image";
import { Inter } from "next/font/google";
import { CampaignCard } from "@/components/shared/CampaignCard";
import CartItem from "@/components/shared/CartItem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col gap-2 p-2 ${inter.className}`}>
      <CartItem
        id="Campaign-1"
        title="Charity Dinner 2023"
        image="/campaign-img.png"
        defaultChecked={true}
        description="Support us by buying a Silver table for 10 guests"
        price={8000}
      />
      <CartItem
        id="Campaign-2"
        title="Charity Dinner 2023"
        image="/campaign-img.png"
        description="Support us by buying a Silver table for 10 guests"
        price={10000}
      />
    </main>
  );
}
