interface ReactMicProps {
  record: boolean;
  onStop: (object: { blob: Blob }) => void;
}

declare module 'react-mic' {
  export const ReactMic: React.ComponentType<ReactMicProps>;
}
