import Amplify, { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:384176c9-fd3e-4d5e-8ae9-46670ee5e528',
    region: 'us-east-1',
    userPoolWebClientId: '63lbgpl9eo5fma09hod6k4if12',
    userPoolId: 'us-east-1_H57PntW6G',
  },
});

const useAuthentication: UseAuthentication = () => {
  const [isLoggedIn, changeIsLoggedIn] = useState(false);
  const [isLoading, changeIsLoading] = useState(false);

  const makeLoginCheck = () => {
    changeIsLoading(true);
    checkIfUserIsLoggedIn().then((res) => {
      changeIsLoggedIn(Boolean(res));
      changeIsLoading(false);
    });
  };

  useEffect(makeLoginCheck, []);

  return {
    isLoggedIn,
    isLoading,
    makeLoginCheck,
    submitLogOut: () => {
      changeIsLoading(true);
      Auth.signOut().then(() => {
        makeLoginCheck();
        changeIsLoading(false);
      });
    },
  };
};

export type UseAuthentication = () => UseAuthenticationResponse;

export interface UseAuthenticationResponse {
  isLoggedIn: boolean;
  isLoading: boolean;
  submitLogOut: () => void;
  makeLoginCheck: () => void;
}

const checkIfUserIsLoggedIn = async (): Promise<boolean> => {
  try {
    const session = await Auth.currentSession();
    return Boolean(session);
  } catch {
    return false;
  }
};

export default useAuthentication;
