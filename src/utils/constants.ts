import { IMenuItem, INetworkList } from "./types";
import Arbitrum_Logo from "@/assets/logos/arbitrum-logo.png";
import Ethereum_Logo from "@/assets/logos/ethereum-logo.png";

export const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
export const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

// localstorage constants
export const connectorIdKey = "connectorId";

export const menuItems: IMenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Market",
    path: "/market",
  },
  {
    name: "$CHEDDA",
    path: "/chedda",
  },
  {
    name: "Lock",
    path: "/lock",
  },
  {
    name: "Rewards",
    path: "/rewards",
  },
  {
    name: "Bridge",
    path: "/bridge",
  },
];

export const supportedNetworksConfig: INetworkList[] = [
  {
    name: "Goerli",
    chainId: "5",
    faucetUrl: "https://goerlifaucet.com/",
    txUrlPrefix: "https://goerli.arbiscan.io/tx/",
    icon: Ethereum_Logo,
  },
  {
    name: "Arbitrum",
    chainId: "421613",
    faucetUrl: "https://goerlifaucet.com/",
    txUrlPrefix: "https://goerli.etherscan.io/tx/",
    icon: Arbitrum_Logo,
  },
];
