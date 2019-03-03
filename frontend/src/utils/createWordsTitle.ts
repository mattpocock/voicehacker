export default (words: { word: string }[]) =>
  words
    .map((word) => word.word.toUpperCase())
    .slice(0, 3)
    .join(', ');
