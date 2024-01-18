import { useSearchParams } from "next/navigation";
import { DonationOption } from "@/lib/campaignSample";
import Campaign from "@/pages/campaigns/[...slug]";

export default function CampaignPreview() {
  const searchParams = useSearchParams();
  let campaignData;
  try {
    campaignData = getCampaignData(searchParams);
  } catch (err) {
    return (
      <div>
        <div>{err!.toLocaleString()}</div>
      </div>
    );
  }

  return <Campaign campaign={campaignData as any} />;
}

function getCampaignData(searchParams: URLSearchParams) {
  const requiredParameters: string[] = [
    "title",
    "donors",
    "imageUrls",
    "currentAmount",
    "targetAmount",
    "targetDate",
    "slug",
    "description",
  ];
  for (let i = 0; i < requiredParameters.length; i++) {
    const parameter = requiredParameters[i];
    if (!searchParams.has(parameter)) {
      throw new Error(`Missing required parameter: ${parameter}`);
    }
  }

  const numberParameters: string[] = [
    "donors",
    "currentAmount",
    "targetAmount",
    "targetDate",
  ];
  for (let i = 0; i < numberParameters.length; i++) {
    const parameter = numberParameters[i];
    if (isNaN(parseInt(searchParams.get(parameter) || ""))) {
      throw new Error(`${parameter} is not a valid integer`);
    }
  }

  const title: string = searchParams?.get("title") || "";
  const donors: number = parseInt(searchParams?.get("donors") || "0");
  const imageUrls: string[] = searchParams.getAll("imageUrls");
  const currentAmount: number = parseInt(
    searchParams.get("currentAmount") || "0"
  );
  const targetAmount: number = parseInt(
    searchParams.get("targetAmount") || "0"
  );
  const targetDate: number = parseInt(searchParams.get("targetDate") || "0");
  const slug: string = searchParams.get("slug") || title;
  const description: string = searchParams.get("description") || title;
  return {
    title: title,
    donors: donors,
    imageUrls: imageUrls,
    currentAmount: currentAmount,
    targetAmount: targetAmount,
    targetDate: targetDate,
    slug: slug,
    description: description,
    id: "",
    donationAmounts: getDonationOptions(searchParams),
  };
}

function getDonationOptions(searchParams: URLSearchParams): DonationOption[] {
  const donationOptionValues: number[] = searchParams
    .getAll("donationOptionValue")
    .map((donationOptionValue) => parseInt(donationOptionValue));
  const donationOptionDescriptions: string[] = searchParams.getAll(
    "donationOptionDescription"
  );
  return donationOptionValues.map((donationOptionValue, index) => {
    return {
      value: donationOptionValue,
      description: donationOptionDescriptions[index],
    };
  });
}

/*
http://localhost:3001/campaigns/preview?title=Caring+Hearts+Initiative&donors=327
&imageUrls=https://www.techsmith.com/blog/wp-content/uploads/2017/12/color-picker.png
&currentAmount=37500&targetAmount=50000&targetDate=1704145168566&slug=caring-hearts-initiative&description=Join+us+for+a+joyous+evening+as+we+come+together+to+express+our+appreciation+for+the+tireless+dedication+of+our+caregivers.+Your+gift+helps+us+train+and+support+more+caregivers+as+we+support+them+on+their+journey.
&donationOptionValue=1&donationOptionDescription=description1
&donationOptionValue=2&donationOptionDescription=description2
*/
