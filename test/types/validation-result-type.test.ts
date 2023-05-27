import { RuleViolation, ValidationResult } from '../../src'
import { expect } from 'chai'

type NestedType = {
  t: TestType
}

type TestType = {
  foo: string
}

describe('validation-result.type.ts', () => {
  describe('#empty()', () => {
    it('returns an empty object', () => {
      expect(ValidationResult.empty()).to.eql({})
    })
  })

  describe('#apply()', () => {
    it('merges two RuleViolation fields', () => {
      const res: ValidationResult<TestType> = {
        foo: {
          errorCodes: ['bar'],
          propertyValue: '',
        },
      }

      const violation: RuleViolation<string> = {
        errorCodes: ['baz'],
        propertyValue: '',
      }

      expect(ValidationResult.apply(res, 'foo', violation)).to.eql({
        foo: {
          errorCodes: ['bar', 'baz'],
          propertyValue: '',
        },
      })
    })

    it('throws an error when merging a RuleViolation field with a ValidationResult field', () => {
      const res: ValidationResult<NestedType> = {
        t: {
          foo: {
            errorCodes: ['bar'],
            propertyValue: '',
          },
        },
      }

      const violation: RuleViolation<TestType> = {
        errorCodes: ['baz'],
        propertyValue: {
          foo: '',
        },
      }

      expect(() => ValidationResult.apply(res, 't', violation)).to.throw()
    })

    it('throws an error when merging a ValidationResult field with a RuleViolation field', () => {
      const res: ValidationResult<NestedType> = {
        t: {
          errorCodes: ['bar'],
          propertyValue: {
            foo: '',
          },
        },
      }

      const newRes: ValidationResult<TestType> = {
        foo: {
          errorCodes: ['bar'],
          propertyValue: '',
        },
      }

      expect(() => ValidationResult.apply(res, 't', newRes)).to.throw()
    })

    it('throws an error when merging two ValidationResult fields', () => {
      const res: ValidationResult<NestedType> = {
        t: {
          foo: {
            errorCodes: ['bar'],
            propertyValue: '',
          },
        },
      }

      const newRes: ValidationResult<TestType> = {
        foo: {
          errorCodes: ['baz'],
          propertyValue: '',
        },
      }

      expect(() => ValidationResult.apply(res, 't', newRes)).to.throw()
    })
  })
})
