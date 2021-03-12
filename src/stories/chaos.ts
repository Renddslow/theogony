import { Monster } from '../types';
import mediator from '../mediator';
import getPronouns from './pronouns';
import { Deity } from '../deity';
import dictionary from './dictionary';

const capitalize = (word: string) => `${word[0].toUpperCase()}${word.slice(1)}`;
const possessive = (word: string) => (word[word.length - 1] === 's' ? `${word}'` : `${word}'s`);
const godOrGoddess = (gender: string) => (gender !== 'female' ? 'god' : 'goddess');

const opener = (monster: Monster) => {
  const pronouns = getPronouns(monster.gender);
  const paragraph = [
    `Out of the ${mediator.call('pick', dictionary.chaos.monster.emerge_from)}, ${
      monster.name
    } emerged.`,
    `A ${mediator.call('pick', dictionary.chaos.monster.adjective)} ${monster.type}, ${
      pronouns.subject
    } ${mediator.call('pick', dictionary.chaos.monster.evil_act)}.`,
    `${capitalize(pronouns.possessive)} ${mediator.call(
      'pick',
      dictionary.chaos.monster.evil_descriptor,
    )} was great, and it broke the souls of the newly formed gods.`,
    `But ${pronouns.possessive} reign was not to last.`,
  ];

  return paragraph.join(' ');
};

const startOfWar = (monster: Monster, participants: Deity[], allGods: boolean) => {
  const paragraph = [];

  if (participants.length > 1) {
    const names = participants.slice(0, -1).map((d) => d.name);
    const lastParticipantName = participants[participants.length - 1].name;
    paragraph.push(
      ...[
        `${names.join(', ')} ${mediator.call('pick', [
          'and',
          'together with',
        ])} ${lastParticipantName} banded together,`,
        !allGods
          ? `a rebel party, rising up to do what the rest could not.`
          : `a cohort of all the gods of the cosmos, working in one accord.`,
        `Together they engaged the ${monster.type} in pitched battle,`,
        `seeking once and for all to cast down ${
          getPronouns(monster.gender).possessive
        } ${mediator.call('pick', dictionary.chaos.monster.supremacy)}.`,
      ],
    );
  } else {
    const warrior = participants[0];
    paragraph.push(
      ...[
        `Only one had the courage to stand against the ${mediator.call(
          'pick',
          dictionary.chaos.monster.reign_descriptor,
        )} of ${monster.name}.`,
        `${warrior.name}, ${godOrGoddess(warrior.gender)} of ${warrior.archetype} confronted the ${
          monster.type
        } in pitched battle.`,
      ],
    );
  }

  return paragraph.join(' ');
};

const warLength = (monster: Monster, rounds: number) => {
  if (rounds < 2) {
    const days = rounds > 0 ? `a mere ${rounds + 1} days` : `only a single day`;
    return [
      `Though ${monster.name} was fierce, the fighting ended swiftly.`,
      `For ${days} the gods battled the fell ${monster.type}.`,
    ].join(' ');
  }

  if (rounds < 7) {
    return [
      `${monster.name} was fierce, battling not just for supremacy, but for ${
        getPronouns(monster.gender).possessive
      } life.`,
      `The battled lasted many weeks, each side growing weary and suffering serious casualties.`,
      `Yet the gods battled on, it was ${monster.name} or them.`,
    ].join(' ');
  }

  if (rounds <= 15) {
    return [
      `For years the gods did battle against ${monster.name}.`,
      `Though the power of the gods was great, they were sorely out-matched by a chaos fiend.`,
      `Nevertheless, the battle raged, caring little for time or comfort.`,
    ].join(' ');
  }

  return [
    `For ages on end the gods did war against the ${monster.type}.`,
    `${monster.name} was fierce, the battle tipped many times in ${
      getPronouns(monster.gender).possessive
    } favor,`,
    `and then for another few centuries would tip in favor of the gods.`,
    `They resisted with everything they had, sustaining losses and sacrificing friendships.`,
    `Yet what is an eternity to a god?`,
  ].join(' ');
};

const defeatEnding = (monster: Monster) => {
  const monsterPronoun = getPronouns(monster.gender);

  const mingleWithMonsterBlood = mediator.call('d', 2) === 1;

  const paragraph = [
    `The war ended in total devastation. The limp and lifeless bodies of once gods strewn across the cosmos.`,
    `Though the gods could not defeat ${monster.name}, ${monsterPronoun.subject} fled back to whence ${monsterPronoun.subject} had come.`,
    `Yet all was not lost for the gods and their progeny.`,
    mingleWithMonsterBlood
      ? `The ${mediator.call(
          'pick',
          dictionary.chaos.gods.creative_parts,
        )} floated through the ${mediator.call(
          'pick',
          dictionary.chaos.monster.emerge_from,
        )} for ${mediator.call(
          'pick',
          dictionary.chaos.gods.float_length,
        )}. Over time, they mingled together.`
      : `For ${mediator.call('pick', dictionary.chaos.gods.float_length)} the blood of ${
          monster.name
        } and the ${mediator.call(
          'pick',
          dictionary.chaos.gods.creative_parts,
        )} of the gods mingled together.`,
    `Their union congealed and gave birth to a new generation of gods.`,
  ];

  return paragraph.join(' ');
};

const victoryEnding = (monster: Monster, slayer: Deity) => {
  const monsterPronoun = getPronouns(monster.gender);
  const slayerPronoun = getPronouns(slayer.gender);

  const tired = mediator.call('d', 10) === 10;

  const paragraph = [
    `${slayer.name} swung with ${slayerPronoun.possessive} ${slayer.favoredWeapon}, bringing it down with a heavy crash.`,
    `With all ${slayerPronoun.possessive} might ${slayerPronoun.subject} ${mediator.call(
      'pick',
      dictionary.chaos.gods.kill_verb,
    )} the head of ${monster.name} clean off.`,
    `${slayer.name} raised the head of ${monster.name} aloft.`,
  ];

  if (tired) {
    paragraph.push(
      ...[
        `Though ${slayerPronoun.subject} was wearied and wounded, the pride of victory swelled in ${slayerPronoun.possessive} breast.`,
        `${capitalize(
          slayerPronoun.subject,
        )} was covered in sweat and blood, yet the thrill of battle buzzed in ${
          slayerPronoun.possessive
        } mind.`,
      ],
    );
  }

  paragraph.push(
    ...[
      `In a state of pure ${mediator.call('pick', dictionary.chaos.gods.creative_state)},`,
      `${slayer.name} ${mediator.call(
        'pick',
        dictionary.chaos.gods.creative_act,
      )} the ${mediator.call(
        'pick',
        dictionary.chaos.gods.creative_fluids,
      )} of the gods with the blood pouring from ${possessive(monster.name)} skull.`,
      `From the frothy mixture emerged a new generation of gods.`,
    ],
  );

  return paragraph.join(' ');
};

const chaos = {
  opener,
  startOfWar,
  warLength,
  defeatEnding,
  victoryEnding,
};

export default chaos;
