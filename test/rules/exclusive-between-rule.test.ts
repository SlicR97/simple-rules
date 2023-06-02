import { expect } from 'chai'
import { ExclusiveBetween } from '../../src'

describe('exclusive-between.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true when the input is between the lower and upper bounds', () => {
      expect(ExclusiveBetween.rule(1, 0, 2)).to.be.true
    })

    it('returns false when the input is equal to the lower bound', () => {
      expect(ExclusiveBetween.rule(0, 0, 2)).to.be.false
    })

    it('returns false when the input is equal to the upper bound', () => {
      expect(ExclusiveBetween.rule(2, 0, 2)).to.be.false
    })

    it('returns false when the input is below the lower bound', () => {
      expect(ExclusiveBetween.rule(-1, 0, 2)).to.be.false
    })

    it('returns false when the input is above the upper bound', () => {
      expect(ExclusiveBetween.rule(3, 0, 2)).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is outside the thresholds', () => {
      expect(
        ExclusiveBetween.validate({ lowerBound: 0, upperBound: 2 })(3),
      ).to.eql({
        errorCodes: ['EXCLUSIVE_BETWEEN'],
        propertyValue: 3,
      })
    })

    it('returns nothing when the input within the thresholds', () => {
      expect(ExclusiveBetween.validate({ lowerBound: 0, upperBound: 2 })(1)).to
        .be.undefined
    })
  })
})
