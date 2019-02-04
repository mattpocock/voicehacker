const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const jsYaml = require('js-yaml');
const words = require('../../words');

const wordsArray = words.split('\n');
const databasePath = path.resolve(__dirname, '../../assets/database');
const audioAssetsPath = path.resolve(__dirname, '../../assets/audio');

module.exports = () => {
  /** Clear out previous database */

  if (fs.existsSync(databasePath)) {
    rimraf.sync(databasePath);
  }
  fs.mkdirSync(databasePath);
  fs.mkdirSync(path.resolve(databasePath, './words'));
  fs.mkdirSync(path.resolve(databasePath, './accents'));

  /** Scan audio files for accents */
  const accents = fs.readdirSync(audioAssetsPath);

  wordsArray.forEach((word) => {
    const availableAccents = accents.filter((name) => {
      const recordingURI = path.resolve(audioAssetsPath, name, `${word}.webm`);
      return fs.existsSync(recordingURI);
    });
    const yaml = jsYaml.safeDump({
      word,
      availableAccents,
      recordings: availableAccents.map((accent) => ({
        accent,
        src: `assets/audio/${accent}/${word}.webm`,
      })),
    });
    fs.writeFileSync(path.resolve(databasePath, 'words', `${word}.yaml`), yaml);
  });

  accents.forEach((name) => {
    const wordsRecorded = fs.readdirSync(path.resolve(audioAssetsPath, name));
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
};
