import React, { useRef, useState } from 'react';
import { TableRow } from '../Table';
import Flex from '../Flex';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import styled from 'styled-components';
import theme from '../../config/theme';

const RecordingTableRow = ({ publicURL, children }: Props) => {
  const [isPlaying, changeIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {
    if (!isPlaying) {
      changeIsPlaying(true);
      audioRef.current.play();
      audioRef.current.addEventListener('ended', () => {
        changeIsPlaying(false);
      });
    }
  };

  return (
    <TableRow onClick={handleClick}>
      <audio ref={audioRef} src={publicURL} />
      <Flex gutter="1rem" alignItems="center">
        <div style={{ flexGrow: 1 }}>{children}</div>
        <IconWrapper>{isPlaying ? <StopIcon /> : <PlayIcon />}</IconWrapper>
      </Flex>
    </TableRow>
  );
};

interface Props {
  publicURL: string;
  children: any;
}

const IconWrapper = styled.div`
  svg {
    fill: ${theme.midGrey};
    font-size: 2rem;
  }
`;

export default RecordingTableRow;
