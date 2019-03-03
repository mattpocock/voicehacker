import { graphql } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import Header from '../components/Header';
import Padding from '../components/Padding';

export default ({
  data: {
    allFile: { edges },
  },
}: Props) => (
  <Wrapper>
    <Header white>Hello</Header>
    <Padding padding="1.5rem" />
    <FloatingWhiteBox>
      {edges.map(({ node: { src, word } }) => (
        <>
          <p>{word}</p>
          <audio src={src} controls />
        </>
      ))}
    </FloatingWhiteBox>
  </Wrapper>
);

interface Props {
  data: {
    allFile: {
      edges: [
        {
          node: {
            id: string;
            word: string;
            src: string;
          };
        }
      ];
    };
  };
}

export const SOUND_QUERY = graphql`
  {
    allFile(
      filter: { sourceInstanceName: { eq: "audio" }, name: { eq: "thank" } }
    ) {
      edges {
        node {
          id
          word: name
          src: publicURL
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
