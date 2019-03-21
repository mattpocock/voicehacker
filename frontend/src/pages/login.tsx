import React from 'react';
import Authenticator from '../components/Authenticator';
import FloatingWhiteBox from '../components/FloatingWhiteBox';

const LoginPage = () => {
  return (
    <>
      <FloatingWhiteBox>
        <Authenticator />
      </FloatingWhiteBox>
    </>
  );
};

export default LoginPage;
