import { graphql } from 'gatsby';
import * as React from 'react';
import CellWithSubtitle from '../components/CellWithSubtitle';
import Description from '../components/Description';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';
import SearchInput from '../components/SearchInput';
import SubHeadingWithDivider from '../components/SubHeadingWithDivider';
import Table from '../components/Table';
import Button from '../components/Button';

export default ({ data: { accents }, navigate }: Props) => {
  const [searchValue, changeSearchValue] = React.useState('');
  return (
    <>
      <Header white>Dashboard</Header>
      <Padding />
      <FloatingWhiteBox>
        <Description>
          Your accent learning dashboard. Pick an accent to start learning, or
          dive right in to the dictionary.
        </Description>
        <Padding />
        <SubHeadingWithDivider>Dictionary</SubHeadingWithDivider>
        <Padding />
        <Button
          style={{ width: '100%', padding: '0.8rem' }}
          onClick={() => navigate(`/search`)}
        >
          Go To Dictionary
        </Button>
        <Padding />
        <SubHeadingWithDivider>Accents</SubHeadingWithDivider>
        <Padding />
        <SearchInput
          placeholder="Search accents"
          value={searchValue}
          onChange={(e: any) => changeSearchValue(e.target.value)}
        />
        <Table
          data={accents.edges
            .map(({ node }) => node)
            .filter((accent) => accent.name.includes(searchValue.toLowerCase()))
            .slice(0, 5)}
          schema={{
            renderCell: (accent: Accent) => (
              <CellWithSubtitle title={accent.displayName} />
            ),
            onClick: (accent: Accent) => navigate(`/accents/${accent.name}`),
          }}
        />
      </FloatingWhiteBox>
    </>
  );
};

interface Props {
  navigate: (string: string) => void;
  data: {
    accents: {
      edges: [
        {
          node: Accent;
        }
      ];
    };
  };
}

interface Accent {
  name: string;
  displayName: string;
  id: string;
}

export const SOUND_QUERY = graphql`
  {
    accents: allAccentsYaml {
      edges {
        node {
          name
          displayName
          id
        }
      }
    }
  }
`;
