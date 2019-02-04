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
    accent: 'general-american',
  };

  handleBlob = async ({ blob }: { blob: Blob }) => {
    const { wordIndex, words, accent } = this.state;

    // const result = await new Promise((resolve, reject) => {
    //   try {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       resolve(reader.result);
    //     };
    //     reader.readAsDataURL(blob);
    //   } catch (e) {
    //     reject(e);
    //   }
    // });

    const file = new File([blob], `${words[wordIndex]}.webm`);

    console.log(file);

    client.mutate({
      mutation: gql`
        mutation SubmitFile($word: String!, $accent: String!, $file: Upload!) {
          submitWord(word: $word, accent: $accent, file: $file)
        }
      `,
      variables: {
        file,
        word: words[wordIndex],
        accent,
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
    const { accent } = this.state;
    this.setState({ isLoading: true, words: [] });
    client
      .query({
        query: gql`
          query Words($accent: String!, $limit: Int!) {
            getWordsToRecord(accent: $accent, limit: $limit)
          }
        `,
        variables: {
          limit: 10,
          accent,
        },
        fetchPolicy: 'no-cache',
      })
      .then((result: { data: { getWordsToRecord?: string[] } }) => {
        this.setState({
          isLoading: false,
          words: result.data.getWordsToRecord,
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
            <h1>{words[wordIndex] && words[wordIndex].toUpperCase()}</h1>
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
  words: string[];
  accent: string;
}
