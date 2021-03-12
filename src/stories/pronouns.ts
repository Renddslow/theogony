import { Gender } from '../deity/lib/gender';

export type Pronoun = {
  subject: string;
  object: string;
  possessive: string;
  reflexive: string;
};

const getPronouns = (gender: Gender): Pronoun => {
  switch (gender) {
    case 'male':
    case 'hermaphrodite':
      return {
        subject: 'he',
        object: 'him',
        possessive: 'his',
        reflexive: 'himself',
      };
    case 'female':
      return {
        subject: 'she',
        object: 'her',
        possessive: 'hers',
        reflexive: 'herself',
      };
    case 'non-binary':
      return {
        subject: 'they',
        object: 'them',
        possessive: 'their',
        reflexive: 'themself',
      };
  }
};

export default getPronouns;
