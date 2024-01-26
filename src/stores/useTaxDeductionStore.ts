import {
  TaxDeductionForm,
  TaxDeductionType,
  anonymousSchema,
} from "@/types/taxDeductionTypes";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TaxDeductionStore {
  isCheckout: boolean;
  taxDeductionDetails: TaxDeductionForm;
  taxDeductionType: TaxDeductionType;
  setTaxDeductionType: (type: TaxDeductionType) => void;
  checkout: (form: TaxDeductionForm) => void;
}

export const useTaxDeductionStore = create<TaxDeductionStore>()(
  devtools(
    persist(
      (set) => ({
        isCheckout: false,
        taxDeductionType: TaxDeductionType.ANONYMOUS,
        setTaxDeductionType: (type: TaxDeductionType) => {
          set({ taxDeductionType: type });
        },
        taxDeductionDetails: anonymousSchema.parse({}),
        checkout: (form: TaxDeductionForm) => {
          set({ isCheckout: true, taxDeductionDetails: form });
        },
      }),
      { name: "tax-deduction-store" }
    )
  )
);
