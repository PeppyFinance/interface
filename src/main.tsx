import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config as wagmiConfig } from './lib/web3modal.tsx';
import { queryClient } from './lib/query.ts';
import { Provider as GqlProvider } from 'urql';
import { graphqlClient } from './lib/graphql.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GqlProvider value={graphqlClient}>
          <RouterProvider router={router} />
        </GqlProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
