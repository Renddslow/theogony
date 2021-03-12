import egyptian from './egyptian.deity.json';
import greek from './greek.deity.json';
import phoenician from './phoenician.deity.json';
import mesopotamian from './mesopotamian.deity.json';

import chaos from './chaos.monster.json';
import { NameDataset } from '../naming/generator/types';

export const deityNames = {
  egyptian,
  greek,
  phoenician,
  mesopotamian,
};

export const monsterNames: Record<string, NameDataset> = {
  // @ts-ignore
  chaos,
};
