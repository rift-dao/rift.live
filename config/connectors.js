import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

import envconfig from 'config/envconfig';

const rpc = envconfig.getRandomApi();
console.log('rpc.url', rpc.url);

export const walletConnectConnector = new WalletConnectConnector({
  ...envconfig.connectors.walletConnect,
  rpc,
  rpcUrl: rpc.url,
});

export const injectedConnector = new InjectedConnector(
  envconfig.connectors.injected,
);
