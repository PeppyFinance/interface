import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { WagmiProvider, http } from 'wagmi';
import { localhost } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

// 0. Setup queryClient
const queryClient = new QueryClient();

const projectId = '0469e6137f22c487ae982990c50111c5';

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [localhost] as const;
const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  transports: {
    [localhost.id]: http(),
  },
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

// Setup graphqlClient
const graphqlClient = new Client({
  url: 'http://localhost:8080/v1/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

export function ContextProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider value={graphqlClient}>{children}</Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

