const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise(async (resolve, reject) => {
    const wordTemplate = path.resolve('src/templates/Word.tsx');
    const accentTemplate = path.resolve('src/templates/Accent.tsx');
    const soundTemplate = path.resolve('src/templates/Sound.tsx');
    const soundOfAccentTemplate = path.resolve(
      'src/templates/SoundOfAccent.tsx',
    );
    await graphql(
      `
        {
          allWordsYaml {
            edges {
              node {
                id
                word
              }
            }
          }
        }
      `,
    ).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }

      result.data.allWordsYaml.edges.forEach(({ node }) => {
        createPage({
          path: `words/${node.word}`,
          component: wordTemplate,
          context: {
            wordId: node.id,
            wordRegex: `/^${node.word}$/`,
          },
        });
      });
    });

    await graphql(`
      {
        allAccentsYaml {
          edges {
            accent: node {
              id
              name
              sounds {
                id
                symbol
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }
      result.data.allAccentsYaml.edges.forEach(({ accent }) => {
        createPage({
          path: `accents/${accent.name}`,
          component: accentTemplate,
          context: {
            accentId: accent.id,
          },
        });
        accent.sounds.forEach((sound) => {
          if (!sound) return;
          createPage({
            path: `accents/${accent.name}/${sound.symbol}`,
            component: soundOfAccentTemplate,
            context: {
              accentId: accent.id,
              soundId: sound.id,
            },
          });
        });
      });
    });

    await graphql(`
      {
        allSoundsYaml {
          edges {
            node {
              id
              symbol
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }
      result.data.allSoundsYaml.edges.forEach(({ node }) => {
        createPage({
          path: `/sounds/${node.symbol}`,
          component: soundTemplate,
          context: {
            soundId: node.id,
          },
        });
      });
    });

    resolve(true);
  });
};
