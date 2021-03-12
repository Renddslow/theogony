import mediator from '../mediator';

const rollInitiative = (combatants: Array<string>): Array<string> => {
  return combatants
    .map((id) => ({
      id,
      init: mediator.call('random') * 20,
    }))
    .sort((a, b) => a.init - b.init)
    .map(({ id }) => id);
};

export default rollInitiative;
