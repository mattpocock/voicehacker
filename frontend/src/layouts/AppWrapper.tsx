import * as React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import 'sanitize.css';
import { injectGlobal } from 'styled-components';

injectGlobal`
  html {
    scroll-behavior: smooth;
  }
`;

export default ({ children }: Props) => (
  <>
    <Wrapper>
      <BackgroundMainColorWash />
      {children}
    </Wrapper>
  </>
);

interface Props {
  children: any;
}

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  padding: 1rem;
`;

const BackgroundMainColorWash = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    to right,
    ${theme.mainColorDark},
    ${theme.mainColorMid}
  );
  height: 60vh;
  width: 100%;
  z-index: -1;
`;
