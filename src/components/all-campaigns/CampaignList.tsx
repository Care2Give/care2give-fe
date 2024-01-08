import { CampaignsWithDonations } from "@/types/CampaignsWithDonations";
import { CampaignCard } from "../shared/CampaignCard";

export default function CampaignList({
  campaigns,
}: {
  campaigns: CampaignsWithDonations[];
}) {
  return (
    <div className="h-full w-full flex flex-col gap-6 p-10 py-0">
      {campaigns.map((campaign, i) => (
        <CampaignCard key={`campaign-${i}`} campaign={campaign} />
      ))}
    </div>
  );
}
