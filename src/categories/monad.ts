// export abstract class Monad<T> extends Endofunctor {}
// A monad is a monoid in the category of endofunctor

// type Object<T> =
// a set is a collection of objects that share some property

type Obj<Property = any> = Map<any, any> & {property: Property}
// type Objs<Obj> = Obj[]

type Source<P = any> = Obj<P>
type Target<P = any> = Obj<P>

type Arrow<Source, Target, Result> = (s: Source, t: Target) => Result

// type Arrows<P> = Arrow<P>[]

// type Compose<A extends Obj, B extends Obj, C extends Obj> =
//   Compose<Arrow<A, B>, Arrow<B, C>> extends Arrow<A, C> ? Arrow<A, C> : never

// abstract class Category<A, B, C, Source extends Objs<A>, Target extends Objs<B>> {
//   abstract objects: Set<Obj>
//   abstract arrows: Set<Arrow<Source, Target>>
//   abstract compose: Compose<A, B, C>

// }

// abstract class Category<Object, Arrow extends > {
//   objects: Set<Object>
//   arrows
// }
// type Functor<C, D> = ()
