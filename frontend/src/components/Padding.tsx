import styled from 'styled-components';

const Padding = styled.div<{ padding?: string }>`
  height: ${(props) => props.padding || '1.6rem'};
`;

export default Padding;
