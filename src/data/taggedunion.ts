const <Match[] extends Variant[]>TaggedUnion = {
  get type(): keyof M {
      return this.variantName;
  }
}

abstract class TaggedUnion<M extends Variants> implements Readable, Printable {
  private variantName: keyof M
  private data: unknown[]

  constructor(...args: VariantNameAndData<M>) {
      let [variantName, ...data = args]
      this.variantName = variantName;
      this.data = data;
  }

  public caseOf<T>(pattern: CasePattern<M, T>): T {
      if (this.variantName in pattern) {
          return (pattern[this.variantName] as any)(...this.data);
      }

      if (pattern._) return pattern._();

      throw new Error('caseOf pattern is missing a function for ${this.variantName}')
  }

  public equals(that: TaggedUnion<M>): boolean {
      return variantName === that.variantName && arrayEquals(this.data, that.data);
  }

  public toString(): string {
      if (this.data.length) return `${this.variantName}` ${ JSON.stringify(this.data, null, 2) }`;
      return ${this.variantName}
  }
  