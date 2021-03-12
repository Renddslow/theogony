import cuid from 'cuid';

import { pickAlignment, Alignment } from './lib/alignment';
import { pickFavoredAnimals, ANIMALS } from './lib/animals';
import { pickArchetype } from './lib/archetypes';
import { pickColors } from './lib/colors';
import { pickDomains } from './lib/domains';
import { pickGender, Gender } from './lib/gender';
import { pickSymbol } from './lib/symbols';
import { pickWeapon } from './lib/weapons';
import { SourceRegion } from '../types';
import { deityNames } from '../data';
import mediator from '../mediator';
import createName from '../naming/createName';
import createAdjective from '../naming/createAdjective';

type Options = {
  chief?: boolean;
  animals?: Array<string>;
  mergeAnimals?: boolean;
  region?: SourceRegion;
};

export type Deity = {
  id: string;
  characterType: 'deity';
  name: string;
  adjective: string;
  alignment: Alignment;
  archetype: string;
  chief: boolean;
  church?: Church;
  domains: Array<string>;
  favoredAnimals: Array<string>;
  favoredWeapon: string;
  gender: Gender;
  generation?: 1 | 2 | 3;
  humanInvolvementLevel: 'heavy' | 'standard' | 'light' | 'none'; // all deities start at none
  living: boolean;
  realm: string;
  sacredColors: Array<string>;
  symbol: string;
  titles: Array<string>;
  worshipers: Array<string>;
  hp: number;
  hpDescription: string;
};

type Book = {
  title: string;
  author?: string;
  age: 'new' | 'old' | 'ancient';
  magical: boolean;
  sacred: boolean;
  content: 'scripture' | 'theology' | 'teaching' | 'magic';
};

type Church = {
  clergy: {
    gender: 'male' | 'female' | 'any';
    raiments: Array<string>;
  };
  texts?: Array<Book>;
  founded: number;
  holidays: Array<string>;
  organizations: Array<string>;
};

const createDeity = (options: Options = {}): Deity => {
  const mergeAnimals = options.mergeAnimals || true;
  const animals = [
    ...(mergeAnimals ? ANIMALS : []), // add default animals
    ...(options.animals || []),
  ];
  const favoredAnimals = pickFavoredAnimals(animals);
  const region = options.region || mediator.call('pick', Object.keys(deityNames));

  const archetype = pickArchetype();
  const name = createName(deityNames[region]);

  return {
    id: cuid(),
    characterType: 'deity',
    name,
    adjective: createAdjective(name),
    alignment: pickAlignment(),
    archetype,
    chief: !!options.chief,
    domains: pickDomains(),
    favoredAnimals: Array.isArray(favoredAnimals) ? favoredAnimals : [favoredAnimals],
    favoredWeapon: pickWeapon(),
    gender: pickGender(),
    humanInvolvementLevel: 'none', // Modified just before final generation
    living: true,
    realm: '', // Added after cosmology established
    sacredColors: pickColors(),
    symbol: pickSymbol(archetype),
    titles: [], // Picked just before final generation based on stories, antics, wars, etc.
    worshipers: [], // Picked after earth and races are created
    hpDescription: '20d8 + 100',
    hp: mediator.call('d', 8, 20) + 100,
  };
};

export default createDeity;
