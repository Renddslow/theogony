import mediator from '../mediator';

const fluids = ['sweat', 'blood', 'semen', 'reproductive fluids', 'spit', 'urine', 'feces'];

const setupPickProxy = (obj) =>
  new Proxy(obj, {
    get: (o, k: string) => {
      return mediator.call('pick', Reflect.get(o, k));
    },
  });

const dictionary = {
  chaos: {
    opener: [],
    monster: setupPickProxy({
      adjective: ['violent', 'ferocious', 'vile', 'wicked'],
      emerge_from: ['sea', 'chaos waters', 'abyss', 'rift', 'aether'],
      evil_act: [
        'commanded the gods to kneel',
        'inflicted heavy burdens on the gods',
        'wrought chaos throughout the cosmos',
      ],
      evil_descriptor: ['tyranny'],
      reign_descriptor: ['reign', 'regime', 'cruelty', 'machinations', 'violence'],
      supremacy: ['reign of terror', 'endless regime', 'final empire', 'cosmos breaking rule'],
    }),
    gods: setupPickProxy({
      creative_fluids: fluids,
      creative_parts: ['arms', 'limbs', 'talismans', 'sacred symbols', 'weapons', ...fluids],
      float_length: ['generations', 'a generation', 'eons', 'an age', 'an era', 'a lifetime'],
      kill_verb: ['cleaved', 'hacked', 'slashed'],
      creative_state: ['ecstasy', 'rage', 'anger', 'mischief', 'genius'],
      creative_act: ['mingled', 'joined', 'stirred in'],
    }),
  },
};

export default dictionary;
