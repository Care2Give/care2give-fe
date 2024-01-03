"use client";

import NavBar from "@/components/navbar";
import Cart from "@/components/gift_basket/Cart";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input, InputProps } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { countries } from 'country-list-json';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { ReactNode, forwardRef, HTMLProps } from "react";
import { emailSchema } from ".";

type Country = typeof countries[number]["name"];
const COUNTRIES: [Country, ...Country[]] = [
    countries[0].name,
    ...countries.slice(1).map((c) => c.name)
];

const checkoutFormSchema = z.object({
    email: emailSchema,
    cardHolderName: z.string(),
    cardNumber: z.string().regex(new RegExp(/^\d{16}$/)),
    expiryDate: z.string().regex(new RegExp(/^\d{2}\/\d{2}$/)),
    cvc: z.string().regex(new RegExp(/^\d{3}$/)),
    country: z.enum(COUNTRIES),
    zip: z.string().min(1),
})

const CustomFormLabel = ({children}: {children: ReactNode}) => {
    return (
        <FormLabel className="text-xs font-light">{children}</FormLabel>
    )
}

const CustomInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(function CustomInput(props: InputProps, ref) {
    return (
        <Input className="text-xs font-light h-7 text-[#7e7e7e]" {...props} ref={ref} />
    )
}) 

const CheckoutForm = () => {
    const form = useForm<z.infer<typeof checkoutFormSchema>>({
        resolver: zodResolver(checkoutFormSchema),
    })

    const onSubmit = (values: z.infer<typeof checkoutFormSchema>) => {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-5 pt-1 px-4 pb-2">
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <CustomFormLabel>Email</CustomFormLabel>
                            <FormControl>
                                <CustomInput placeholder="Enter your email" {...field} />
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
                                <CustomInput placeholder="Enter card holder name" {...field} />
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
                                <CustomInput placeholder="1234 1234 1234 1234" {...field} />
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
                                <CustomInput placeholder="MM/YY" {...field} />
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
                                            { COUNTRIES.map(c => <SelectItem key={c} value={c} className="text-xs font-light">{c}</SelectItem >) }
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
                                <CustomInput placeholder="ZIP" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="rounded-full flex flex-row items-center gap-1 mx-auto mt-7 w-8/12">
                    <p>Donate</p>
                    <HeartFilledIcon />
                </Button>
            </form>
        </Form>
    )
}

const CheckoutPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NavBar title="Gift Basket" />
            <div className="overflow-hidden w-screen px-2 mb-4">
                <Cart />
                <CheckoutForm />
            </div>
        </main>
    )
}

export default CheckoutPage;
