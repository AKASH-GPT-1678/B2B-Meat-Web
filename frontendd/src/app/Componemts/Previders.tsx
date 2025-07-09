'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import { store2 ,persistor } from './redux-persit';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient , useQuery } from '@tanstack/react-query';

const query = new QueryClient();

const Previders = ({ children }: { children: React.ReactNode }) => {
  return (


    <QueryClientProvider client={query}>
    <Provider store={store2}>
      <PersistGate loading={null} persistor={persistor}>
      <SessionProvider>
      {children}
      </SessionProvider>
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  );
};

export default Previders;
