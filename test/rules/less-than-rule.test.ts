import { LessThan } from '../../src'
import { expect } from 'chai'

describe('less-than.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true when the input is less than the threshold', () => {
      expect(LessThan.rule(1, 2)).to.be.true
    })

    it('returns false when the input is equal to the threshold', () => {
      expect(LessThan.rule(2, 2)).to.be.false
    })

    it('returns false when the input is greater than the threshold', () => {
      expect(LessThan.rule(3, 2)).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is larger than the threshold', () => {
      expect(LessThan.validate({ threshold: 2 })(3)).to.eql({
        errorCodes: ['LESS_THAN'],
        propertyValue: 3,
      })
    })

    it('returns an error object when the input is equal to the threshold', () => {
      expect(LessThan.validate({ threshold: 2 })(2)).to.eql({
        errorCodes: ['LESS_THAN'],
        propertyValue: 2,
      })
    })

    it('returns nothing when the input is smaller than the threshold', () => {
      expect(LessThan.validate({ threshold: 2 })(1)).to.be.undefined
    })
  })
})
