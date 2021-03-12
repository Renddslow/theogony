import { Mythos, mythoses } from './types';
import mediator from './mediator';

type Options = {
  mythos: Mythos;
};

export default (opts?: Options): Mythos => {
  const idx = Math.floor(mediator.call('random') * mythoses.length);
  return opts.mythos || <Mythos>mythoses[idx];
};
