import styled from 'styled-components';
import Pill from './Pill';
import theme from '../config/theme';

const GreyPill = styled(Pill)`
  background-color: ${theme.greyTint};
  color: ${theme.midGrey};
`;

export default GreyPill;
