import { CampaignData } from "@/lib/campaignSample";
import { CampaignCard } from "../shared/CampaignCard";

export default function CampaignList({
  campaigns,
}: {
  campaigns: CampaignData[];
}) {
  return (
    <div className="h-full w-full flex flex-col gap-6 p-10 py-0">
      {campaigns.map((campaign, i) => {
        const {
          title,
          imageUrl,
          currentAmount,
          targetAmount,
          targetDate,
          slug,
          id,
        } = campaign as CampaignData;
        return (
          <CampaignCard
            key={`campaign-${i}`}
            campaignTitle={title}
            imageUrl={imageUrl}
            currentAmount={currentAmount}
            targetAmount={targetAmount}
            targetDate={targetDate}
            slug={slug}
            id={id}
          />
        );
      })}
    </div>
  );
}
