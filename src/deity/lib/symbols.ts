import mediator from '../../mediator';

const SYMBOLS = {
  abundance: ['wheat', 'cornucopia', 'ear of corn'],
  agriculture: ['wheat', 'cornucopia', 'ear of corn'],
  animals: ['sheep', 'pig', 'cat', 'dog', 'bird', 'wolf'],
  art: ['brush', 'droplet', 'chisel', 'stone'],
  autumn: ['leaf', 'tree', 'forest', 'branch', 'stick', 'wheat'],
  beauty: ['heart', 'lips', 'rose', 'thorn'],
  children: ['mother', 'dress', 'milk', 'baby', 'cradle'],
  death: ['skull', 'scythe'],
  destroyer: ['skull', 'scythe', 'locust', 'rat', 'flea'],
  eunuchs: ['berries', 'scissors', 'knife', 'scalpel'],
  fate: ['scissors', 'thread', 'needle', 'weavers bow'],
  fertility: ['pomegranate', 'seed', 'wheat', 'peach'],
  fire: ['torch', 'ember', 'log', 'lantern', 'tinder'],
  food: ['bread', 'meat', 'egg', 'hen', 'cow'],
  fortune: ['coin', 'gold piece', 'silver piece', 'copper piece'],
  harvest: ['wheat', 'cornucopia', 'ear of corn'],
  health: ['cross', 'serpent', 'caduceus', 'rod', 'mortar and pestal'],
  hunting: ['bow', 'stag', 'horn', 'antler', 'quiver', 'hatchet', 'hunting knife'],
  justice: ['scales', 'sword', 'blindfold', 'shackles'],
  knowledge: ['mind', 'heart', 'scroll', 'book', 'quill'],
  life: ['ankh', 'heart'],
  love: ['heart', 'pomegranate'],
  lunar: ['moon', 'deer', 'star', 'comet'],
  lust: ['pomegranate', 'bow', 'arrow', 'vial'],
  magic: ['wand', 'staff', 'tome', 'crystal ball'],
  messenger: ['wings', 'winged shoes', 'winged helm', 'horse', 'scroll'],
  nature: ['tree', 'grass', 'leaf', 'forest', 'deer'],
  night: ['star', 'moon', 'cloak', 'lantern', 'lamp post'],
  oracular: ['crystal ball', 'telescope', 'oraculum', 'tea cup'],
  peace: ['dove', 'olive branch'],
  planetary: ['telescope', 'planet', 'wing', 'winged helm'],
  rain: ['bucket', 'umbrella', 'raindrop', 'lightning bolt'],
  river: ['fish', 'pebble', 'water', 'river'],
  sea: ['wave', 'mermaid', 'whale', 'dolphin', 'trident', 'ship'],
  sky: ['cloud', 'sun', 'comet'],
  sleep: ['pillow', 'sand', 'sandbag', 'bed', 'nightcap', 'cloak'],
  smithing: ['hammer', 'anvil', 'sword', 'axe', 'forge', 'iron'],
  spring: ['flower', 'rose', 'grass'],
  storms: ['lightning bolt', 'raindrop', 'wind gust', 'cloud'],
  solar: ['sun', 'star', 'flame'],
  summer: ['sun', 'palm tree'],
  time: ['clock', 'pocket watch', 'hourglass', 'sand', 'gear', 'number twelve'],
  thunder: ['lightning bolt', 'hammer', 'anvil', 'cloud'],
  trickster: ['snake', 'serpent', 'horns', 'horned helm', 'pitch fork', 'mask'],
  underworld: ['fire', 'boat', 'oar', 'bag of gold', 'bag of silver', 'scythe'],
  vengeance: ['sword', 'blood'],
  virgins: ['flower', 'dove'],
  war: ['sword', 'axe', 'helm', 'shield', 'hammer', 'war hammer', 'battleaxe', 'trebuchet'],
  water: ['river'],
  weather: ['lightning bolt', 'raindrop', 'wind gust', 'cloud', 'wheat'],
  wind: ['cloud', 'gust of wind', 'wings', 'sail'],
  winter: ['snowflake', 'fractal', 'icicle', 'mountain', ''],
  wisdom: ['mind', 'hammer', 'needle', 'thread', 'tapestry'],
};

const ADJECTIVES = [
  'bent',
  'blood stained',
  'broken',
  'burning',
  'cracked',
  'crooked',
  'flaming',
  'inverted',
  'rent',
  'rusted',
  'shattered',
  'spiral',
  'torn',
  'upside-down',
  'wounded',
];

const d20 = () => Math.floor(mediator.call('random') * 20);

export const pickSymbol = (archetype: string, roll = d20): string => {
  const hasAdjective = SYMBOLS[archetype].length < 4 || roll() >= 12;

  const symbolArr = [];

  if (hasAdjective) {
    symbolArr.push(mediator.call('pick', ADJECTIVES));
  }

  symbolArr.push(mediator.call('pick', SYMBOLS[archetype]));

  return symbolArr.join(' ');
};
