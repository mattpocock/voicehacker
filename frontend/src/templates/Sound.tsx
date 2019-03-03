import React from 'react';
import AppWrapper from '../layouts/AppWrapper';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import { graphql } from 'gatsby';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import Description from '../components/Description';
import Padding from '../components/Padding';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import CellWithSubtitle from '../components/CellWithSubtitle';
import createAvailableAccentSubtitle from '../utils/createAvailableAccentSubtitle';

const SoundPage = ({ data, navigate }: Props) => {
  return (
    <AppWrapper>
      <FloatingWhiteBox>
        <Header style={{ fontSize: '2rem' }}>
          {data.sound.words
            .map((word) => word.word.toUpperCase())
            .slice(0, 3)
            .join(', ')}
        </Header>
        <Padding padding="0.5rem" />
        <Description>{data.sound.name}</Description>
        <Padding />
        <SubHeadingWithDivider>Practice Words</SubHeadingWithDivider>
        <Padding />
        <Table
          data={data.sound.words.filter(
            (word) => word.availableAccents.length > 0,
          )}
          schema={{
            renderCell: (word: Word) => (
              <CellWithSubtitle
                title={word.word}
                subtitle={createAvailableAccentSubtitle(word.availableAccents)}
              />
            ),
            onClick: (word: Word) => {
              navigate(`/words/${word.word}`);
            },
          }}
        />
      </FloatingWhiteBox>
    </AppWrapper>
  );
};

export default SoundPage;

interface Props {
  navigate: (string: string) => void;
  data: {
    sound: {
      id: string;
      symbol: string;
      name: string;
      words: Word[];
    };
  };
}

interface Word {
  id: string;
  word: string;
  availableAccents: string[];
}

export const SOUND_QUERY = graphql`
  query soundQuery($soundId: String!) {
    sound: soundsYaml(id: { eq: $soundId }) {
      id
      symbol
      name
      words {
        id
        word
        availableAccents
      }
    }
  }
`;
