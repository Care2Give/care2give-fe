import type { GetServerSideProps } from "next";
import NavBar from "@/components/navbar";
import {
  CampaignData,
  DonationOption,
  data,
  donationOptionData,
} from "@/lib/campaignSample";
import { slugToTitle } from "@/lib/utils";
import { useRouter } from "next/router";
import Footer from "@/components/campaign/Footer";
import ImgCarousel from "@/components/campaign/ImgCarousel";
import CampainInfo from "@/components/campaign/CampainInfo";
import MakeDonationBtn from "@/components/campaign/MakeDonationBtn";
import DonationForm from "@/components/campaign/DonationForm";

interface CampaignProps {
  campaign: CampaignData;
  donationOptions: DonationOption[];
}

const Campaign = ({ campaign, donationOptions }: CampaignProps) => {
  const { title: campaignTitle, imageUrl, slug } = campaign;
  const router = useRouter();
  const isExpanded = router.query.expanded === "true";

  return (
    <>
      <NavBar title={campaignTitle || slugToTitle(slug)} />
      <main className=" min-h-screen pt-[72px]">
        <div className="md:flex md:gap-4 md:px-16 md:py-10">
          <ImgCarousel imageUrl={imageUrl} />
          <div className="px-8 flex-1">
            <CampainInfo campaign={campaign} />
            <MakeDonationBtn
              hidden={isExpanded}
              link={{
                pathname: router.pathname,
                query: { ...router.query, expanded: "true" },
              }}
            />
          </div>
        </div>
        <DonationForm
          donationOptions={donationOptions}
          campaign={campaign}
          isExpanded={isExpanded}
        />
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CampaignProps> = async (
  context
) => {
  const { slug } = context.params as { slug: string };
  const idx = data.findIndex((campaign) => campaign.slug === slug);
  return {
    props: {
      campaign: data[idx] as CampaignData,
      donationOptions: donationOptionData[idx],
    },
  };
};

export default Campaign;
