'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * React TanStack Query Provider.
 */
export function QueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 2
          }
        }
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
