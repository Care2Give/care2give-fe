import React, { ReactNode, useState, Dispatch, Fragment } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { HeartFilledIcon, TrashIcon } from "@radix-ui/react-icons";
import NavBar from "@/components/navbar";
import Image from "next/image";
import { useCartStore, CartItem } from "@/store/cartStore";

const emailSchema = z.string().regex(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/));

const anonymousSchema = z.object({});

const individualTaxDeductionFormSchema = z.object({
    salutation: z.enum(["Mr", "Mrs", "Ms", "Miss"]),
    firstName: z.string(),
    lastName: z.string(),
    nric: z.string().regex(new RegExp(/^[A-Z]\d{7}[A-Z]$/)),
    email: emailSchema
});

const organisationTaxDeductionFormSchema = z.object({
    name: z.string(),
    uen: z.string(),
    email: emailSchema
});

const noTaxDeductionFormSchema = z.object({
    name: z.string(),
    email: emailSchema
});

const schemas: z.SomeZodObject[] = [
    anonymousSchema, 
    individualTaxDeductionFormSchema, 
    organisationTaxDeductionFormSchema, 
    noTaxDeductionFormSchema
];

const camelCaseToTitle = (str: string): string => {
    return str.replace(/([a-z](?=[A-Z]))/g, '$1 ').split(" ").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
}

const camelCaseToSentence = (str: string): string => {
    return str.replace(/([a-z](?=[A-Z]))/g, '$1 ').split(" ").map(s => s[0].toLowerCase() + s.slice(1)).join(" ");
}

const RadioOption = ({value, label, labelClassName}: { value: string; label: string; labelClassName?: string}) => {
    return (
        <div className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={`option-${value}`} />
            <Label htmlFor={`option-${value}`} className={"font-light " + labelClassName}>{label}</Label>
        </div>
    )
}

const DonationTypeSelect = ({setSchemaIdx}: {setSchemaIdx: Dispatch<React.SetStateAction<number>>}) => {
    return (
        <div className="px-3">
            <RadioGroup defaultValue="0" onValueChange={(v) => setSchemaIdx(parseInt(v))} className="flex flex-col mb-6 gap-3">
                <RadioOption value="0" label="I want this donation to be anonymous" labelClassName="text-md" />
                <p className="text-[#d3d3d3] text-[10px]">
                    If you choose to donate anonymously, please note that you will not be eligible to claim a tax deduction for your contribution.
                </p>
                <RadioOption value="1" label="Request for tax deduction" labelClassName="text-md" />
                <RadioOption value="3" label="Donating on behalf of an organisation" labelClassName="text-md" />
            </RadioGroup>
        </div>
    )
}

const DonationForm = ({schemaIdx, setSchemaIdx}: {schemaIdx: number; setSchemaIdx: Dispatch<React.SetStateAction<number>>}) => {
    const form = useForm<z.infer<typeof schemas[typeof schemaIdx]>>({
        resolver: zodResolver(schemas[schemaIdx]),
    });

    const onSubmit = (data: z.infer<typeof schemas[typeof schemaIdx]>) => {
        console.log(data); //TODO: add http call 
    }

    const formTitle = (i: number) : string => {
        if (i === 1 || i === 2) return "Request of tax deduction";
        else if (i === 3) return "Your Details";
        return "";
    }

    const formFields = Object.entries(schemas[schemaIdx].shape)
        .map(s => <FormField 
                key={s[0]}
                control={form.control}
                name={s[0]}
                render={({ field} ) => {
                    const inputTitle = camelCaseToTitle(s[0]) + (s[0] === "salutation" ? " (Mr / Mrs / Ms / Miss)" : "");
                    const inputPlaceholder = "Enter your " + (schemas[schemaIdx] == organisationTaxDeductionFormSchema ? "organisation " : "") + camelCaseToSentence(s[0]);
                    return (
                        <FormItem>
                            <FormLabel className="font-light">{ inputTitle }</FormLabel>
                            <FormControl>
                            <Input 
                                className="rounded-xl text-xs" 
                                placeholder={ inputPlaceholder } {...field} 
                            />
                            </FormControl>
                            { form.formState.errors[s[0]] && <p className="text-red-600">Invalid { inputTitle }</p> }
                        </FormItem>
                    )
                }}
            />
        );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                {schemaIdx != 0 && 
                    <div className="border border-solid rounded-md pt-1 px-4 pb-3">
                        <h1 className="text-center mb-7 mt-2 text-lg">{ formTitle(schemaIdx) }</h1>
                        {
                            (schemaIdx === 1 || schemaIdx === 2) && 
                            <RadioGroup defaultValue="1" onValueChange={(v) => setSchemaIdx(parseInt(v))} className="flex flex-col mb-6 gap-3">
                                <RadioOption value="1" label="Request for tax deduction" />
                                <RadioOption value="2" label="Proceed without tax deduction" />
                            </RadioGroup>
                        }
                        <div className="flex flex-col gap-3">
                            { formFields }
                        </div>
                    </div>
                }
                <Button type="submit" className="rounded-full flex flex-row items-center gap-1 mx-auto mt-4 w-8/12">
                    <p>Donate</p>
                    <HeartFilledIcon />
                </Button>
            </form>
        </Form>
    )
}

