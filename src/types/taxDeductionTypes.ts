import { z } from "zod";

export enum TaxDeductionType {
  ANONYMOUS = "ANONYMOUS",
  INDIVIDUAL = "INDIVIDUAL_WITH_TAX_DEDUCTION",
  ORGANISATION = "GROUP_WITH_TAX_DEDUCTION",
  NO_TAX_DEDUCTION = "WITHOUT_TAX_DEDUCTION",
}

export const anonymousSchema = z.object({
  type: z.literal("ANONYMOUS").default("ANONYMOUS"),
});

export const individualTaxDeductionFormSchema = z.object({
  salutation: z.enum(["Mr", "Mrs", "Ms", "Miss", "mr", "mrs", "ms", "miss"]),
  firstName: z.string(),
  lastName: z.string(),
  nric: z.string().regex(new RegExp(/^[A-Z]\d{7}[A-Z]$/i)),
  email: z.string().email(),
});

export const organisationTaxDeductionFormSchema = z.object({
  name: z.string(),
  uen: z.string(),
  email: z.string().email(),
});

export const noTaxDeductionFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const taxDeductionFormSchema = z.union([
  anonymousSchema,
  individualTaxDeductionFormSchema,
  organisationTaxDeductionFormSchema,
  noTaxDeductionFormSchema,
]);

export type AnonymousDonationForm = z.infer<typeof anonymousSchema>;

export type IndividualTaxDeductionForm = z.infer<
  typeof individualTaxDeductionFormSchema
>;

export type OrganisationTaxDeductionForm = z.infer<
  typeof organisationTaxDeductionFormSchema
>;

export type NoTaxDeductionForm = z.infer<typeof noTaxDeductionFormSchema>;

export type TaxDeductionForm = z.infer<typeof taxDeductionFormSchema>;
