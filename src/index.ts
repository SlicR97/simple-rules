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
import { CreditCard } from './rules/credit-card.rule'
import { Empty } from './rules/empty.rule'
import { NullOrUndefined } from './rules/null-or-undefined.rule'
import { NotNull } from './rules/not-null.rule'
import { NotUndefined } from './rules/not-undefined.rule'
import { Null } from './rules/null.rule'
import { Undefined } from './rules/undefined.rule'
import { ExclusiveBetween } from './rules/exclusive-between.rule'
import { InclusiveBetween } from './rules/inclusive-between.rule'
import { Password } from './rules/password.rule'
import { Equivalent } from './rules/equivalent.rule'
import { NotEquivalent } from './rules/not-equivalent.rule'

export * from './rules'

export * from './types/maybe.type'
export * from './types/rule-violation.type'
export * from './types/validation-result.type'

export * from './rules/basic.rule'
export * from './rules/credit-card.rule'
export * from './rules/email.rule'
export * from './rules/empty.rule'
export * from './rules/equal.rule'
export * from './rules/equivalent.rule'
export * from './rules/exclusive-between.rule'
export * from './rules/greater-than.rule'
export * from './rules/greater-than-or-equal.rule'
export * from './rules/inclusive-between.rule'
export * from './rules/length.rule'
export * from './rules/less-than.rule'
export * from './rules/less-than-or-equal.rule'
export * from './rules/matches.rule'
export * from './rules/max-length.rule'
export * from './rules/min-length.rule'
export * from './rules/not-empty.rule'
export * from './rules/not-equal.rule'
export * from './rules/not-equivalent.rule'
export * from './rules/not-null.rule'
export * from './rules/not-null-or-undefined.rule'
export * from './rules/not-undefined.rule'
export * from './rules/null.rule'
export * from './rules/null-or-undefined.rule'
export * from './rules/password.rule'
export * from './rules/undefined.rule'

/**
 * @namespace
 * @borrows NotEmpty.validate as notEmpty
 * @borrows MinLength.validate as minLength
 */
export const Rules = {
  /**
   * Shorthand for {@link CreditCard.validate}
   */
  creditCard: CreditCard.validate,

  /**
   * Shorthand for {@link Email.validate}
   */
  email: Email.validate,

  /**
   * Shorthand for {@link NotEqual.validate}
   */
  empty: Empty.validate,

  /**
   * Shorthand for {@link Equal.validate}
   */
  equal: Equal.validate,

  /**
   * Shorthand for {@link Equivalent.validate}
   */
  equivalent: Equivalent.validate,

  /**
   * Shorthand for {@link ExclusiveBetween.validate}
   */
  exclusiveBetween: ExclusiveBetween.validate,

  /**
   * Shorthand for {@link GreaterThan.validate}
   */
  greaterThan: GreaterThan.validate,

  /**
   * Shorthand for {@link GreaterThanOrEqual.validate}
   */
  greaterThanOrEqual: GreaterThanOrEqual.validate,

  /**
   * Shorthand for {@link InclusiveBetween.validate}
   */
  inclusiveBetween: InclusiveBetween.validate,

  /**
   * Shorthand for {@link length.validate}
   */
  length: Length.validate,

  /**
   * Shorthand for {@link LessThan.validate}
   */
  lessThan: LessThan.validate,

  /**
   * Shorthand for {@link LessThanOrEqual.validate}
   */
  lessThanOrEqual: LessThanOrEqual.validate,

  /**
   * Shorthand for {@link Matches.validate}
   */
  matches: Matches.validate,

  /**
   * Shorthand for {@link MaxLength.validate}
   */
  maxLength: MaxLength.validate,

  /**
   * Shorthand for {@link MinLength.validate}
   */
  minLength: MinLength.validate,

  /**
   * Shorthand for {@link NotEmpty.validate}
   */
  notEmpty: NotEmpty.validate,

  /**
   * Shorthand for {@link NotEqual.validate}
   */
  notEqual: NotEqual.validate,

  /**
   * Shorthand for {@link NotEquivalent.validate}
   */
  notEquivalent: NotEquivalent.validate,

  /**
   * Shorthand for {@link NotNull.validate}
   */
  notNull: NotNull.validate,

  /**
   * Shorthand for {@link NotUndefined.validate}
   */
  notUndefined: NotUndefined.validate,

  /**
   * Shorthand for {@link NotNullOrUndefined.validate}
   */
  notNullOrUndefined: NotNullOrUndefined.validate,

  /**
   * Shorthand for {@link Null.validate}
   */
  null: Null.validate,

  /**
   * Shorthand for {@link NullOrUndefined.validate}
   */
  nullOrUndefined: NullOrUndefined.validate,

  /**
   * Shorthand for {@link Password.validate}
   */
  password: Password.validate,

  /**
   * Shorthand for {@link Undefined.validate}
   */
  undefined: Undefined.validate,
}
