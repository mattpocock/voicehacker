const cmellon = require('../../../cmellon');

const getCmellonTranslations = (word) => {
  const uppercaseWord = `${word}`.toUpperCase();

  const searchTerm = `\n${uppercaseWord}  `;
  const searchIndex = cmellon.indexOf(searchTerm);

  if (searchIndex === -1) {
    throw new Error(`Word ${word} could not be found`);
  }

  const line = cmellon.slice(
    searchIndex + searchTerm.length,
    cmellon.indexOf('\n', searchIndex + 1),
  );

  const elements = line
    .split(' ')
    .map((symbol) => symbol.replace(/([0-3])/g, ''));

  return elements;
};

module.exports = getCmellonTranslations;
