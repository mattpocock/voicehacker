const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const jsYaml = require('js-yaml');
const getCmellonTranslations = require('./utils/getCmellonTranslations');
const words = require('../../words');

const wordsArray = words.split('\n');
const databasePath = path.resolve(__dirname, '../../../assets/database');
const configPath = path.resolve(__dirname, '../../config');
const audioAssetsPath = path.resolve(__dirname, '../../../assets/audio');

module.exports = () => {
  /** Clear out previous database */

  if (fs.existsSync(databasePath)) {
    rimraf.sync(databasePath);
  }
  fs.mkdirSync(databasePath);
  fs.mkdirSync(path.resolve(databasePath, './words'));
  fs.mkdirSync(path.resolve(databasePath, './accents'));
  fs.mkdirSync(path.resolve(databasePath, './stats'));

  /** Scan audio files for accents */
  const accents = jsYaml
    .safeLoad(
      fs.readFileSync(path.resolve(configPath, 'accents.yaml')).toString(),
    )
    .map(({ name }) => name);

  /** For each word, create an entry */
  const wordObjects = wordsArray.map((word) => {
    const availableAccents = accents.filter((name) => {
      const recordingURI = path.resolve(audioAssetsPath, name, `${word}.webm`);
      return fs.existsSync(recordingURI);
    });
    return {
      word,
      translation: getCmellonTranslations(word),
      availableAccents,
      recordings: availableAccents.map((accent) => ({
        accent,
        src: `${accent}/${word}.webm`,
      })),
    };
  });

  /** For each accent, create an entry */
  accents.forEach((name) => {
    const accentAudioPath = path.resolve(audioAssetsPath, name);
    if (!fs.existsSync(accentAudioPath)) {
      fs.mkdirSync(accentAudioPath);
    }
    const wordsRecorded = fs.readdirSync(accentAudioPath);
    fs.writeFileSync(
      path.resolve(databasePath, 'accents', `${name}.yaml`),
      jsYaml.safeDump({
        name,
        wordsToRecord: wordsArray.filter(
          (word) => !wordsRecorded.includes(`${word}.webm`),
        ),
      }),
    );
  });

  const recordingsToMake = wordObjects
    .filter(({ availableAccents }) => availableAccents.length < accents.length)
    .sort((a, b) =>
      a.availableAccents.length > b.availableAccents.length ? -1 : 1,
    )
    .map(({ word, availableAccents }) => ({
      accentRequired: accents.find(
        (accent) => !availableAccents.includes(accent),
      ),
      word,
    }));

  fs.writeFileSync(
    path.resolve(databasePath, 'stats', 'recordingsToMake.yaml'),
    jsYaml.safeDump(recordingsToMake),
  );

  const wordObjectsWithRelatedWords = wordObjects.map((wordObject) => {
    return {
      ...wordObject,
      relatedWords: wordObjects
        .filter((wordObjectToCheck) => wordObjectToCheck.recordings.length > 0)
        .map((wordObjectToCheck) => {
          return {
            ...wordObjectToCheck,
            score: wordObject.translation.filter((symbol) =>
              wordObjectToCheck.translation.includes(symbol),
            ).length,
          };
        })
        .sort((a, b) => {
          return a.score > b.score ? -1 : 1;
        })
        .slice(0, 6)
        .filter(({ word }) => word !== wordObject.word)
        .map(({ word }) => word),
    };
  });

  /** Write the words database */
  wordObjectsWithRelatedWords.forEach((json) => {
    const yaml = jsYaml.safeDump(json);
    fs.writeFileSync(
      path.resolve(databasePath, 'words', `${json.word}.yaml`),
      yaml,
    );
  });
};
