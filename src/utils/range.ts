import mediator from '../mediator';

const range = (min, max) => Math.floor(mediator.call('random') * (max + 1 - min) + min);
export default range;
