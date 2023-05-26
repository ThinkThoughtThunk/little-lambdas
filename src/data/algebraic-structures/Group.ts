import {DeepReadonly as Const} from '../../types/deep-readonly';
import {Exact} from '../../types/exact';
import {IsTrue as Is} from '../../types/is-true';
import {ValueOf} from '../../types/value-of';
import {Set} from './Set';

export interface Magma<m extends Const> extends Set<m> {
  readonly times: (_: m) => Magma<m>;
}

export interface UnitalMagma<m extends Const, id extends Const = Const> extends Magma<m> {
  readonly identity: MultiplicativeIdentity<id, m>;
}

// A, B, C are elements of the Magma

export interface Semigroup<a> extends Magma<a> {
  // For all a, b and c in S, the equation (a • b) • c = a • (b • c) holds.
  // traits: associativity
}

export interface Quasigroup<a> extends Magma<a> {
  // Traits:
  // * obeys Latin Square property
  //     a * x = b AND y * a = b, x != y
  // iow x = a \ b && y = b / a
  // * cancellation property
  //   if ab=ac, then b=c
  // * Invertible
  divide: any;
}

export interface InverseSemigroup<a extends Const> extends Quasigroup<a extends Const>, Semigroup<a extends Const> {
  // associativity and dividibility
}

export interface Loop extends Quasigroup<a extends Const>, UnitalMagma<a extends Const> {}

export interface Monoid extends Semigroup<a extends Const>, UnitalMagma<a extends Const> {}

export interface Group extends Loop<a extends Const>, Monoid<a extends Const>, InverseSemigroup<a extends Const> {
  /**
  Traits:
    Associativity
    Identity
    Invertibility

    G x G -> G
    c * a = a * e = a
    a * b = b * a = c
    (a * b) * c = a * (b * c)

 */
}


type _MaybeMultiplicativeIdentity<id extends Const, m extends Const> = Exact<
  ReturnType<Magma<id>['times']>,
  Magma<m>
  >;
type MultiplicativeIdentity<id, m> = Is<_MaybeMultiplicativeIdentity<id, m>, ValueOf<id>>
