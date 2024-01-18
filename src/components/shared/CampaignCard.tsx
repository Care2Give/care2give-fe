import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

import {
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/CampaignCardUI/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/CampaignCardUI/progress";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { CSSProperties } from "react";
import { constructDaysLeftString } from "@/lib/utils";
import { CampaignsWithDonations } from "@/types/CampaignsWithDonations";

export const CampaignCard = ({
  campaign,
}: {
  campaign: CampaignsWithDonations;
}) => {
  const {
    title,
    dollars,
    cents,
    endDate,
    imageUrls,
    id,
    currentAmount,
    targetAmount,
  } = campaign;
  const slug = `${id}/${title.toLowerCase().replace(/\s/g, "-")}`;
  const completionPercentage = Math.floor((currentAmount / targetAmount) * 100);
  const daysLeftToTarget = Math.floor(
    (new Date(endDate).getTime() - Date.now()) / 8.64e7
  );
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:h-[300px] p-6 bg shadow-[0_0_16px_0_rgba(0,0,0,0.15)] rounded-lg">
      <div className="rounded-lg overflow-hidden md:w-[352px] md:h-[256px]">
        {imageUrls?.length > 0 && (
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
          >
            {imageUrls.map((url, i) => (
              <SwiperSlide key={`${url}_${i}`}>
                <Image
                  className="max-h-64 object-cover"
                  src={url}
                  alt="campaign cover image"
                  width={352}
                  height={256}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="flex flex-col justify-between grow gap-6">
        <CardHeader className="p-0">
          <CardTitle className="pb-2">{title}</CardTitle>
          <Progress value={completionPercentage} />
          <div className="flex justify-between pt-2">
            <div className="flex">
              <CardTitle>${currentAmount.toLocaleString("en-US")}</CardTitle>
              <CardTitle className="text-gray-400">
                /{dollars.toLocaleString("en-US")}
                {cents > 0 ? `.${cents}` : ""}
              </CardTitle>
            </div>
            <CardTitle>{completionPercentage}%</CardTitle>
          </div>
          <CardTitle className="text-[#1DCF9E] text-md font-semibold">
            {constructDaysLeftString(daysLeftToTarget)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col md:flex-row items-center gap-4 p-0">
          <Button className="rounded-3xl flex items-center gap-2">
            <Link
              href={`/campaigns/${slug}?expanded=true`}
              className="flex items-center gap-2"
            >
              <span>Make a Donation</span>
              <HeartFilledIcon />
            </Link>
          </Button>
          <Button className="rounded-3xl" variant="outline" asChild>
            <Link href={`/campaigns/${slug}`}>Learn More</Link>
          </Button>
        </CardFooter>
      </div>
    </div>
  );
};
