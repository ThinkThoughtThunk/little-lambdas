type Reducer<Acc, Next> = (_: Acc, __: Next) => Acc

export interface Transducer<Acc, Init, Next> {
  transduce(rf: Reducer<Acc, Next>): Acc
  transduce(rf: Reducer<Acc, Next>, xs: Iterable<Init>): Acc
  transduce(rf: Reducer<Acc, Next>, init: Init, xs: Iterable<Acc>): Acc
  transduce(
    rf: Reducer<Acc, Next>,
    init: Init,
    xs: { reduce: Reducer<Acc, Next> }
  ): Acc
}
