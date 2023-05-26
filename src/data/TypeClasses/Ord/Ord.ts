import { Eq } from './Setoid'

/**
 * Ord is a TypeClass which consists of a totally ordered set made by extending a Setoid with an ordering Equivalence Relation.
 */
export interface Ord<T> extends Eq {
  compare(_: T): Ordering
}

type Ordering = 'LT' | 'EQ' | 'GT'
