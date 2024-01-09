import { CampaignCard } from "@/components/shared/CampaignCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { araboto, arabotoBold } from "@/lib/font";
import { CampaignsWithDonations } from "@/types/CampaignsWithDonations";

// Currently it takes the first two campaigns, need a separate logic to determine what is "featured"
const Featured = ({ campaigns }: { campaigns: CampaignsWithDonations[] }) => {
  return (
    <section className="h-full w-full flex flex-col gap-6 p-10">
      <div className="flex justify-between items-center">
        <h4 className={`text-2xl ${arabotoBold.className}`}>
          Featured Campaigns
        </h4>
        <Button variant="link" className="justify-start p-0 underline w-fit">
          <Link
            href="/campaigns"
            className={`${araboto.className} text-sm text-[#9D9D9D] underline flex items-center gap-2`}
          >
            View more
          </Link>
        </Button>
      </div>

      {campaigns.map((campaign, i) => {
        return i <= 1 ? (
          <CampaignCard key={`campaign-${i}`} campaign={campaign} />
        ) : null;
      })}
    </section>
  );
};

export default Featured;
