import { equal } from 'assert';
import { notEmpty } from '../../src/validators/not-empty.validator';

describe('NotEmpty test suite', () => {
  it('Should return false on an empty string', () => {
    equal(notEmpty(''), false);
  });

  it('Should return false on an empty array', () => {
    equal(notEmpty([]), false);
  });

  it('Should return true on a non-empty string', () => {
    equal(notEmpty(' '), true);
  });

  it('Should return true on a non-empty array', () => {
    equal(notEmpty([1]), true);
  });
});
