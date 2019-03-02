import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Word = (props: Props) => {
  return (
    <>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      {props.data.audioFiles &&
        props.data.audioFiles.edges.map(({ node: { src, word, accent } }) => (
          <>
            <p>
              {word} - {accent}
            </p>
            <audio src={src} controls />
          </>
        ))}
    </>
  );
};

interface Props {
  data: {
    audioFiles: {
      edges: {
        node: {
          word: string;
          src: string;
          accent: string;
        };
      }[];
    };
    wordInfo: {
      name: string;
      availableAccents: string[];
      recordings: {
        accent: string;
      }[];
    };
  };
}

export const WORD_QUERY = graphql`
  query WordQuery($wordRegex: String!, $wordId: String!) {
    audioFiles: allFile(
      filter: {
        sourceInstanceName: { eq: "audio" }
        name: { regex: $wordRegex }
      }
    ) {
      edges {
        node {
          word: name
          src: publicURL
          accent: relativeDirectory
        }
      }
    }
    wordInfo: wordsYaml(id: { eq: $wordId }) {
      name: word
      availableAccents
      recordings {
        accent
      }
    }
  }
`;

export default Word;
