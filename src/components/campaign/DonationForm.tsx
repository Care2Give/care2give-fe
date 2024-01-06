import { CampaignData, DonationOption } from "@/lib/campaignSample";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import React, { useState } from "react";
import { Button } from "../ui/button";
import router from "next/router";
import { Gift } from "lucide-react";
import DonationOptions from "./DonationOptions";
import OtherAmountForm from "./OtherAmountForm";

interface DonationFormProps {
  donationOptions: DonationOption[];
  campaign: CampaignData;
  isExpanded: boolean;
}

function DonationForm({
  donationOptions,
  campaign,
  isExpanded,
}: DonationFormProps) {
  const [currentOption, setCurrentOption] = useState<number>(1);
  const [otherAmount, setOtherAmount] = useState<number | undefined>(undefined);
  const { addItem } = useCartStore();

  const handleAddToGiftBasket = () => {
    if (currentOption < 0 || currentOption >= donationOptions.length) {
      return;
    }
    if (otherAmount && otherAmount < 10) {
      return;
    }
    const option = donationOptions[currentOption];
    addItem({
      donationOption: option,
      campaign,
      otherAmount: otherAmount || 0,
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
          otherAmount={otherAmount}
          setOtherAmount={setOtherAmount}
        />
      </div>
    </section>
  );
}

export default DonationForm;
