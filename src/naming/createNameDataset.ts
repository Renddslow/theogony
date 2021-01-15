import { klona } from 'klona';

import { NameDataset, NextTokens } from './types';
import getMinMaxNameLength from './getMinMaxNameLength';
import getNextTokens from './getNextTokens';
import weightTokens from './weightTokens';
import getParts from './getParts';

const createNameDataset = (names: Array<string>): NameDataset => {
  const dataset: NameDataset = {
    lengthRange: getMinMaxNameLength(klona(names)),
    nextTokens: <NextTokens>weightTokens(getNextTokens(klona(names))),
  };

  if (names.some((n) => n.split(/['\-\s]/).length > 1)) {
    dataset.parts = getParts(klona(names));
  }

  return dataset;
};

export default createNameDataset;
