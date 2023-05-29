import { NotEqual } from '../../src'
import { expect } from 'chai'

describe('not-equal.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false when the input is equal to the object to compare it to', () => {
      expect(NotEqual.rule(1, 1)).to.be.false
    })

    it('returns true when the input is not equal to the object to compare it to', () => {
      expect(NotEqual.rule(1, 2)).to.be.true
    })

    it('returns false when the input has referential equality to the complex object to compare it to', () => {
      const obj = {}
      const other = obj

      expect(NotEqual.rule(obj, other)).to.be.false
    })

    it('returns true when the input has no referential equality to the complex object to compare it to', () => {
      const obj = { foo: 'bar' }
      const other = { foo: 'bar' }

      expect(NotEqual.rule(obj, other)).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is equal to the object to compare it to', () => {
      expect(NotEqual.validate({ other: 1 })(1)).to.eql({
        errorCodes: ['NOT_EQUAL'],
        propertyValue: 1,
      })
    })

    it('returns nothing when the input is not equal to the object to compare it to', () => {
      expect(NotEqual.validate({ other: 1 })(2)).to.be.undefined
    })
  })
})
