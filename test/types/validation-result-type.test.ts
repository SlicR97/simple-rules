import { deepEqual, throws } from "assert";
import { RuleViolation, ValidationResult } from "../../src/index";

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
          propertyValue: ''
        }
      };

      const violation: RuleViolation<string> = {
        errorCodes: [ 'baz' ],
        propertyValue: ''
      };

      deepEqual(ValidationResult.apply(res, 'foo', violation), {
        foo: {
          errorCodes: [ 'bar', 'baz' ],
          propertyValue: ''
        }
      });
    });

    it('should throw an error when merging a RuleViolation field with a ValidationResult field', () => {
      const res: ValidationResult<NestedType> = {
        t: {
          foo: {
            errorCodes: [ 'bar' ],
            propertyValue: ''
          }
        }
      };

      const violation: RuleViolation<TestType> = {
        errorCodes: [ 'baz' ],
        propertyValue: {
          foo: ''
        }
      };

      throws(() => {
        ValidationResult.apply(res, 't', violation);
      })
    });

    it('should throw an error when merging a ValidationResult field with a RuleViolation field', () => {
      const res: ValidationResult<NestedType> = {
        t: {
          errorCodes: [ 'bar' ],
          propertyValue: {
            foo: ''
          }
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
            propertyValue: ''
          }
        }
      };

      const newRes: ValidationResult<TestType> = {
        foo: {
          errorCodes: [ 'baz' ],
          propertyValue: ''
        }
      };

      throws(() => {
        ValidationResult.apply(res, 't', newRes);
      });
    });
  });
});
