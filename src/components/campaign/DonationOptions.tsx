import { DonationOption } from "@/lib/campaignSample";
import { cn } from "@/lib/utils";
import { CampaignDonationAmount } from "@/types/prismaSchema";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import React from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

interface DonationOptionsProps {
  donationOptions: Array<{ value: number } & CampaignDonationAmount>;
  currOptionIndex: number | null;
  setCurrOptionIndex: (i: number | null) => void;
  setDonationAmount: (amount: number) => void;
}

function DonationOptions({
  donationOptions,
  currOptionIndex,
  setCurrOptionIndex,
  setDonationAmount,
}: DonationOptionsProps) {
  return (
    <form className="flex overflow-x-scroll hide-scroll-bar max-w-[100vw] space-x-5 px-10 py-6">
      {donationOptions.map((option, i) => {
        const { value } = option;
        return (
          <div
            key={i}
            role="radio"
            aria-checked={i === currOptionIndex}
            onClick={() => {
              setCurrOptionIndex(i);
              setDonationAmount(value);
            }}
            className={cn(
              "bg-[#D3D3D3] p-1.5 flex-none rounded-[24px] cursor-pointer basis-44 md:basis-56",
              i === currOptionIndex &&
                "bg-gradient-to-b from-[#4ED2C2] via-[#5185ff] to-[#6164cf]",
              i !== currOptionIndex && "opacity-70"
            )}
          >
            <div className="w-full h-full bg-white flex flex-col justify-between gap-6 items-center rounded-[18px] px-5 py-8 relative">
              <div>
                <label
                  className={cn(
                    "block text-2xl md:text-4xl font-bold text-center cursor-pointer",
                    arabotoBold.className
                  )}
                  htmlFor={`donation-option-${value}`}
                >
                  ${value.toLocaleString("en-US")}
                </label>
                <div
                  className={cn(
                    "block text-sm md:text-lg w-fit text-center font-light mt-2",
                    montserrat.className
                  )}
                >
                  {option.description}
                </div>
              </div>
              <input
                className="bottom-0 h-5 w-5 p-2"
                type="radio"
                id={`donation-option-${value}`}
                name={`donation-option`}
                value={value}
                checked={i === currOptionIndex}
                onChange={(e) => e.target.checked && setCurrOptionIndex(i)}
              />
            </div>
          </div>
        );
      })}
    </form>
  );
}

export default DonationOptions;
