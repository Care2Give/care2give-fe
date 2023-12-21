import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

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

const RadioOption = (props: { value: string, label: string }) => {
    return (
        <div className="flex items-center space-x-2">
            <RadioGroupItem value={props.value} id={`option-${props.value}`} />
            <Label htmlFor={`option-${props.value}`} className="font-light">{props.label}</Label>
        </div>
    )
}

const PaymentPage = () => {
    const [schemaIdx, setSchemaIdx] = useState<number>(0);

    const handleRadioChange = (v: string) => {
        setSchemaIdx(parseInt(v));
    }

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
        )

    return (
        <div className="py-3 px-6">
            <h1 className="text-center mb-7 mt-2 text-lg">Payment</h1>
            <RadioGroup defaultValue="0" onValueChange={handleRadioChange} className="flex flex-col mb-6 gap-3">
                <RadioOption value="0" label="I want this donation to be anonymous" />
                <p style={{fontSize: "0.65rem"}}>
                    If you choose to donate anonymously, please note that you will not be eligible to claim a tax deduction for your contribution.
                </p>
                <RadioOption value="1" label="Request for tax deduction" />
                <RadioOption value="3" label="Donating on behalf of an organisation" />
            </RadioGroup>
            <h1 className="text-center mb-7 mt-2 text-lg">{ formTitle(schemaIdx) }</h1>
            {
                (schemaIdx === 1 || schemaIdx === 2) && 
                <RadioGroup defaultValue="1" onValueChange={handleRadioChange} className="flex flex-col mb-6 gap-3">
                    <RadioOption value="1" label="Request for tax deduction" />
                    <RadioOption value="2" label="Proceed without tax deduction" />
                </RadioGroup>
            }
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    { formFields }
                    <Button type="submit" className="rounded-full mt-4">Done</Button>
                </form>
            </Form>
        </div>
    )
}

export default PaymentPage;