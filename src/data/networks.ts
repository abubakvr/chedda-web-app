import type { AddEthereumChainParameter } from "@web3-react/types";

const infuraKey = process.env.REACT_APP_INFURA_KEY;
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

interface BasicChainInformation {
  chainId: string;
  urls: string[];
  publicUrls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation)?.nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.publicUrls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const getNativeByChain = (chainId: number): string | undefined => {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation))
    return chainInformation.nativeCurrency.symbol;
  return undefined;
};

export const getExplorer = (chainId: number): string[] | undefined => {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation))
    return chainInformation.blockExplorerUrls;
  return undefined;
};

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  1: {
    chainId: "1",
    urls: [
      infuraKey ? `https://mainnet.infura.io/v3/${infuraKey}` : "",
      alchemyKey ? `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}` : "",
      "https://rpc.ankr.com/eth",
      "https://cloudflare-eth.com",
    ].filter(Boolean),
    publicUrls: ["https://rpc.ankr.com/eth"].filter(Boolean),
    name: "Mainnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://etherscan.io"],
  },
  5: {
    chainId: "5",
    urls: [
      infuraKey ? `https://goerli.infura.io/v3/${infuraKey}` : "",
      alchemyKey ? `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}` : "",
      "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    ].filter(Boolean),
    publicUrls: ["https://rpc.ankr.com/eth_goerli"].filter(Boolean),
    name: "Goerli",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
  },
  11155111: {
    chainId: "11155111",
    urls: [
      infuraKey ? `https://sepolia.infura.io/v3/${infuraKey}` : "",
      "https://sepolia.etherscan.io/",
    ].filter(Boolean),
    publicUrls: ["https://sepolia.etherscan.io/"].filter(Boolean),
    name: "Sepolia",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
  84532: {
    chainId: "84532",
    urls: [
      infuraKey ? `https://base-sepolia.g.alchemy.com/v2/${alchemyKey}` : "",
      "https://sepolia-explorer.base.org/",
    ].filter(Boolean),
    publicUrls: ["https://sepolia.base.org/"].filter(Boolean),
    name: "Base Sepolia",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://sepolia.base.org/"],
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});

export const CHAINIDs: { [chainId: number]: string } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string }>((accumulator, chainId) => {
  const validCHAINIDs: string = CHAINS[Number(chainId)].chainId;

  if (validCHAINIDs) {
    accumulator[Number(chainId)] = validCHAINIDs;
  }

  return accumulator;
}, {});
