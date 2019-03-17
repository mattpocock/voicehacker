import styled, { css } from 'styled-components';
import theme from '../config/theme';

export const buttonStyles = css`
  border: none;
  color: white;
  padding: 0.2rem 1rem;
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  letter-spacing: 0.6px;
  margin: 0;
`;

const Button = styled.button<{ secondary?: boolean }>`
${buttonStyles}
background-color: ${(props) =>
  props.secondary ? theme.midLightGrey : theme.secondColorMidDark};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

export default Button;
