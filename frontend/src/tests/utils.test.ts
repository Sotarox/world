import { formatNumberWithComma } from '../utils/utils';

describe('formatNumberWithComma', () => {
  test('should correctly format a valid number into a string', () => {
    expect(formatNumberWithComma(1234567)).toBe('1,234,567');
  });
});
