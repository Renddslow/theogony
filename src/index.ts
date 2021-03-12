import seedrandom from 'seedrandom';
import { get } from 'dot-prop';
import sower from 'sower';
import mri from 'mri';

import mediator from './mediator';
import chooseMythos from './chooseMythos';
import range from './utils/range';
import pick from './utils/pick';
import cuid from 'cuid';
import { spawnFirstGeneration } from './spawn';
import { Mythos, SourceRegion } from './types';
import weightedPick from './utils/weightedPick';
import createChaosConflict from './conflict/chaos';
import pointBuy from './utils/pointBuy';
import d from './utils/d';

interface Options {
  seed: string;
  mythos?: Mythos;
  nameSource?: SourceRegion;
}

const createSetting = (opts: Options) => {
  mediator.provide('random', seedrandom(opts.seed));
  mediator.provide('range', range);
  mediator.provide('pick', pick);
  mediator.provide('cuid', cuid);
  mediator.provide('weighted-pick', weightedPick);
  mediator.provide('point-buy', pointBuy);
  mediator.provide('d', d);

  const setting = {
    mythos: chooseMythos({ mythos: opts.mythos }),
    deities: [],
    monsters: [],
    characters: [],
    stories: [],
  };
  // TODO: Drop in phonetic pairings (ph, th, kh, tz, etc)
  // TODO: explore making domains relate to archetype
  setting.deities.push(
    ...spawnFirstGeneration(setting.mythos, opts.nameSource).map((d) => ({
      ...d,
      generation: 1,
    })),
  );

  switch (setting.mythos) {
    case 'chaos': {
      console.log('🦋');
      const { story, monster, dead } = createChaosConflict(setting.deities);
      setting.stories.push(story);
      console.log(story);
      setting.monsters.push(monster);
      setting.deities = setting.deities.map((deity) => ({
        ...deity,
        living: !dead.includes(deity.id),
      }));
      setting.deities.push(...[]); // spawnSecondGeneration('chaos')
    }
  }

  // console.log(JSON.stringify(setting, null, 2));

  /**
   * 1. Create first generation ✅
   * 2. Theogony
   *    - chaos: slay a dragon/serpent - make some gods
   *    - copulation: sexy-time (think @dunsany/pantheon)
   *    - egg
   *    - iluvatar: chief One god who creates a divine council
   *    - metamorphosis: similar to iluvatar, but with the singular god splitting itself and becoming other gods
   * 3. (optional) Deity conflict
   * 4. Cosmology
   * 5. Second Generation
   * 6. Relationships
   * 7. (optional) Titanomachy
   * 8. Races + Cultures Created
   * 9. Antics/Conflicts
   * 10. Heroes + Demi-gods
   * 11. (optional) Cataclysm
   * 12. (optional) Ragnarok
   */
};

export default createSetting;

if (require.main === module) {
  const opts = mri(process.argv.slice(2), {
    default: {
      mythos: '',
    },
  });
  const seed = get(opts, '_.0', sower.silly());
  console.log('seed:', seed);
  createSetting({ seed, mythos: opts.mythos });
}
