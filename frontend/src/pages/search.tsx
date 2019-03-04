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

const SearchPage = (props: Props) => {
  const [value, onChange] = useState('');
  return (
    <>
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
          data={props.data.words.edges
            .filter(({ node }) =>
              new RegExp(value.toLowerCase()).test(node.word),
            )
            .filter((_, index) => index < 10)
            .map((edge) => ({ ...edge, id: edge.node.id }))}
          schema={{
            renderCell: ({ node }) => (
              <Flex alignItems="center" gutter="1rem" style={{ width: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                  <CellHeading style={{ marginBottom: '0.25rem' }}>
                    {node.word}
                  </CellHeading>
                  <CellHeadingSubtitle>
                    Available in {node.availableAccents.length} accent
                    {node.availableAccents.length > 1 ? 's' : ''}
                  </CellHeadingSubtitle>
                </div>
                <div>
                  <NextIcon />
                </div>
              </Flex>
            ),
            onClick: ({ node }) => props.navigate(`/words/${node.word}`),
          }}
        />
      </FloatingWhiteBox>
    </>
  );
};

interface Props {
  navigate: (url: string) => void;
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

export default SearchPage;
