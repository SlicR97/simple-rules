import { MinLength } from './rules/min-length.rule'
import { NotEmpty } from './rules/not-empty.rule'
import { Email } from './rules/email.rule'
import { MaxLength } from './rules/max-length.rule'
import { NotNullOrUndefined } from './rules/not-null-or-undefined.rule'
import { NotEqual } from './rules/not-equal.rule'
import { Equal } from './rules/equal.rule'
import { Length } from './rules/length.rule'
import { LessThan } from './rules/less-than.rule'
import { LessThanOrEqual } from './rules/less-than-or-equal.rule'
import { GreaterThan } from './rules/greater-than.rule'
import { GreaterThanOrEqual } from './rules/greater-than-or-equal.rule'
import { Matches } from './rules/matches.rule'

export * from './rules'

export * from './types/maybe.type'
export * from './types/rule-violation.type'
export * from './types/validation-result.type'

export * from './rules/basic.rule'
export * from './rules/email.rule'
export * from './rules/equal.rule'
export * from './rules/greater-than.rule'
export * from './rules/greater-than-or-equal.rule'
export * from './rules/length.rule'
export * from './rules/less-than.rule'
export * from './rules/less-than-or-equal.rule'
export * from './rules/matches.rule'
export * from './rules/max-length.rule'
export * from './rules/min-length.rule'
export * from './rules/not-empty.rule'
export * from './rules/not-equal.rule'
export * from './rules/not-null-or-undefined.rule'

/**
 * @namespace
 * @borrows NotEmpty.validate as notEmpty
 * @borrows MinLength.validate as minLength
 */
export const Rules = {
  /**
   * Shorthand for @see {@link Email.validate}
   */
  email: Email.validate,

  /**
   * Shorthand for @see {@link Equal.validate}
   */
  equal: Equal.validate,

  /**
   * Shorthand for @see {@link GreaterThan.validate}
   */
  greaterThan: GreaterThan.validate,

  /**
   * Shorthand for @see {@link GreaterThanOrEqual.validate}
   */
  greaterThanOrEqual: GreaterThanOrEqual.validate,

  /**
   * Shorthand for @see {@link length.validate}
   */
  length: Length.validate,

  /**
   * Shorthand for @see {@link LessThan.validate}
   */
  lessThan: LessThan.validate,

  /**
   * Shorthand for @see {@link LessThanOrEqual.validate}
   */
  lessThanOrEqual: LessThanOrEqual.validate,

  /**
   * Shorthand for @see {@link Matches.validate}
   */
  matches: Matches.validate,

  /**
   * Shorthand for @see {@link MaxLength.validate}
   */
  maxLength: MaxLength.validate,

  /**
   * Shorthand for @see {@link MinLength.validate}
   */
  minLength: MinLength.validate,

  /**
   * Shorthand for @see {@link NotEmpty.validate}
   */
  notEmpty: NotEmpty.validate,

  /**
   * Shorthand for @see {@link NotEqual.validate}
   */
  notEqual: NotEqual.validate,

  /**
   * Shorthand for @see {@link NotNullOrUndefined.validate}
   */
  notNullOrUndefined: NotNullOrUndefined.validate,
}
