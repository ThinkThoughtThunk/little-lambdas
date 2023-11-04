import { ADT } from '../src/data/ADT'

class Maybe<T> extends ADT<{
  Just: [T]
  Nothing: []
}> {
  xform(f) {
    return this.caseOf({
      Just: (x) => new Maybe('Just', f(x)),
      Nothing: () => new Maybe('Nothing'),
    })
  }
}

const Just = <A>(a: A): Maybe<A> => new Maybe('Just', a)
const Nothing = (): Maybe<never> => new Maybe('Nothing')

describe('ADT', () => {
  describe('equals', () => {
    xit('is equal when the references are the same')
    xit("isn't equal when the references are different")
  })
  describe('equalsValue', () => {
    xit('is equal when the values are the same')
    xit("isn't equal when the values are different")
  })
  describe('toString', () => {
    xit('outputs the type and data with `.toString()`')
    xit('outputs the type and data with `String(x)`')
  })
  describe('type', () => {
    xit('returns the variant type')
  })
  describe('caseOf', () => {
    let justMock: ReturnType<typeof jest.fn>
    let nothingMock: ReturnType<typeof jest.fn>
    let wildcardMock: ReturnType<typeof jest.fn>
    beforeEach(() => {
      justMock = jest.fn((_) => 'just')
      nothingMock = jest.fn(() => 'nothing')
      wildcardMock = jest.fn(() => 'wildcard')
    })
    xit('calls the `Just` function with the `Just` pattern')
    xit('calls the `Nothing` function with the `Nothing` pattern')
    xit("calls the wildcard `_` function when it's the only pattern")
    xit('calls the wildcard `_` function when no matching variant is found')
    xit(
      "calls the wildcard `_` function and not any subsequent variants' functions"
    )
    xit('throws when no matching handler is provided')
  })
})
