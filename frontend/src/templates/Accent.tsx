import React from 'react';
import { graphql } from 'gatsby';

const Accent = (props: any) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default Accent;

export const ACCENT_QUERY = graphql`
  query accentQuery($accentRegex: String!) {
    audioFiles: allFile(
      filter: {
        sourceInstanceName: { eq: "audio" }
        dir: { regex: $accentRegex }
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
    words: allWordsYaml(filter: { availableAccents: { regex: $accentRegex } }) {
      edges {
        node {
          word
          availableAccents
          recordings {
            accent
            src
          }
        }
      }
    }
  }
`;
