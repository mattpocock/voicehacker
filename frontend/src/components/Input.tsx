import styled from 'styled-components';
import theme from '../config/theme';
import { css } from 'styled-components';

export const inputStyles = css`
  border: 2px solid ${theme.greyTint};
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  color: ${theme.midGrey};
`;

const Input = styled.input`
  ${inputStyles}
`;

export default Input;
