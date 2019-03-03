import React from 'react';
import { graphql } from 'gatsby';
import AppWrapper from '../layouts/AppWrapper';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import CellWithSubtitle from '../components/CellWithSubtitle';

const Accent = (props: Props) => {
  return (
    <AppWrapper>
      <FloatingWhiteBox>
        <Header>{props.data.accent.displayName}</Header>
        <Padding />
        <SubHeadingWithDivider>Top Sounds</SubHeadingWithDivider>
        <Padding />
        <Table
          data={props.data.accent.sounds}
          schema={{
            renderCell: (sound: Sound) => (
              <CellWithSubtitle
                title={sound.words
                  .map((wordObject) => wordObject.word)
                  .slice(0, 3)
                  .join(', ')}
                subtitle={sound.name}
              />
            ),
            onClick: (sound: Sound) => {
              props.navigate(`/sounds/${sound.symbol}`);
            },
          }}
        />
      </FloatingWhiteBox>
    </AppWrapper>
  );
};

export default Accent;

interface Props {
  navigate: (string: string) => void;
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
