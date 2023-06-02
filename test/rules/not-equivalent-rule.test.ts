/* eslint @typescript-eslint/no-empty-function: 0 */

import { expect } from 'chai'
import { NotEquivalent } from '../../src'

describe('not-equivalent.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false if both values are null', () => {
      expect(NotEquivalent.rule(null, null)).to.be.false
    })

    it('returns true if one value is null', () => {
      expect(NotEquivalent.rule(null, 1)).to.be.true
    })

    it('returns false when the input is a number and equivalent to the other value', () => {
      expect(NotEquivalent.rule(1, 1)).to.be.false
    })

    it('returns false when the input is a string and equivalent to the other value', () => {
      expect(NotEquivalent.rule('1', '1')).to.be.false
    })

    it('returns false when the input is a boolean and equivalent to the other value', () => {
      expect(NotEquivalent.rule(true, true)).to.be.false
    })

    it('returns false when the input is a function and equivalent to the other value', () => {
      const fn = () => {}

      expect(NotEquivalent.rule(fn, fn)).to.be.false
    })

    it('returns false when the input is an object and equivalent to the other value', () => {
      const a = { firstName: 'Robert' }
      const b = { firstName: 'Robert' }

      expect(NotEquivalent.rule(a, b)).to.be.false
    })

    it('returns false when the input is an array and equivalent to the other value', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 3]

      expect(NotEquivalent.rule(a, b)).to.be.false
    })

    it('returns true when the input is a number and not equivalent to the other value', () => {
      expect(NotEquivalent.rule(1, 2)).to.be.true
    })

    it('returns true when the input is a string and not equivalent to the other value', () => {
      expect(NotEquivalent.rule('1', '2')).to.be.true
    })

    it('returns true when the input is a boolean and not equivalent to the other value', () => {
      expect(NotEquivalent.rule(true, false)).to.be.true
    })

    it('returns true when the input is a function and not equivalent to the other value', () => {
      const fn = () => {}
      const fn2 = () => {}

      expect(NotEquivalent.rule(fn, fn2)).to.be.true
    })

    it('returns true when the input is an object and not equivalent to the other value', () => {
      const a = { firstName: 'Robert' }
      const b = { firstName: 'Bob' }

      expect(NotEquivalent.rule(a, b)).to.be.true
    })

    it('returns true when the input is an array and not equivalent to the other value', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 4]

      expect(NotEquivalent.rule(a, b)).to.be.true
    })

    it('returns true when the input is an array and shorter than the other value', () => {
      const a = [1, 2]
      const b = [1, 2, 3]

      expect(NotEquivalent.rule(a, b)).to.be.true
    })

    it('returns true when the input is an array and longer than the other value', () => {
      const a = [1, 2, 3]
      const b = [1, 2]

      expect(NotEquivalent.rule(a, b)).to.be.true
    })

    it('returns false when the input is a complex object and equivalent to the other value', () => {
      const fn = () => {}

      const a = {
        str: 'test',
        num: 23,
        boolean: true,
        fun: fn,
        arr: [1, 2, 3],
        obj: { foo: 'bar' },
      }
      const b = {
        str: 'test',
        num: 23,
        boolean: true,
        fun: fn,
        arr: [1, 2, 3],
        obj: { foo: 'bar' },
      }

      expect(NotEquivalent.rule(a, b)).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns a RuleViolation when the input is equivalent to the other value', () => {
      expect(NotEquivalent.validate({ other: 1 })(1)).to.eql({
        errorCodes: ['NOT_EQUIVALENT'],
        propertyValue: 1,
      })
    })

    it('returns nothing when the input is not equivalent to the other value', () => {
      expect(NotEquivalent.validate({ other: 2 })(1)).to.be.undefined
    })
  })
})
