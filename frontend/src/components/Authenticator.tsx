import {
  Authenticator as AuthenticatorComponent,
  Greetings,
  // @ts-ignore
} from 'aws-amplify-react';
import React, { useContext } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { buttonStyles } from './Button';
import { inputStyles } from './Input';
import { navigate } from 'gatsby';
import AuthContext from './AuthWrapper/context';

const authenticatorTheme = {
  signInButton: {
    backgroundColor: theme.secondColorMidDark,
    color: 'blue',
  },
  formSection: {
    padding: '0.5rem',
  },
};

const Authenticator = () => {
  const auth = useContext(AuthContext);
  const handleStateChange = (state: string) => {
    if (state === 'signedIn') {
      navigate(`/`);
    }
    auth.makeLoginCheck();
  };
  return (
    <AuthenticatorWrapper>
      <AuthenticatorComponent
        theme={authenticatorTheme}
        onStateChange={handleStateChange}
        hide={[Greetings]}
      />
    </AuthenticatorWrapper>
  );
};

export default Authenticator;

const AuthenticatorWrapper = styled.div`
  * {
    --input-color: ${theme.midGrey};
    --deepSquidInk: ${theme.midGrey};
    --amazonOrange: ${theme.secondColorMidDark};
    --color-primary: ${theme.secondColorMidDark};
    --color-primary-highlight: ${theme.secondColorLight};
    --lightAmazonOrange: ${theme.secondColorLight};
    --darkAmazonOrange: ${theme.secondColorDarkText};
    --button-background-color: ${theme.secondColorMidDark};
  }
  button {
    ${buttonStyles}
    background-color: ${theme.secondColorMidDark};
    padding: 0.8rem;
    &:focus, &:active {
      background-color: ${theme.secondColorDarkText}
    }
    &:disabled {
      background-color: ${theme.secondColorDarkText};
    }
  }
  a {
    color: ${theme.secondColorDarkText}
  }
  input {
    ${inputStyles}
  }
`;
