import type { Holding } from '../types'

const holdings: Holding[] = [
  {
    coin: 'BTC',
    coinName: 'Bitcoin',
    logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    currentPrice: 9156682.15,
    totalHolding: 0.337184,
    averageBuyPrice: 8232550.42,
    stcg: { balance: 0.1854, gain: 163955.24 },
    ltcg: { balance: 0.151784, gain: -263846.48 },
  },
  {
    coin: 'ETH',
    coinName: 'Ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    currentPrice: 263452.88,
    totalHolding: 3.124583,
    averageBuyPrice: 286722.41,
    stcg: { balance: 1.892, gain: -44018.35 },
    ltcg: { balance: 1.232583, gain: 22861.92 },
  },
  {
    coin: 'SOL',
    coinName: 'Solana',
    logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    currentPrice: 12648.2,
    totalHolding: 45.8201,
    averageBuyPrice: 14322.18,
    stcg: { balance: 18.2, gain: -30465.44 },
    ltcg: { balance: 27.6201, gain: -15775.66 },
  },
  {
    coin: 'USDC',
    coinName: 'USD Coin',
    logo: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png',
    currentPrice: 83.12,
    totalHolding: 1456.89045,
    averageBuyPrice: 82.96,
    stcg: { balance: 1456.89045, gain: 233.1 },
    ltcg: { balance: 0, gain: 0 },
  },
  {
    coin: 'USDC',
    coinName: 'USDC Polygon',
    logo: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png',
    currentPrice: 83.1,
    totalHolding: 0.006531,
    averageBuyPrice: 84.72,
    stcg: { balance: 0.006531, gain: -0.010579 },
    ltcg: { balance: 0, gain: 0 },
  },
  {
    coin: 'MATIC',
    coinName: 'Polygon',
    logo: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png',
    currentPrice: 58.74,
    totalHolding: 2088.38,
    averageBuyPrice: 71.26,
    stcg: { balance: 735.12, gain: -9203.7 },
    ltcg: { balance: 1353.26, gain: -16941.82 },
  },
  {
    coin: 'LINK',
    coinName: 'Chainlink',
    logo: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    currentPrice: 1392.66,
    totalHolding: 88.431,
    averageBuyPrice: 1184.75,
    stcg: { balance: 22.18, gain: 4610.33 },
    ltcg: { balance: 66.251, gain: 13773.42 },
  },
]

export const fetchHoldings = (): Promise<Holding[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdings)
    }, 600)
  })
