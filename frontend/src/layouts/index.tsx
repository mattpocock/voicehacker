import React, { useEffect } from 'react';
import AppWrapper from './AppWrapper';
import { Provider } from 'react-redux';
import createStore from '../utils/redux/createStore';
import { PersistGate } from 'redux-persist/integration/react';
import Amplify from 'aws-amplify';
import useAuthentication from '../hooks/useAuthentication';

const { store, persistor } = createStore();

const Layout = ({ children }: Props) => {
  const auth = useAuthentication();
  useEffect(() => {
    auth.submitSignIn('mattpocock', 'dadisabigoldpoo');
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppWrapper>{children}</AppWrapper>
      </PersistGate>
    </Provider>
  );
};

interface Props {
  children: any;
}

export default Layout;
