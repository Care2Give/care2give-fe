import NavBar from "@/components/navbar";
import Introduction from "@/components/home/Introduction";
import Featured from "@/components/home/Featured";
import Footer from "@/components/home/Footer";
import { CampaignsWithDonations } from "@/types/CampaignsWithDonations";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Home({
  campaigns,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <NavBar title="Caregivers Alliance Limited" titleIsCenterAligned />
      <main className="flex min-h-screen flex-col items-center justify-between pt-[72px]">
        <Introduction />
        <Featured campaigns={campaigns} />
        <Footer />
      </main>
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
