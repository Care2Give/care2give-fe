import type { GetServerSideProps } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import NavBar from "@/components/navbar";
import {
  CampaignData,
  DonationOption,
  data,
  donationOptionData,
} from "@/lib/campaignSample";
import { cn, slugToTitle } from "@/lib/utils";
import { useRouter } from "next/router";
import { Share1Icon } from "@radix-ui/react-icons";
import Footer from "@/components/campaign/Footer";
import RecentDonors from "@/components/campaign/RecentDonors";
import { Button } from "@/components/ui/button";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Montserrat } from "next/font/google";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import Link from "next/link";
import { CSSProperties, useState } from "react";
import { Gift } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

interface CampaignProps {
  campaign: CampaignData;
  donationOptions: DonationOption[];
}

const Campaign = ({ campaign, donationOptions }: CampaignProps) => {
  const {
    title: campaignTitle,
    coverImagesURLs,
    donors,
    currentAmount,
    targetAmount,
    targetDate,
    slug,
    description,
  } = campaign;
  const completionPercentage = Math.floor((currentAmount / targetAmount) * 100);
  const daysLeftToTarget = Math.floor((targetDate - Date.now()) / 8.64e7);
  const router = useRouter();
  const isExpanded = router.query.expanded === "true";

  const [currentOption, setCurrentOption] = useState<number>(-1);
  const [otherAmount, setOtherAmount] = useState<number | undefined>(undefined);
  const { addItem } = useCartStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar title={campaignTitle || slugToTitle(slug)} />
      <div className="overflow-hidden w-screen">
        <Swiper
          style={
            {
              "--swiper-pagination-color": "#FFFFFF",
              "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
              "--swiper-pagination-bullet-inactive-opacity": "0.7",
              "--swiper-pagination-bullet-size": "12px",
              "--swiper-pagination-bullet-inactive-size": "8px",
              "--swiper-pagination-bullet-horizontal-gap": "3px",
              "--swiper-navigation-color": "#FFFFFF",
              "--swiper-navigation-size": "20px",
            } as CSSProperties
          }
          modules={[Navigation, Pagination, Scrollbar]}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          cssMode
          className="w-full"
        >
          {coverImagesURLs.map((url, i) => (
            <SwiperSlide key={`${url}_${i}`}>
              <Image
                className="max-h-64 object-cover"
                src={url}
                alt="campaign cover image"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className="flex flex-col gap-4 px-10 py-6">
        <div className="flex justify-between items-center">
          <h1 className={`${arabotoBold.className} text-2xl`}>
            {campaignTitle}
          </h1>
          <Button variant="ghost" size="icon">
            <Share1Icon height={28} width={28} color="black" />
          </Button>
        </div>
        <p className={`${montserrat.className} text-sm`}>{description}</p>
        <div className="flex items-stretch gap-4 text-xl">
          <p className="text-center py-1">
            <strong>{donors}</strong> Donors
          </p>
          <Separator orientation="vertical" className={"h-auto"} />
          <p className="text-center py-1">
            <strong>${currentAmount.toLocaleString("en-US")}</strong> Raised
          </p>
          <Separator orientation="vertical" className={"h-auto"} />
          <p className="text-center py-1">
            <strong>${targetAmount.toLocaleString("en-US")}</strong> Goal
          </p>
        </div>
      </section>
      <div className={`${arabotoBold.className} px-10 pb-4 w-full`}>
        <Progress value={completionPercentage} />
        <div className={"flex justify-between mt-3"}>
          <div className={"text-[#1DCF9E] text-xl font-bold"}>
            {daysLeftToTarget} Days Left
          </div>
          <div className={"text-xl font-bold"}>{completionPercentage}%</div>
        </div>
      </div>
      <RecentDonors />
      <div
        className={cn(
          "flex flex-col items-center gap-1",
          isExpanded && "hidden"
        )}
      >
        <Button
          className={cn(`rounded-full flex gap-3 items-center text-2xl h-12`)}
          asChild
        >
          <Link
            href={{
              pathname: router.pathname,
              query: { ...router.query, expanded: "true" },
            }}
            scroll={false}
          >
            <span>Make a Donation</span>
            <HeartFilledIcon height={24} width={24} />
          </Link>
        </Button>
        <span
          className={`${montserrat.className} text-sm text-[#7E7E7E] pb-6 pt-2`}
        >
          TDR will be issued for donations of $50 and above.
        </span>
      </div>
      <section className={cn("py-6", !isExpanded && "hidden")}>
        <h2 className="text-2xl font-bold text-center">
          Select Donation Amount
        </h2>
        <form className="overflow-x-scroll overflow-y-hidden scrollbar-hide max-w-[100vw] space-x-5 px-10 py-6 flex">
          {donationOptions.map((option, i) => (
            <div
              key={option.value}
              role="radio"
              aria-checked={i === currentOption}
              onClick={() => setCurrentOption(i)}
              className={cn(
                "bg-[#D3D3D3] p-1.5 flex-none rounded-[24px] cursor-pointer basis-44",
                i === currentOption &&
                  "bg-gradient-to-b from-[#4ED2C2] via-[#5185ff] to-[#6164cf]",
                i !== currentOption && "opacity-70"
              )}
            >
              <div className="w-full h-full bg-white flex flex-col justify-between gap-6 items-center rounded-[18px] px-5 py-8 relative">
                <div>
                  <label
                    className={cn(
                      "block text-2xl font-bold text-center cursor-pointer",
                      arabotoBold.className
                    )}
                    htmlFor={`donation-option-${option.value}`}
                  >
                    ${option.value.toLocaleString("en-US")}
                  </label>
                  <div
                    className={cn(
                      "block text-sm w-fit text-center font-light mt-2",
                      montserrat.className
                    )}
                  >
                    {option.description}
                  </div>
                </div>
                <input
                  className="bottom-0 h-5 w-5 p-2"
                  type="radio"
                  id={`donation-option-${option.value}`}
                  name={`donation-option`}
                  value={option.value}
                  checked={i === currentOption}
                  onChange={(e) => e.target.checked && setCurrentOption(i)}
                />
              </div>
            </div>
          ))}
        </form>
        <div className="px-10 py-2 flex flex-col items-center gap-4">
          <Button
            className={cn(`rounded-full items-center text-2xl h-12 max-w-80`)}
          >
            Check Out
          </Button>
          <Button
            className={cn(
              `rounded-full flex gap-3 items-center text-2xl h-12 max-w-80`
            )}
            variant={"outline"}
            onClick={() => {
              if (
                currentOption < 0 ||
                currentOption >= donationOptions.length
              ) {
                return;
              }
              if (otherAmount && otherAmount < 10) {
                return;
              }
              const option = donationOptions[currentOption];
              addItem({
                donationOption: option,
                campaign,
                otherAmount: otherAmount || 0,
              });
            }}
          >
            <span>Add to Gift Basket</span>
            <Gift height={24} width={24} />
          </Button>
        </div>
        <form className={cn("px-10 py-6")}>
          <h2 className="text-2xl font-bold mb-3">Other Amount (Min. $10)</h2>
          <div className="bg-gradient-to-b from-[#4ED2C2] via-[#5185ff] to-[#6164cf] p-1 rounded-[12px] relative">
            <label
              htmlFor="other-amount"
              className={
                "absolute left-4 m-auto top-0 bottom-0 text-xl font-bold h-full flex items-center"
              }
            >
              $
            </label>
            <input
              className="w-full h-12 py-2 pr-2 pl-8 text-xl rounded-[8px]"
              id="other-amount"
              name="other-amount"
              type="number"
              min={10}
              value={otherAmount || ""}
              onChange={(e) => setOtherAmount(Number(e.target.value))}
              placeholder="0"
            />
          </div>
        </form>
      </section>
      <Footer />
    </main>
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
