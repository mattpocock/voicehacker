import styled from 'styled-components';

const Padding = styled.div<{ padding?: string }>`
  height: ${(props) => props.padding || '2rem'};
`;

export default Padding;
