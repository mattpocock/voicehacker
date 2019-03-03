/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/utils/redux/createStore';

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};
