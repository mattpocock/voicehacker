import React from 'react';
import Flex from './Flex';
import styled from 'styled-components';
import theme from '../config/theme';
import Header from './Header';
import Subheader from './Subheader';

const SubHeadingWithDivider = ({ children }: { children: any }) => {
  return (
    <Flex alignItems="center" gutter="0.5rem">
      <Line />
      <Subheader style={{ display: 'block', whiteSpace: 'nowrap' }}>
        {children}
      </Subheader>
      <Line />
    </Flex>
  );
};

const Line = styled.div`
  height: 1px;
  background-color: ${theme.greyTint};
  width: 100%;
`;

export default SubHeadingWithDivider;
