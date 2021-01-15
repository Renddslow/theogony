import test from 'ava';

import weightTokens from './weightTokens';
import { NextTokenMap } from './types';

const w = (character: string, weight: number) => ({ character, weight });

test('weightTokens - converts NextTokenMap to Token map', (t) => {
  const tokenMap: NextTokenMap = {
    start: ['a', 'a', 'j', 'i'],
    a: ['s', 'n', 'n', 't', 'r'],
    s: ['l', 'i', 's', 'u'],
    l: ['a', 'u'],
    n: ['s'],
    e: ['s'],
    u: ['s', 'v'],
    i: ['l'],
    v: ['a'],
    t: ['a'],
  };

  const expected = {
    start: [w('a', 2), w('j', 1), w('i', 1)],
    a: [w('s', 1), w('n', 2), w('t', 1), w('r', 1)],
    s: [w('l', 1), w('i', 1), w('s', 1), w('u', 1)],
    l: [w('a', 1), w('u', 1)],
    n: [w('s', 1)],
    e: [w('s', 1)],
    u: [w('s', 1), w('v', 1)],
    i: [w('l', 1)],
    v: [w('a', 1)],
    t: [w('a', 1)],
  };

  t.deepEqual(expected, weightTokens(tokenMap));
});
