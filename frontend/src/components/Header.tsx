import styled from 'styled-components';
import theme from '../config/theme';

const Header = styled.h1<{ white?: boolean }>`
  margin: 0;
  font-size: 2.5rem;
  color: ${(props) => (props.white ? theme.white : theme.midGrey)};
`;

export default Header;
