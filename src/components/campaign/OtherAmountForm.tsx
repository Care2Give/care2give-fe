import React from "react";

interface OtherAmountFormProps {
  setCurrentOption: React.Dispatch<React.SetStateAction<number>>;
  donationAmount: number;
  setDonationAmount: (amount: number) => void;
}

function OtherAmountForm({
  setCurrentOption,
  donationAmount,
  setDonationAmount,
}: OtherAmountFormProps) {
  return (
    <form className="px-10 py-6">
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
          value={donationAmount || ""}
          onChange={(e) => setDonationAmount(Number(e.target.value))}
          placeholder="0"
          onClick={() => setCurrentOption(-1)}
        />
      </div>
    </form>
  );
}

export default OtherAmountForm;
