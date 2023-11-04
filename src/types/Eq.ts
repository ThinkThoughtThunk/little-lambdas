/**
 * A Setoid (aliased to Eq) is a category `S` which has a binary equivalence operation `==` over members of the set.
 *
 * Contracts:
 * - Reflexivity:  ∀ x       in Setoid S => x == x
 * - Symmetry:     ∀ x, y    in Setoid S => x == y iff y == x
 * - Transitivity: ∀ x, y, z in Setoid S => if x == y and y == z then x == z
 */
interface Setoid {
  // Deep referential equality
  eq(_: Setoid): boolean
  // Deep value equality
  eqv?(_: Setoid): boolean
}

export type Eq = Setoid
