import { Monoid } from './Monoid';

/**
 * A group is a monoid with an additional operation that is its inverse.
 * Laws:
 * 1. Inverse
 *   a. a <> invert a == empty
 *   b. invert a <> a == empty
 */
export interface Group<T> extends Monoid<T> {
  invert: (x: T) => T;
}
