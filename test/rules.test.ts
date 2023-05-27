import { rules, Rules } from '../src'
import { expect } from 'chai'

type NestedType = {
  t: TestType
}

type TestType = {
  str: string
  arr: number[]
}

describe('rules.ts', () => {
  describe('#rules()', () => {
    it('returns nothing when given a valid object', () => {
      expect(
        rules<TestType>(
          ['str', Rules.notEmpty],
          ['arr', Rules.minLength({ threshold: 3 })],
        )({ str: 'test', arr: [1, 2, 3, 4] }),
      ).to.eql({})
    })

    it('returns an error object when given an invalid object', () => {
      expect(
        rules<TestType>(
          ['str', Rules.notEmpty],
          ['arr', Rules.minLength({ threshold: 3 })],
        )({ str: '', arr: [1, 2] }),
      ).to.eql({
        str: {
          errorCodes: ['NOT_EMPTY'],
          propertyValue: '',
        },
        arr: {
          errorCodes: ['MIN_LENGTH'],
          propertyValue: [1, 2],
          additionalProperties: {
            threshold: 3,
          },
        },
      })
    })

    it('returns an error object whose fields have been merged correctly given multiple rules on the same property', () => {
      expect(
        rules<TestType>(
          ['str', Rules.notEmpty],
          ['str', Rules.minLength({ threshold: 3 })],
        )({ str: '', arr: [] }),
      ).to.eql({
        str: {
          errorCodes: ['NOT_EMPTY', 'MIN_LENGTH'],
          propertyValue: '',
          additionalProperties: {
            threshold: 3,
          },
        },
      })
    })

    it('returns nothing when given a correct nested object', () => {
      expect(
        rules<NestedType>([
          't',
          rules<TestType>(['str', Rules.notEmpty], ['arr', Rules.notEmpty]),
        ])({
          t: {
            str: 'test',
            arr: [1, 2, 3],
          },
        }),
      ).to.eql({})
    })

    it('returns a nested error when given an invalid nested object', () => {
      expect(
        rules<NestedType>([
          't',
          rules<TestType>(['str', Rules.notEmpty], ['arr', Rules.notEmpty]),
        ])({
          t: {
            str: '',
            arr: [],
          },
        }),
      ).to.eql({
        t: {
          str: {
            errorCodes: ['NOT_EMPTY'],
            propertyValue: '',
          },
          arr: {
            errorCodes: ['NOT_EMPTY'],
            propertyValue: [],
          },
        },
      })
    })

    it('returns nothing when given valid codependent properties', () => {
      expect(
        rules<TestType>([
          'str',
          (str, t) => str !== t.arr.toString(),
          'FOO_EQ_BAR',
        ])({
          str: '1,2',
          arr: [1, 2],
        }),
      ).to.eql({})
    })

    it('returns an error when given invalid codependent properties', () => {
      expect(
        rules<TestType>([
          'str',
          (str, t) => str !== t.arr.toString(),
          'FOO_EQ_BAR',
        ])({
          str: 'test',
          arr: [],
        }),
      ).to.eql({
        str: {
          errorCodes: ['FOO_EQ_BAR'],
          propertyValue: 'test',
        },
      })
    })
  })
})
