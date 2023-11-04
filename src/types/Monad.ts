import { Functor } from './Functor'

export type Then<T, U> = (t: T) => Monad<U>

export interface Monad<T> extends Functor<T> {
  then<U>(f: Then<T, U>): Monad<U>
}
