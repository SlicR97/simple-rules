import { deepEqual } from 'assert';
import { rules, Rules } from '../src/index';

type NestedType = {
  t: TestType;
};

type TestType = {
  str: string;
  arr: number[];
};

describe('rules.ts', () => {
  describe('#rules()', () => {
    it('should return nothing when given a valid object', () => {
      deepEqual(rules<TestType>(
        ['str', Rules.notEmpty],
        ['arr', Rules.minLength({ threshold: 3 })]
      )({ str: 'test', arr: [1, 2, 3, 4] }), {});
    });
  
    it('should return an error object when given an invalid object', () => {
      deepEqual(rules<TestType>(
        ['str', Rules.notEmpty],
        ['arr', Rules.minLength({ threshold: 3 })]
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
  
    it('should return an error object whose fields have been merged correctly given multiple rules on the same property', () => {
      deepEqual(rules<TestType>(
        ['str', Rules.notEmpty],
        ['str', Rules.minLength({ threshold: 3 })]
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

    it('should return nothing when given a correct nested object', () => {
      deepEqual(rules<NestedType>(
        ['t', rules<TestType>(
          ['str', Rules.notEmpty],
          ['arr', Rules.notEmpty]
        )]
      )({
        t: {
          str: 'test',
          arr: [1, 2, 3]
        }
      }), {})
    });
  
    it('should return a nested error when given an invalid nested object', () => {
      deepEqual(rules<NestedType>(
        ['t', rules<TestType>(
          ['str', Rules.notEmpty],
          ['arr', Rules.notEmpty]
        )]
      )({
        t: {
          str: '',
          arr: []
        }
      }), {
        t: {
          str: {
            errorCodes: [ 'NOT_EMPTY' ],
            propertyValue: ''
          },
          arr: {
            errorCodes: [ 'NOT_EMPTY' ],
            propertyValue: []
          }
        }
      });
    });

    it('should return nothing when given valid codependent properties', () => {
      deepEqual(rules<TestType>(
        ['str', (str, t) => str !== t.arr.toString(), 'FOO_EQ_BAR']
      )({
        str: '1,2',
        arr: [1,2]
      }), {});
    });
  
    it('Codependent rules with an invalid object return errors', () => {
      deepEqual(rules<TestType>(
        ['str', (str, t) => str !== t.arr.toString(), 'FOO_EQ_BAR']
      )({
        str: 'test',
        arr: []
      }), {
        str: {
          errorCodes: [ 'FOO_EQ_BAR' ],
          propertyValue: 'test'
        }
      })
    })
  });
});
