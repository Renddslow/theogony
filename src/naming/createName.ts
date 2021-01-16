import { MultiPart, NameDataset, NextTokens } from './generator/types';
import mediator from '../mediator';

const buildName = (acc: string, tokens: NextTokens, maxLength: number, cursor: number = 0) => {
  const prev = cursor === 0 ? 'start' : acc[acc.length - 1];
  const next = mediator.call('weighted-pick', tokens[prev], 'character');

  if (cursor < maxLength - 1) {
    return buildName(acc + next, tokens, maxLength, cursor + 1);
  }

  const name = acc + next;

  return `${name[0].toUpperCase()}${name.slice(1)}`;
};

const createName = (dataset: NameDataset): string => {
  const parts = dataset.parts ? mediator.call('weighted-pick', dataset.parts, 'count') : 1;
  if (parts === 1) {
    const length = mediator.call('range', ...dataset.lengthRange);
    return buildName('', dataset.nextTokens, length);
  }

  // @ts-ignore
  const part: MultiPart = dataset.parts.find(({ count }) => count === parts);

  const sections = Array(parts)
    .fill(null)
    .map(() => {
      let length = mediator.call('range', ...dataset.lengthRange);
      while (length < part.partLengthMinimum) {
        length = mediator.call('range', ...dataset.lengthRange);
      }
      return buildName('', dataset.nextTokens, length);
    });

  const separator = mediator.call('weighted-pick', part.separators, 'character');

  return sections.join(separator);
};

export default createName;
