import { DropdownMenuDemo } from "@/components/home/SortButton";
import NavBar from "@/components/navbar";
import { CampaignCard } from "@/components/shared/CampaignCard";
import { CampaignData, data as campaigns } from "@/lib/campaignSample";
import { useState, useEffect } from "react";

export default function Campaigns() {
  const [sortedCampaigns, setSortedCampaigns] = useState(campaigns); // stores sorted campaigns
  const [sortKey, setSortKey] = useState(""); // sort by campaign title or date
  const [sortIsIncreasing, setSortIsIncreasing] = useState(true); // order of sorting the campaigns by the sortKey

  useEffect(() => {
    console.log(sortKey);
    console.log(sortIsIncreasing);
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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar title="All Campaigns" />

      <div className="items-left">
        {/* TODO: CREATE SORT BY FUNCTION BASED ON FE 
      RATIONALE FOR DOING ON FE NOT BE -> NO. OF CAMPAIGNS SHOULD NOT BE A LOT. FE SHOULD BE OK TO HANDLE IT. */}
        <DropdownMenuDemo
          setSortKey={setSortKey}
          setSortIsIncreasing={setSortIsIncreasing}
        />

        {sortedCampaigns.map((campaign, i) => {
          const {
            title,
            coverImageURL,
            currentAmount,
            targetAmount,
            targetDate,
            slug,
          } = campaign as CampaignData;
          return (
            <CampaignCard
              key={`campaign-${i}`}
              campaignTitle={title}
              coverImageURL={coverImageURL}
              currentAmount={currentAmount}
              targetAmount={targetAmount}
              targetDate={targetDate}
              slug={slug}
            />
          );
        })}
      </div>
    </main>
  );
}
