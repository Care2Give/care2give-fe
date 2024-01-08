import React from "react";
import RecentDonors from "./RecentDonors";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import HelpBySharing from "../shared/HelpBySharing";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { CampaignDetails } from "@/types/CampaignDetails";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

export default function CampaignInfo({
  campaign,
}: {
  campaign: CampaignDetails;
}) {
  const {
    title: campaignTitle,
    description,
    donors,
    currentAmount,
    targetAmount,
    targetDate,
  } = campaign;

  const completionPercentage = Math.floor((currentAmount / targetAmount) * 100);
  const daysLeftToTarget = Math.floor(
    (new Date(targetDate).getTime() - Date.now()) / 8.64e7
  );

  return (
    <div className="md:shadow-[0px_0px_16px_0px_rgba(0,0,0,0.15)] md:p-8 rounded-2xl md:mb-6">
      <section className="flex flex-col gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className={`${arabotoBold.className} text-2xl`}>
            {campaignTitle}
          </h1>
          <HelpBySharing />
        </div>
        <p className={`${montserrat.className} text-sm`}>{description}</p>
        <div className="flex items-stretch justify-evenly text-xl">
          <p className="text-center py-1 flex flex-col justify-center">
            <strong>{donors.toLocaleString("en-US")}</strong>
            <span>Donors</span>
          </p>
          <Separator orientation="vertical" className={"h-auto"} />
          <p className="text-center py-1 flex flex-col justify-center">
            <strong>${currentAmount.toLocaleString("en-US")}</strong>
            <span>Raised</span>
          </p>
          <Separator orientation="vertical" className={"h-auto"} />
          <p className="text-center py-1 flex flex-col justify-center">
            <strong>${targetAmount.toLocaleString("en-US")}</strong>
            <span>Goal</span>
          </p>
        </div>
      </section>
      <div className={`${arabotoBold.className} pb-4 w-full`}>
        <Progress value={completionPercentage} />
        <div className={"flex justify-between mt-3"}>
          <div className={"text-[#1DCF9E] text-xl font-bold"}>
            {daysLeftToTarget} Days Left
          </div>
          <div className={"text-xl font-bold"}>{completionPercentage}%</div>
        </div>
      </div>
      <RecentDonors />
    </div>
  );
}
