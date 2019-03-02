import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

export default ({
  data: {
    allFile: { edges },
  },
}: Props) => (
  <Wrapper>
    <Title>Hello</Title>
    {edges.map(({ node: { src, word } }) => (
      <>
        <p>{word}</p>
        <audio src={src} controls />
      </>
    ))}
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

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
