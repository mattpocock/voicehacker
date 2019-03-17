import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import useAuthentication from '../hooks/useAuthentication';
import createStore from '../utils/redux/createStore';
import AppWrapper from './AppWrapper';

const { store, persistor } = createStore();

const Layout = ({ children, location }: Props) => {
  const auth = useAuthentication();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppWrapper location={location}>{children}</AppWrapper>
      </PersistGate>
    </Provider>
  );
};

interface Props {
  children: any;
  location: any;
}

export default Layout;
