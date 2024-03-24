import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

interface MakeDonationBtnProps {
  hidden?: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

function MakeDonationBtn({
  hidden = false,
  setExpanded,
}: MakeDonationBtnProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1", "md:flex")}>
      <Button
        className={cn(
          `rounded-full flex gap-3 items-center text-2xl h-12 md:w-fit md:px-20 hover:cursor-pointer`,
          hidden && "hidden"
        )}
        asChild
        onClick={() => setExpanded(true)}
      >
        <span>
          <span>Make a Donation</span>
          <HeartFilledIcon height={24} width={24} />
        </span>
      </Button>
      <p
        className={cn(
          `${montserrat.className} text-sm text-[#7E7E7E] pb-6 pt-2 text-center text-balance`,
          hidden && "hidden"
        )}
      >
        TDR will be issued for donations of $50 and above.
      </p>
    </div>
  );
}

export default MakeDonationBtn;
