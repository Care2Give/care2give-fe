import { cn } from "@/lib/utils";
import useCartStore from "@/stores/useCartStore";
import React, { useState } from "react";
import { Button } from "../ui/button";
import router from "next/router";
import { Gift } from "lucide-react";
import DonationOptions from "./DonationOptions";
import OtherAmountForm from "./OtherAmountForm";
import { CampaignDetails } from "@/types/CampaignDetails";
import { CampaignDonationAmount } from "@/types/prismaSchema";
import { toast } from "sonner";
import { Montserrat } from "next/font/google";

interface DonationFormProps {
  donationOptions: Array<{ value: number } & CampaignDonationAmount>;
  campaign: CampaignDetails;
  isExpanded: boolean;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

export default function DonationForm({
  donationOptions,
  campaign,
  isExpanded,
}: DonationFormProps) {
  const [currOptionIndex, setCurrOptionIndex] = useState<number | null>(0);
  const [donationAmount, setDonationAmount] = useState<number>(
    currOptionIndex || currOptionIndex === 0
      ? donationOptions[currOptionIndex].value
      : 0
  );
  const { addItem } = useCartStore();

  const handleAddToGiftBasket = () => {
    addItem({
      campaign,
      donationAmount: donationAmount,
      isSelected: true,
    });
    toast.success("Successfully added to gift basket");
  };

  return (
    <section
      className={cn(
        "py-6 md:px-16 md:flex md:justify-center",
        !isExpanded && "hidden md:hidden"
      )}
    >
      <div className="md:shrink-1 md:basis-[800px] min-w-0">
        <h2 className="text-2xl font-bold text-center">
          Select Donation Amount
        </h2>
        <DonationOptions
          donationOptions={donationOptions}
          currOptionIndex={currOptionIndex}
          setCurrOptionIndex={setCurrOptionIndex}
          setDonationAmount={setDonationAmount}
        />
        <OtherAmountForm
          donationOptions={donationOptions}
          setCurrOptionIndex={setCurrOptionIndex}
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
        />
        <div className="px-10 py-2 flex flex-col md:flex-row md:justify-center items-center gap-4">
          <Button
            className="rounded-full items-center text-2xl h-12 max-w-80 w-full"
            onClick={() => {
              handleAddToGiftBasket();
              router.push("/gift-basket");
            }}
          >
            Check Out
          </Button>

          <Button
            className="rounded-full flex gap-3 items-center text-2xl h-12 max-w-80 w-full"
            variant="outline"
            onClick={handleAddToGiftBasket}
          >
            <span>Add to Gift Basket</span>
            <Gift height={24} width={24} />
          </Button>
        </div>
        <p
          className={`${montserrat.className} text-sm text-[#7E7E7E] text-center text-balance pt-4 px-4`}
        >
          TDR will be issued for donations of $50 and above.
        </p>
      </div>
    </section>
  );
}
