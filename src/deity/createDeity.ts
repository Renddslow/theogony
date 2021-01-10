import cuid from 'cuid';

import { pickAlignment, Alignment } from './lib/alignment';
import { pickFavoredAnimals, ANIMALS } from './lib/animals';
import { pickArchetype } from './lib/archetypes';
import { pickDomains } from './lib/domains';
import { pickGender, Gender } from './lib/gender';
import { pickWeapon } from './lib/weapons';

type Options = {
  chief?: boolean;
  animals?: Array<string>;
  mergeAnimals?: boolean;
};

export type Deity = {
  id: string;
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
  humanInvolvementLevel: 'heavy' | 'standard' | 'light' | 'none'; // all deities start at none
  living: boolean;
  realm: string;
  sacredColors: Array<string>;
  symbol: string;
  titles: Array<string>;
  worshipers: Array<string>;
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

  const archetype = pickArchetype();

  return {
    id: cuid(),
    name: '', // TODO: generate name
    adjective: '',
    alignment: pickAlignment(),
    archetype,
    chief: !!options.chief,
    domains: pickDomains(),
    favoredAnimals: pickFavoredAnimals(animals),
    favoredWeapon: pickWeapon(),
    gender: pickGender(),
    humanInvolvementLevel: 'none', // Modified just before final generation
    living: true,
    realm: '', // Added after cosmology established
    sacredColors: [],
    symbol: '', // Picked based on archetype
    titles: [], // Picked just before final generation based on stories, antics, wars, etc.
    worshipers: [], // Picked after earth and races are created
  };
};

export default createDeity;
