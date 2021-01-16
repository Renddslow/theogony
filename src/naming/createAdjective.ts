import mediator from '../mediator';

const createAdjective = (name: string): string => {
  const lastChar = name.slice(-1);
  switch (lastChar) {
    case 'a':
      return name + 'n';
    case 'e':
      return name + 'an';
    case 'i':
      return name + 'an';
    case 'o':
      return name + 'an';
    case 'y':
      return name.replace(/y$/, 'ian');
  }

  if (name.length > 5 && name.slice(-5) === 'polis') {
    return name.replace('polis', 'politan');
  }

  const doubles = ['st', 'on'];
  if (doubles.includes(name.slice(-2))) {
    return name + 'ian';
  }

  const vowels = ['a', 'e', 'i', 'o', 'u'];
  if (!vowels.includes(lastChar)) {
    return name + mediator.call('pick', ['ite', 'ist', 'er']);
  }

  return name + 'ist';
};

export default createAdjective;
