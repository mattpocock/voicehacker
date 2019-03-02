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
            {node.recordings.map(({ accent }) => (
              <>
                <p key={accent}>{accent}</p>
                <audio
                  src={
                    props.data.audioFiles.edges.find(
                      ({ node: audioNode }) =>
                        audioNode.word === node.word &&
                        audioNode.accent === accent,
                    ).node.src
                  }
                  controls
                />
              </>
            ))}
          </div>
        ))}
    </div>
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
    words: {
      edges: {
        node: {
          id: string;
          word: string;
          availableAccents: string[];
          recordings: { accent: string; src: string }[];
        };
      }[];
    };
  };
}

export const SEARCH_QUERY = graphql`
  query allWordsQuery {
    audioFiles: allFile(filter: { sourceInstanceName: { eq: "audio" } }) {
      edges {
        node {
          word: name
          src: publicURL
          accent: relativeDirectory
        }
      }
    }
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
            src
          }
        }
      }
    }
  }
`;

export default SearchPage;
