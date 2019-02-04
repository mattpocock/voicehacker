import * as React from 'react';
import styled from 'styled-components/native';

export default () => (
  <Wrapper>
    <Title>Hello</Title>
  </Wrapper>
);

const Title = styled.Text`
  font-size: 2rem;
  text-align: center;
`;

const Wrapper = styled.View`
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
