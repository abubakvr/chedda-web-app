import { IMenuItem, INetworkList } from "./types";
import Arbitrum_Logo from "@/assets/logos/arbitrum-logo.png";
import Ethereum_Logo from "@/assets/logos/ethereum-logo.png";

const infuraKey = process.env.REACT_APP_INFURA_KEY;
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

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
    jsonRpcUrl: `https://goerli.infura.io/v3/${infuraKey}`,
    webSocketUrl: `wss://goerli.infura.io/ws/v3/${infuraKey}`,
    faucetUrl: "https://goerlifaucet.com/",
    txUrlPrefix: "https://goerli.arbiscan.io/tx/",
    icon: Ethereum_Logo,
  },
  {
    name: "Arbitrum",
    chainId: "421613",
    jsonRpcUrl: `https://arb-goerli.g.alchemy.com/v2/${alchemyKey}`,
    webSocketUrl: `wss://arb-goerli.g.alchemy.com/v2/${alchemyKey}`,
    faucetUrl: "https://goerlifaucet.com/",
    txUrlPrefix: "https://goerli.etherscan.io/tx/",
    icon: Arbitrum_Logo,
  },
];
