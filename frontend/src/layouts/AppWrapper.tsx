import * as React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import 'sanitize.css';
import { injectGlobal } from 'styled-components';
// @ts-ignore
import Backdrop from '../assets/images/backdrop.svg';
import PracticeBar from '../components/PracticeBar';
import { connect } from 'react-redux';
import { ReduxState } from '../utils/redux/redux';
import Padding from '../components/Padding';

injectGlobal`
  html {
    scroll-behavior: smooth;
  }
`;

const AppWrapper = ({ children, isInPracticeMode }: Props) => (
  <Wrapper>
    <BackgroundMainColorWash preserveAspectRatio="none" />
    {children}
    {isInPracticeMode && <Padding padding="5rem" />}
    <PracticeBar />
  </Wrapper>
);

export default connect((state: ReduxState) => ({
  isInPracticeMode: state.global.isInPracticeMode,
}))(AppWrapper);

interface Props {
  children: any;
  isInPracticeMode: boolean;
}

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  padding: 1.2rem;
`;

const BackgroundMainColorWash = styled(Backdrop)`
  position: fixed;
  top: 0;
  left: 0;

  height: 66vh;
  width: 100%;
  z-index: -1;
`;
