import { mythoses } from './types';
import mediator from './mediator';

export default () => {
  const idx = Math.floor(mediator.call('random') * mythoses.length);
  return mythoses[idx];
};
