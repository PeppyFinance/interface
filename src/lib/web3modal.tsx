import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { http } from 'wagmi';
import { shimmerTestnet } from 'wagmi/chains';

const projectId = '0469e6137f22c487ae982990c50111c5';

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Peppy Finance',
  url: 'https://app.peppy.finance', // origin must match your domain & subdomain
  icons: ['https://app.peppy.finance/peppy.png'],
};

const chains = [shimmerTestnet] as const;
export const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  transports: {
    [shimmerTestnet.id]: http(),
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
  themeVariables: {
    '--w3m-accent': 'hsl(var(--primary))',
    '--w3m-border-radius-master': '1px'
  },
});
