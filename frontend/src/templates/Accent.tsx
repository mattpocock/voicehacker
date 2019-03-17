import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CellWithSubtitle from '../components/CellWithSubtitle';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import createWordsTitle from '../utils/createWordsTitle';
import { beginPracticeMode, changeSound } from '../utils/redux/globalReducer';

const Accent = ({ dispatch, data, navigate }: Props) => {
  useEffect(() => {
    dispatch(
      beginPracticeMode({
        accent: data.accent.name,
        accentDisplayName: data.accent.displayName,
      }),
    );
  });
  return (
    <>
      <FloatingWhiteBox>
        <Header>{data.accent.displayName}</Header>
        <Padding />
        <SubHeadingWithDivider>Top Sounds</SubHeadingWithDivider>
        <Padding />
        <Table
          data={data.accent.sounds.filter((val) => val)}
          schema={{
            renderCell: (sound: Sound) => (
              <CellWithSubtitle
                title={sound.name}
                subtitle={createWordsTitle(sound.words)}
              />
            ),
            onClick: (sound: Sound) => {
              dispatch(
                changeSound({
                  sound: sound.symbol,
                  soundDisplayName: sound.name,
                }),
              );
              navigate(`/accents/${data.accent.name}/${sound.symbol}`);
            },
          }}
        />
      </FloatingWhiteBox>
    </>
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
