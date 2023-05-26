import { PredicateFunction, PredicateType } from 'ts-essentials'
import { Task } from '../../src/data/Task'

export const Model = <
  V = undefined,
  P extends PredicateType<PredicateFunction> = undefined
>(
  tag: Tag<V, P>
) => {
  return {
    isOneOf: (...xs) => {},
    Task,
    of,
  }
}

type Tag<
  V = undefined,
  P extends PredicateType<PredicateFunction> = undefined
> = {
  name: string
  value?: V
  predicate?: P
}

const makeTag: typeof of = <V = undefined, P = undefined>(
  name: string,
  value?: V,
  predicate?: P
): typeof Model<V, P> => Model({ name, value, predicate })

function of<V = undefined, P = undefined>(tag: string): Tag
function of<V, P = undefined>(tag: string, value: V): Tag<V>
function of<V, P>(tag: string, value: V, p: P): Tag<V, P>
function of<V = undefined, P = undefined>(
  tag: string,
  value?: V,
  p?: P
): Tag<V, P> {
  if (arguments.length < 1) {
    throw new Error('Invariant violation in `Model.of`')
  }
  if (arguments.length === 1) {
    return makeTag(tag, undefined, undefined)
  }
  if (value === undefined) {
    return makeTag(tag, undefined, undefined)
  }
  if (arguments.length === 2) {
    return makeTag(tag, value, undefined)
  }
  if (typeof p !== 'function') {
    return makeTag(tag, value, undefined)
  }
  return makeTag(tag, value, p)
}
