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

interface DonationFormProps {
  donationOptions: Array<{ value: number } & CampaignDonationAmount>;
  campaign: CampaignDetails;
  isExpanded: boolean;
}

export default function DonationForm({
  donationOptions,
  campaign,
  isExpanded,
}: DonationFormProps) {
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [currentOption, setCurrentOption] = useState<number>(1);
  const { addItem } = useCartStore();

  const handleAddToGiftBasket = () => {
    const option = donationOptions[currentOption];
    addItem({
      donationOption: option,
      campaign,
      donationAmount: donationAmount,
      isSelected: true,
    });
  };

  return (
    <section
      className={cn("py-6 md:px-16 md:flex", !isExpanded && "hidden md:hidden")}
    >
      <div className="md:shrink-1 md:basis-[800px] min-w-0">
        <h2 className="text-2xl font-bold text-center md:text-left">
          Select Donation Amount
        </h2>
        <DonationOptions
          donationOptions={donationOptions}
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
          setDonationAmount={setDonationAmount}
        />
      </div>
      <div className="md:flex md:flex-col-reverse justify-end md:flex-1 md:min-w-[400px]">
        <div className="w-full">
          <div className="px-10 py-2 flex flex-col items-center gap-4">
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
        </div>
        <OtherAmountForm
          setCurrentOption={setCurrentOption}
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
        />
      </div>
    </section>
  );
}
