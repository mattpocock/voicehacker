import * as React from 'react';
import { connect } from 'react-redux';
import { Transition, TransitionGroup } from 'react-transition-group';
import 'sanitize.css';
import styled from 'styled-components';
// @ts-ignore
import Backdrop from '../assets/images/backdrop.svg';
import Padding from '../components/Padding';
import PracticeBar from '../components/PracticeBar';
import { ReduxState } from '../utils/redux/redux';
import BottomNav from '../components/BottomNav';

const timeout = 350;

const transitionStyles: { [index: string]: {} } = {
  entering: {
    position: 'absolute',
    pointerEvents: 'none',
    transform: 'translate(100vw, 0px)',
    opacity: 0,
  },
  entered: {
    transform: 'translate(0px, 0px)',
  },
  exiting: {
    pointerEvents: 'none',

    width: 'calc(100% - 2rem)',
    position: 'absolute',
    opacity: 0,
    transform: 'translate(-100vw, 0px)',
  },
  exited: {
    position: 'absolute',
    width: 'calc(100% - 2rem)',
    transform: 'translate(-100vw, 0px)',
    opacity: 0,
    display: 'none',
  },
};

const AppWrapper = ({ children, location }: Props) => {
  return (
    <Wrapper>
      <BackgroundMainColorWash preserveAspectRatio="none" />
      <TransitionGroup>
        <Transition key={location.key} timeout={200}>
          {(state) => (
            <div
              style={{
                transition: `all ${timeout}ms ease-in-out`,
                ...transitionStyles[state],
              }}
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>
      <Padding padding="3.5rem" />
      <BottomNav />
    </Wrapper>
  );
};

export default connect((state: ReduxState) => ({
  isInPracticeMode: state.global.isInPracticeMode,
}))(AppWrapper);

interface Props {
  children: any;
  isInPracticeMode: boolean;
  location: {
    key: string;
  };
}

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  padding: 1.2rem;
  overflow: hidden;
`;

const BackgroundMainColorWash = styled(Backdrop)`
  position: fixed;
  top: 0;
  left: 0;

  height: 66vh;
  width: 100%;
  z-index: -1;
`;
