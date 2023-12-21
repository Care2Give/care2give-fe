import localFont from "next/font/local";
import { CampaignCard } from "@/components/shared/CampaignCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { CampaignData, data as campaigns } from "@/utils/campaignSample";

const araboto = localFont({
  src: "../../../public/fonts/araboto/Araboto Medium 400.ttf",
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

const Featured = () => {
  return (
    <>
      <section className="h-full w-full flex flex-col gap-6 p-10">
        <div className="flex justify-between items-center">
          <h4 className={`text-xl ${arabotoBold.className}`}>
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
            coverImageURL,
            currentAmount,
            targetAmount,
            targetDate,
          } = campaign as CampaignData;
          return i <= 1 ? (
            <CampaignCard
              key={`campaign-${i}`}
              campaignTitle={title}
              coverImageURL={coverImageURL}
              currentAmount={currentAmount}
              targetAmount={targetAmount}
              targetDate={targetDate}
            />
          ) : null;
        })}
      </section>
    </>
  );
};

export default Featured;
