import {Builtin} from 'ts-essentials'
// List + extensions
// Record + extensions
// Function + Extensions
// Basics?
// Dict?
// Set
// String extesnsions
// Type
// unary
// Opaque types
// nary
// Result
// Process
// Command
// Subscription
// Sum Type
// Product Type

// Pattern Matching

// export const Type = (value: BaseType)
// interface Setoid {
//   equals(a: Setoid): boolean;
// }

// interface Show {
//   toString(): string;
// }

// type Unshift<T extends any[], V, U = (a: V, ...b: T) => void> = U extends (...x: infer R) => void ? R : never;

// export { Setoid, Show, Unshift };

// type BaseType<OpaqueType extends Opaque<unknown>> =OpaqueType[typeof Symbols.base]
// type BrandType<OpaqueType extends Opaque<unknown>> = OpaqueType[typeof Symbols.brand]
// type Opaque<BaseType, BrandType = unknown> = BaseType & Immutable{
//   [Symbols.base]: BaseType;
//   [Symbols.brand]: BrandType;
// }
export type Immutable<T> = T extends Error
  ? Required<T>
  : T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? Map<Immutable<K>, Immutable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<Immutable<K>, Immutable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<Immutable<K>, Immutable<V>>
  : T extends Set<infer U>
  ? Set<Immutable<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<Immutable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<Immutable<U>>
  : T extends Promise<infer U>
  ? Promise<Immutable<U>>
  : T extends {}
  ? { [K in keyof T]-?: Immutable<T[K]> }
  : Required<T>;

// export function Type<OpaqueType extends Opaque<unknown>>(
//   value: BaseType<OpaqueType>
// ): OpaqueType {
//   return value as OpaqueType;
// }

/// Syntax
declare const __Signifier__: unique symbol;
type _Glyph = typeof __Signifier__;
type _Grapheme = _Glyph;
type _Interpretent = _Glyph;
// type Signifier = _Glyph

/// Semantics
declare type __Signified__ = Immutable;
type _Meaning<Signified extends _Meaning<Signified>>;
type _Symbol<Signified extends _Meaning<Signified>> = '';
type _Value<Signified extends Symbol<Signified>> = '';

/// Syntax + Semantics
declare const __Sign__: readonly [_Glyph, _Meaning];
type _Word<Sign extends _Meaning> = '';
type _Token<Sign extends _Meaning> = '';
type _MorphemeCluster<Sign extends _Meaning> = '';
type _Lexeme<Sign extends _Meaning> = '';

interface Sign<Signified extends _Meaning, Signifier extends string & _Glyph> {
  (_: Signifier, __: Signified): Signified & {
    readonly [__Signifier__]: Signified;
  };
}
// const Tagged: Sign<typeof `${Union}`, S, SS> = (value: S, signifier: SS) =>

// Make an opaque type
// Extract the base type

// const weight = Tagged`${10} kg`
// const RemoteData = Tagged`
//   | NotAsked
//   | Loading
//   | Failure Error
//   | Success Value
// `
// typeof RemoteData == RemoteData<NotAsked | Loading | Failure<Error> | Success<Value>>

// type Weight = 'kg' | 'lb'

// Lexicon = {Word}
// Grammar = Rules of combination to produce semantics
// Language = [Lexicon, Grammar]
