import NavBar from "@/components/navbar";
import { CampaignData, data } from "@/lib/campaignSample";
import { slugToTitle } from "@/lib/utils";
import { useRouter } from "next/router";
import { Share1Icon } from "@radix-ui/react-icons";
import Footer from "@/components/campaign/Footer";
import RecentDonors from "@/components/campaign/RecentDonors";
import { Button } from "@/components/ui/button";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

const Campaign = () => {
  const router = useRouter();
  const title = router.asPath.replace("/campaigns/", "");
  const {
    title: campaignTitle,
    coverImageURL,
    currentAmount,
    targetAmount,
    targetDate,
    slug,
    description,
  } = data.find((campaign) => campaign.slug === title) as CampaignData;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar title={campaignTitle || slugToTitle(title)} />
      {/* IMAGE SLIDE PLACEHOLDER */}
      <section className="flex flex-col gap-4 px-10">
        <div className="flex justify-between items-center">
          <h1 className={`${arabotoBold.className} text-2xl`}>
            {campaignTitle}
          </h1>
          <Share1Icon height={32} width={32} color="black" />
        </div>
        <p className={`${montserrat.className} text-sm`}>{description}</p>
        <div className="flex gap-4">
          <p className="text-center">{targetDate} Donors</p>
          <p className="text-center">
            ${targetAmount.toLocaleString("en-US")} Raised
          </p>
          <p className="text-center">
            ${currentAmount.toLocaleString("en-US")} Goal
          </p>
        </div>
      </section>
      {/* TODO: PROGESS BAR */}
      <RecentDonors />
      <div className="flex flex-col items-center gap-1">
        <Button className="w-96 rounded-3xl	flex gap-3 items-center text-2xl h-12">
          <span>Make a Donation</span>
          <HeartFilledIcon height={24} width={24} />
        </Button>
        <span className={`${montserrat.className} text-sm text-[#7E7E7E]`}>
          TDR will be issued for donations of $50 and above.
        </span>
      </div>
      <Footer />
    </main>
  );
};

export default Campaign;
