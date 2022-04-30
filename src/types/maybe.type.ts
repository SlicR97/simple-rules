export type Maybe<T> = T | undefined;

export namespace Maybe {
  export const Some = <T>(obj: T): Maybe<T> => obj;
  export const None = <T>(): Maybe<T> => undefined;
}
