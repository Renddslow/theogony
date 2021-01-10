import mediator from './mediator';
import { Mythos } from './types';
import createDeity, { Deity } from './deity';

const ranges = {
  chaos: [4, 8],
  copulation: [6, 10],
  egg: [8, 12],
};

export const spawnFirstGeneration = (type: Mythos): Array<Deity> => {
  if (type === 'iluvatar' || type === 'metamorphosis') {
    return [createDeity({ chief: true })];
  }

  const deityCount = mediator.call('range', ...ranges[type]);
  return Array(deityCount)
    .fill(null)
    .map(() => createDeity());
};
