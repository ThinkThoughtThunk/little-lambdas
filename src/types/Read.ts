export interface Read<T> {
  fromString(s: string): T;
  parse(s: string): T;
}
