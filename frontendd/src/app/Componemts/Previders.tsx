'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient , useQuery } from '@tanstack/react-query';

const query = new QueryClient();

const Previders = ({ children }: { children: React.ReactNode }) => {
  return (


    <QueryClientProvider client={query}>
    <Provider store={store}>
      <SessionProvider>
      {children}
      </SessionProvider>
    </Provider>
    </QueryClientProvider>
  );
};

export default Previders;
