const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const wordTemplate = path.resolve('src/templates/Word.tsx');
    resolve(
      graphql(
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
      }),
    );
  });
};
