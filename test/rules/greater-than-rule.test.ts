import { GreaterThan } from '../../src'
import { expect } from 'chai'

describe('greater-than.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true when the input is greater than the threshold', () => {
      expect(GreaterThan.rule(3, 2)).to.be.true
    })

    it('returns false when the input is equal to the threshold', () => {
      expect(GreaterThan.rule(2, 2)).to.be.false
    })

    it('returns false when the input is less than the threshold', () => {
      expect(GreaterThan.rule(1, 2)).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is less than the threshold', () => {
      expect(GreaterThan.validate({ threshold: 2 })(1)).to.eql({
        errorCodes: ['GREATER_THAN'],
        propertyValue: 1,
      })
    })

    it('returns an error object when the input is equal to the threshold', () => {
      expect(GreaterThan.validate({ threshold: 2 })(2)).to.eql({
        errorCodes: ['GREATER_THAN'],
        propertyValue: 2,
      })
    })

    it('returns nothing when the input is greater than the threshold', () => {
      expect(GreaterThan.validate({ threshold: 2 })(3)).to.be.undefined
    })
  })
})
