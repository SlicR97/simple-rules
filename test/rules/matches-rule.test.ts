import { expect } from 'chai'
import { Matches } from '../../src'

describe('matches.rule.ts', () => {
  describe('#rule()', () => {
    it('return true when the input matches the regex', () => {
      expect(Matches.rule('test', /test/)).to.be.true
    })

    it('returns false when the input does not match the regex', () => {
      expect(Matches.rule('test', /nottest/)).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input does not match the regex', () => {
      expect(Matches.validate({ regex: /nottest/ })('test')).to.eql({
        errorCodes: ['MATCHES'],
        propertyValue: 'test',
      })
    })

    it('returns nothing when the input matches the regex', () => {
      expect(Matches.validate({ regex: /test/ })('test')).to.be.undefined
    })
  })
})
