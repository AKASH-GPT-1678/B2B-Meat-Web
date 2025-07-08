'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import { SessionProvider } from 'next-auth/react';

const Previders = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <Provider store={store}>
      <SessionProvider>
      {children}
      </SessionProvider>
    </Provider>
  );
};

export default Previders;
