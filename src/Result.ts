import { DataType } from './DataType'
import { Just, Nothing } from './Maybe'

class _Result<L, R> extends DataType<{ Err: [L]; Ok: [R] }> {
  static fromNullable<L, R>(error: L, x: R | undefined | null): _Result<L, R> {
    return x === null || x === undefined ? Err(error) : Ok(x)
  }

  // static withDefault<T, U>(elseCase: T | U, m: Maybe<T>): T | U {
  //   return m.getOrElse(elseCase)
  // }

  map<R2>(f: (t: R) => R2): _Result<never, R2> {
    return this.caseOf({
      Err: (err) => Err(err),
      Ok: (data) => Ok(f(data)),
    })
  }

  mapErr<L2>(f: (e: L) => L2): _Result<L2, R> {
    return this.caseOf({
      Err: (err) => Err(f(err)),
      Ok: (data) => Ok(data),
    })
  }

  bimap<L2, R2>(leftF: (l: L) => L2, rightF: (r: R) => R2): _Result<L2, R2> {
    return this.caseOf({
      Err: (err) => Err(leftF(err)),
      Ok: (data) => Ok(rightF(data)),
    })
  }

  flatMap<L2, R2>(f: (t: R) => _Result<L | L2, R2>): _Result<L | L2, R2> {
    return this.caseOf({
      Err: (err) => Err(err),
      Ok: (data) => f(data),
    })
  }

  toMaybe() {
    return this.caseOf({
      Err: (_) => Nothing(),
      Ok: (ok) => Just<R>(ok),
    })
  }

  getOrElse<R2>(elseCase: R | R2): R | R2 {
    return this.caseOf({
      Err: (_) => elseCase,
      Ok: (data) => data,
    })
  }
}

function Err<L>(error: L): _Result<L, never> {
  return new _Result<L, never>('Err', error)
}

function Ok<R>(data: R): _Result<never, R> {
  return new _Result<never, R>('Ok', data)
}

function Result<A>(x: A) {
  if (x === undefined || x === null || x instanceof Error) {
    return Err<A>(x)
  }
  return Ok<A>(x)
}

export default Result
export { Err, Ok, Result }
