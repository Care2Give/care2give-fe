import AppBar from "@/components/shared/AppBar";
import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/useCartStore";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {};

export default function Success({}: Props) {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // clear cart on donation success
    clearCart();
  }, []);

  return (
    <div>
      <AppBar title="Donation Successful" backLink={"/"} />
      <div className={"flex flex-col items-center pb-7"}>
        <div
          className={
            "bg-[#2BFF60] h-14 w-14 flex justify-center items-center rounded-full my-5"
          }
        >
          <Check size={32} color="#ffffff" />
        </div>
        <div className={"text-2xl flex flex-col items-center"}>
          <div className="font-medium leading-6">Thank you</div>
          <div className="font-light">for your generous donation!</div>
        </div>
      </div>
      <div className={"bg-[#96FFB1] py-10 flex justify-center"}>
        <Image src={"/donation-success.svg"} alt="" width={254} height={200} />
      </div>
      <div className={"flex flex-col items-center px-8 py-6"}>
        <div className={" w-80 text-center text-sm font-light leading-5 mb-6"}>
          {/* You should receive an email confirming your donation. */}
          Every dollar will go towards supporting our caregivers in need.
        </div>
        <Button
          asChild
          className={
            "text-xl w-full text-white font-bold rounded-[10px] bg-[#00B32D] mb-4 py-6 hover:opacity-90 hover:bg-[#00B32D]"
          }
        >
          <Link href={"/campaigns"}>Make Another Donation</Link>
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
}
