import AppBar from "@/components/shared/AppBar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const unSuccessfulDonationPage = () => {
    return (
        <div>
            <AppBar title="Payment Error" backLink={"/"} />
            <div className={"flex flex-col items-center pb-7"}>
        <div
          className={
            "bg-[#FF5757] h-14 w-14 flex justify-center items-center rounded-full my-5"
          }
        >
          <X size={32} color="#ffffff" />
        </div>
        <div className={"text-2xl flex flex-col items-center"}>
          <div className="font-medium leading-6">Error Processing Payment</div>
          <div className="font-light">Your payment has failed</div>
        </div>
      </div>
      <div className={"bg-[#FFCBCB] py-10 flex justify-center"}>
        <Image src={"/donation-unsuccess.svg"} alt="" width={254} height={200} />
      </div>
      <div className={"flex flex-col items-center px-8 py-6"}>
        <div className={" w-80 text-center text-sm font-light leading-5 mb-6"}>
        Oops, it looks like there was an issue processing your payment. 
        Please double-check the information you provided and try again. 
        If the problem persists, you may want to ensure that your payment method is valid and has sufficient funds. 
        We apologise for any inconvenience and appreciate your patience.
        </div>
        <Button
          onClick={() => alert("Make Another Donation")}
          className={
            "text-xl w-full text-white font-bold rounded-[10px] bg-[#FF5757] mb-4 py-6 hover:opacity-90 hover:bg-[#00B32D]"
          }
        >
          Try Again
        </Button>
        <Button
          asChild
          variant={"link"}
          className={"text-base font-light underline underline-offset-2"}
        >
          <Link href={"/"}>Back to home</Link>
        </Button>
      </div>
        </div>
    );
};

export default unSuccessfulDonationPage