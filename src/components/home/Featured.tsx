import { CampaignCard } from "@/components/shared/CampaignCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { CampaignData, data as campaigns } from "@/lib/campaignSample";
import { araboto, arabotoBold } from "@/lib/font";

const Featured = () => {
  return (
    <>
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
          const {
            title,
            imageUrl,
            currentAmount,
            targetAmount,
            targetDate,
            slug,
          } = campaign as CampaignData;
          return i <= 1 ? (
            <CampaignCard
              key={`campaign-${i}`}
              campaignTitle={title}
              imageUrl={imageUrl}
              currentAmount={currentAmount}
              targetAmount={targetAmount}
              targetDate={targetDate}
              slug={slug}
            />
          ) : null;
        })}
      </section>
    </>
  );
};

export default Featured;
