// const Task<Failure, Success>: Switch<TaskStates<Failure, Success>> = {

// }

import { Monad } from './TypeClasses/Monad'
import { SumType } from './SumTypes'

type TaskVariants<E, T> = {
  NotAsked: []
  Loading: []
  Failure: [E]
  Success: [T]
}

export class Task<E, T> extends SumType<TaskVariants<E, T>>
  implements Monad<T> {
  public static of<E, T>(t: T): Task<E, T> {
    return Success(t)
  }

  public map<U>(f: (t: T) => U): Task<E, U> {
    return this.caseOf({
      NotAsked: () => NotAsked(),
      Loading: () => Loading(),
      Failure: e => Failure(e),
      Success: data => Success(f(data)),
    })
  }

  public mapFailure<D>(f: (e: E) => D): Task<D, T> {
    return this.caseOf({
      NotAsked: () => NotAsked(),
      Loading: () => Loading(),
      Failure: e => Failure(f(e)),
      Success: data => Success(data),
    })
  }

  public flatMap<U>(f: (t: T) => Task<E, U>): Task<E, U> {
    return this.caseOf({
      NotAsked: () => NotAsked(),
      Loading: () => Loading(),
      Failure: e => Failure(e),
      Success: (data: T) => f(data),
    })
  }

  public bimap<C, D>(leftF: (l: E) => C, rightF: (r: T) => D): Task<C, D> {
    return this.caseOf({
      NotAsked: () => NotAsked(),
      Loading: () => Loading(),
      Failure: err => Failure(leftF(err)),
      Success: data => Success(rightF(data)),
    })
  }
}

export function NotAsked<E, T>(): Task<E, T> {
  return new Task<E, T>('NotAsked')
}

export function Loading<E, T>(): Task<E, T> {
  return new Task<E, T>('Loading')
}

export function Failure<E, T>(e: E): Task<E, T> {
  return new Task<E, T>('Failure', e)
}

export function Success<E, T>(data: T): Task<E, T> {
  return new Task<E, T>('Success', data)
}
