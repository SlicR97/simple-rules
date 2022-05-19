import { deepEqual, equal } from 'assert';
import { NotEmpty } from '../../src/rules/not-empty.rule';
import { Maybe } from '../../src/types/maybe.type';

describe('not-empty.rule.ts', () => {
  describe('#rule()', () => {
    it('should return false on an empty string', () => {
      equal(NotEmpty.rule(''), false);
    });
  
    it('should return false on an empty array', () => {
      equal(NotEmpty.rule([]), false);
    });
  
    it('should return true on a non-empty string', () => {
      equal(NotEmpty.rule(' '), true);
    });
  
    it('should return true on a non-empty array', () => {
      equal(NotEmpty.rule([1]), true);
    });
  });

  describe('#validate()', () => {
    it('should return an error object when the input is empty', () => {
      deepEqual(NotEmpty.validate(''), {
        errorCodes: [ 'NOT_EMPTY' ],
        propertyValue: ''
      });
    });
  
    it('should return nothing when the input is not empty', () => {
      equal(NotEmpty.validate(' '), Maybe.None());
    });
  });
});
