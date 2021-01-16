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

  const mythos = chooseMythos();
  console.log('mythos:', mythos);
  // TODO: Drop in phonetic pairings (ph, th, kh, tz, etc)
  const deities = spawnFirstGeneration(mythos, opts.nameSource);
  console.log(deities);

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
