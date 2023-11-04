type Polymorphism<From, To> = (_: From) => To;

export interface Functor<From> {
  map<To>(f: Polymorphism<From, To>): Functor<To>;
}
