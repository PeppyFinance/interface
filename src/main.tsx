import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider as GqlProvider } from 'urql';
import { WagmiProvider } from 'wagmi';
import { router } from './Router.tsx';
import './index.css';
import { graphqlClient } from './lib/graphql.ts';
import { queryClient } from './lib/query.ts';
import { config as wagmiConfig } from './lib/web3modal.tsx';

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
