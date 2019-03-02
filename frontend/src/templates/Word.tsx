import { graphql, Link } from 'gatsby';
import React from 'react';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import RecordingTable from '../components/RecordingTable';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import styled from 'styled-components';
import theme from '../config/theme';
import useScrollToTopOnMount from '../hooks/useScrollToTopOnMount';

const Word = (props: Props) => {
  useScrollToTopOnMount();
  return (
    <>
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
              return <p>{accent}</p>;
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
              <RelatedWordsWrapper>
                <p style={{ color: 'black' }}>{rowObject.word}</p>
                <p>
                  Available in {rowObject.availableAccents.length} accent
                  {rowObject.availableAccents.length > 1 ? 's' : ''}
                </p>
              </RelatedWordsWrapper>
            ),
          }}
        />
      </FloatingWhiteBox>
    </>
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
  accent: string;
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
        accent
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

const RelatedWordsWrapper = styled.div`
  & > * {
    color: ${theme.midGrey};
    margin: 0;
    text-align: left;
  }
`;
