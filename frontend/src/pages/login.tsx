import React from 'react';
import Authenticator from '../components/Authenticator';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import useAuthentication from '../hooks/useAuthentication';

const LoginPage = () => {
  const auth = useAuthentication();

  return (
    <>
      <FloatingWhiteBox>
        <Authenticator />
      </FloatingWhiteBox>
    </>
  );
};

export default LoginPage;
