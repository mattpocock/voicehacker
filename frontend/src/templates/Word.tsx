import { graphql } from 'gatsby';
import React from 'react';
import CellHeading from '../components/CellHeading';
import CellHeadingSubtitle from '../components/CellHeadingSubtitle';
import Flex from '../components/Flex';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import NextIcon from '../components/NextIcon';
import Padding from '../components/Padding';
import RecordingTable from '../components/RecordingTable';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import useScrollToTopOnMount from '../hooks/useScrollToTopOnMount';
import AppWrapper from '../layouts/AppWrapper';
import CellWithSubtitle from '../components/CellWithSubtitle';
import createAvailableAccentSubtitle from '../utils/createAvailableAccentSubtitle';
import createWordsTitle from '../utils/createWordsTitle';

const Word = (props: Props) => {
  useScrollToTopOnMount();
  return (
    <AppWrapper>
      <FloatingWhiteBox>
        <Header>{props.data.wordInfo.name.toUpperCase()}</Header>
        <Padding />
        <SubHeadingWithDivider>Accents</SubHeadingWithDivider>
        <Padding />
        <RecordingTable
          data={props.data.wordInfo.recordings.map((recording) => ({
            ...recording,
            id: recording.src.id,
          }))}
          schema={{
            renderCell: ({ accent }: Recording) => {
              return <CellHeading>{accent.displayName}</CellHeading>;
            },
          }}
        />
        <Padding />
        <SubHeadingWithDivider>Related Words</SubHeadingWithDivider>
        <Padding />
        <Table
          data={props.data.wordInfo.relatedWords.slice(0, 3)}
          schema={{
            onClick: (rowObject) => props.navigate(`/words/${rowObject.word}`),
            renderCell: (rowObject) => (
              <CellWithSubtitle
                title={rowObject.word}
                subtitle={createAvailableAccentSubtitle(
                  rowObject.availableAccents,
                )}
              />
            ),
          }}
        />
        <Padding />
        <SubHeadingWithDivider>Sounds</SubHeadingWithDivider>
        <Padding />
        <Table
          data={props.data.wordInfo.translation.filter((value) => value)}
          schema={{
            renderCell: (translation: Translation) => (
              <CellWithSubtitle
                title={createWordsTitle(translation.words)}
                subtitle={translation.name}
              />
            ),
            onClick: (translation: Translation) => {
              props.navigate(`/sounds/${translation.symbol}`);
            },
          }}
        />
      </FloatingWhiteBox>
    </AppWrapper>
  );
};

interface Props {
  navigate: (url: string) => void;
  data: {
    wordInfo: {
      name: string;
      availableAccents: string[];
      recordings: Recording[];
      relatedWords: {
        id: string;
        word: string;
        availableAccents: string[];
      }[];
      translation: Translation[];
    };
  };
}

interface Recording {
  accent: {
    name: string;
    displayName: string;
  };
  src: {
    id: string;
    publicURL: string;
  };
}

interface Translation {
  id: string;
  symbol: string;
  name: string;
  words: { word: string }[];
}

export const WORD_QUERY = graphql`
  query WordQuery($wordId: String!) {
    wordInfo: wordsYaml(id: { eq: $wordId }) {
      name: word
      availableAccents
      recordings {
        accent {
          name
          displayName
        }
        src {
          id
          publicURL
        }
      }
      relatedWords {
        id
        word
        availableAccents
      }
      translation {
        symbol
        name
        id
        words {
          word
        }
      }
    }
  }
`;

export default Word;
