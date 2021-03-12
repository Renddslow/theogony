const possessive = (word: string) => (word[word.length - 1] === 's' ? `${word}'` : `${word}'s`);

export default possessive;
