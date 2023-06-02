/* eslint @typescript-eslint/no-empty-function: 0 */

import { expect } from 'chai'
import { Equivalent } from '../../src'

describe('equivalent-rule.ts', () => {
  describe('#rule()', () => {
    it('returns true when the input is a number and equivalent to the other value', () => {
      expect(Equivalent.rule(1, 1)).to.be.true
    })

    it('returns true when the input is a string and equivalent to the other value', () => {
      expect(Equivalent.rule('1', '1')).to.be.true
    })

    it('returns true when the input is a boolean and equivalent to the other value', () => {
      expect(Equivalent.rule(true, true)).to.be.true
    })

    it('returns true when the input is a function and equivalent to the other value', () => {
      const fn = () => {}

      expect(Equivalent.rule(fn, fn)).to.be.true
    })

    it('returns true when the input is an object and equivalent to the other value', () => {
      const a = { firstName: 'Robert' }
      const b = { firstName: 'Robert' }

      expect(Equivalent.rule(a, b)).to.be.true
    })

    it('returns true when the input is an array and equivalent to the other value', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 3]

      expect(Equivalent.rule(a, b)).to.be.true
    })

    it('returns false when the input is a number and not equivalent to the other value', () => {
      expect(Equivalent.rule(1, 2)).to.be.false
    })

    it('returns false when the input is a string and not equivalent to the other value', () => {
      expect(Equivalent.rule('1', '2')).to.be.false
    })

    it('returns false when the input is a boolean and not equivalent to the other value', () => {
      expect(Equivalent.rule(true, false)).to.be.false
    })

    it('returns false when the input is a function and not equivalent to the other value', () => {
      const fn = () => {}
      const fn2 = () => {}

      expect(Equivalent.rule(fn, fn2)).to.be.false
    })

    it('returns false when the input is an object and not equivalent to the other value', () => {
      const a = { firstName: 'Robert' }
      const b = { firstName: 'Bob' }

      expect(Equivalent.rule(a, b)).to.be.false
    })

    it('returns false when the input is an array and not equivalent to the other value', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 4]

      expect(Equivalent.rule(a, b)).to.be.false
    })

    it('returns false when the input is an array and shorter than the other value', () => {
      const a = [1, 2]
      const b = [1, 2, 3]

      expect(Equivalent.rule(a, b)).to.be.false
    })

    it('returns false when the input is an array and longer than the other value', () => {
      const a = [1, 2, 3]
      const b = [1, 2]

      expect(Equivalent.rule(a, b)).to.be.false
    })

    it('returns true when the input is a complex object and equivalent to the other value', () => {
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

      expect(Equivalent.rule(a, b)).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is not equivalent to the other value', () => {
      expect(Equivalent.validate({ other: 1 })(2)).to.eql({
        errorCodes: ['EQUIVALENT'],
        propertyValue: 2,
      })
    })

    it('returns nothing when the input is equivalent to the other value', () => {
      expect(Equivalent.validate({ other: 1 })(1)).to.be.undefined
    })
  })
})
