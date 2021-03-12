import { Deity } from '../deity';
import { Story, Monster } from '../types';
import mediator from '../mediator';
import createMonster from '../monster/createMonster';
import combat from '../combat';
import chaosStories from '../stories/chaos';

type ChaosEvent = {
  story: Story;
  monster: Monster;
  dead: string[];
};

const createChaosConflict = (deities: Array<Deity>): ChaosEvent => {
  const participantsCount = mediator.call('range', 1, deities.length);
  let participants = mediator.call('pick', deities, participantsCount);
  if (!Array.isArray(participants)) {
    participants = [participants];
  }

  const monster = createMonster('chaos');

  const { events, rounds, dead } = combat([
    {
      character: monster,
      combatants: participants.map((deity) => deity.id),
    },
    ...participants.map((character) => ({
      character,
      combatants: [monster.id],
    })),
  ]);

  if (dead.includes(monster.id)) {
    monster.living = false;
  }

  const highlights = events.filter(
    (event) => event.type === 'kill' || event.attributes.dmg >= 8 || event.attributes.critical,
  );
  highlights.map((h) => console.log(h));

  const killEvent = events.find(({ type }) => type === 'kill');
  const slayerId = killEvent && killEvent.attributes.attacker.id;
  const slayer = participants.find(({ id }) => id === slayerId);

  return {
    story: {
      id: mediator.call('cuid'),
      name: 'Chaoskampf',
      heroes: participants.map(({ id }) => id),
      villains: [monster.id],
      content: [
        chaosStories.opener(monster),
        [
          chaosStories.startOfWar(monster, participants, participants.length === deities.length),
          chaosStories.warLength(monster, rounds),
        ].join(' '),
        // play-by-play,
        dead.includes(monster.id) && killEvent
          ? chaosStories.victoryEnding(monster, slayer || participants[0])
          : chaosStories.defeatEnding(monster),
      ].join('\n'),
    },
    monster,
    dead: dead.filter((id) => id !== monster.id),
  };
};

export default createChaosConflict;
