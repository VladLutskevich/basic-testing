/* eslint-disable prettier/prettier */
import path from 'node:path';
import fs from 'node:fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const callback = jest.fn();
const timeout = 100;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    for (let i = 1; i <= 10; i++) {
      jest.advanceTimersByTime(timeout);
      expect(callback).toHaveBeenCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'index.txt';

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'Content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(content);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(content);
  });
});
