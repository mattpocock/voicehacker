import React from 'react';
import { graphql, Link } from 'gatsby';

const Word = (props: Props) => {
  return (
    <>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      {props.data.wordInfo.recordings.map(({ src, accent }) => (
        <>
          <p>{accent}</p>
          <audio src={src.publicURL} controls />
        </>
      ))}
      <div>
        {props.data.wordInfo.relatedWords.map(({ word }) => (
          <div>
            <Link to={`/words/${word}`}>{word}</Link>
          </div>
        ))}
      </div>
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
          publicURL: string;
        };
      }[];
      relatedWords: {
        word: string;
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
      relatedWords {
        word
      }
    }
  }
`;

export default Word;
