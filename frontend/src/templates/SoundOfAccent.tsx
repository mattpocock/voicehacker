import { graphql } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/Breadcrumbs';
import CellHeading from '../components/CellHeading';
import Description from '../components/Description';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import RecordingTable from '../components/RecordingTable';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import { ReduxState } from '../utils/redux/redux';

const SoundOfAccentPage = ({
  data,
  navigate,
  practiceAccent,
  practiceSound,
}: Props) => {
  return (
    <FloatingWhiteBox>
      <Breadcrumbs
        links={[
          {
            to: `/`,
            label: 'Accents',
          },
          {
            to: `/accents/${data.accent.name}`,
            label: data.accent.displayName,
          },
        ]}
      />
      <Header style={{ fontSize: '2rem' }}>{data.sound.name}</Header>
      <Padding padding="0.5rem" />
      <Description>{data.accent.displayName}</Description>
      <Padding />
      <SubHeadingWithDivider>Practice Words</SubHeadingWithDivider>
      <Padding />
      <RecordingTable
        data={data.sound.words
          .filter(({ availableAccents }) =>
            availableAccents.includes(data.accent.name),
          )
          .map((word) => ({
            id: word.id,
            word: word.word,
            src: word.recordings.find(
              (recording) => recording.accent.name === data.accent.name,
            ).src,
          }))}
        schema={{
          renderCell: (word: Word) => <CellHeading>{word.word}</CellHeading>,
        }}
      />
    </FloatingWhiteBox>
  );
};

export default connect((state: ReduxState) => ({
  practiceAccent: state.global.practiceAccent,
  practiceSound: state.global.practiceSound,
}))(SoundOfAccentPage);

interface Props {
  navigate: (string: string) => void;
  data: {
    sound: {
      id: string;
      symbol: string;
      name: string;
      words: Word[];
    };
    accent: {
      id: string;
      name: string;
      displayName: string;
    };
  };
  practiceAccent: string;
  practiceSound: string;
}

interface Word {
  id: string;
  word: string;
  availableAccents: string[];
  recordings: Recording[];
}

interface Recording {
  src: {
    publicURL: string;
  };
  accent: {
    name: string;
  };
}

export const SOUND_OF_ACCENT_QUERY = graphql`
  query soundOfAccentQuery($soundId: String!, $accentId: String) {
    sound: soundsYaml(id: { eq: $soundId }) {
      id
      symbol
      name
      words {
        id
        word
        availableAccents
        recordings {
          src {
            publicURL
          }
          accent {
            name
          }
        }
      }
    }
    accent: accentsYaml(id: { eq: $accentId }) {
      id
      name
      displayName
    }
  }
`;
