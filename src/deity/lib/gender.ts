import mediator from '../../mediator';

export type Gender = 'male' | 'female' | 'non-binary' | 'hermaphrodite';

export const pickGender = (): Gender =>
  mediator.call('pick', <Array<Gender>>['male', 'female', 'hermaphrodite', 'non-binary']);
