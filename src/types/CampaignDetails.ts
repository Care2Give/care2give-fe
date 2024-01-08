import { Campaign, CampaignDonationAmount, Donation } from "./prismaSchema";

export type CampaignDetails = {
  donations: Donation[];
  donationAmounts: Array<{ value: number } & CampaignDonationAmount>;
  donors: number;
  currentAmount: number;
  targetAmount: number;
  targetDate: Date;
} & Campaign;
