import React from 'react';
import AppWrapper from './AppWrapper';
import { Provider } from 'react-redux';
import createStore from '../utils/redux/createStore';

const store = createStore();

const Layout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <AppWrapper>{children}</AppWrapper>
    </Provider>
  );
};

interface Props {
  children: any;
}

export default Layout;
