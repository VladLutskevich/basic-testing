/* eslint-disable prettier/prettier */
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 5, b: 10, action: Action.Add };
    const expected = 15;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const input = { a: 15, b: 10, action: Action.Subtract };
    const expected = 5;
    expect(simpleCalculator(input)).toBe(expected);  
  });

  test('should multiply two numbers', () => {
    const input = { a: 5, b: 10, action: Action.Multiply };
    const expected = 50;
    expect(simpleCalculator(input)).toBe(expected); 
  });

  test('should divide two numbers', () => {
    const input = { a: 50, b: 10, action: Action.Divide };
    const expected = 5;
    expect(simpleCalculator(input)).toBe(expected); 
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 5, b: 2, action: Action.Exponentiate };
    const expected = 25;
    expect(simpleCalculator(input)).toBe(expected); 
  });

  test('should return null for invalid action', () => {
    const input = { a: 5, b: 10, action: 'qwerty' };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'qwerty', b: false, action: Action.Add };
    expect(simpleCalculator(input)).toBeNull();
  });
});
