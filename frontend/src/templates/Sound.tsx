import { graphql } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import CellWithSubtitle from '../components/CellWithSubtitle';
import Description from '../components/Description';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import Pill from '../components/Pill';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import AppWrapper from '../layouts/AppWrapper';
import createAvailableAccentSubtitle from '../utils/createAvailableAccentSubtitle';
import { ReduxState } from '../utils/redux/redux';

const SoundPage = ({
  data,
  navigate,
  practiceAccent,
  practiceSound,
}: Props) => {
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
                pills={
                  practiceSound &&
                  word.translation
                    .filter((val) => val)
                    .find(
                      (translation) => translation.symbol === practiceSound,
                    ) && [<Pill>Target Sound</Pill>]
                }
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

export default connect((state: ReduxState) => ({
  practiceAccent: state.global.practiceAccent,
  practiceSound: state.global.practiceSound,
}))(SoundPage);

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
  practiceAccent: string;
  practiceSound: string;
}

interface Word {
  id: string;
  word: string;
  availableAccents: string[];
  translation: { symbol: string }[];
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
        translation {
          symbol
        }
      }
    }
  }
`;
