import { graphql } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import CellHeading from '../components/CellHeading';
import CellWithSubtitle from '../components/CellWithSubtitle';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import Pill from '../components/Pill';
import RecordingTable from '../components/RecordingTable';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import useScrollToTopOnMount from '../hooks/useScrollToTopOnMount';
import createAvailableAccentSubtitle from '../utils/createAvailableAccentSubtitle';
import createWordsTitle from '../utils/createWordsTitle';
import { ReduxState } from '../utils/redux/redux';

const Word = (props: Props) => {
  useScrollToTopOnMount();
  return (
    <FloatingWhiteBox>
      <Header>{props.data.wordInfo.name.toUpperCase()}</Header>
      {props.practiceSound &&
        props.data.wordInfo.translation
          .filter((val) => val)
          .find(
            (translation) => translation.symbol === props.practiceSound,
          ) && (
          <>
            <Padding padding="0.5rem" />
            <Pill>Target Sound</Pill>
          </>
        )}
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
            return (
              <div>
                <CellHeading>{accent.displayName}</CellHeading>
                {props.practiceAccent && accent.name === props.practiceAccent && (
                  <>
                    <Padding padding="0.5rem" />
                    <Pill>Target Accent</Pill>
                  </>
                )}
              </div>
            );
          },
        }}
      />
      <Padding />
      <SubHeadingWithDivider>Related Words</SubHeadingWithDivider>
      <Padding />
      <Table
        data={props.data.wordInfo.relatedWords.slice(0, 3)}
        schema={{
          onClick: (rowObject: RelatedWord) =>
            props.navigate(`/words/${rowObject.word}`),
          renderCell: (rowObject: RelatedWord) => (
            <CellWithSubtitle
              title={rowObject.word}
              subtitle={createAvailableAccentSubtitle(
                rowObject.availableAccents,
              )}
              pills={[
                ...(props.practiceSound &&
                rowObject.translation
                  .filter((val) => val)
                  .find(({ symbol }) => symbol === props.practiceSound)
                  ? [<Pill>Target Sound</Pill>]
                  : []),
              ]}
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
              pills={
                props.practiceSound &&
                translation.symbol === props.practiceSound && [
                  <Pill>Target Sound</Pill>,
                ]
              }
            />
          ),
          onClick: (translation: Translation) => {
            props.navigate(`/sounds/${translation.symbol}`);
          },
        }}
      />
    </FloatingWhiteBox>
  );
};

interface Props {
  navigate: (url: string) => void;
  practiceAccent: string;
  practiceSound: string;
  data: {
    wordInfo: {
      name: string;
      availableAccents: string[];
      recordings: Recording[];
      relatedWords: RelatedWord[];
      translation: Translation[];
    };
  };
}

interface RelatedWord {
  id: string;
  word: string;
  availableAccents: string[];
  translation: { symbol: string }[];
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
        translation {
          symbol
        }
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

const mapStateToProps = (state: ReduxState) => ({
  practiceAccent: state.global.practiceAccent,
  practiceSound: state.global.practiceSound,
});

export default connect(mapStateToProps)(Word);
