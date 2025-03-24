import usdcLogo from "@/assets/logos/usdc-logo.png";
import usdtLogo from "@/assets/logos/usdt-logo.png";
import etheruemLogo from "@/assets/logos/ethereum-logo.png";
import bitcoinLogo from "@/assets/logos/bitcoin-logo.png";
import uniswapLogo from "@/assets/logos/uniswap-logo.png";
import maviaLogo from "@/assets/logos/mavia-logo.png";
import primeLogo from "@/assets/logos/prime-logo.png";
import aeroLogo from "@/assets/logos/aero-logo.png";
import aaveLogo from "@/assets/logos/aave-logo.png";
import daiLogo from "@/assets/logos/dai-logo.png";
import compoundLogo from "@/assets/logos/compound-logo.png";
import cheddaLogo from "@/assets/logos/chedda-logo.png";
import galaLogo from "@/assets/logos/gala-logo.png";
import beamLogo from "@/assets/logos/beam-logo.png";
import sandLogo from "@/assets/logos/sand-logo.png";
import baseLogo from "@/assets/logos/base-logo.png";
import cbETHLogo from "@/assets/logos/cbETH-logo.png";
import cbBTCLogo from "@/assets/logos/cbBTC-logo.png";
import brettLogo from "@/assets/logos/brett-logo.png";
import toshiLogo from "@/assets/logos/toshi-logo.png";
import benjiLogo from "@/assets/logos/benji-logo.png";
import migglesLogo from "@/assets/logos/miggles-logo.png";
import degenLogo from "@/assets/logos/degen-logo.png";
import {
  DECIMALS,
  IBridgeTokenConfig,
  IToken,
  ITokenConfig,
} from "@/utils/types";

export const tokenConfig: { [token: string]: Partial<IToken> } = {
  CHEDDA: {
    name: "Chedda Token",
    logo: cheddaLogo,
    decimals: DECIMALS.STANDARD,
    color: "#3498db",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  USDC: {
    name: "USD Coin",
    logo: usdcLogo,
    decimals: DECIMALS.STABLE,
    color: "#3498db",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  USDT: {
    name: "Tether USD",
    logo: usdtLogo,
    decimals: DECIMALS.STABLE,
    color: "#2ecc71",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  DAI: {
    name: "DAI Stablecoin",
    logo: daiLogo,
    decimals: DECIMALS.STANDARD,
    color: "#FFC26F",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  WETH: {
    name: "Wrapped ETH",
    logo: etheruemLogo,
    decimals: DECIMALS.STANDARD,
    color: "#687EFF",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  WBTC: {
    name: "Wrapped Bitcoin",
    logo: bitcoinLogo,
    decimals: DECIMALS.BTC,
    color: "#FFC436",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  AERO: {
    name: "Aerodrome",
    logo: aeroLogo,
    decimals: DECIMALS.STANDARD,
    color: "#D8D8D8",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  AAVE: {
    name: "AAVE",
    logo: aaveLogo,
    decimals: DECIMALS.STANDARD,
    color: "#DDE6ED",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  COMP: {
    name: "Compound",
    logo: compoundLogo,
    decimals: DECIMALS.STANDARD,
    color: "#85CDFD",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  UNI: {
    name: "Uniswap",
    logo: uniswapLogo,
    decimals: DECIMALS.STANDARD,
    color: "#E26EE5",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  PRIME: {
    name: "Echelon Prime",
    logo: primeLogo,
    decimals: DECIMALS.STANDARD,
    color: "#0E8388",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  MAVIA: {
    name: "Heroes of Mavia",
    logo: maviaLogo,
    decimals: DECIMALS.STANDARD,
    color: "#DDE6ED",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  GALA: {
    name: "Gala",
    logo: galaLogo,
    decimals: DECIMALS.STANDARD,
    color: "#DDE6ED",
    sourceLogo: etheruemLogo,
    source: "BASE",
  },
  BEAM: {
    name: "Beam",
    logo: beamLogo,
    decimals: DECIMALS.STANDARD,
    color: "#DDE6ED",
    sourceLogo: etheruemLogo,
    source: "BASE",
  },
  SAND: {
    name: "The Sandbox",
    logo: sandLogo,
    decimals: DECIMALS.STANDARD,
    color: "#A7F09B",
    sourceLogo: etheruemLogo,
    source: "BASE",
  },
  cbETH: {
    name: "Coinbase Wrapped ETH",
    logo: cbETHLogo,
    decimals: DECIMALS.STANDARD,
    color: "#87CEEB",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  cbBTC: {
    name: "Coinbase Wrapped BTC",
    logo: cbBTCLogo,
    decimals: DECIMALS.BTC,
    color: "#F28B82",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  BRETT: {
    name: "Brett",
    logo: brettLogo,
    decimals: DECIMALS.STANDARD,
    color: "#6495ED",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  TOSHI: {
    name: "Toshi",
    logo: toshiLogo,
    decimals: DECIMALS.STANDARD,
    color: "#A0522D",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  BENJI: {
    name: "Basenji",
    logo: benjiLogo,
    decimals: DECIMALS.STANDARD,
    color: "#F28B82",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  MIGGLES: {
    name: "Mister Miggles",
    logo: migglesLogo,
    decimals: DECIMALS.STANDARD,
    color: "#F5F5DC",
    sourceLogo: baseLogo,
    source: "BASE",
  },
  DEGEN: {
    name: "Degen",
    logo: degenLogo,
    decimals: DECIMALS.STANDARD,
    color: "#9400D3",
    sourceLogo: baseLogo,
    source: "BASE",
  },
} as const;

type BridgeTokenInput = {
  symbol: string;
  address: string;
  type: "OFT" | "oftAdapter";
  oftAdapter: string;
  bridgedOft: string;
  nativeChain: "base" | "ethereum";
  source: "base" | "ethereum";
};

export const generateTokenConfig = (
  tokenList: { symbol: keyof typeof tokenConfig; address: string }[]
): ITokenConfig => {
  const result: ITokenConfig = {};

  tokenList.forEach(({ symbol, address }) => {
    const config = tokenConfig[symbol];
    if (!config) return;

    result[address] = {
      ...config,
      symbol,
      address,
    } as IToken;
  });

  return result;
};

export const generateBridgeTokenConfig = (
  bridgeTokenList: BridgeTokenInput[],
  tokens: Record<string, any>
): IBridgeTokenConfig => {
  const result: IBridgeTokenConfig = {};

  bridgeTokenList.forEach((bridgeToken) => {
    const {
      symbol,
      address,
      type,
      oftAdapter,
      bridgedOft,
      nativeChain,
      source,
    } = bridgeToken;

    // Find the original token address that matches the symbol
    const originalTokenEntry = Object.entries(tokens).find(
      ([_, token]) => token.symbol === symbol
    );
    if (!originalTokenEntry) return;

    result[address] = {
      ...tokens[originalTokenEntry[0]],
      address,
      type,
      oftAdapter,
      bridgedOft,
      nativeChain,
      source,
    };
  });

  return result;
};
