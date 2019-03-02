import * as React from 'react';
import styled from 'styled-components';

export default ({ children }: Props) => <Wrapper>{children}</Wrapper>;

interface Props {
  children: any;
}

const Wrapper = styled.div`
  min-height: 100vh;
`;
