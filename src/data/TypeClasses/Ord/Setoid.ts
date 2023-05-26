/**
 * A Setoid (aliased to Eq) is a TypeClass which consists of a set and an equivalence relation over the set.
 */
interface Setoid<Equivalence = boolean> {
  equals(_: Setoid): Equivalence
  // is(a: Setoid): Equivalence
}

export type Eq = Setoid

/**
  Reflexivity
  Symmetry
  Transitivity
 */
