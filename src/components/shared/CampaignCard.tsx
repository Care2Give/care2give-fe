"use client";

import Image from "next/image";

import { useRef } from "react";

import { register } from "swiper/element/bundle";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/CampaignCardUI/card";

import { Button } from "@/components/ui/CampaignCardUI/button";
import { Progress } from "@/components/ui/CampaignCardUI/progress";

type CampaignCardProps = {
  campaignTitle?: string;
  coverImagesURLs?: string[];
  currentAmount?: number;
  targetAmount?: number;
  targetDate?: number;
};

register()

export const CampaignCard = ({
  campaignTitle="Untitled",
  coverImagesURLs=[],
  currentAmount=0,
  targetAmount=0,
  targetDate=0,
}: CampaignCardProps) => {
  const completionPercentage = Math.floor((currentAmount / targetAmount) * 100);
  const daysLeftToTarget = Math.floor((targetDate - Date.now()) / 8.64e7);

  const swiperElRef = useRef(null)

  return (
    <div className="pt-6 bg">
      <div className="mx-6 rounded-lg overflow-hidden">
        <swiper-container
          ref={swiperElRef}
          navigation="true"
          pagination="true"
          style={{
            "--swiper-pagination-bullet-inactive-color": "#CBD5E1",
            "--swiper-pagination-color": "#F8FAFC",
            "--swiper-navigation-color": "#F8FAFC",
            "--swiper-navigation-size": "32px",
          }}
        >
          {
            coverImagesURLs.map(url =>
                <swiper-slide key={url}>
                  <Image
                    className="w-full h-auto max-h-60 object-cover"
                    src={url}
                    alt="campaign cover image"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </swiper-slide>
              )
          }
        </swiper-container>
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
          {daysLeftToTarget > 0 ? `${daysLeftToTarget} more days` : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="mb-2">Make a Donation</Button>
        <Button className="mt-2" variant="outline">
          Learn More
        </Button>
      </CardContent>
    </div>
  );
};
