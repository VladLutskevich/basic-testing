/* eslint-disable prettier/prettier */
import { generateLinkedList } from './index';

const linkedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: null,
          next: null,
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1, 2, 3, 4])).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2, 3, 4])).toMatchSnapshot();
  });
});
