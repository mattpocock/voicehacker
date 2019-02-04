/* eslint-disable */
import React from 'react';
import AppWrapper from './src/layouts/AppWrapper.tsx';

export const wrapPageElement = ({ element, props }) => (
  <AppWrapper {...props}>{element}</AppWrapper>
);
