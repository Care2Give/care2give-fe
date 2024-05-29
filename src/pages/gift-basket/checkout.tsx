"use client";

import NavBar from "@/components/navbar";
import Cart from "@/components/gift_basket/Cart";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { countries } from "country-list-json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, {
  ReactNode,
  forwardRef,
  HTMLProps,
  useState,
  FormEvent,
  useEffect,
} from "react";
import { useTaxDeductionStore } from "@/stores/useTaxDeductionStore";
import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  LinkAuthenticationElement,
  CardElement,
} from "@stripe/react-stripe-js";
import useCartStore from "@/stores/useCartStore";
import {
  AnonymousDonationForm,
  IndividualTaxDeductionForm,
  NoTaxDeductionForm,
  OrganisationTaxDeductionForm,
  TaxDeductionForm,
  TaxDeductionType,
} from "@/types/taxDeductionTypes";

type Country = (typeof countries)[number]["name"];
const COUNTRIES: [Country, ...Country[]] = [
  countries[0].name,
  ...countries.slice(1).map((c) => c.name),
];

const checkoutFormSchema = z.object({
  email: z.string().email(),
  cardHolderName: z.string(),
  cardNumber: z.string().regex(new RegExp(/^\d{16}$/)),
  expiryDate: z.string().regex(new RegExp(/^\d{2}\/\d{2}$/)),
  cvc: z.string().regex(new RegExp(/^\d{3}$/)),
  country: z.enum(COUNTRIES),
  zip: z.string().min(1),
});

const CustomFormLabel = ({ children }: { children: ReactNode }) => {
  return <FormLabel className="text-xs font-light">{children}</FormLabel>;
};

interface CustomInputProps extends InputProps {
  className?: string;
  children?: ReactNode;
}

const CustomInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  function CustomInput(props: CustomInputProps, ref) {
    const inputProps = { ...props };
    delete inputProps.children;
    delete inputProps.className;

    return (
      <div className="flex border rounded-md">
        <Input
          className={`text-xs font-light h-7 text-[#7e7e7e] border-none ${props.className}`}
          {...inputProps}
          ref={ref}
        />
        {props.children && (
          <div className="flex ml-auto mr-2.5 gap-1 items-center">
            {props.children}
          </div>
        )}
      </div>
    );
  }
);

const CheckoutForm = ({
  taxDeductionDetails,
}: {
  taxDeductionDetails: TaxDeductionForm;
}) => {
  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
  });

  const onSubmit = (values: z.infer<typeof checkoutFormSchema>) => {
    console.log(taxDeductionDetails);
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-3 mt-4 px-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel>Email</CustomFormLabel>
                <FormControl>
                  <CustomInput
                    placeholder="Enter your email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cardHolderName"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel>Card holder name</CustomFormLabel>
                <FormControl>
                  <CustomInput
                    placeholder="Enter card holder name"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel>Card number</CustomFormLabel>
                <FormControl>
                  <CustomInput
                    placeholder="1234 1234 1234 1234"
                    {...field}
                    value={field.value || ""}
                    className="w-8/12"
                  >
                    <Image
                      src="/gift_basket/Visa.svg"
                      alt="visa"
                      width={22}
                      height={22}
                    />
                    <Image
                      src="/gift_basket/Mastercard.svg"
                      alt="mastercard"
                      width={22}
                      height={22}
                    />
                    <Image
                      src="/gift_basket/American_Express.svg"
                      alt="american_express"
                      width={22}
                      height={22}
                    />
                    <Image
                      src="/gift_basket/Discover.svg"
                      alt="discover"
                      width={22}
                      height={22}
                    />
                  </CustomInput>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel>Expiry date</CustomFormLabel>
                <FormControl>
                  <CustomInput
                    placeholder="MM/YY"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel>CVC</CustomFormLabel>
                <FormControl>
                  <CustomInput
                    placeholder="CVC"
                    {...field}
                    value={field.value || ""}
                  >
                    <Image
                      src="/gift_basket/cvc.svg"
                      alt="card"
                      width={22}
                      height={22}
                    />
                  </CustomInput>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel>Country or region</CustomFormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="text-xs font-light h-7 text-[#7E7E7E]">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {COUNTRIES.map((c) => (
                          <SelectItem
                            key={c}
                            value={c}
                            className="text-xs font-light"
                          >
                            {c}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel>ZIP</CustomFormLabel>
                <FormControl>
                  <CustomInput
                    placeholder="ZIP"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="rounded-full flex flex-row items-center gap-1 mx-auto mt-7 w-8/12"
        >
          <p>Donate</p>
          <HeartFilledIcon />
        </Button>
      </form>
    </Form>
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/donation/success`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if (error) {
      setMessage(error?.message || "An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="px-2">
      <PaymentElement />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-2"
      >
        {isLoading ? "Loading..." : "Pay now"}
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

interface PaymentConfig {
  publishableKey: string;
}

export const getServerSideProps = (async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/payment/config`
    );
    const { publishable_key: publishableKey }: { publishable_key: string } =
      await res.json();
    console.log(publishableKey);
    return {
      props: {
        publishableKey,
      },
    };
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return {
      props: {
        publishableKey: "",
      },
    };
  }
}) satisfies GetServerSideProps<PaymentConfig>;

