// arrayEquals: a[] -> b[] -> boolean
// Variants: Record<string, unknown[]>
// VariantNameAndData: Record<keyof Variants, Unshift Variant>[keyof Variants]
// ExhaustiveCasePattern: Record<keyof Variants, (..._: (Variant value)[])> -> Result
// CasePattern =
    // | ExhaustiveCasePattern<Variants, Result>
    // | Partial <ExhaustiveCasePattern<Variants, Result>> & { _: () => Result }

