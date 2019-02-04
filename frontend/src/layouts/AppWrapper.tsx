import * as React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

export default ({ children }: Props) => (
  <Wrapper style={{}}>{children}</Wrapper>
);

interface Props {
  children: any;
}

const Wrapper = styled(View)`
  min-height: 100vh;
`;
