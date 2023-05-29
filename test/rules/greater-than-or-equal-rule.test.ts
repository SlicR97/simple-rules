import { GreaterThanOrEqual } from '../../src'
import { expect } from 'chai'

describe('greater-than.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true when the input is greater than the threshold', () => {
      expect(GreaterThanOrEqual.rule(3, 2)).to.be.true
    })

    it('returns true when the input is equal to the threshold', () => {
      expect(GreaterThanOrEqual.rule(2, 2)).to.be.true
    })

    it('returns false when the input is less than the threshold', () => {
      expect(GreaterThanOrEqual.rule(1, 2)).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is smaller than the threshold', () => {
      expect(GreaterThanOrEqual.validate({ threshold: 2 })(1)).to.eql({
        errorCodes: ['GREATER_THAN_OR_EQUAL'],
        propertyValue: 1,
      })
    })

    it('returns nothing when the input is equal to the threshold', () => {
      expect(GreaterThanOrEqual.validate({ threshold: 2 })(2)).to.be.undefined
    })

    it('returns nothing when the input is greater than the threshold', () => {
      expect(GreaterThanOrEqual.validate({ threshold: 2 })(3)).to.be.undefined
    })
  })
})
