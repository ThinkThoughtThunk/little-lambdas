/**
 * A Magma is a TypeClass which consists of a set and a binary operation which is closed over the set.
 * (<>) :: a -> a -> a
 */
export interface Magma<a> {
  combine(_: a): a
}
