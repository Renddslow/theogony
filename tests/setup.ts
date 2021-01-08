import seedrandom from 'seedrandom';

import mediator from '../src/utils/mediator';

mediator.provide('random', seedrandom('boo'));
