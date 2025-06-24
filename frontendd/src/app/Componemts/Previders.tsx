'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';

const Previders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Previders;
