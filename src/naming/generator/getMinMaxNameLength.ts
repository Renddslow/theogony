const getMinMaxNameLength = (names: Array<string>): [number, number] => {
  const lengthSorted = names
    .map((n) => n.replace(/['\-\s]/, ''))
    .sort((a, b) => a.length - b.length);
  return [lengthSorted[0].length, lengthSorted[lengthSorted.length - 1].length];
};

export default getMinMaxNameLength;
