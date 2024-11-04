import { Chain } from '@rainbow-me/rainbowkit';

export const zeroGTestnet: Chain = {
  id: 16600,
  name: '0g Chain Testnet',
  iconUrl: '/0g-logo.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'A0GI',
    symbol: 'A0GI',
  },
  rpcUrls: {
    default: {
      http: ['https://evmrpc-testnet.0g.ai/'],
    },
    public: {
      http: ['https://evmrpc-testnet.0g.ai/'],
    },
  },
  blockExplorers: {
    default: {
      name: '0G Explorer',
      url: 'https://chainscan-newton.0g.ai',
    },
  },
};