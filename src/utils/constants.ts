import { IBridgeChain, IMenuItem, INetworkList } from "./types";
import Arbitrum_Logo from "@/assets/logos/arbitrum-logo.png";
import Ethereum_Logo from "@/assets/logos/ethereum-logo.png";

import baseLogo from "@/assets/logos/base-logo.png";
import ethereumLogo from "@/assets/logos/ethereum-logo.png";

export const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
export const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

// localstorage constants
export const connectorIdKey = "connectorId";
export const savedChainId = "savedChainId";
export const TWITTER_URL = "https://twitter.com/chedda_crypto";
export const DISCORD_URL = "https://discord.gg/4ZMWVez73A";
export const DOCS_URL = "https://docs.chedda.finance";
export const LAYERZERO_TESTNET = "https://testnet.layerzeroscan.com/tx";

export const menuItems: IMenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Markets",
    path: "/markets",
  },
  {
    name: "Bridge",
    path: "/bridge",
  },
];

export const supportedNetworksConfig: INetworkList[] = [
  {
    name: "Ethereum",
    chainId: "11155111",
    faucetUrl: "https://goerlifaucet.com/",
    txUrlPrefix: "https://sepolia.etherscan.io/tx/",
    icon: Ethereum_Logo,
  },
  {
    name: "Arbitrum",
    chainId: "84532",
    faucetUrl: "https://goerlifaucet.com/",
    txUrlPrefix: "https://sepolia.arbiscan.io/tx/",
    icon: Arbitrum_Logo,
  },
];

export const vaultHeaderItems = [
  "Asset",
  "Collateral",
  "Total Supply",
  "Supply APY",
  "Total Borrow",
  "Borrow APY",
  "Utilization",
];

export const LOCKTIMES = [
  { title: "1 hr", duration: 0.0418, multiplier: 0, value: 0 },
  { title: "30 days", duration: 30, multiplier: 0.25, value: 1 },
  { title: "90 days", duration: 90, multiplier: 1, value: 2 },
  { title: "180 days", duration: 180, multiplier: 2, value: 3 },
  { title: "360 days", duration: 360, multiplier: 4, value: 4 },
];

export const bridgeChains: IBridgeChain[] = [
  {
    name: "Base",
    key: "base",
    chainId: 84532,
    logo: baseLogo,
    endpointId: 40245,
    jsonRpcUrl: `https://base-sepolia.g.alchemy.com/v2/${alchemyKey}`,
    txUrlPrefix: "https://sepolia.basescan.org/tx",
    priceFeed: "0xFe09e4d727Eda07D5C0e961EbE04c7c0f0B0C2C6",
    ethAddress: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511",
  },
  {
    name: "Ethereum",
    key: "ethereum",
    chainId: 11155111,
    logo: ethereumLogo,
    endpointId: 40161,
    jsonRpcUrl: `https://sepolia.infura.io/v3/${infuraKey}`,
    txUrlPrefix: "https://sepolia.etherscan.io/tx",
    priceFeed: "0xAeD59c7d76d44784493dE6B9ec01f7dBac0632f5",
    ethAddress: "0xc1e5599f1ac90995762302D946AF619bD9824813",
  },
];

export const ethAddress = "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511";
