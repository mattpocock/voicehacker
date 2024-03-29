import styled from 'styled-components';
import theme from '../config/theme';

const Subheader = styled.h2<{ white?: boolean }>`
  color: ${(props) => (props.white ? theme.white : theme.midLightGrey)};
  font-size: 1.2rem;
  font-weight: 100;
  font-style: italic;
  flex-grow: 1;
`;

export default Subheader;
