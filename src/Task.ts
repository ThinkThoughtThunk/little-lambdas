import { DataType } from './DataType'
import { Monad } from './types/Monad'

export class Task<E, T>
  extends DataType<{
    NotRequested: []
    Loading: []
    Failure: [E]
    Success: [T]
  }>
  implements Monad<T>
{
  public static of<E, T>(t: T): Task<E, T> {
    return Success(t)
  }

  public map<U>(f: (t: T) => U): Task<E, U> {
    return this.caseOf({
      NotRequested: () => NotRequested(),
      Loading: () => Loading(),
      Failure: (e) => Failure(e),
      Success: (data) => Success(f(data)),
    })
  }

  public mapFailure<D>(f: (e: E) => D): Task<D, T> {
    return this.caseOf({
      NotRequested: () => NotRequested(),
      Loading: () => Loading(),
      Failure: (e) => Failure(f(e)),
      Success: (data) => Success(data),
    })
  }

  public then<U>(f: (t: T) => Task<E, U>): Task<E, U> {
    return this.caseOf({
      NotRequested: () => NotRequested(),
      Loading: () => Loading(),
      Failure: (e) => Failure(e),
      Success: (data) => f(data),
    })
  }

  public bimap<C, D>(mapLeft: (l: E) => C, mapRight: (r: T) => D): Task<C, D> {
    return this.caseOf({
      NotRequested: () => NotRequested(),
      Loading: () => Loading(),
      Failure: (err) => Failure(mapLeft(err)),
      Success: (data) => Success(mapRight(data)),
    })
  }
}

export function NotRequested<E, T>(): Task<E, T> {
  return new Task('NotRequested')
}

export function Loading<E, T>(): Task<E, T> {
  return new Task('Loading')
}

export function Failure<E, T>(e: E): Task<E, T> {
  return new Task<E, T>('Failure', e)
}

export function Success<E, T>(data: T): Task<E, T> {
  return new Task<E, T>('Success', data)
}
