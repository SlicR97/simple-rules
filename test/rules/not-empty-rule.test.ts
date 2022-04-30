import { equal } from 'assert';
import { NotEmpty } from '../../src/rules/not-empty.rule';

describe('NotEmpty test suite', () => {
  it('Rule should return false on an empty string', () => {
    equal(NotEmpty.rule(''), false);
  });

  it('Rule should return false on an empty array', () => {
    equal(NotEmpty.rule([]), false);
  });

  it('Rule should return true on a non-empty string', () => {
    equal(NotEmpty.rule(' '), true);
  });

  it('Rule should return true on a non-empty array', () => {
    equal(NotEmpty.rule([1]), true);
  });

  it('ErrorMessage should return specific string', () => {
    equal('String or array must not be empty.', NotEmpty.errorMessage);
  });
});
