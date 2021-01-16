import { klona } from 'klona';

import { NameDataset, NextTokens } from './types';
import getMinMaxNameLength from './getMinMaxNameLength';
import getNextTokens from './getNextTokens';
import weightTokens from './weightTokens';
import getParts from './getParts';

const createNameDataset = (names: Array<string>): NameDataset => {
  const lowercaseNames = names.map((n) => n.toLowerCase());
  const dataset: NameDataset = {
    lengthRange: getMinMaxNameLength(klona(lowercaseNames)),
    nextTokens: <NextTokens>weightTokens(getNextTokens(klona(lowercaseNames))),
  };

  if (names.some((n) => n.split(/['\-\s]/).length > 1)) {
    dataset.parts = getParts(klona(lowercaseNames));
  }

  return dataset;
};

export default createNameDataset;
