import React, { useContext, useEffect } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import GreyButton from './GreyButton';
import Flex from './Flex';
import theme from '../config/theme';
import Padding from './Padding';
import FullWidthButton from './FullWidthButton';
import AuthContext from './AuthWrapper/context';
import useWatchForTruthy from '../hooks/useWatchForTruthy';
import Description from './Description';
import Header from './Header';

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

const Menu = ({ closeMenu, isVisible, navigate }: Props) => {
  const { isLoggedIn, submitLogOut } = useContext(AuthContext);
  useWatchForTruthy(isLoggedIn === false, () => {
    navigate(`/`);
    closeMenu();
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
                  <Flex justifyContent="space-between" alignItems="center">
                    <Header>Menu</Header>
                    <GreyButton onClick={closeMenu}>Close</GreyButton>
                  </Flex>
                  <Padding />
                  <FullWidthButtonGrey
                    onClick={() => {
                      navigate(`/`);
                      closeMenu();
                    }}
                  >
                    Accents
                  </FullWidthButtonGrey>
                  <Padding padding="1rem" />
                  <FullWidthButtonGrey
                    onClick={() => {
                      navigate(`/search`);
                      closeMenu();
                    }}
                  >
                    Dictionary
                  </FullWidthButtonGrey>
                  <Padding padding="1rem" />
                  {isLoggedIn ? (
                    <FullWidthButtonGrey onClick={submitLogOut}>
                      Log Out
                    </FullWidthButtonGrey>
                  ) : (
                    <>
                      <FullWidthButton
                        onClick={() => {
                          navigate(`/login`);
                          closeMenu();
                        }}
                      >
                        Sign Up / Sign In
                      </FullWidthButton>
                    </>
                  )}
                </Wrapper>
                <WholePageBlanked
                  onClick={closeMenu}
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
  navigate: (string: string) => void;
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

const FullWidthButtonGrey = styled(FullWidthButton)`
  background-color: ${theme.midLightGrey};
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
