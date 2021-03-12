const getAbilityMod = (score: number): number => {
  const subbedScore = score % 2 !== 0 ? score - 1 : score;
  return subbedScore - 10;
};

export default getAbilityMod;
