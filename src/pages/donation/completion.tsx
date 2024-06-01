import { useStripe } from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Completion() {
  const {
    query: { client_secret },
  } = useRouter();
  const stripe = useStripe();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (!client_secret || !stripe) return;
      const { paymentIntent } = await stripe?.retrievePaymentIntent(
        client_secret as string
      );
      if (paymentIntent?.status === "succeeded") {
        // clear cart on donation success
        redirect("/donation/success");
      } else {
        redirect("/donation/failed");
      }
    };

    fetchPaymentIntent();
  }, [client_secret, stripe]);

  return <div>Processing payment...</div>;
}

export default Completion;
