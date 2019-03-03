import React, { useState } from 'react';
import { graphql } from 'gatsby';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import { Input, Tab, FormControl } from '@material-ui/core';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Padding from '../components/Padding';
import Table from '../components/Table';
import CellHeading from '../components/CellHeading';
import Flex from '../components/Flex';
import CellHeadingSubtitle from '../components/CellHeadingSubtitle';
import NextIcon from '../components/NextIcon';
import Header from '../components/Header';
import AppWrapper from '../layouts/AppWrapper';

const SearchPage = (props: Props) => {
  const [value, onChange] = useState('');
  return (
    <AppWrapper>
      <Header white>Search</Header>
      <Padding />
      <FloatingWhiteBox>
        <FormControl fullWidth>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </FormControl>
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
    </AppWrapper>
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
