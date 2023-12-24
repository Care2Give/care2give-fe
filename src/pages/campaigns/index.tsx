import { DropdownMenuDemo } from "@/components/home/SortButton";
import NavBar from "@/components/navbar";
import BackToTop from "@/components/shared/BackToTop";
import { CampaignCard } from "@/components/shared/CampaignCard";
import { CampaignData, data as campaigns } from "@/lib/campaignSample";
import { useState, useEffect } from "react";

export default function Campaigns() {
  const [sortedCampaigns, setSortedCampaigns] = useState(campaigns); // stores sorted campaigns
  const [sortKey, setSortKey] = useState(""); // sort by campaign title or date
  const [sortIsIncreasing, setSortIsIncreasing] = useState(true); // order of sorting the campaigns by the sortKey

  useEffect(() => {
    if (sortKey == "Campaign Title") {
      if (sortIsIncreasing) {
        setSortedCampaigns(
          [...campaigns].sort((a, b) => a.title.localeCompare(b.title))
        );
      } else {
        setSortedCampaigns(
          [...campaigns].sort((a, b) => b.title.localeCompare(a.title))
        );
      }
    } else if (sortKey == "End Date") {
      if (sortIsIncreasing) {
        setSortedCampaigns(
          [...campaigns].sort((a, b) => a.targetDate - b.targetDate)
        );
      } else {
        setSortedCampaigns(
          [...campaigns].sort((a, b) => b.targetDate - a.targetDate)
        );
      }
    }
  }, [sortKey, sortIsIncreasing]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <NavBar title="All Campaigns" />
        <DropdownMenuDemo
          setSortKey={setSortKey}
          setSortIsIncreasing={setSortIsIncreasing}
        />

        <div className="h-full w-full flex flex-col gap-6 p-10 py-0">
          {sortedCampaigns.map((campaign, i) => {
            const {
              title,
              coverImagesURLs,
              currentAmount,
              targetAmount,
              targetDate,
              slug,
            } = campaign as CampaignData;
            return (
              <CampaignCard
                key={`campaign-${i}`}
                campaignTitle={title}
                coverImagesURLs={coverImagesURLs}
                currentAmount={currentAmount}
                targetAmount={targetAmount}
                targetDate={targetDate}
                slug={slug}
              />
            );
          })}
        </div>
      </main>
      <BackToTop />
    </>
  );
}
