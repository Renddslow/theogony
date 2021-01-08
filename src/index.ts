import seedrandom from 'seedrandom';

import mediator from './utils/mediator';
import chooseMythos from './chooseMythos';

interface Options {
  seed: string;
}

export default (opts: Options) => {
  mediator.provide('random', seedrandom(opts.seed));

  const mythos = chooseMythos();

  /**
   * 1. Create first generation
   * 2. Theogony
   * 3. (optional) Deity conflict
   * 4. Second Generation
   * 5. Relationships
   * 6. Antics/Conflicts
   */

  switch (mythos) {
    case 'chaos': {
      break;
    }
    case 'copulation': {
      // sexy-time (think @dunsany/pantheon)
      break;
    }
    case 'egg': {
      // no frikkin clue.
      break;
    }
    case 'iluvatar': {
      // chief One god who creates a divine council. Council forms into clans
      break;
    }
    case 'metamorphosis': {
      // similar to iluvatar, but with the singular god splitting itself and becoming other gods
      break;
    }
  }
  // generate primordial deities
};
