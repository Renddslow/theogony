import seedrandom from 'seedrandom';
import { get } from 'dot-prop';
import sower from 'sower';

import mediator from './mediator';
import chooseMythos from './chooseMythos';
import range from './utils/range';
import pick from './utils/pick';
import cuid from 'cuid';
import { spawnFirstGeneration } from './spawn';
import { SourceRegion } from './types';
import weightedPick from './utils/weightedPick';
import createName from './naming/createName';

interface Options {
  seed: string;
  nameSource?: SourceRegion;
}

const createSetting = (opts: Options) => {
  mediator.provide('random', seedrandom(opts.seed));
  mediator.provide('range', range);
  mediator.provide('pick', pick);
  mediator.provide('cuid', cuid);
  mediator.provide('weighted-pick', weightedPick);

  const setting = {
    mythos: chooseMythos(),
    deities: [],
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
  console.log('mythos:', setting.mythos);
  console.log('deities:', setting.deities);

  switch (setting.mythos) {
    case 'chaos':
      console.log('🦋');
    // stories.push(createChaosConflict)
    // deities.push(...spawnSecondGeneration())
  }

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
  const seed = get(process.argv, '2', sower.silly());
  console.log('seed:', seed);
  createSetting({ seed });
}
