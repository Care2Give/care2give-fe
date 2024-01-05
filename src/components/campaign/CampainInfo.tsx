import { GetServerSideProps } from "next";
import React from "react";
import { CampaignData, data } from "@/lib/campaignSample";
import RecentDonors from "./RecentDonors";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import HelpBySharing from "../shared/HelpBySharing";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

interface CampaignInfoProps {
  campaign: CampaignData;
}

function CampainInfo({ campaign }: CampaignInfoProps) {
  const {
    title: campaignTitle,
    description,
    donors,
    currentAmount,
    targetAmount,
    targetDate,
  } = campaign;

  const completionPercentage = Math.floor((currentAmount / targetAmount) * 100);
  const daysLeftToTarget = Math.floor((targetDate - Date.now()) / 8.64e7);

  return (
    <div>
      <section className="flex flex-col gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className={`${arabotoBold.className} text-2xl`}>
            {campaignTitle}
          </h1>
          <HelpBySharing />
        </div>
        <p className={`${montserrat.className} text-sm`}>{description}</p>
        <div className="flex items-stretch gap-4 text-xl">
          <p className="text-center py-1">
            <strong>{donors}</strong> Donors
          </p>
          <Separator orientation="vertical" className={"h-auto"} />
          <p className="text-center py-1">
            <strong>${currentAmount.toLocaleString("en-US")}</strong> Raised
          </p>
          <Separator orientation="vertical" className={"h-auto"} />
          <p className="text-center py-1">
            <strong>${targetAmount.toLocaleString("en-US")}</strong> Goal
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

export const getServerSideProps: GetServerSideProps<CampaignInfoProps> = async (
  context
) => {
  const { slug } = context.params as { slug: string };
  const idx = data.findIndex((campaign) => campaign.slug === slug);
  return {
    props: {
      campaign: data[idx] as CampaignData,
    },
  };
};

export default CampainInfo;
