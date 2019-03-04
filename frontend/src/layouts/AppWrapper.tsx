import * as React from 'react';
import { connect } from 'react-redux';
import 'sanitize.css';
import styled, { injectGlobal } from 'styled-components';
// @ts-ignore
import Backdrop from '../assets/images/backdrop.svg';
import Padding from '../components/Padding';
import PracticeBar from '../components/PracticeBar';
import { ReduxState } from '../utils/redux/redux';

injectGlobal`
  html {
    scroll-behavior: smooth;
  }
`;

const AppWrapper = ({ children, isInPracticeMode }: Props) => {
  return (
    <Wrapper>
      <BackgroundMainColorWash preserveAspectRatio="none" />
      {children}
      {isInPracticeMode && <Padding padding="5rem" />}
      <PracticeBar />
    </Wrapper>
  );
};

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
