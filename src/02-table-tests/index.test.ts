/* eslint-disable prettier/prettier */
import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 10, b: 5, action: Action.Subtract, expected: 5 },
    { a: 10, b: 5, action: Action.Multiply, expected: 50 },
    { a: 10, b: 5, action: Action.Divide, expected: 2 },
    { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
    { a: 10, b: 5, action: 'qwerty', expected: null },
    { a: 5, b: false, action: Action.Add, expected: null },
  ];

describe('simpleCalculator', () => {
  test.each(testCases)('$a $action $b = $expected', ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
