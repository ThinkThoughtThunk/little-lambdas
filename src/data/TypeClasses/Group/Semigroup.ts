import {Magma} from "./Magma";

/**
 * A Semigroup is a Magma whose binary operation is associative.
 * Laws:
 * 1. Associativity
 *   a. (a <> b) <> c == a <> (b <> c)
 */
export interface Semigroup<A> extends Magma<A> {
  
}


/**
class Semigroup m where
  (<>) :: m -> m -> m

  -- defining sconcat is unnecessary, it has a default implementation
  sconcat :: NonEmpty m -> m
  sconcat = ...

  -- defining stimes is unnecessary, it has a default implementation
  stimes :: Integral a => a -> m -> m
  stimes = ...

 */
