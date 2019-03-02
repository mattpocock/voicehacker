const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise(async (resolve, reject) => {
    const wordTemplate = path.resolve('src/templates/Word.tsx');
    const accentTemplate = path.resolve('src/templates/Accent.tsx');
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
            accentName: accent.name,
            accentRegex: `/${accent.name}/`,
          },
        });
      });
    });

    resolve(true);
  });
};
