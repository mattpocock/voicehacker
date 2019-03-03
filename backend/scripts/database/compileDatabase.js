const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const jsYaml = require('js-yaml');
const getCmellonTranslations = require('./utils/getCmellonTranslations');
const words = require('../../smallerWords');

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
  fs.mkdirSync(path.resolve(databasePath, './sounds'));
  fs.mkdirSync(path.resolve(databasePath, './stats'));

  const accents = jsYaml.safeLoad(
    fs.readFileSync(path.resolve(configPath, 'accents.yaml')).toString(),
  );

  const sounds = jsYaml.safeLoad(
    fs.readFileSync(path.resolve(configPath, 'sounds.yaml')).toString(),
  );

  /** For each word, create an entry */
  const wordObjects = wordsArray.map((word) => {
    const availableAccents = accents
      .filter(({ name }) => {
        const recordingURI = path.resolve(
          audioAssetsPath,
          name,
          `${word}.webm`,
        );
        return fs.existsSync(recordingURI);
      })
      .map(({ name }) => name);
    return {
      word,
      translation: getCmellonTranslations(word),
      availableAccents,
      recordings: availableAccents.map((accentName) => ({
        accent: accentName,
        src: `${accentName}/${word}.webm`,
      })),
    };
  });

  /** For each accent, create an entry */
  accents.forEach((accent) => {
    const accentAudioPath = path.resolve(audioAssetsPath, accent.name);
    if (!fs.existsSync(accentAudioPath)) {
      fs.mkdirSync(accentAudioPath);
    }
    const wordsRecorded = fs.readdirSync(accentAudioPath);
    fs.writeFileSync(
      path.resolve(databasePath, 'accents', `${accent.name}.yaml`),
      jsYaml.safeDump({
        ...accent,
        wordsToRecord: wordsArray.filter(
          (word) => !wordsRecorded.includes(`${word}.webm`),
        ),
      }),
    );
  });

  /** Create a recordingsToMake stats file */
  const recordingsToMake = wordObjects
    .filter(({ availableAccents }) => availableAccents.length < accents.length)
    .sort((a, b) =>
      a.availableAccents.length > b.availableAccents.length ? -1 : 1,
    )
    .map(({ word, availableAccents }) => ({
      accentRequired: accents.find(
        ({ name }) => !availableAccents.includes(name),
      ),
      word,
    }));

  fs.writeFileSync(
    path.resolve(databasePath, 'stats', 'recordingsToMake.yaml'),
    jsYaml.safeDump(recordingsToMake),
  );

  /** Add related words to word Objects */
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

  const soundObjects = sounds.map((sound) => {
    return {
      ...sound,
      words: wordObjectsWithRelatedWords
        .filter((word) => {
          return word.translation.includes(sound.symbol);
        })
        .map((word) => word.word),
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

  soundObjects.forEach((json) => {
    const yaml = jsYaml.safeDump(json);
    fs.writeFileSync(
      path.resolve(databasePath, 'sounds', `${json.symbol}.yaml`),
      yaml,
    );
  });
};
