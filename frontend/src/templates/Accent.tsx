import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import AppWrapper from '../layouts/AppWrapper';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import CellWithSubtitle from '../components/CellWithSubtitle';
import { connect } from 'react-redux';
import { beginPracticeMode, changeSound } from '../utils/redux/globalReducer';
import createWordsTitle from '../utils/createWordsTitle';

const Accent = (props: Props) => {
  useEffect(() => {
    props.dispatch(
      beginPracticeMode({
        accent: props.data.accent.name,
        accentDisplayName: props.data.accent.displayName,
      }),
    );
  });
  return (
    <AppWrapper>
      <FloatingWhiteBox>
        <Header>{props.data.accent.displayName}</Header>
        <Padding />
        <SubHeadingWithDivider>Top Sounds</SubHeadingWithDivider>
        <Padding />
        <Table
          data={props.data.accent.sounds.filter((val) => val)}
          schema={{
            renderCell: (sound: Sound) => (
              <CellWithSubtitle
                title={sound.name}
                subtitle={createWordsTitle(sound.words)}
              />
            ),
            onClick: (sound: Sound) => {
              props.dispatch(
                changeSound({
                  sound: sound.symbol,
                  soundDisplayName: sound.name,
                }),
              );
              props.navigate(`/sounds/${sound.symbol}`);
            },
          }}
        />
      </FloatingWhiteBox>
    </AppWrapper>
  );
};

export default connect()(Accent);

interface Props {
  navigate: (string: string) => void;
  dispatch: (any: any) => void;
  data: {
    accent: {
      id: string;
      name: string;
      displayName: string;
      sounds: Sound[];
    };
  };
}

interface Sound {
  id: string;
  name: string;
  symbol: string;
  words: {
    word: string;
    availableAccents: string[];
  }[];
}

export const ACCENT_QUERY = graphql`
  query accentQuery($accentId: String!) {
    accent: accentsYaml(id: { eq: $accentId }) {
      id
      name
      displayName
      sounds {
        id
        symbol
        name
        words {
          word
          availableAccents
        }
      }
    }
  }
`;
