/* eslint-disable prettier/prettier */
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const input = 'Resolved input';
    await expect(resolveValue(input)).resolves.toBe(input);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const input = 'Error';
    expect(() => throwError(input)).toThrowError(new Error(input));
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultInput = 'Oops!';
    expect(() => throwError()).toThrowError(new Error(defaultInput));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
