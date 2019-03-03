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

const Word = (props: Props) => {
  useScrollToTopOnMount();
  return (
    <AppWrapper>
      <FloatingWhiteBox>
        <Header>{props.data.wordInfo.name.toUpperCase()}</Header>
        <Padding padding="1rem" />
        <SubHeadingWithDivider>Recordings</SubHeadingWithDivider>
        <Padding padding="1rem" />
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
        <Padding padding="1rem" />
        <SubHeadingWithDivider>Related Words</SubHeadingWithDivider>
        <Padding padding="1rem" />
        <Table
          data={props.data.wordInfo.relatedWords}
          schema={{
            onClick: (rowObject) => props.navigate(`/words/${rowObject.word}`),
            renderCell: (rowObject) => (
              <Flex alignItems="center" gutter="1rem" style={{ width: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                  <CellHeading style={{ marginBottom: '0.25rem' }}>
                    {rowObject.word}
                  </CellHeading>
                  <CellHeadingSubtitle>
                    Available in {rowObject.availableAccents.length} accent
                    {rowObject.availableAccents.length > 1 ? 's' : ''}
                  </CellHeadingSubtitle>
                </div>
                <div>
                  <NextIcon />
                </div>
              </Flex>
            ),
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
    }
  }
`;

export default Word;
