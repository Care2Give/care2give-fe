import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import SortButton from "@/components/home/SortButton";
import NavBar from "@/components/navbar";
import BackToTop from "@/components/shared/BackToTop";
import { CampaignData } from "@/lib/campaignSample";
import { useState, useEffect } from "react";
import CampaignList from "@/components/all-campaigns/CampaignList";

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
          [...campaigns].sort((a, b) => a.targetDate - b.targetDate)
        );
      } else {
        setSortedCampaigns(
          [...campaigns].sort((a, b) => b.targetDate - a.targetDate)
        );
      }
    }
  }, [sortKey, sortIsIncreasing]);

  return (
    <>
      <NavBar title="All Campaigns" />
      <main className="flex min-h-screen flex-col items-center justify-between pt-[72px]">
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
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/campaign/list`
  );
  const campaigns: CampaignData[] = await res.json();
  // Pass data to the page via props
  return { props: { campaigns } };
}) satisfies GetServerSideProps<{ campaigns: CampaignData[] }>;
