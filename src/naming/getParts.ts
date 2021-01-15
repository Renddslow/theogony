import { klona } from 'klona';

import { MultiPart, SinglePart } from './types';
import getSeparators from './getSeparators';

const regexp = /['\-\s]/;

const getParts = (names: Array<string>): Array<SinglePart | MultiPart> => {
  const singlePartNames = names.filter((n) => n.split(regexp).length === 1);
  const multiPartNames = names.filter((n) => n.split(regexp).length > 1);

  const parts: Array<SinglePart | MultiPart> = [
    {
      weight: singlePartNames.length,
      count: 1,
    },
  ];

  const countsMap = multiPartNames.reduce((acc, name): Record<string, Array<string>> => {
    const namePartLength = name.split(regexp).length.toString();
    if (!acc[namePartLength]) {
      acc[namePartLength] = [];
    }
    acc[namePartLength].push(name);
    return acc;
  }, {});

  parts.push(
    ...Object.keys(countsMap).reduce((acc, count): Array<MultiPart> => {
      const part = {
        count: parseInt(count, 10),
        weight: countsMap[count].length,
        partLengthMinimum: [...countsMap[count]]
          .reduce((acc, name) => [...acc, ...name.split(regexp)], [])
          .sort((a, b) => a.length - b.length)[0].length,
        separators: getSeparators(klona(countsMap[count])),
      };

      acc.push(part);
      return acc;
    }, []),
  );

  return parts;
};

export default getParts;
