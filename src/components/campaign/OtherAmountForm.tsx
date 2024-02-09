import { CampaignDonationAmount } from "@/types/prismaSchema";
import React from "react";

interface OtherAmountFormProps {
  donationOptions: Array<{ value: number } & CampaignDonationAmount>;
  setCurrOptionIndex: React.Dispatch<React.SetStateAction<number | null>>;
  donationAmount: number;
  setDonationAmount: (amount: number) => void;
}

function OtherAmountForm({
  donationOptions,
  setCurrOptionIndex,
  donationAmount,
  setDonationAmount,
}: OtherAmountFormProps) {
  // Helper to auto-select option if it matches pre-existing options
  const amountToOptionIndexMap: any = {};
  donationOptions.forEach(
    ({ value }, i) => (amountToOptionIndexMap[value] = i)
  );

  return (
    <form className="px-10 py-6">
      <h2 className="text-2xl text-center font-bold mb-3">
        Other Amount (Min. $10)
      </h2>
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
          value={donationAmount || ""}
          onChange={(e) => {
            const val = Number(e.target.value);
            setDonationAmount(val);
            setCurrOptionIndex(val ? amountToOptionIndexMap[val] : 0);
          }}
          placeholder="0"
        />
      </div>
    </form>
  );
}

export default OtherAmountForm;
