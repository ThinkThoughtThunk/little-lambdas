import { Eq } from './types/Eq'
import { Show } from './types/Show'

/** E.g. const options = { Just: [A]; Nothing: []; } */
export type Options = Record<string, unknown[]>

/** E.g. const match = { Just: (x) => x; Nothing: () => null; } */
export type ExhaustiveMatch<Opts extends Options, Return> = {
  [Name in keyof Opts]: (..._: Opts[Name]) => Return
}

type PartialMatch<Opts extends Options, Return = never> = Partial<
  ExhaustiveMatch<Opts, Return>
>
type WildcardMatch<Return> = { _: () => Return }

export type PatternMatch<Opts extends Options, Return> =
  | ExhaustiveMatch<Opts, Return>
  | (PartialMatch<Opts, Return> & WildcardMatch<Return>)

export abstract class DataType<Opts extends Options> implements Eq, Show {
  private name: keyof Opts
  private data: Opts[keyof Opts]

  constructor(...[name, ...data]: [keyof Opts, ...Opts[typeof name]]) {
    this.name = name
    this.data = data
  }

  toString() {
    return this.data.length
      ? `${this.type.toString()} ${JSON.stringify(this.data)}`
      : `${this.type.toString()}`
  }

  get [Symbol.toStringTag](): string {
    return this.toString()
  }

  get type(): keyof Opts {
    return this.type
  }

  /**
   * Catamorphism: "reduce" / "foldl"
   * @param pattern
   * @returns Return
   */
  caseOf<Return>(pattern: PatternMatch<Opts, Return>): Return {
    const key = this.name in pattern ? this.name : '_'
    if (key in pattern && typeof pattern[key as keyof Opts] === 'function') {
      return pattern[key as keyof Opts]!(this.data)
    }
    if (key === '_' && typeof pattern[key] === 'function') return pattern._()

    throw new Error(
      `\`caseOf\` is missing a handler function for "${this.name.toString()}"`
    )
  }

  /**
   * Referential equality
   * @param that
   * @returns boolean
   */
  eq(that: DataType<Opts>) {
    return this.name === that.name && eqArray(this.data, that.data)
  }

  /**
   * Deep Value equality
   * @param that
   * @returns boolean
   */
  eqv(that: DataType<Opts>) {
    return this.name === that.name && eqvArray(this.data, that.data)
  }
}

function exists<A>(x?: A): x is NonNullable<A> {
  return x !== null && x !== undefined
}

// TODO: Clean up these functions
function eqBase(x?: unknown, y?: unknown): boolean {
  if (x === y) return true
  if (!exists(x) || !exists(y)) {
    return false
  }
  if (Array.isArray(x) && Array.isArray(y)) {
    return x.length === y.length
  }
  if (typeof x === 'object' && typeof y === 'object') {
    const xKeys = Object.keys(x)
    const yKeys = Object.keys(y)
    return (
      eqvArray(xKeys, yKeys) &&
      eqvArray(
        xKeys.map((k) => x[k]),
        yKeys.map((k) => y[k])
      )
    )
  }
  return false
}

function eqArray(xs?: unknown[], ys?: unknown[]): boolean {
  if (xs === ys) return true
  if (!exists(xs) || !exists(ys)) {
    return false
  }
  if (xs.length !== ys.length) return false

  for (let i = 0; i < xs.length; i++) {
    if (xs[i] !== ys[i]) return false
  }
  return true
}

function eqvArray(xs?: unknown[], ys?: unknown[]): boolean {
  if (xs === ys) return true
  if (xs === null || xs === undefined || ys === null || ys === undefined) {
    return false
  }
  if (xs.length !== ys.length) return false

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    const y = ys[i]
    if (Array.isArray(x) && Array.isArray(y)) {
      return eqvArray(x, y)
    }
    if (
      (Array.isArray(x) && !Array.isArray(y)) ||
      (Array.isArray(y) && !Array.isArray(x))
    ) {
      return false
    }
    if (!exists(x) || !exists(y)) {
      return x === y
    }
    if (typeof x === 'object' && typeof y === 'object') {
      if (!eqBase(x, y)) return false
    }
  }
  return true
}
