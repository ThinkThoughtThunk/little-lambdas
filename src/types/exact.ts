export type Exact<a, b> = a extends b
  ? Exclude<keyof a, keyof b> extends never
    ? true
    : never
  : never
