import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property's value conforms to the configuration specified
 * in the rule options
 */
export namespace Password {
  /**
   * Options for configuring the Password rule
   *
   * @param requireUpperCase Whether or not to require uppercase letters
   * @param requireLowerCase Whether or not to require lowercase letters
   * @param requireNumbers Whether or not to require numbers
   * @param requireSymbols Whether or not to require symbols
   * @param minLength Minimum length of the password
   */
  export type Options = {
    requireUpperCase?: boolean
    requireLowerCase?: boolean
    requireNumbers?: boolean
    requireSymbols?: boolean
    minLength?: number
  }

  /**
   * Checks if input value conforms to the configuration specified
   *
   * @param x Input to be checked
   * @param options Options for password validation
   * @returns True if the input value conforms to the configuration specified
   */
  export const rule = (x: string, options: Options): boolean => {
    if (options.requireUpperCase && !/[A-Z]/.test(x)) {
      return false
    }

    if (options.requireLowerCase && !/[a-z]/.test(x)) {
      return false
    }

    if (options.requireNumbers && !/[0-9]/.test(x)) {
      return false
    }

    if (
      options.requireSymbols &&
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(x)
    ) {
      return false
    }

    if (options.minLength && x.length < options.minLength) {
      return false
    }

    return true
  }

  /**
   * Partially applied function.
   *
   * @param options Validation options
   * @returns a function that takes a value to validate
   */
  export const validate =
    (options: Options) =>
    /**
     * Validation function
     *
     * @param x Input for validation
     * @returns RuleViolation if the validation fails, or nothing if it succeeds
     */
    (x: string): Maybe<RuleViolation<string>> =>
      basicRule({
        ruleSatisfied: rule(x, options),
        errorCode: 'PASSWORD',
        propertyValue: x,
      })
}
