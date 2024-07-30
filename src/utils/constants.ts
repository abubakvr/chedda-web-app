import {
  ISourceChain,
  IMenuItem,
  IPoolCategories,
  IPoolCategory,
} from "./types";

import baseLogo from "@/assets/logos/base-logo.png";
import ethereumLogo from "@/assets/logos/ethereum-logo.png";

import stackIcon from "@/assets/icon/stack.svg";
import stackIconActive from "@/assets/icon/stack-active.svg";
import deFiIcon from "@/assets/icon/deFi.svg";
import deFiIconActive from "@/assets/icon/deFi-active.svg";
import stableIcon from "@/assets/icon/stable-coin.svg";
import stableIconActive from "@/assets/icon/stable-coin-active.svg";
import gameFiIcon from "@/assets/icon/gameFi.svg";
import gameFiIconActive from "@/assets/icon/gameFi-active.svg";
import bluechipIcon from "@/assets/icon/bluechip.svg";
import bluechipIconActive from "@/assets/icon/bluechip-active.svg";

export const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
export const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

// localstorage constants
export const connectorIdKey = "connectorId";
export const savedChainId = "savedChainId";
export const TWITTER_URL = "https://twitter.com/chedda_crypto";
export const DISCORD_URL = "https://discord.gg/4ZMWVez73A";
export const DOCS_URL = "https://docs.chedda.finance";
export const LAYERZERO_TESTNET = "https://testnet.layerzeroscan.com/tx";
export const BRIDGE_DOC_URL =
  "https://docs.chedda.finance/chedda/protocol/cross-chain-tokens";

export const ethAddress = "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511";

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

export const vaultHeaderItems = [
  "Asset",
  "Collateral",
  "Total Supply",
  "Supply APY",
  "Total Borrow",
  "Borrow APY",
  "Utilization",
];

export const positionsHeaderItem = [
  "Pools",
  "Supplied",
  "Borrowed",
  "Health Factor",
  "Stake/Earn",
  "Lock/Earn",
];

export const LOCKTIMES = [
  { title: "1 hr", duration: 0.0418, multiplier: 0, value: 0 },
  { title: "30 days", duration: 30, multiplier: 0.25, value: 1 },
  { title: "90 days", duration: 90, multiplier: 1, value: 2 },
  { title: "180 days", duration: 180, multiplier: 2, value: 3 },
  { title: "360 days", duration: 360, multiplier: 4, value: 4 },
];

export const sourceChains: ISourceChain[] = [
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

export const poolCategories: IPoolCategory[] = [
  {
    label: "ALL",
    keyword: null,
    itemCount: 0,
    icon: stackIcon,
    activeIcon: stackIconActive,
    activeClass: "filter-box border-none px-[13px] h-[37px] bg-[#51D5FA12]",
    hoverClass: "hover:border-[#51D5FA] hover:bg-[#51D5FA12]",
  },
  {
    label: "#STABLE",
    keyword: "Stable Coin",
    itemCount: 0,
    icon: stableIcon,
    activeIcon: stableIconActive,
    activeClass: "border-[#C142F0] bg-[#2D142D68] h-9 px-3",
    hoverClass: "hover:border-[#C142F0] hover:bg-[#2D142D68]",
  },
  {
    label: "#DEFI",
    keyword: "Defi",
    itemCount: 0,
    icon: deFiIcon,
    activeIcon: deFiIconActive,
    activeClass: "border-[#F89F1A] bg-[#2C1C0464] h-9 px-3",
    hoverClass: "hover:border-[#F89F1A] hover:bg-[#2C1C0464]",
  },
  {
    label: "#GAMEFI",
    keyword: "Base Gaming",
    itemCount: 0,
    icon: gameFiIcon,
    activeIcon: gameFiIconActive,
    activeClass: "border-[#66DBBB] bg-[#142E2664] h-9 px-3",
    hoverClass: "hover:border-[#66DBBB] hover:bg-[#142E2664]",
  },
  {
    label: "#Bluechip",
    keyword: "Bluechip",
    itemCount: 0,
    icon: bluechipIcon,
    activeIcon: bluechipIconActive,
    activeClass: "border-[#00F0FF] bg-[#01212864] h-9 px-3",
    hoverClass: "hover:border-[#00F0FF] hover:bg-[#01212864]",
  },
];

export const poolFilters: IPoolCategories = {
  "0x40cf99BDD816a691CB0bb2c674ADc06577b21964": {
    categories: ["bluechip"],
  },
  "0xcFDD95d6f98FF9db4A7a35b9b49822E1b381147b": {
    categories: ["defi"],
  },
};
