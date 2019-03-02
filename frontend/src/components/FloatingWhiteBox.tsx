import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const FloatingWhiteBox = ({ children }: { children: any }) => {
  return <Floater>{children}</Floater>;
};

const Floater = styled.div`
  background-color: ${theme.white};
  padding: 1rem;
  box-shadow: 0rem 0.5rem 2rem rgba(0, 0, 0, 0.18);
  border-radius: 1rem;
`;

export default FloatingWhiteBox;
