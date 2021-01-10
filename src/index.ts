import seedrandom from 'seedrandom';

import mediator from './mediator';
import chooseMythos from './chooseMythos';
import range from './utils/range';
import pick from './utils/pick';

interface Options {
  seed: string;
}

const firstGenerationSpawnAmount = {
  chaos: (r) => {
    const MAX = 8;
    const MIN = 4;
    return Math.floor(r() * (MAX + 1 - MIN) + MIN);
  },
};

export default (opts: Options) => {
  mediator.provide('random', seedrandom(opts.seed));
  mediator.provide('range', range);
  mediator.provide('pick', pick);

  const mythos = chooseMythos();
  const deities = [];

  /**
   * 1. Create first generation
   * 2. Theogony
   *    - chaos: slay a dragon/serpent - make some gods
   *    - copulation: sexy-time (think @dunsany/pantheon)
   *    - egg
   *    - iluvatar: chief One god who creates a divine council. Council forms into clans
   *    - metamorphosis: similar to iluvatar, but with the singular god splitting itself and becoming other gods
   * 3. (optional) Deity conflict
   * 4. Cosmology
   * 5. Second Generation
   * 6. Relationships
   * 7. (optional) Titanomachy
   * 8. Antics/Conflicts
   */
};
