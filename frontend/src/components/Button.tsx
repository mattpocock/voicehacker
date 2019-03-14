import styled from 'styled-components';
import theme from '../config/theme';

const Button = styled.button<{ secondary?: boolean }>`
  border: none;
  color: white;
  background-color: ${(props) =>
    props.secondary ? theme.midLightGrey : theme.secondColorMidDark};
  padding: 0.2rem 1rem;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  letter-spacing: 0.6px;
  margin: 0;
`;

export default Button;
