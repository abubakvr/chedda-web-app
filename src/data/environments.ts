import usdcLogo from "@/assets/logos/usdc-logo.png";
import usdtLogo from "@/assets/logos/usdt-logo.png";
import etheruemLogo from "@/assets/logos/ethereum-logo.png";
import bitcoinLogo from "@/assets/logos/bitcoin-logo.png";
import arbtrumLogo from "@/assets/logos/arbitrum-logo.png";
import daiLogo from "@/assets/logos/dai-logo.png";
import gmxLogo from "@/assets/logos/gmx-logo.png";
import uniswapLogo from "@/assets/logos/uniswap-logo.png";
import radiantLogo from "@/assets/logos/radiant-logo.png";
import aaveLogo from "@/assets/logos/aave-logo.png";

import { alchemyKey } from "@/utils/constants";
import { IEnvironment } from "@/utils/types";

export const currentEnvironment: IEnvironment = {
  production: false,
  environmentName: "Arbitrum Sepolia",
  jsonRpcUrl: `https://arb-sepolia.g.alchemy.com/v2/${alchemyKey}`,
  webSocketUrl: `wss://arb-sepolia.g.alchemy.com/v2/${alchemyKey}`,
  txUrlPrefix: "https://sepolia.arbiscan.io/tx",
  contractPrefix: "https://sepolia.arbiscan.io/address",
  chainId: 421614,
  contracts: {
    LendingPool: "0x7de1c0bf2d5a810b98ce9373e8195353ff4dbed1",
    LendingPoolLens: "0x5BD837be5Db3bDbb0fdb8362e55834762885fc6E",
    InterestRatesProjector: "0x49a4Ad3ADd3eF46a1dA27FEd0280F70276fb3ba6",
    PriceFeed: "0x5D0d03A506F2df4Bcf8fa022027FCcEd7fF639d1",
    LockingGaugeRewardsDistributor:
      "0x94012e199150A3f738c83c012144395E06aad582",
    Chedda: "0x9AD6FC4F1c6A4CE0838047DA728BCe90a705f54d",
    xChedda: "0x5c35eD563029a9D7B37a60EC2C964fC7d37672E5",
    veChedda: "0xBC03E7E93710b2efFfFaeec29Dc3D325BD89a8dB",
    Faucet: "0x0A5Fe3dd684B1aA04d156d42C259a9feF887255e",
    GaugeController: "0xE7353D33D8b92446789cF60604D66F1044acB89f",
  },
  tokens: {
    "0x311F0DD563582f7a94ED605429446dCc6bA68bBF": {
      name: "USD Coin",
      symbol: "USDC",
      address: "0x311F0DD563582f7a94ED605429446dCc6bA68bBF",
      logo: usdcLogo,
      decimals: 6,
      color: "#3498db",
    },
    "0x0dbb7d305434d01cd9E408b0ddc5A227d563a921": {
      name: "Tether USD",
      symbol: "USDT",
      address: "0x0dbb7d305434d01cd9e408b0ddc5a227d563a921",
      logo: usdtLogo,
      decimals: 6,
      color: "#2ecc71",
    },
    "0xCBfa283cCc60CF5151AAf5f73F9513e7321c8483": {
      name: "DAI Stablecoin",
      symbol: "DAI",
      address: "0xCBfa283cCc60CF5151AAf5f73F9513e7321c8483",
      logo: daiLogo,
      decimals: 18,
      color: "#FFC26F",
    },
    "0x94562B7899fdFd58fDD3a7cc98Ec928568e19aD6": {
      name: "Wrapped ETH",
      symbol: "WETH",
      address: "0x94562B7899fdFd58fDD3a7cc98Ec928568e19aD6",
      logo: etheruemLogo,
      decimals: 18,
      color: "#687EFF",
    },
    "0x3266275A2D62BE0634146DF767E8505A2173708E": {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      address: "0x3266275A2D62BE0634146DF767E8505A2173708E",
      logo: bitcoinLogo,
      decimals: 8,
      color: "#FFC436",
    },
    "0x513a37DfC7D17Bb285FF771D9b60853c55aD0C65": {
      name: "Arbitrum",
      symbol: "ARB",
      address: "0x513a37DfC7D17Bb285FF771D9b60853c55aD0C65",
      logo: arbtrumLogo,
      decimals: 18,
      color: "#D8D8D8",
    },
    "0x4240266f97359B94B9762B23BE747a82fe2F1EbC": {
      name: "GMX",
      symbol: "GMX",
      address: "0x4240266f97359B94B9762B23BE747a82fe2F1EbC",
      logo: gmxLogo,
      decimals: 18,
      color: "#85CDFD",
    },
    "0xc2d6F66b50b961b0392Fd35772dA2a55f5A2B101": {
      name: "Radiant",
      symbol: "RDNT",
      address: "0xc2d6F66b50b961b0392Fd35772dA2a55f5A2B101",
      logo: radiantLogo,
      decimals: 18,
      color: "#0E8388",
    },
    "0x2243C1F4FbB5F67bE6D349cB4b744c3CcEDB38cA": {
      name: "Uniswap",
      symbol: "UNI",
      address: "0x2243C1F4FbB5F67bE6D349cB4b744c3CcEDB38cA",
      logo: uniswapLogo,
      decimals: 18,
      color: "#E26EE5",
    },
    "0x6a13988035609CbBa58894144DBF83c9dACA2f83": {
      name: "AAVE",
      symbol: "AAVE",
      address: "0x6a13988035609CbBa58894144DBF83c9dACA2f83",
      logo: aaveLogo,
      decimals: 18,
      color: "#DDE6ED",
    },
  },
};