const CheckoutPage = ({
  publishableKey,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isCheckout, taxDeductionDetails, taxDeductionType } =
    useTaxDeductionStore();
  const { items } = useCartStore();
  const selectedItems = items.filter((item) => item.isSelected);
  const [clientSecret, setClientSecret] = useState<string>("");

  const stripePromise = loadStripe(publishableKey);

  //   Joi.object().keys({
  //     donationCartItems: Joi.array().items(Joi.object({
  //         campaignId: Joi.string().required(),
  //         dollars: Joi.number().required(),
  //         cents: Joi.number().required(),
  //     })).min(1).required(),
  //     donationType: Joi.string().valid(
  //         'ANONYMOUS',
  //         'INDIVIDUAL_WITH_TAX_DEDUCTION',
  //         'GROUP_WITH_TAX_DEDUCTION',
  //         'WITHOUT_TAX_DEDUCTION').required(),
  //     donorFirstName: Joi.string().allow(null).required(),
  //     donorLastName: Joi.string().allow(null).required(),
  //     donorEmail: Joi.string().email().allow(null).required(),
  //     donorNricA: Joi.string().allow(null).required(),
  //     donorNricB: Joi.string().allow(null).required(),
  //     donorTrainingPrograms: Joi.array().items(Joi.string()).min(0).required(),
  //     currency: Joi.string().required(),
  // }),

  useEffect(() => {
    const fetchClientSecret = async () => {
      let reqBody: any = {};
      if (taxDeductionType === TaxDeductionType.INDIVIDUAL) {
        let t = taxDeductionDetails as IndividualTaxDeductionForm;
        reqBody = {
          donationCartItems: selectedItems.map((item) => ({
            campaignId: item.campaign.id,
            dollars: Math.floor(item.donationAmount),
            cents: Math.floor((item.donationAmount % 1) * 100),
          })),
          donationType: TaxDeductionType.INDIVIDUAL,
          donorFirstName: t.firstName,
          donorLastName: t.lastName,
          donorEmail: t.email,
          donorNricA: t.nric.slice(0, t.nric.length - 4),
          donorNricB: t.nric.slice(t.nric.length - 4),
          donorTrainingPrograms: [],
          currency: "SGD",
        };
      } else if (taxDeductionType === TaxDeductionType.ANONYMOUS) {
        reqBody = {
          donationCartItems: selectedItems.map((item) => ({
            campaignId: item.campaign.id,
            dollars: Math.floor(item.donationAmount),
            cents: Math.floor((item.donationAmount % 1) * 100),
          })),
          donationType: TaxDeductionType.ANONYMOUS,
          donorFirstName: null,
          donorLastName: null,
          donorEmail: null,
          donorNricA: null,
          donorNricB: null,
          donorTrainingPrograms: [],
          currency: "SGD",
        };
      } else if (taxDeductionType === TaxDeductionType.NO_TAX_DEDUCTION) {
        const t = taxDeductionDetails as NoTaxDeductionForm;
        reqBody = {
          donationCartItems: selectedItems.map((item) => ({
            campaignId: item.campaign.id,
            dollars: Math.floor(item.donationAmount),
            cents: Math.floor((item.donationAmount % 1) * 100),
          })),
          donationType: TaxDeductionType.NO_TAX_DEDUCTION,
          donorFirstName: null,
          donorLastName: t.name,
          donorEmail: t.email,
          donorNricA: null,
          donorNricB: null,
          donorTrainingPrograms: [],
          currency: "SGD",
        };
      } else if (taxDeductionType === TaxDeductionType.ORGANISATION) {
        const t = taxDeductionDetails as OrganisationTaxDeductionForm;
        reqBody = {
          donationCartItems: selectedItems.map((item) => ({
            campaignId: item.campaign.id,
            dollars: Math.floor(item.donationAmount),
            cents: Math.floor((item.donationAmount % 1) * 100),
          })),
          donationType: TaxDeductionType.ORGANISATION,
          donorFirstName: null,
          donorLastName: t.name,
          donorEmail: t.email,
          donorNricA: null,
          donorNricB: null,
          donorTrainingPrograms: [],
          currency: "SGD",
        };
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/payment/createPaymentIntent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      ).catch((err) => console.log(err));
      if (!res) return;
      const { clientSecret: secret } = await res.json();
      setClientSecret(secret);
      console.log("secret ", secret);
    };
    fetchClientSecret();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar title="Gift Basket" />
      <div className="overflow-hidden w-screen px-2 mb-4">
        <Cart />
        {/* <CheckoutForm taxDeductionDetails={taxDeductionDetails} /> */}
        <h1 className="flex justify-center mb-4">Payment</h1>
        {clientSecret && stripePromise ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <PaymentForm />
          </Elements>
        ) : (
          <span className="flex justify-center">Loading...</span>
        )}
      </div>
    </main>
  );
};

export default CheckoutPage;
