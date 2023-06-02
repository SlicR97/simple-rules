import { Email } from '../../src'
import { expect } from 'chai'

describe('email.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true on a valid email address', () => {
      expect(Email.rule('abc@dev.de')).to.be.true
    })

    it('returns false on an invalid email address', () => {
      expect(Email.rule('abc@dev')).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns nothing on a valid email address', () => {
      expect(Email.validate('abc@dev.de')).to.be.undefined
    })

    it('returns a RuleViolation on an invalid email address', () => {
      expect(Email.validate('abc@dev')).to.eql({
        errorCodes: ['EMAIL'],
        propertyValue: 'abc@dev',
      })
    })
  })
})
