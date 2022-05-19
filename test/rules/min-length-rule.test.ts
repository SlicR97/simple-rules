import { deepEqual, equal } from 'assert';
import { MinLength } from '../../src/rules/min-length.rule';

describe('min-length.rule.ts', () => {
  describe('#rule()', () => {
    it('should return false on a string that is less long than its threshold', () => {
      equal(MinLength.rule('test', 6), false);
    });
  
    it('should return true on a string that is as long as its threshold', () => {
      equal(MinLength.rule('test', 4), true);
    });
  
    it('should return true on a string that is longer than its threshold', () => {
      equal(MinLength.rule('test', 2), true);
    });
  
    it('should return false on an array that is less long than its threshold', () => {
      equal(MinLength.rule([1, 2, 3, 4], 6), false);
    });
  
    it('should return true on an array that is as long as its threshold', () => {
      equal(MinLength.rule([1, 2, 3, 4], 4), true);
    });
  
    it('should return true on an array that is longer than its threshold', () => {
      equal(MinLength.rule([1, 2, 3, 4], 2), true);
    });
  });

  describe('#validate()', () => {
    it('should return an error object if the input is too short', () => {
      deepEqual(MinLength.validate({ threshold: 6 })('test'), {
        errorCodes: [ 'MIN_LENGTH' ],
        propertyValue: 'test',
        additionalProperties: {
          threshold: 6
        }
      });
    });

    it('should not return anything if the input object is long enough', () => {
      equal(MinLength.validate({ threshold: 3 })('test'), undefined);
    });
  });
});
