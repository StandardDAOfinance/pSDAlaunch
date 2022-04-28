import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
  42: `https://eth-kovan.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
};

export const injected = new InjectedConnector({
  supportedChainIds: process.env.REACT_APP_ETHEREUM_SUPPORTED_CHAIN_IDS,
});

export const ethereumNetwork = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 42: RPC_URLS[42] },
  defaultChainId: process.env.REACT_APP_DEFAULT_ETHEREUM_NETWORK_CHAIN_ID,
  pollingInterval: POLLING_INTERVAL,
});
