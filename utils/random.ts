export const getPseudoRandomFromRange = (min = 1, max = 10): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};
