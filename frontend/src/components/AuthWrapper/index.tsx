import React from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import AuthContext from './context';

const LoginWrapper = ({ children }: { children: any }) => {
  const auth = useAuthentication();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default LoginWrapper;
