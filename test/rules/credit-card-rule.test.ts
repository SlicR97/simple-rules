import { CreditCard } from '../../src'
import { expect } from 'chai'

describe('credit-card.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true on a valid credit card number', () => {
      expect(CreditCard.rule('4273 1490 1979 9094')).to.be.true
    })

    it('returns false on an invalid credit card number', () => {
      expect(CreditCard.rule('4111 1111 1111 1112')).to.be.false
    })

    it('returns false if the string contains a character that is not a digit', () => {
      expect(CreditCard.rule('4111 1111 1111 111a')).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns nothing on a valid credit card number', () => {
      expect(CreditCard.validate('4273 1490 1979 9094')).to.be.undefined
    })

    it('returns a RuleViolation on an invalid credit card number', () => {
      expect(CreditCard.validate('4111 1111 1111 1112')).to.eql({
        errorCodes: ['CREDIT_CARD'],
        propertyValue: '4111 1111 1111 1112',
      })
    })
  })
})
