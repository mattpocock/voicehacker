import React, { useState } from 'react';
import { graphql } from 'gatsby';

const SearchPage = (props: Props) => {
  const [value, onChange] = useState('');
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {props.data.words.edges
        .filter(({ node }) => new RegExp(value).test(node.word))
        .filter((_, index) => index < 10)
        .map(({ node }) => (
          <div key={node.id}>
            <h2>{node.word}</h2>
            {node.recordings.map(({ accent, src }) => (
              <>
                <p key={accent}>{accent}</p>
                <audio src={src.publicURL} controls />
              </>
            ))}
          </div>
        ))}
    </div>
  );
};

interface Props {
  data: {
    words: {
      edges: {
        node: {
          id: string;
          word: string;
          availableAccents: string[];
          recordings: {
            accent: string;
            src: {
              publicURL: string;
            };
          }[];
        };
      }[];
    };
  };
}

export const SEARCH_QUERY = graphql`
  query allWordsQuery {
    words: allWordsYaml(
      filter: {
        recordings: { elemMatch: { accent: { regex: "/([A-Z a-z])/" } } }
      }
    ) {
      edges {
        node {
          id
          word
          availableAccents
          recordings {
            accent
            src {
              publicURL
            }
          }
        }
      }
    }
  }
`;

export default SearchPage;
