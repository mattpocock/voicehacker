const path = require('path');

module.exports = {
  plugins: [
    'gatsby-plugin-react-native-web',
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'audio',
        path: path.resolve(__dirname, '../backend/assets/audio'),
      },
    },
  ],
};
