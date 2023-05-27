import { basicRule } from '../../src'
import { expect } from 'chai'

describe('basic.rule.ts', () => {
  describe('#basicRule()', () => {
    it('Should return undefined if the condition is satisfied', () => {
      expect(
        basicRule({
          ruleSatisfied: true,
          errorCode: 'ignored',
          propertyValue: 'ignored',
        }),
      ).to.be.undefined
    })

    it('Should return an error object if the condition is not satisfied', () => {
      expect(
        basicRule({
          ruleSatisfied: false,
          errorCode: 'ERROR',
          propertyValue: 'foo',
        }),
      ).to.eql({
        errorCodes: ['ERROR'],
        propertyValue: 'foo',
      })
    })
  })
})
