import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NavBar from "@/components/navbar";
import { useRouter } from "next/router";
import Footer from "@/components/campaign/Footer";
import ImgCarousel from "@/components/campaign/ImgCarousel";
import CampaignInfo from "@/components/campaign/CampaignInfo";
import MakeDonationBtn from "@/components/campaign/MakeDonationBtn";
import DonationForm from "@/components/campaign/DonationForm";
import { Campaign } from "@/types/prismaSchema";
import { CampaignDetails } from "@/types/CampaignDetails";
import { useState } from "react";

export default function Campaign({
  campaign,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { title, imageUrl, donationAmounts } = campaign;
  const router = useRouter();
  const isExpanded = router.query.expanded === "true";
  const [expanded, setExpanded] = useState<boolean>(isExpanded);

  return (
    <>
      <NavBar title={title} />
      <main className="min-h-screen pt-[72px]">
        <div className="md:flex md:gap-4 md:px-16 md:py-10">
          <ImgCarousel imageUrl={imageUrl} />
          <div className="px-8 flex-1">
            <CampaignInfo campaign={campaign} />
            <MakeDonationBtn hidden={expanded} setExpanded={setExpanded} />
          </div>
        </div>
        <DonationForm
          donationOptions={donationAmounts}
          campaign={campaign}
          isExpanded={expanded}
        />
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const { slug } = context.params as { slug: string };
  const id = slug[0];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/campaign/${id}`
  );
  const campaign: CampaignDetails = await res.json();

  return {
    props: {
      campaign,
    },
  };
}) satisfies GetServerSideProps<{ campaign: CampaignDetails }>;
