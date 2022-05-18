import { deepEqual } from 'assert';
import { rules } from '../src/rules';
import { NotEmpty } from '../src/rules/not-empty.rule';
import { MinLength } from '../src/rules/min-length.rule';

type TestType = {
  str: string;
  arr: number[];
};

describe('rules test suite', () => {
  it('rules with a valid object and a corresponding rule set performs a correct validation', () => {
    deepEqual(rules<TestType>(
      ['str', NotEmpty.validate],
      ['arr', MinLength.validate({ threshold: 3 })]
    )({ str: 'test', arr: [1, 2, 3, 4] }), {});
  });

  it('rules with an invalid object and a corresponding rule set performs a correct validation', () => {
    deepEqual(rules<TestType>(
      ['str', NotEmpty.validate],
      ['arr', MinLength.validate({ threshold: 3 })]
    )({ str: '', arr: [1, 2] }), {
      str: {
          errorCodes: [ 'NOT_EMPTY' ],
          propertyValue: ''
      },
      arr: {
        errorCodes: [ 'MIN_LENGTH' ],
        propertyValue: [1, 2],
        additionalProperties: {
          threshold: 3
        }
      }
    });
  });

  it('rules with an invalid object and multiple rules on the same property return an extended object', () => {
    deepEqual(rules<TestType>(
      ['str', NotEmpty.validate],
      ['str', MinLength.validate({ threshold: 3 })]
    )({ str: '', arr: [] }), {
      str: {
        errorCodes: [ 'NOT_EMPTY', 'MIN_LENGTH' ],
        propertyValue: '',
        additionalProperties: {
          threshold: 3
        }
      }
    });
  });
});
