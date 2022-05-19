export type Maybe<Type> = Type | undefined;

export namespace Maybe {
  export const Some = <Type>(obj: Type): Maybe<Type> => obj;
  export const None = <Type>(): Maybe<Type> => undefined;
}
