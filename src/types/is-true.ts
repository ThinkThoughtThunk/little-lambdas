import { Exact } from './exact'

export type IsTrue<ToTest, IfTrue> = Exact<ToTest, true> extends true
  ? IfTrue
  : never
