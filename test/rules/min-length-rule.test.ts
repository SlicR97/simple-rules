import { deepEqual, equal } from 'assert';
import { MinLength } from '../../src/rules/min-length.rule';

describe('MinLength test suite', () => {
  it('Rule should return false on a string that is less long than its threshold', () => {
    equal(MinLength.rule('test', 6), false);
  });

  it('Rule should return true on a string that is as long as its threshold', () => {
    equal(MinLength.rule('test', 4), true);
  });

  it('Rule should return true on a string that is longer than its threshold', () => {
    equal(MinLength.rule('test', 2), true);
  });

  it('Rule should return false on an array that is less long than its threshold', () => {
    equal(MinLength.rule([1, 2, 3, 4], 6), false);
  });

  it('Rule should return true on an array that is as long as its threshold', () => {
    equal(MinLength.rule([1, 2, 3, 4], 4), true);
  });

  it('Rule should return true on an array that is longer than its threshold', () => {
    equal(MinLength.rule([1, 2, 3, 4], 2), true);
  });

  it('Validate returns a correctly formatted error string', () => {
    deepEqual(MinLength.validate({ threshold: 6 })('test')('x'), {
      propertyName: 'x',
      errorMessage: 'x\'s length must be at least 6.',
      propertyValue: 'test'
    });
  });
});
