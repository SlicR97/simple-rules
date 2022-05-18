import { deepEqual } from "assert";
import { rules } from "../src/rules";
import { NotEmpty } from "../src/rules/not-empty.rule";

type NestedType = {
  foo: string;
  bar: string;
};

type TestType = {
  nested: NestedType;
};

describe('nested rules test suite', () => {
  it('nested rules with a valid object do not return errors', () => {
    deepEqual(rules<TestType>(
      ['nested', rules<NestedType>(
        ['foo', NotEmpty.validate],
        ['bar', NotEmpty.validate]
      )]
    )({
      nested: {
        foo: 'test',
        bar: 'test'
      }
    }), {})
  });

  it('nested rules with an invalid object return errors', () => {
    deepEqual(rules<TestType>(
      ['nested', rules<NestedType>(
        ['foo', NotEmpty.validate],
        ['bar', NotEmpty.validate]
      )]
    )({
      nested: {
        foo: '',
        bar: ''
      }
    }), {
      nested: {
        foo: {
          errorCodes: [ 'NOT_EMPTY' ],
          propertyValue: ''
        },
        bar: {
          errorCodes: [ 'NOT_EMPTY' ],
          propertyValue: ''
        }
      }
    });
  });
});
