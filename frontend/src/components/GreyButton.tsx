import styled from 'styled-components';
import Button from './Button';
import theme from '../config/theme';

const GreyButton = styled(Button)`
  background-color: ${theme.greyTint};
  color: ${theme.midGrey};
  font-weight: 500;
  box-shadow: none;
`;

export default GreyButton;
