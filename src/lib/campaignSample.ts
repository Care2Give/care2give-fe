export type CampaignData = {
  title: string;
  coverImageURL: string;
  donors: number;
  currentAmount: number;
  targetAmount: number;
  targetDate: number;
  slug: string;
  description: string;
};

export type DonationOption = {
  value: number;
  description: string;
};

const data: CampaignData[] = [
  {
    title: "Caring Hearts Initiative",
    coverImageURL: "/campaign/campaign-cover.png",
    donors: 327,
    currentAmount: 37500,
    targetAmount: 50000,
    targetDate: 1704145168566,
    slug: "caring-hearts-initiative",
    description:
      "Join us for a joyous evening as we come together to express our appreciation for the tireless dedication of our caregivers. Your gift helps us train and support more caregivers as we support them on their journey.",
  },
  {
    title: "Charity Dinner 2023",
    coverImageURL: "/campaign/campaign-cover.png",
    donors: 2103,
    currentAmount: 128550,
    targetAmount: 250000,
    targetDate: 1705145168566,
    slug: "charity-dinner-2023",
    description:
      "Join us for a joyous evening as we come together to express our appreciation for the tireless dedication of our caregivers. Your gift helps us train and support more caregivers as we support them on their journey.",
  },
  {
    title: "Care Collective 2023",
    coverImageURL: "/campaign/campaign-cover.png",
    donors: 3223,
    currentAmount: 185450,
    targetAmount: 200000,
    targetDate: 1704145168566,
    slug: "care-collective-2023",
    description:
      "Join us for a joyous evening as we come together to express our appreciation for the tireless dedication of our caregivers. Your gift helps us train and support more caregivers as we support them on their journey.",
  },
];

const donationOptionData: DonationOption[][] = [
  [
    {
      value: 1000,
      description: "Buy a meal for a caregiver",
    },
    {
      value: 2000,
      description: "Buy 2 meals for a caregiver",
    },
    {
      value: 20000,
      description: "Buy 5 meals for a caregiver",
    },
  ],
  [
    {
      value: 5000,
      description: "Support us by buying a Bronze table for 10 guests",
    },
    {
      value: 8000,
      description: "Support us by buying a Silver table for 10 guests",
    },
    {
      value: 10000,
      description: "Support us by buying a Gold table for 10 guests",
    },
  ],
  [
    {
      value: 300,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      value: 600,
      description: "Lorem ipsum",
    },
    {
      value: 1000,
      description: "Lorem ipsum dolor sit amet",
    },
  ],
];

export { data, donationOptionData };
