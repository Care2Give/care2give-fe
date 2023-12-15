import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";


const individualTaxDeductionFormSchema = z.object({
    salutation: z.enum(["Mr", "Mrs", "Ms", "Miss"]),
    firstName: z.string(),
    lastName: z.string(),
    nric: z.string().regex(new RegExp(/^[A-Z]\d{7}[A-Z]$/)),
    email: z.string().regex(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
})

const organisationTaxDeductionFormSchema = z.object({
    name: z.string(),
    uen: z.string(),
    email: z.string().regex(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
})

const camelCaseToTitle = (str: string): string => {
    return str.replace(/([a-z](?=[A-Z]))/g, '$1 ').split(" ").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
}

const camelCaseToSentence = (str: string): string => {
    return str.replace(/([a-z](?=[A-Z]))/g, '$1 ').split(" ").map(s => s[0].toLowerCase() + s.slice(1)).join(" ");
}

function TaxDeductionForm(props: { schema: z.SomeZodObject }) {
    const form = useForm<z.infer<typeof props.schema>>({
        resolver: zodResolver(props.schema),
    })
    const onSubmit = (data: z.infer<typeof props.schema>) => {
        console.log(data); //TODO: add http call 
    }
    const formFields = Object.entries(props.schema.shape)
        .map(s => <FormField 
                key={s[0]}
                control={form.control}
                name={s[0]}
                render={({ field} ) => {
                    const inputTitle = camelCaseToTitle(s[0]) + (s[0] === "salutation" ? " (Mr / Mrs / Ms / Miss)" : "");
                    const inputPlaceholder = "Enter your " + (props.schema == organisationTaxDeductionFormSchema ? "organisation " : "") + camelCaseToSentence(s[0]);
                    return (
                        <FormItem>
                            <FormLabel className="font-light">{ inputTitle }</FormLabel>
                            <FormControl>
                            <Input 
                                className="rounded text-xs" 
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                { formFields }
                <Button type="submit" className="rounded mt-4">Submit</Button>
            </form>
        </Form>
    )
}

const RadioOption = (props: { value: string, label: string }) => {
    return (
        <div className="flex items-center space-x-2">
            <RadioGroupItem value={props.value} id={`option-${props.value}`} />
            <Label htmlFor={`option-${props.value}`} className="font-light">{props.label}</Label>
        </div>
    )
}

const TaxDeductionFormPage = () => {
    const [schema, setSchema] = useState<z.SomeZodObject>(individualTaxDeductionFormSchema);
    
    const handleRadioChange = (v: string) => {
        if (v === "individual") setSchema(individualTaxDeductionFormSchema);
        else setSchema(organisationTaxDeductionFormSchema);
    }

    return (
        <div className="py-3">
            <h1 className="text-center mb-7 mt-2 text-lg">Request of tax deduction</h1>
            <div className="text-sm px-6 font-light">
                <RadioGroup defaultValue="individual" onValueChange={handleRadioChange} className="flex flex-col mb-6 gap-3">
                    <RadioOption value="individual" label="Donating as an individual" />
                    <RadioOption value="organisation" label="Donating on behalf of an organisation" />
                </RadioGroup>
                <TaxDeductionForm schema={schema} />
            </div>
        </div>
    )
}

export default TaxDeductionFormPage;