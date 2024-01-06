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
import React, { ReactNode, forwardRef, HTMLProps } from "react";
import { emailSchema } from ".";
import {
  useTaxDeductionStore,
  TaxDeductionForm,
} from "@/stores/useTaxDeductionStore";
import Image from "next/image";

type Country = (typeof countries)[number]["name"];
const COUNTRIES: [Country, ...Country[]] = [
  countries[0].name,
  ...countries.slice(1).map((c) => c.name),
];

const checkoutFormSchema = z.object({
  email: emailSchema,
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

const CheckoutPage = () => {
  const { isCheckout, taxDeductionDetails } = useTaxDeductionStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar title="Gift Basket" />
      <div className="overflow-hidden w-screen px-2 mb-4">
        <Cart />
        <CheckoutForm taxDeductionDetails={taxDeductionDetails} />
      </div>
    </main>
  );
};

export default CheckoutPage;
