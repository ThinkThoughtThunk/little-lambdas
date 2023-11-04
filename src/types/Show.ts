/**
 * Showable (convertable to string)
 */
export interface Show {
  toString(): string
  get [Symbol.toStringTag](): string
}
