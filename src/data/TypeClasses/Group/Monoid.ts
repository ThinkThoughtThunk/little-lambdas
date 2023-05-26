import {Semigroup} from "./Semigroup";

/**
 * A monoid is a semigroup with an identity element.
 * Laws:
 * 1. Identity
 *   a. x <> mempty = x
 *   b. mempty <> x = x
 * 2. Associativity
 *   a. (x <> y) <> z = x <> (y <> z)
 */
export interface Monoid<T> extends Semigroup<T> { 
  empty: T
}

/**

class Semigroup m => Monoid m where
  mempty :: m

  -- defining mappend is unnecessary, it copies from Semigroup
  mappend :: m -> m -> m
  mappend = (<>)

  -- defining mconcat is optional, since it has the following default:
  mconcat :: [m] -> m
  mconcat = foldr mappend mempty

-- Identity laws
x <> mempty = x
mempty <> x = x

-- Associativity
(x <> y) <> z = x <> (y <> z)
 */
