import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Montserrat } from "next/font/google";
import { Url } from "next/dist/shared/lib/router/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

interface MakeDonationBtnProps {
  hidden?: boolean;
  link: Url;
}

function MakeDonationBtn({ hidden = false, link }: MakeDonationBtnProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1",
        hidden && "hidden",
        "md:flex"
      )}
    >
      <Button
        className={cn(`rounded-full flex gap-3 items-center text-2xl h-12`)}
        asChild
      >
        <Link href={link} scroll={false}>
          <span>Make a Donation</span>
          <HeartFilledIcon height={24} width={24} />
        </Link>
      </Button>
      <span
        className={`${montserrat.className} text-sm text-[#7E7E7E] pb-6 pt-2 text-center text-balance`}
      >
        TDR will be issued for donations of $50 and above.
      </span>
    </div>
  );
}

export default MakeDonationBtn;
