# Little Lambdas

Abstract data types support for TypeScript. You can create a new ADT by extending the `ADT` class and providing a type parameter with your sum-type options:

```ts
import { DataType } from 'little-lambdas'

class Maybe<T> extends DataType<{ just: [T]; nothing: [] }> {}
const just = <T>(x: T) => new Maybe<T>(x)
const nothing = () => new Maybe<never>()

deepObject: { lookup?: { forA?: { number?: number } } }

const maybeAdd1 = new Maybe(deepObject.lookup?.forA?.number).caseOf({
  just: (num) => num + 1, // autocomplete + `num` typed correctly as `number`
  nothing: () => 0,
})
```

## Todo

- [x] Opaque / Tagged Data Type: `DataType.ts`
- [ ] All boxed types (Maybe, Result, Task, etc.)
