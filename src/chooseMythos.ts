import { Mythos, mythoses } from './types';
import mediator from './mediator';

export default (): Mythos => {
  const idx = Math.floor(mediator.call('random') * mythoses.length);
  return <Mythos>mythoses[idx];
};
