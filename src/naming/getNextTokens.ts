type NextTokenMap = Record<string, Array<string>> & {
  start: Array<string>;
};

const getNextTokens = (names: Array<string>): NextTokenMap => {
  const tokens: NextTokenMap = {
    start: [],
  };

  names.forEach((name) => {
    name
      .toLowerCase()
      .split('')
      .forEach((char, idx) => {
        if (idx === 0) {
          tokens.start.push(char);
        }

        if (!tokens[char]) {
          tokens[char] = [];
        }

        if (idx + 1 < name.length) {
          tokens[char].push(name[idx + 1]);
        }
      });
  });

  return tokens;
};

export default getNextTokens;
