import { Eq } from './TypeClasses/Ord/Setoid'
import { Show } from './TypeClasses/Show'
import { Unshift } from './TypeClasses/union-types'
import { arrayEquals } from './arrayEquals'

export type Variants = { [key: string]: unknown[] }

export type VariantNameAndData<T extends Variants> = {
  [K in keyof T]: Unshift<T[K], K>
}[keyof T]

export type ExhaustiveCasePattern<T extends Variants, R> = {
  [K in keyof T]: (...args: T[K]) => R
}

export type CasePattern<T extends Variants, R> =
  | ExhaustiveCasePattern<T, R>
  | (Partial<ExhaustiveCasePattern<T, R>> & { _: () => R })

export abstract class SumType<M extends Variants> implements Eq, Show {
  private variantName: keyof M
  private data: unknown[]

  constructor(...args: VariantNameAndData<M>) {
    let [variantName, ...data] = args
    this.variantName = variantName
    this.data = data
  }

  // @deprecated
  public get kind(): keyof M {
    return this.variantName
  }

  public get type(): keyof M {
    return this.variantName
  }

  public caseOf<T>(pattern: CasePattern<M, T>): T {
    if (this.variantName in pattern)
      return (pattern[this.variantName] as any)(...this.data)
    if (pattern._) return pattern._()

    throw new Error(
      `caseOf pattern is missing a function for ${this.variantName.toString()}`
    )
  }

  public equals(that: SumType<M>) {
    return (
      this.variantName === that.variantName && arrayEquals(this.data, that.data)
    )
  }

  public toString() {
    if (this.data.length) {
      return `${this.variantName.toString()} ${JSON.stringify(this.data)}`
    }

    return `${this.variantName.toString()}`
  }
}
