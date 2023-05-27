import {Email} from "../../src/rules/email.rule";
import {deepEqual, equal} from "assert";

describe('email.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true on a valid email address', () => {
      equal(Email.rule('abc@dev.de'), true)
    })
    
    it('returns false on an invalid email address', () => {
      equal(Email.rule('abc@dev'), false)
    })
  })
  
  describe('#validate()', () => {
    it('returns nothing on a valid email address', () => {
      equal(Email.validate()('abc@dev.de'), undefined)
    })
    
    it('returns a RuleViolation on an invalid email address', () => {
      deepEqual(Email.validate()('abc@dev'), {
        errorCodes: [ 'EMAIL' ],
        propertyValue: 'abc@dev',
      })
    })
  })
})
