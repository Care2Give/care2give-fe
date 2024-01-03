import React, { ReactNode, useState, Dispatch, useEffect, forwardRef, PropsWithChildren, HTMLProps } from "react";
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import NavBar from "@/components/navbar";
import Cart from "@/components/gift_basket/Cart";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTaxDeductionStore } from "@/stores/useTaxDeductionStore";

export const emailSchema = z.string().regex(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/));

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
                <RadioOption value="0" label="I want this donation to be anonymous" labelClassName="text-[15px]" />
                <p className="text-[#d3d3d3] text-[10px]">
                    If you choose to donate anonymously, please note that you will not be eligible to claim a tax deduction for your contribution.
                </p>
                <RadioOption value="1" label="Request for tax deduction" labelClassName="text-[15px]" />
                <RadioOption value="3" label="Donating on behalf of an organisation" labelClassName="text-[15px]" />
            </RadioGroup>
        </div>
    )
}

const DonationForm = (
    {schemaIdx, setSchemaIdx}: 
    {schemaIdx: number; setSchemaIdx: Dispatch<React.SetStateAction<number>>}
) => {
    const router = useRouter();
    const { checkout } = useTaxDeductionStore();

    const form = useForm<z.infer<typeof schemas[typeof schemaIdx]>>({
        resolver: zodResolver(schemas[schemaIdx]),
    });

    const onSubmit = (data: z.infer<typeof schemas[typeof schemaIdx]>) => {
        console.log(data); 
        checkout(data);
        router.push("/gift_basket/checkout");
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
                                {...field}
                                value={field.value || ""}
                                className="rounded-xl text-xs" 
                                placeholder={ inputPlaceholder } 
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

const DialogLayout = ({title, triggerElement, children}: {title: string; triggerElement: ReactNode, children?: ReactNode}) => {
    return (
        <Dialog>
            <DialogTrigger>
                { triggerElement }
            </DialogTrigger>
            <DialogContent className="w-11/12 rounded-lg">
                <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                { children }
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="rounded-full">Done</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog> 
    )
}

const QRScanDialog = () => {
    return (
        <DialogLayout
            title="Scan to donate" 
            triggerElement={
                <PaymentOption>
                    <Image src="/gift_basket/dbs_logo.png" alt="dbs_logo" width={40} height={40} />
                    <Image 
                        src="/gift_basket/paynow_logo.png" 
                        alt="paynow_logo" 
                        width={80} 
                        height={80} 
                    />
                </PaymentOption> 
            }
        >
            <div className="flex flex-col items-center justify-center gap-2"> 
                <Image src="/gift_basket/qrcode.png" alt="qrcode" height={150} width={150} />
                <p className="text-[9px] text-center">QR Code is only valid for 5 minutes. Please do not use your BACK or RELOAD/REFRESH browser functions.</p>
            </div>
        </DialogLayout>
    )
}

const BankTransferDialog = () => {
    return (
        <DialogLayout 
            title="Bank Transfer Details"
            triggerElement={
                <PaymentOption>
                    <Image src="/gift_basket/bank_icon.png" alt="bank_icon" width={40} height={40} />
                </PaymentOption> 
            }
        >
            <div>
                <Label htmlFor="recipient_name">Recipient&apos;s Name</Label>
                <Input id="dialog_recipient_name" type="text" />
                <Label htmlFor="dialog_nric">NRIC</Label>
                <Input id="dialog_nric" type="text" />
                <Label htmlFor="dialog_email">Email</Label>
                <Input id="dialog_email" type="text" />
            </div>
        </DialogLayout>
    )
}

const PaymentOption = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function PaymentOption(props: PropsWithChildren, ref) {
    return (
        <div className={"rounded-md flex flex-row justify-center items-center gap-3 h-16 bg-[#E6F3FF] hover:bg-[#5185FF]"} ref={ref}>
            {props.children}
        </div>
    )
})

const PaymentMethodSelect = () => {
    return (
        <div className="border border-solid rounded-md py-3 px-4 flex flex-col gap-2 my-4">
            <h1 className="text-xl font-semibold text-center">Payment Method</h1>
            <div className="flex flex-col gap-2">
                <PaymentOption>
                    <Image 
                        src="/gift_basket/visa_logo.png" 
                        alt="visa_logo" 
                        width={200} 
                        height={50} 
                    />
                </PaymentOption>
                <QRScanDialog />
                <BankTransferDialog />
            </div>
        </div>
    )
}

const GiftBasketPage = () => {
    const [schemaIdx, setSchemaIdx] = useState<number>(0);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NavBar title="Gift Basket" />

            <div className="overflow-hidden w-screen px-2 mb-6">
                <Cart />
                <PaymentMethodSelect />
                <DonationTypeSelect setSchemaIdx={setSchemaIdx} />
                <DonationForm schemaIdx={schemaIdx} setSchemaIdx={setSchemaIdx} />
            </div>
        </main>
    )
}

export default GiftBasketPage;