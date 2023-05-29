import { Equal } from '../../src'
import { expect } from 'chai'

describe('equal.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true when the input is equal to the object to compare it to', () => {
      expect(Equal.rule(1, 1)).to.be.true
    })

    it('returns false when the input is not equal to the object to compare it to', () => {
      expect(Equal.rule(1, 2)).to.be.false
    })

    it('returns true when the input has referential equality to the complex object to compare it to', () => {
      const obj = {}
      const other = obj

      expect(Equal.rule(obj, other)).to.be.true
    })

    it('returns false when the input has no referential equality to the complex object to compare it to', () => {
      const obj = { foo: 'bar' }
      const other = { foo: 'bar' }

      expect(Equal.rule(obj, other)).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is different from the object to compare it to', () => {
      expect(Equal.validate({ other: 1 })(2)).to.eql({
        errorCodes: ['EQUAL'],
        propertyValue: 2,
      })
    })

    it('returns nothing when the input is equal to the object to compare it to', () => {
      expect(Equal.validate({ other: 1 })(1)).to.be.undefined
    })
  })
})
