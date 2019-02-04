import * as React from 'react';
import { ReactMic } from 'react-mic';
import client from '../../utils/client';
import gql from 'graphql-tag';
import { CircularProgress, Button } from '@material-ui/core';

export default class extends React.PureComponent<Props, State> {
  state: State = {
    recording: false,
    wordIndex: 0,
    isLoading: false,
    words: [],
  };

  handleBlob = async ({ blob }: { blob: Blob }) => {
    const { wordIndex, words } = this.state;

    const file = new File([blob], `${words[wordIndex].word}.webm`);

    client.mutate({
      mutation: gql`
        mutation SubmitFile($word: String!, $accent: String!, $file: Upload!) {
          submitWord(word: $word, accent: $accent, file: $file)
        }
      `,
      variables: {
        file,
        word: words[wordIndex].word,
        accent: words[wordIndex].accentRequired,
      },
    });

    this.incrementWordIndex();
  };

  incrementWordIndex = () => {
    const { wordIndex, words } = this.state;
    if (wordIndex === words.length - 1) {
      this.setState({ words: [], wordIndex: 0 });
      this.getWords();
    } else {
      this.setState({ wordIndex: wordIndex + 1 });
    }
  };

  listenForSpace = (e: KeyboardEvent) => {
    if (e.keyCode === 32) {
      this.toggleRecording();
    }
  };

  toggleRecording = () => {
    if (!this.state.recording) {
      setTimeout(() => {
        this.setState({ recording: true });
      }, 200);
    } else {
      setTimeout(() => {
        this.setState({ recording: false });
      }, 400);
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.listenForSpace);
    this.getWords();
  }

  getWords = () => {
    this.setState({ isLoading: true, words: [] });
    client
      .query({
        query: gql`
          query Words($limit: Int!) {
            getMultiAccentWordsToRecord(limit: $limit) {
              accentRequired
              word
            }
          }
        `,
        variables: {
          limit: 10,
        },
        fetchPolicy: 'no-cache',
      })
      .then((result: { data: { getMultiAccentWordsToRecord?: [Word] } }) => {
        this.setState({
          isLoading: false,
          words: result.data.getMultiAccentWordsToRecord,
        });
      });
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenForSpace);
  }

  render() {
    const { recording, wordIndex, words, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <ReactMic
              record={recording && !isLoading}
              onStop={this.handleBlob}
            />
            <h1>
              {words &&
                words[wordIndex] &&
                `${words[wordIndex].word.toUpperCase()} - ${words[
                  wordIndex
                ].accentRequired.toLocaleUpperCase()}`}
            </h1>
            <Button onClick={this.toggleRecording}>
              {recording ? 'Stop' : 'Start'}
            </Button>
            <Button onClick={this.incrementWordIndex}>Skip</Button>
          </>
        )}
      </>
    );
  }
}

interface Props {}

interface State {
  recording: boolean;
  wordIndex: number;
  isLoading: boolean;
  words: [Word?];
}

interface Word {
  accentRequired: string;
  word: string;
}
