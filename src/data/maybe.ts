import {TaggedUnion} from "./Data/TaggedUnion";
import { Monad } from "./Types/Monad';

type Garbage = null | undefined | typeof NaN

// TODO: two params
const id = <T>(t: T) => t

const exists = <T extends unknown | Garbage>(t: T): t is T =>
    t !== null &&
    t !== undefined &&
    !Number.isNaN(t)

const Nothing = (): Maybe => new Maybe("Nothing")

const Just = <T>(t: T): Maybe<T> => new Maybe<T>("Just", t)

const of = <T>(t: T): Maybe<T> => exists(t) ? Just(t) : Nothing();

const caseOf = <T, U, V> ({Nothing: () => u, just: t => exists(t) ? T : never}): { Nothing: () => U, Just: (t: T) => V} => ({
    Nothing: () => u as U,
    Just: id
})

const map = <T, U> (f: (t: T) => U): Maybe<U> = caseOf({
    Nothing,
    Just: (t: T) => Just(f(t)),
})

const otherwise = <T, U, V>(defaultValue: U): T | U => caseOf({
        Nothing: () => defaultValue,
        Just: (t: T) => t,
    });

const otherwise = (f: () => Maybe<T>): Maybe<T> =>
    this.caseOf({
        Nothing: f,
        Just: () => this,
    })

const thenMapPair<U, R>(other: Maybe<U>, f: (mine: T, other: U) => R): Maybe < R > flatMap(mine => other.map(other => f(mine, other)));

const thenPairWith<U>(other: Maybe<U>): Maybe < [T, U] > {
    return this.map2(other, (mine, other) => [mine, other]);


const andThen<U>(f: (t: T) => Maybe<U>): Maybe<U> =>
    caseOf({
        Nothing,
        Just: f
    });

const thenRejectIf(pred: (t: T) => boolean): Maybe<T> =>
    caseOf({
        Nothing,
        Just: (t: T) => (pred(t) ? Nothing() : Just(t),
    });

const thenKeepIf(f: (t: T) => boolean): Maybe < T > {
    return this.caseOf({
        Nothing: () => Nothing(),
        Just: (data: T) => (f(data) ? Just(data) : Nothing()),
    });
}

    static otherwise<T, U>(elseCase: T | U, m: Maybe<T>): T | U {
    return m.getOrElse(elseCase);
}

const Maybe<T extends null | typeof NaN | void | undefined | never ? never : infer T>
    extends TaggedUnion<{ Nothing: ['Nothing'] as never; Just: ['Just', T] as T }> implements Monad < T >
