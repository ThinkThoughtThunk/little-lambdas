export type Unshift<
  T extends any[],
  V,
  U = (a: V, ...b: T) => void
> = U extends (...x: infer R) => void ? R : never;
