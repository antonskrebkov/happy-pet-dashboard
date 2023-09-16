export const capitalize = (word: string) => {
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  return firstLetterCap + remainingLetters;
};

export const capitalizeInPlural = (word: string) => {
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  return firstLetterCap + remainingLetters + "s";
};
