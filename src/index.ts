import { MinLength } from './rules/min-length.rule';
import { NotEmpty } from './rules/not-empty.rule';

export * from './rules';

export * from './types/maybe.type';
export * from './types/rule-violation.type';
export * from './types/validation-result.type';

export * from './rules/basic.rule';
export * from './rules/min-length.rule';
export * from './rules/not-empty.rule';

/**
 * @namespace
 * @borrows NotEmpty.validate as notEmpty
 * @borrows MinLength.validate as minLength
 */
export const Rules = {
  /**
   * Shorthand for @see {@link NotEmpty.validate}
   */
  notEmpty: NotEmpty.validate,

  /**
   * Shorthand for @see {@link MinLength.validate}
   */
  minLength: MinLength.validate
};
