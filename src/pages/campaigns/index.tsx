import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import SortButton from "@/components/home/SortButton";
import NavBar from "@/components/navbar";
import BackToTop from "@/components/shared/BackToTop";
import { useState, useEffect } from "react";
import CampaignList from "@/components/all-campaigns/CampaignList";
import { CampaignsWithDonations } from "@/types/CampaignsWithDonations";

export default function Campaigns({
  campaigns,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [sortedCampaigns, setSortedCampaigns] = useState(campaigns); // stores sorted campaigns
  const [sortKey, setSortKey] = useState(""); // sort by campaign title or date
  const [sortIsIncreasing, setSortIsIncreasing] = useState(true); // order of sorting the campaigns by the sortKey

  useEffect(() => {
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
          [...campaigns].sort(
            (a, b) =>
              new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          )
        );
      } else {
        setSortedCampaigns(
          [...campaigns].sort(
            (a, b) =>
              new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
          )
        );
      }
    }
  }, [sortKey, sortIsIncreasing]);

  return (
    <>
      <NavBar title="All Campaigns" />
      <main className="flex min-h-screen flex-col items-center justify-between py-[72px]">
        <SortButton
          setSortKey={setSortKey}
          setSortIsIncreasing={setSortIsIncreasing}
        />
        <CampaignList campaigns={sortedCampaigns} />
      </main>
      <BackToTop />
    </>
  );
}

export const getServerSideProps = (async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/campaign/list`
  );
  const campaigns: CampaignsWithDonations[] = await res.json();

  return { props: { campaigns } };
}) satisfies GetServerSideProps<{ campaigns: CampaignsWithDonations[] }>;
