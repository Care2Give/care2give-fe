import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import {
  CardContent,
  CardDescription,
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

type CampaignCardProps = {
  campaignTitle?: string;
  coverImagesURLs?: string[];
  currentAmount?: number;
  targetAmount?: number;
  targetDate?: number;
  slug: string;
};

export const CampaignCard = ({
  campaignTitle = "Untitled",
  coverImagesURLs = [],
  currentAmount = 0,
  targetAmount = 0,
  targetDate = 0,
  slug,
}: CampaignCardProps) => {
  const completionPercentage = Math.floor((currentAmount / targetAmount) * 100);
  const daysLeftToTarget = Math.floor((targetDate - Date.now()) / 8.64e7);

  return (
    <div className="p-6 bg shadow-xl rounded-lg">
      <div className=" rounded-lg overflow-hidden">
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
          {coverImagesURLs.map((url, i) => (
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
      </div>
      <CardHeader>
        <CardTitle className="pb-2">{campaignTitle}</CardTitle>
        <Progress value={completionPercentage} />
        <div className="flex justify-between pt-2">
          <div className="flex">
            <CardTitle>${currentAmount.toLocaleString("en-US")}</CardTitle>
            <CardTitle className="text-gray-400">
              /{targetAmount.toLocaleString("en-US")}
            </CardTitle>
          </div>
          <CardTitle>{completionPercentage}%</CardTitle>
        </div>
        <CardDescription>
          {daysLeftToTarget > 0 ? `${daysLeftToTarget} more days` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="mb-2 rounded-3xl flex items-center gap-2">
          <Link
            href={`/campaigns/${encodeURIComponent(slug)}?expanded=true`}
            className="flex items-center gap-2"
          >
            <span>Make a Donation</span>
            <HeartFilledIcon />
          </Link>
        </Button>
        <Button className="mt-2 rounded-3xl" variant="outline" asChild>
          <Link href={`/campaigns/${encodeURIComponent(slug)}`}>
            Learn More
          </Link>
        </Button>
      </CardContent>
    </div>
  );
};
