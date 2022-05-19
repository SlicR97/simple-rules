import { deepEqual, throws } from "assert";
import { RuleViolation } from "../../src/types/rule-violation.type";

import { ValidationResult } from '../../src/types/validation-result.type';

type NestedType = {
  t: TestType;
};

type TestType = {
  foo: string;
};

describe('validation-result.type.ts', () => {
  describe('#empty()', () => {
    it('should return an empty object', () => {
      deepEqual(ValidationResult.empty(), {});
    })
  });

  describe('#apply()', () => {
    it('should merge two RuleViolation fields', () => {
      const res: ValidationResult<TestType> = {
        foo: {
          errorCodes: [ 'bar' ],
          propertyValue: 1
        }
      };

      const violation: RuleViolation = {
        errorCodes: [ 'baz' ],
        propertyValue: 1
      };

      deepEqual(ValidationResult.apply(res, 'foo', violation), {
        foo: {
          errorCodes: [ 'bar', 'baz' ],
          propertyValue: 1
        }
      });
    });

    it('should throw an error when merging a RuleViolation field with a ValidationResult field', () => {
      const res: ValidationResult<NestedType> = {
        t: {
          foo: {
            errorCodes: [ 'bar' ],
            propertyValue: 1
          }
        }
      };

      const violation: RuleViolation = {
        errorCodes: [ 'baz' ],
        propertyValue: 3
      };

      throws(() => {
        ValidationResult.apply(res, 't', violation);
      })
    });

    it('should throw an error when merging a ValidationResult field with a RuleViolation field', () => {
      const res: ValidationResult<NestedType> = {
        t: {
          errorCodes: [ 'bar' ],
          propertyValue: 1
        }
      };

      const newRes: ValidationResult<TestType> = {
        foo: {
          errorCodes: [ 'bar' ],
          propertyValue: ''
        }
      };

      throws(() => {
        ValidationResult.apply(res, 't', newRes);
      });
    });

    it('should throw an error when merging two ValidationResult fields', () => {
      const res: ValidationResult<NestedType> = {
        t: {
          foo: {
            errorCodes: [ 'bar' ],
            propertyValue: 3
          }
        }
      };

      const newRes: ValidationResult<TestType> = {
        foo: {
          errorCodes: [ 'baz' ],
          propertyValue: 5
        }
      };

      throws(() => {
        ValidationResult.apply(res, 't', newRes);
      });
    });
  });
});
