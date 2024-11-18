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

import TwitterIcon from "@/assets/icon/twitter-icon.svg";
import DiscordIcon from "@/assets/icon/discord-icon.svg";
import DocumentIcon from "@/assets/icon/document-icon.svg";

export const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
export const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const GA_TRACKING_ID = "G-XL1Y4DPW9J";

// localstorage constants
export const connectorIdKey = "connectorId";
export const savedChainId = "savedChainId";

export const TWITTER_URL = "https://twitter.com/chedda_finance";
export const DISCORD_URL = "https://discord.gg/4ZMWVez73A";
export const DOCS_URL = "https://docs.chedda.finance";
export const LAYERZERO_TESTNET = "https://testnet.layerzeroscan.com/tx";
export const BRIDGE_DOC_URL =
  "https://docs.chedda.finance/chedda/protocol/cross-chain-tokens";
export const HOMEPAGE_LINK = "https://www.chedda.finance";
export const CHEDDA_TERMS_LINK = "https://www.chedda.finance/terms";

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
    priceFeed: "0xE831DFd1DDFCce163c0B16B35aD2dc411129EC7d",
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
    keyword: undefined,
    itemCount: 0,
    icon: stackIcon,
    activeIcon: stackIconActive,
    activeClass:
      "filter-box border-none px-[13px] h-7 md:h-8 lg:h-[37px] bg-[#51D5FA12]",
    hoverClass: "hover:border-[#51D5FA] hover:bg-[#51D5FA12]",
  },
  {
    label: "#STABLE",
    keyword: "Stable Coin",
    itemCount: 0,
    icon: stableIcon,
    activeIcon: stableIconActive,
    activeClass:
      "border-[#C142F0] bg-[#2D142D68] md:px-1 py-1 h-7 md:h-8 lg:h-9 ",
    hoverClass: "hover:border-[#C142F0] hover:bg-[#2D142D68]",
  },
  {
    label: "#DEFI",
    keyword: "Defi",
    itemCount: 0,
    icon: deFiIcon,
    activeIcon: deFiIconActive,
    activeClass:
      "border-[#F89F1A] bg-[#2C1C0464] md:px-1 py-1 h-7 md:h-8 lg:h-9 ",
    hoverClass: "hover:border-[#F89F1A] hover:bg-[#2C1C0464]",
  },
  {
    label: "#GAMEFI",
    keyword: "Gamefi",
    itemCount: 0,
    icon: gameFiIcon,
    activeIcon: gameFiIconActive,
    activeClass:
      "border-[#66DBBB] bg-[#142E2664] md:px-1 py-1 h-7 md:h-8 lg:h-9 ",
    hoverClass: "hover:border-[#66DBBB] hover:bg-[#142E2664]",
  },
  {
    label: "#Bluechip",
    keyword: "Bluechip",
    itemCount: 0,
    icon: bluechipIcon,
    activeIcon: bluechipIconActive,
    activeClass:
      "border-[#00F0FF] bg-[#01212864] md:px-1 py-1 h-7 md:h-8 lg:h-9 ",
    hoverClass: "hover:border-[#00F0FF] hover:bg-[#01212864]",
  },
];

export const poolFilters: IPoolCategories = {
  "0x00Eb935e3Dd65CCa9834f635CF7839a81F37727E": {
    categories: ["stable coin"],
  },
  "0xe16BEAEDCA1Ad25407A83FB0F452F643CF1d171D": {
    categories: ["stable coin"],
  },
  "0x2bcbD83C50b56698342bf77Ea2223386553BeF3F": {
    categories: ["defi"],
  },
};

export const moreMenuItems = [
  { label: "Docs", url: DOCS_URL, icon: DocumentIcon },
  { label: "Discord", url: DISCORD_URL, icon: DiscordIcon },
  { label: "Twitter", url: TWITTER_URL, icon: TwitterIcon },
];
