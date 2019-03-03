import styled from 'styled-components';
import theme from '../config/theme';

const Input = styled.input`
  border: 2px solid ${theme.greyTint};
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  color: ${theme.midGrey};
`;

export default Input;
