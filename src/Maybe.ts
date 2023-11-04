import { DataType } from './DataType'

class _Maybe<Just> extends DataType<{ Just: [Just]; Nothing: [] }> {}

export const Nothing = () => new _Maybe<never>('Nothing')
export const Just = <T>(t: T) => new _Maybe<T>('Just', t)
export const Maybe = <T>(t: T) =>
  t !== null &&
  t !== undefined &&
  !(typeof t === 'number' && !Number.isFinite(t))
    ? Just<T>(t)
    : Nothing()
export type Maybe<Just> = ReturnType<typeof Maybe<Just>>
