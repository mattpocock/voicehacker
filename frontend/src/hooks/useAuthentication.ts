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

const useAuthentication = () => {
  const [isLoggedIn, changeIsLoggedIn] = useState(false);
  const [isCheckingLogIn, changeIsCheckingLogIn] = useState(false);
  const [error, changeError] = useState(null);

  useEffect(() => {
    changeIsCheckingLogIn(true);
    checkIfUserIsLoggedIn().then((res) => {
      changeIsLoggedIn(res);
      changeIsCheckingLogIn(res);
    });
  }, []);

  const submitSignIn = async (
    username: string,
    password: string,
  ): Promise<any> => {
    try {
      await Auth.signIn(username, password);
    } catch (e) {
      changeError(e);
    }
  };

  return {
    isLoggedIn,
    isCheckingLogIn,
    submitSignIn,
    error,
  };
};

const checkIfUserIsLoggedIn = async (): Promise<boolean> => {
  try {
    const session = await Auth.currentSession();
    return Boolean(session);
  } catch {
    return false;
  }
};

export default useAuthentication;
