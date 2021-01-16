import { SeparatorToken } from './types';

const getSeparators = (names: Array<string>): Array<SeparatorToken> => {
  const countMap = names
    .map((name) => name.match(/['\-\s]/g))
    .reduce((acc, matches) => {
      matches.forEach((m) => {
        if (!acc[m]) {
          acc[m] = 0;
        }
        acc[m] += 1;
      });
      return acc;
    }, {});

  return Object.keys(countMap).map((key: "'" | ' ' | '-') => ({
    character: key,
    weight: <number>countMap[key],
  }));
};

export default getSeparators;
