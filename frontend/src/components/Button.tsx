import styled from 'styled-components';
import theme from '../config/theme';

const Button = styled.button`
  border: none;
  color: white;
  background-color: ${theme.secondColorMidDark};
  padding: 0.2rem 1rem;
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  letter-spacing: 0.6px;
  margin: 0;
`;

export default Button;
