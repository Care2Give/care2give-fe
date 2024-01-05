import { DonationOption } from "@/lib/campaignSample";
import { cn } from "@/lib/utils";
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
  donationOptions: DonationOption[];
  currentOption: number;
  setCurrentOption: (i: number) => void;
}

function DonationOptions({
  donationOptions,
  currentOption,
  setCurrentOption,
}: DonationOptionsProps) {
  return (
    <form className="overflow-x-scroll overflow-y-hidden scrollbar-hide max-w-[100vw] space-x-5 px-10 py-6 flex">
      {donationOptions.map((option, i) => (
        <div
          key={option.value}
          role="radio"
          aria-checked={i === currentOption}
          onClick={() => setCurrentOption(i)}
          className={cn(
            "bg-[#D3D3D3] p-1.5 flex-none rounded-[24px] cursor-pointer basis-44",
            i === currentOption &&
              "bg-gradient-to-b from-[#4ED2C2] via-[#5185ff] to-[#6164cf]",
            i !== currentOption && "opacity-70"
          )}
        >
          <div className="w-full h-full bg-white flex flex-col justify-between gap-6 items-center rounded-[18px] px-5 py-8 relative">
            <div>
              <label
                className={cn(
                  "block text-2xl font-bold text-center cursor-pointer",
                  arabotoBold.className
                )}
                htmlFor={`donation-option-${option.value}`}
              >
                ${option.value.toLocaleString("en-US")}
              </label>
              <div
                className={cn(
                  "block text-sm w-fit text-center font-light mt-2",
                  montserrat.className
                )}
              >
                {option.description}
              </div>
            </div>
            <input
              className="bottom-0 h-5 w-5 p-2"
              type="radio"
              id={`donation-option-${option.value}`}
              name={`donation-option`}
              value={option.value}
              checked={i === currentOption}
              onChange={(e) => e.target.checked && setCurrentOption(i)}
            />
          </div>
        </div>
      ))}
    </form>
  );
}

export default DonationOptions;
