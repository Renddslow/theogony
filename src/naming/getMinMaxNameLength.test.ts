import test from 'ava';

import getMinMaxNameLength from './getMinMaxNameLength';

test('getMinMaxNameLength - returns minimum and maximum', (t) => {
  const names = ['Atreyu', 'Melchizedek', 'Noah', 'Ben', 'Adam', 'Carl', 'John', 'Schmidt'];
  const expected = [3, 11];
  t.deepEqual(getMinMaxNameLength(names), expected);
});
