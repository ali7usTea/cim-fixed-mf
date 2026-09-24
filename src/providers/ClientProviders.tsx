'use client';

import { LayoutProvider } from '../layout/context/layoutcontext';
import { Providers } from '../redux/provider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from './AuthProvider';
import { Suspense } from 'react';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false
        }
    }
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
                <Providers>
                    <LayoutProvider>
                        <AuthProvider enabled={true} />
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </LayoutProvider>
                </Providers>
        </Suspense>
    );
}