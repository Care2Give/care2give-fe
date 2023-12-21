import NavBar from "@/components/navbar";
import { CampaignCard } from "@/components/shared/CampaignCard";
import { CampaignData, data as campaigns } from "@/lib/campaignSample";

export default function Campaigns() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar title="All Campaigns" />

      {/* TODO: CREATE SORT BY FUNCTION BASED ON FE 
      RATIONALE FOR DOING ON FE NOT BE -> NO. OF CAMPAIGNS SHOULD NOT BE A LOT. FE SHOULD BE OK TO HANDLE IT. */}

      {campaigns.map((campaign, i) => {
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
    </main>
  );
}
