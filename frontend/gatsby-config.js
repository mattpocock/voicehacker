const path = require('path');

module.exports = {
  mapping: {
    'WordsYaml.recordings.src': 'File.relativePath',
    'WordsYaml.relatedWords': 'WordsYaml.word',
    'WordsYaml.recordings.accent': 'AccentsYaml.name',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'audio',
        path: path.resolve(__dirname, '../assets/audio'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'word',
        path: path.resolve(__dirname, '../assets/database/words'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'accent',
        path: path.resolve(__dirname, '../assets/database/accents'),
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        path: path.resolve(__dirname, '../assets/database/words'),
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        path: path.resolve(__dirname, '../assets/database/accents'),
      },
    },
  ],
};
