import React, { ReactNode } from 'react';
import styled from 'styled-components';
import {
  FlexDirectionProperty,
  AlignItemsProperty,
  JustifyContentProperty,
} from 'csstype';

function Flex({
  justifyContent,
  alignItems,
  flexDirection,
  children,
  gutter,
  style,
}: FlexProps) {
  return (
    <StyledFlex
      gutter={gutter}
      style={{
        display: 'flex',
        justifyContent,
        alignItems,
        flexDirection,
        ...style,
      }}
    >
      {children}
    </StyledFlex>
  );
}

interface FlexProps {
  justifyContent?: JustifyContentProperty;
  alignItems?: AlignItemsProperty;
  flexDirection?: FlexDirectionProperty;
  children: any;
  gutter?: string;
  style?: {};
}

interface StyledFlexProps {
  gutter?: string;
}

const StyledFlex = styled.div<StyledFlexProps>`
  margin: ${(props) => `-calc(${props.gutter || '0px'} / 2)`};
  & > * {
    margin: calc(${(props) => props.gutter || '0px'} / 2);
  }
`;

export default Flex;
