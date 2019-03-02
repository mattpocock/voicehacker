const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const env = require('../../env.json');
const composeDatabase = require('../database/composeDatabase');

const databaseDir = path.resolve(__dirname, '../../../assets/database');
const audioDir = path.resolve(__dirname, '../../../assets/audio');

const typeDefs = gql`
  type Word {
    word: String!
    availableAccents: [String]!
    recordings: [Recording]!
  }

  type Recording {
    accent: String!
    src: String!
  }

  type RequiredRecording {
    accentRequired: String!
    word: String!
  }

  type Accent {
    name: String!
    wordsToRecord: [String]!
  }

  type Query {
    getWordsToRecord(limit: Int!, accent: String!): [String!]!
    getMultiAccentWordsToRecord(limit: Int!): [RequiredRecording!]!
  }

  type Mutation {
    submitWord(word: String!, accent: String!, file: Upload!): Boolean!
  }
`;

const writeToFileSystem = async (stream, accent, word) =>
  new Promise((resolve, reject) => {
    const pathToSave = path.resolve(audioDir, accent, `${word}.webm`);
    stream
      .on('error', (error) => {
        reject(error);
      })
      .pipe(fs.createWriteStream(pathToSave))
      .on('error', (error) => {
        reject(error);
      })
      .on('finish', resolve(pathToSave));
  });

const resolvers = {
  Query: {
    getWordsToRecord: (parent, args) => {
      const accentFile = path.resolve(
        databaseDir,
        'accents',
        `${args.accent}.yaml`,
      );
      if (!fs.existsSync(accentFile)) {
        throw new Error('dir does not exist');
      }
      const file = jsyaml.safeLoad(fs.readFileSync(accentFile).toString());

      return file.wordsToRecord.slice(0, args.limit);
    },
    getMultiAccentWordsToRecord: (parent, args) => {
      const recordingsToMakeFile = path.resolve(
        databaseDir,
        'stats',
        'recordingsToMake.yaml',
      );
      return jsyaml
        .safeLoad(fs.readFileSync(recordingsToMakeFile).toString())
        .slice(0, args.limit);
    },
  },
  Mutation: {
    submitWord: async (parent, args) => {
      try {
        const { stream } = await args.file;
        await writeToFileSystem(stream, args.accent, args.word);
        composeDatabase();
        return true;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (
      !req.headers.authorization ||
      req.headers.authorization !== env.apiKey
    ) {
      throw new AuthenticationError('bad API key');
    }
    return null;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // eslint-disable-line
});
