'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store2, persistor } from './redux-persit'; // Fixed import path
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const query = new QueryClient();

// Fixed component name (was "Previders")
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store2}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={query}>
                    <SessionProvider>{children}</SessionProvider>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
};

export default Providers;