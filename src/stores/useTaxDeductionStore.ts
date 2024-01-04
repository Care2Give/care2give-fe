import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IndividualTaxDeductionForm {

}

interface OrganisationTaxDeductionForm {
  
}

interface NoTaxDeductionForm {
  
}

export type TaxDeductionForm = IndividualTaxDeductionForm | OrganisationTaxDeductionForm | NoTaxDeductionForm | {};


interface TaxDeductionStore {
  isCheckout: boolean;
  taxDeductionDetails: TaxDeductionForm;
  checkout: (form: TaxDeductionForm) => void;
}

export const useTaxDeductionStore = create<TaxDeductionStore>()(
  devtools(
    persist(
      (set) => ({
        isCheckout: false,
        taxDeductionDetails: {},
        checkout: (form: TaxDeductionForm) => {
          set({ isCheckout: true, taxDeductionDetails: form })
        }
      }),
      { name: "tax-deduction-store" }
    )
  )
);
