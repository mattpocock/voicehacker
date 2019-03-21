import React from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import GreyButton from './GreyButton';
import Flex from './Flex';
import theme from '../config/theme';
import Padding from './Padding';
import FullWidthButton from './FullWidthButton';
import useAuthentication from '../hooks/useAuthentication';
import { navigate } from 'gatsby';

const transitionStyles: { [index: string]: {} } = {
  entering: {
    pointerEvents: 'none',
    opacity: 0,
    transform: `translate(100vw, -100%)`,
  },
  entered: {
    opacity: 1,
    transform: `translate(0px)`,
  },
  exiting: {
    pointerEvents: 'none',
    transform: `translate(100vw, -100%)`,
    opacity: 0,
  },
  exited: {
    opacity: 0,
    transform: `translate(100vw, -100%)`,
  },
};

const blankTransitionStyles: { [index: string]: {} } = {
  entering: {
    pointerEvents: 'none',
    opacity: 0,
  },
  entered: {
    opacity: 0.6,
  },
  exiting: {
    pointerEvents: 'none',
    opacity: 0,
  },
  exited: {
    opacity: 0,
  },
};

const Menu = ({ closeMenu, isVisible }: Props) => {
  const { isLoggedIn, submitLogOut } = useAuthentication({
    afterLogOut: () => {
      navigate(`/`);
      closeMenu();
    },
  });
  return (
    <>
      <TransitionGroup>
        {isVisible && (
          <Transition key="menu" timeout={100}>
            {(state) => (
              <>
                <Wrapper
                  style={{ transition: `all 0.2s`, ...transitionStyles[state] }}
                >
                  <Flex justifyContent="flex-end">
                    <GreyButton onClick={closeMenu}>Close</GreyButton>
                  </Flex>
                  <Padding />
                  {isLoggedIn ? (
                    <FullWidthButton onClick={submitLogOut}>
                      Log Out
                    </FullWidthButton>
                  ) : (
                    <>
                      <FullWidthButton
                        onClick={() => {
                          navigate(`/login`);
                          closeMenu();
                        }}
                      >
                        Sign Up
                      </FullWidthButton>
                      <Padding />
                      <FullWidthButton
                        onClick={() => {
                          navigate(`/login`);
                          closeMenu();
                        }}
                      >
                        Sign In
                      </FullWidthButton>
                    </>
                  )}
                </Wrapper>
                <WholePageBlanked
                  style={{
                    transition: `all 0.2s`,
                    ...blankTransitionStyles[state],
                  }}
                />
              </>
            )}
          </Transition>
        )}
      </TransitionGroup>
    </>
  );
};

interface Props {
  closeMenu: () => void;
  isVisible: boolean;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  padding: 1.5rem;
  z-index: 20;
  background-color: ${theme.white};
`;

const WholePageBlanked = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 19;
  background-color: white;
  opacity: 0.1;
`;

export default Menu;
