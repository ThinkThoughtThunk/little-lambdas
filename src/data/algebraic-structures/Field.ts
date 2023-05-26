import { Set } from './Set'

// A field is a set with addition, subtraction, multiplication, and division
// These operations work like they do on real numbers
export interface Field<a> extends Set<a> {
  /**
    Traits
    * associativity (addition, multiplication)
    * commutativity (addition, multiplication)
    * distributivity of multiplication over addition
   */

  plus: any // associative, commutative
  additiveInverse
  additiveIdentity

  times: any // associative, commutative
  multiplicativeInverse
  multiplicativeIdentity
}
// division by 0 excluded

// A Field is an abelian group under addition where 0 is the additive identity
// nonzero elements are abelian group under multiplication
// a field is a commutative ring where o != 1 and all nonzero elements are invertible under multiplication
