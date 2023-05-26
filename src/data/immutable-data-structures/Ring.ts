// Rings generalize fields
// Multiplication doesnt need to be commutative, multiplicative inverses need not exist
// A ring is an abelian group whos operation is aaddition and has a second binop
// called multiplication that is associative, distributive over addition, and has a multiplicative identity element
export interface Ring<a> {
  add: any // commutative under addition
  multiply: any // monoid under multiplication
  distribute: any // multiplication is distributive with respect to adition
}
