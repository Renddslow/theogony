import test from 'ava';

import createNameDataset from './createNameDataset';
import { NameDataset } from './types';

const w = (character: string, weight: number = 1) => ({ character, weight });

test('createNameDataset - creates a dataset for name list without separators', (t) => {
  const names = ['iluvatar', 'anssi', 'aslan', 'thor', 'odin'];

  const expected: NameDataset = {
    lengthRange: [4, 8],
    nextTokens: {
      start: [w('i'), w('a', 2), w('t'), w('o')],
      i: [w('l'), w('n')],
      l: [w('u'), w('a')],
      u: [w('v')],
      v: [w('a')],
      a: [w('t'), w('r'), w('n', 2), w('s')],
      t: [w('a'), w('h')],
      n: [w('s')],
      s: [w('s'), w('i'), w('l')],
      h: [w('o')],
      o: [w('r'), w('d')],
      d: [w('i')],
    },
  };

  t.deepEqual(expected, createNameDataset(names));
});

test('createNameDataset - creates a dataset for name list with separators', (t) => {
  const names = [`shem'ot`, 'go ez', 'bet', 'lemuel', 'odin'];

  const expected: NameDataset = {
    lengthRange: [3, 6],
    nextTokens: {
      start: [w('s'), w('o', 2), w('g'), w('e'), w('b'), w('l')],
      b: [w('e')],
      d: [w('i')],
      e: [w('m', 2), w('z'), w('t'), w('l')],
      g: [w('o')],
      h: [w('e')],
      i: [w('n')],
      l: [w('e')],
      m: [w('u')],
      o: [w('t'), w('d')],
      s: [w('h')],
      u: [w('e')],
    },
    parts: [
      {
        count: 1,
        weight: 3,
      },
      {
        count: 2,
        weight: 2,
        separators: [
          {
            character: `'`,
            weight: 1,
          },
          {
            character: ' ',
            weight: 1,
          },
        ],
        partLengthMinimum: 2,
      },
    ],
  };

  t.deepEqual(expected, createNameDataset(names));
});
