import { graphql } from 'gatsby';
import React, { useState } from 'react';
import CellHeading from '../components/CellHeading';
import CellHeadingSubtitle from '../components/CellHeadingSubtitle';
import Flex from '../components/Flex';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import NextIcon from '../components/NextIcon';
import Padding from '../components/Padding';
import SearchInput from '../components/SearchInput';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import AppWrapper from '../layouts/AppWrapper';
import { connect } from 'react-redux';
import { ReduxState } from '../utils/redux/redux';
import CellWithSubtitle from '../components/CellWithSubtitle';
import createAvailableAccentSubtitle from '../utils/createAvailableAccentSubtitle';
import FullWidthButton from '../components/FullWidthButton';
import Pill from '../components/Pill';
import PageWrapper from '../components/PageWrapper';

const SearchPage = ({
  data,
  navigate,
  practiceAccent,
  practiceSound,
  location,
}: Props) => {
  const [value, onChange] = useState('');
  return (
    <PageWrapper key={location.key}>
      <Header white>Search</Header>
      <Padding />
      <FloatingWhiteBox>
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
        <Padding />
        <FullWidthButton secondary onClick={() => navigate(`/`)}>
          Back To Dashboard
        </FullWidthButton>
      </FloatingWhiteBox>
    </PageWrapper>
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
