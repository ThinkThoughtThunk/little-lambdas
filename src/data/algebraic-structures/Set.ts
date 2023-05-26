import { DeepReadonly as Const } from '../../types/deep-readonly'

type ASet = 'Intensional' | 'Extensional' | 'Ostensive'
export abstract class Set<item extends Const = Const> {}
/**
 Traits
  * Cardinality
  * Membership
  * Mapping = | injective | surjective | bijective

  Operations
  * complement
  * union
  * intersection
  * difference
  * symmetric difference
  * cartesian product
 */
