import { expect } from 'chai'
import { Password } from '../../src'

describe('password.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false when the password requires uppercase letters but none are present', () => {
      expect(Password.rule('password', { requireUpperCase: true })).to.be.false
    })

    it('returns false when the password requires lowercase letters but none are present', () => {
      expect(Password.rule('PASSWORD', { requireLowerCase: true })).to.be.false
    })

    it('returns false when the password requires numbers but none are present', () => {
      expect(Password.rule('password', { requireNumbers: true })).to.be.false
    })

    it('returns false when the password requires symbols but none are present', () => {
      expect(Password.rule('password', { requireSymbols: true })).to.be.false
    })

    it('returns false when the password is shorter than the minimum length', () => {
      expect(Password.rule('pass', { minLength: 5 })).to.be.false
    })

    it('returns true when all requirements are met', () => {
      expect(
        Password.rule('Password1!', {
          requireUpperCase: true,
          requireLowerCase: true,
          requireNumbers: true,
          requireSymbols: true,
          minLength: 8,
        }),
      ).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the password does not meet the requirements', () => {
      expect(
        Password.validate({
          requireUpperCase: true,
          requireLowerCase: true,
          requireNumbers: true,
          requireSymbols: true,
          minLength: 8,
        })('password'),
      ).to.eql({
        errorCodes: ['PASSWORD'],
        propertyValue: 'password',
      })
    })

    it('returns nothing when the password meets the requirements', () => {
      expect(
        Password.validate({
          requireUpperCase: true,
          requireLowerCase: true,
          requireNumbers: true,
          requireSymbols: true,
          minLength: 8,
        })('Password1!'),
      ).to.be.undefined
    })
  })
})
