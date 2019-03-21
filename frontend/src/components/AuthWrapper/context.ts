import React from 'react';
import { UseAuthenticationResponse } from '../../hooks/useAuthentication';

const defaultContext: UseAuthenticationResponse = null;

const AuthContext = React.createContext(defaultContext);

export default AuthContext;
