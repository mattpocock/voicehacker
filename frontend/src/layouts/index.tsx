import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from '../utils/redux/createStore';
import AppWrapper from './AppWrapper';
import AuthWrapper from '../components/AuthWrapper';

const { store, persistor } = createStore();

const Layout = ({ children, location, navigate }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthWrapper>
          <AppWrapper navigate={navigate} location={location}>
            {children}
          </AppWrapper>
        </AuthWrapper>
      </PersistGate>
    </Provider>
  );
};

interface Props {
  children: any;
  navigate: any;
  location: any;
}

export default Layout;
