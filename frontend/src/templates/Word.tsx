import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Word = (props: Props) => {
  return (
    <>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      {props.data.wordInfo.recordings.map(({ src, accent }) => (
        <>
          <p>{accent}</p>
          <audio src={src.publicUrl} controls />
        </>
      ))}
    </>
  );
};

interface Props {
  data: {
    wordInfo: {
      name: string;
      availableAccents: string[];
      recordings: {
        accent: string;
        src: {
          publicUrl: string;
        };
      }[];
    };
  };
}

export const WORD_QUERY = graphql`
  query WordQuery($wordId: String!) {
    wordInfo: wordsYaml(id: { eq: $wordId }) {
      name: word
      availableAccents
      recordings {
        accent
        src {
          publicURL
        }
      }
    }
  }
`;

export default Word;
