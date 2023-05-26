// partially ordered set -> neighbors ordered
export interface MeetSemiLattice<a> extends Set<a> {
  /** Traits: associativity, commutativity, idempotency */
  meet // works like compare for nonempty finite subset
  // X ∧ Y
  // https://math.hawaii.edu/~jb/math618/os2uh.pdf
}
// X ∧ Y => X <= Y

// partially ordered set -> neighbors ordered
export interface JoinSemiLattice<a> extends Set<a> {
  /** Traits: associativity, commutativity, idempotency */
  join // V
}
// X V Y => X >= Y

// fully ordered set -> lattices are also monoids
export interface Lattice<a> extends MeetSemiLattice<a>, JoinSemiLattice<a> {}
