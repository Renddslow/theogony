import { Gender } from './deity/lib/gender';

export const mythoses = ['chaos', 'egg', 'copulation', 'iluvatar', 'metamorphosis'];
export type Mythos = 'chaos' | 'egg' | 'copulation' | 'iluvatar' | 'metamorphosis';

export type SourceRegion = 'egyptian';

type EntityID = string;

export type Story = {
  id: string;
  name: string;
  heroes: Array<EntityID>;
  villains?: Array<EntityID>;
  content: string;
};

export type Stats = {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  speed: number;
  fort: number;
  ref: number;
  will: number;
  ac: number;
};

export type Monster = {
  id: string;
  characterType: 'monster';
  name?: string;
  gender: Gender;
  type: string;
  stats: Stats;
  size: string;
  living: boolean;
  description: string;
  hp: number;
  hpDescription: string;
};

export type Character = {
  id: string;
  characterType: 'character';
  hp: number;
  hpDescription: string;
};

export type StateChange = {
  op: 'add' | 'remove' | 'replace' | 'copy' | 'move';
  path: string;
  value?: string;
};
