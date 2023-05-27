/**
 * Type for wrapping a nullable
 */
export type Maybe<Type> = Type | undefined

export namespace Maybe {
  /**
   * Returns a value wrapped as a maybe type
   *
   * @param obj object to be wrapped
   * @returns obj as maybe
   */
  export const Some = <Type>(obj: Type): Maybe<Type> => obj

  /**
   * Returns nothing wrapped as a maybe
   *
   * @returns nothing as maybe
   */
  export const None = <Type>(): Maybe<Type> => undefined
}
