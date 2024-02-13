import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { wagmiConfig } from './lib/wagmiConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <App />
    </WagmiProvider>
  </React.StrictMode>
);

