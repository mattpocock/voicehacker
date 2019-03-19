import { graphql } from 'gatsby';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import CellWithSubtitle from '../components/CellWithSubtitle';
import Description from '../components/Description';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import Pill from '../components/Pill';
import SearchInput from '../components/SearchInput';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import createAvailableAccentSubtitle from '../utils/createAvailableAccentSubtitle';
import { ReduxState } from '../utils/redux/redux';

const SearchPage = ({ data, navigate, practiceAccent }: Props) => {
  const [value, onChange] = useState('');
  return (
    <>
      <FloatingWhiteBox>
        <Header>Dictionary</Header>
        <Padding />
        <Description>Explore our library of accents, word by word.</Description>
        <Padding />
        <SearchInput
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
          placeholder="Search words"
        />
        <Padding />
        <SubHeadingWithDivider>Results</SubHeadingWithDivider>
        <Padding />
        <Table
          data={data.words.edges
            .filter(({ node }) =>
              new RegExp(value.toLowerCase()).test(node.word),
            )
            .filter((_, index) => index < 10)
            .map((edge) => ({ ...edge, id: edge.node.id }))}
          schema={{
            renderCell: ({ node }) => (
              <CellWithSubtitle
                title={node.word}
                subtitle={createAvailableAccentSubtitle(node.availableAccents)}
                pills={
                  practiceAccent &&
                  node.availableAccents.includes(practiceAccent) && [
                    <Pill>Target Accent</Pill>,
                  ]
                }
              />
            ),
            onClick: ({ node }) => navigate(`/words/${node.word}`),
          }}
        />
      </FloatingWhiteBox>
    </>
  );
};

interface Props {
  navigate: (url: string) => void;
  practiceAccent: string;
  practiceSound: string;
  data: {
    words: {
      edges: {
        node: {
          id: string;
          word: string;
          availableAccents: string[];
        };
      }[];
    };
  };
}

export const SEARCH_QUERY = graphql`
  query allWordsQuery {
    words: allWordsYaml(
      filter: { availableAccents: { regex: "/([A-Z|a-z])/" } }
    ) {
      edges {
        node {
          id
          word
          availableAccents
        }
      }
    }
  }
`;

const mapStateToProps = (state: ReduxState) => ({
  practiceAccent: state.global.practiceAccent,
  practiceSound: state.global.practiceSound,
});

export default connect(mapStateToProps)(SearchPage);
