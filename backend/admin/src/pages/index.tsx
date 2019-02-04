import * as React from 'react';
import { graphql } from 'gatsby';
import {
  Input,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';

export default class extends React.PureComponent<Props, State> {
  state: State = {
    word: '',
  };
  render() {
    const { data } = this.props;
    return (
      <>
        <Formik
          initialValues={{ word: '' }}
          onSubmit={(values) => this.setState({ word: values.word })}
        >
          {({ handleChange, values, handleSubmit }) => (
            <>
              <Grid container justify="center" alignItems="center" spacing={8}>
                <Grid item>
                  <FormControl>
                    <InputLabel>Search Term</InputLabel>
                    <Input
                      name="word"
                      value={values.word}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button onClick={() => handleSubmit()}>Search</Button>
                </Grid>
              </Grid>
            </>
          )}
        </Formik>
        <h2>RP</h2>
        <Grid container spacing={16} justify="center">
          {data.rp.edges
            .filter(({ node }) => node.word.includes(this.state.word))
            .map(AudioSample)}
        </Grid>
        <h2>American</h2>
        <Grid container spacing={16} justify="center">
          {data.american &&
            data.american.edges
              .filter(({ node }) => node.word.includes(this.state.word))
              .map(AudioSample)}
        </Grid>
        <h2>Irish</h2>
        <Grid container spacing={16} justify="center">
          {data.irish &&
            data.irish.edges
              .filter(({ node }) => node.word.includes(this.state.word))
              .map(AudioSample)}
        </Grid>
      </>
    );
  }
}

const AudioSample = ({ node: { word, id, src } }: AccentProp) => (
  <Grid item key={id}>
    <Typography align="center" component="h2">
      {word}
    </Typography>
    <audio src={src} controls />
  </Grid>
);

// interface State {
//   word: string;
// }

// interface Props {
//   data: {
//     american: AccentProps;
//     rp: AccentProps;
//     irish: AccentProps;
//   };
// }

// interface AccentProps {
//   edges: [AccentProp];
// }

// interface AccentProp {
//   node: {
//     word: string;
//     src: string;
//     id: string;
//   };
// }

// export const GET_ALL_AUDIO = graphql`
//   fragment SoundData on File {
//     id
//     word: name
//     src: publicURL
//   }
//   {
//     rp: allFile(filter: { sourceInstanceName: { eq: "rp" } }) {
//       edges {
//         node {
//           ...SoundData
//         }
//       }
//     }
//     american: allFile(
//       filter: { sourceInstanceName: { eq: "general-american" } }
//     ) {
//       edges {
//         node {
//           ...SoundData
//         }
//       }
//     }
//     irish: allFile(filter: { sourceInstanceName: { eq: "irish" } }) {
//       edges {
//         node {
//           ...SoundData
//         }
//       }
//     }
//   }
// `;
