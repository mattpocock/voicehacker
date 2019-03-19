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

export default ({ data: { accents }, navigate }: Props) => {
  const [searchValue, changeSearchValue] = React.useState('');
  return (
    <>
      <FloatingWhiteBox>
        <Header>Accents</Header>
        <Padding />
        <Description>
          Your accent learning dashboard. Pick an accent to start learning.
        </Description>
        <Padding />
        <SubHeadingWithDivider>Accents</SubHeadingWithDivider>
        <Padding />
        <SearchInput
          placeholder="Search accents"
          value={searchValue}
          onChange={(e: any) => changeSearchValue(e.target.value)}
        />
        <Padding />
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
