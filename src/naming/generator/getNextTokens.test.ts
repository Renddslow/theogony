import test from 'ava';

import getNextTokens from './getNextTokens';

test('getNextTokens -', (t) => {
  const list = ['aslan', 'jadis', 'tumnus', 'puddleglum'];

  const tokens = getNextTokens(list);
  const expected = {
    start: ['a', 'j', 't', 'p'],
    a: ['s', 'n', 'd'],
    d: ['i', 'd', 'l'],
    e: ['g'],
    g: ['l'],
    i: ['s'],
    j: ['a'],
    l: ['a', 'e', 'u'],
    m: ['n'],
    n: ['u'],
    p: ['u'],
    s: ['l'],
    t: ['u'],
    u: ['m', 's', 'd', 'm'],
  };
  t.deepEqual(expected, tokens);
});
