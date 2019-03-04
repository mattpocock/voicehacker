import React from 'react';
import AppWrapper from './AppWrapper';
import { Provider } from 'react-redux';
import createStore from '../utils/redux/createStore';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = createStore();

const Layout = ({ children }: Props) => {
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
