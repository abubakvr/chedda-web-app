import { IMenuItem, INetworkList } from "./types";
import Arbitrum_Logo from "@/assets/logos/arbitrum-logo.png";
import Ethereum_Logo from "@/assets/logos/ethereum-logo.png";

export const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
export const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const alchemyKey2 = process.env.NEXT_PUBLIC_ALCHEMY_KEY_2;

// localstorage constants
export const connectorIdKey = "connectorId";
export const savedChainId = "savedChainId";

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
    name: "Rewards",
    path: "/rewards",
  },
  {
    name: "Bridge",
    path: "/bridge",
  },
  {
    name: "More",
    path: "/more",
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
    chainId: "421614",
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