const PaymentOption = ({children}: {children?: ReactNode}) => {
    return (
        <div className={"rounded-md flex flex-row justify-center items-center gap-3 h-16 bg-[#E6F3FF] hover:bg-[#5185FF]"}>
            {children}
        </div>
    )
}

const PaymentMethodSelect = () => {
    return (
        <div className="border border-solid rounded-md py-3 px-4 flex flex-col gap-2 my-4">
            <h1 className="text-xl font-semibold text-center">Payment Method</h1>
            <div className="flex flex-col gap-2">
                <PaymentOption>
                    <Image src="/gift_basket/visa_logo.png" alt="visa_logo" width={200} height={40} />
                </PaymentOption>
                <PaymentOption>
                    <Image src="/gift_basket/dbs_logo.png" alt="dbs_logo" width={40} height={40} />
                    <Image src="/gift_basket/paynow_logo.png" alt="paynow_logo" width={80} height={40} />
                </PaymentOption>
                <PaymentOption>
                    <Image src="/gift_basket/bank_icon.png" alt="bank_icon" width={40} height={40} />
                </PaymentOption> 
            </div>
        </div>
    )
}

const GiftBasketCartItem = ({cartItem, removeItem}: {cartItem: CartItem; removeItem: (item: CartItem) => void}) => {
    return (
        <div className="flex flex-row gap-2 items-center bg-[#5185FF] text-white px-5 py-2 rounded-xl font-extralight">
            <Image src={cartItem.campaign.coverImagesURLs[0]} alt="campaign_image" width={80} height={80} className="rounded" />
            <div className="flex flex-col gap-1">
                <h3 className="text-[13px] font-semibold">{cartItem.campaign.title}</h3>
                <p className="text-[9px]" style={{
                    maxWidth: '100%',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>{cartItem.campaign.description}</p>
                <div className="flex">
                    <p className="border border-solid border-[#43D7AE] rounded-lg px-2 py-1 text-[11px] flex flex-row gap-1">
                        <span className="font-semibold">$</span>
                        {cartItem.donationOption.value + cartItem.otherAmount
                    }</p>
                </div>
            </div>
            <TrashIcon width={100} height={100} onClick={() => removeItem(cartItem)} />
        </div>
    )
}

const GiftBasketPage = () => {
    const { items, removeItem } = useCartStore();
    const [schemaIdx, setSchemaIdx] = useState<number>(0);
    
    const giftBasketCartItems = items.map((i, idx) => <GiftBasketCartItem key={idx} cartItem={i} removeItem={removeItem} />);
    const totalAmount = items.reduce((acc, c) => acc + c.donationOption.value + c.otherAmount ,0);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NavBar title="Gift Basket" />
            <div className="overflow-hidden w-screen px-2 mb-6">
                <div className="flex flex-col gap-2">
                    {giftBasketCartItems}
                </div>
                <div className="px-4">
                    <hr className="my-4" />
                    <div className="flex flex-row">
                        <p>Total</p>
                        <p className="ml-auto font-bold">${totalAmount}</p>
                    </div>
                </div>
                <PaymentMethodSelect />
                <DonationTypeSelect setSchemaIdx={setSchemaIdx} />
                <DonationForm schemaIdx={schemaIdx} setSchemaIdx={setSchemaIdx} />
            </div>
        </main>
    )
}

export default GiftBasketPage;