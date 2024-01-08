import { Campaign, Donation } from "./prismaSchema";

export type CampaignsWithDonations = {
  donations: Donation[];
  currentAmount: number;
  targetAmount: number;
  targetDate: Date;
} & Campaign;
