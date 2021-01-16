import { NextTokenMap, Token } from './types';

const weightTokens = (map: NextTokenMap): Record<string, Array<Token>> => {
  return Object.keys(map).reduce((acc, key): Record<string, Array<Token>> => {
    const characterMap = map[key].reduce((acc: Record<string, number>, character: string): Record<
      string,
      number
    > => {
      if (!acc[character]) {
        acc[character] = 0;
      }
      acc[character] += 1;
      return acc;
    }, {});

    if (Object.keys(characterMap).length) {
      acc[key] = Object.keys(characterMap).map((k) => ({
        weight: characterMap[k],
        character: k,
      }));
    }

    return acc;
  }, {});
};

export default weightTokens;
