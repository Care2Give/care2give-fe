import Image from "next/image";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/CampaignCardUI/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/CampaignCardUI/progress";
import Link from "next/link";

type CampaignCardProps = {
  campaignTitle: string;
  coverImageURL: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: number;
  slug: string;
};

export const CampaignCard = ({
  campaignTitle,
  coverImageURL,
  currentAmount,
  targetAmount,
  targetDate,
  slug,
}: CampaignCardProps) => {
  const completionPercentage = Math.floor((currentAmount / targetAmount) * 100);
  const daysLeftToTarget = Math.floor((targetDate - Date.now()) / 8.64e7);

  return (
    <div className="py-10 px-6 shadow-lg rounded-3xl">
      <div className="rounded-lg overflow-hidden">
        <Image
          className="w-full h-auto max-h-60 object-cover"
          src={coverImageURL}
          alt="campaign cover image"
          width={0}
          height={0}
          sizes="100vw"
        />
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
        <CardDescription>{daysLeftToTarget} more days</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="mb-2">Make a Donation</Button>
        <Button className="mt-2" variant="outline">
          <Link href={`/campaigns/${encodeURIComponent(slug)}`}>
            Learn More
          </Link>
        </Button>
      </CardContent>
    </div>
  );
};
