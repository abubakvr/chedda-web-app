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
import { DECIMALS, IBridgeTokenConfig, ITokenConfig } from "@/utils/types";

export const tokens: ITokenConfig = {
  "0xAB3ABb5C1B69dC4fFe6B6FA0D633DD436E1639c2": {
    name: "Chedda Token",
    symbol: "CHEDDA",
    address: "0xAB3ABb5C1B69dC4fFe6B6FA0D633DD436E1639c2",
    logo: cheddaLogo,
    decimals: DECIMALS.STANDARD,
    color: "#3498db",
    sourceLogo: baseLogo,
  },
  "0xc349d33292F4958d5E616035241bE2ab2dE85100": {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xc349d33292F4958d5E616035241bE2ab2dE85100",
    logo: usdcLogo,
    decimals: DECIMALS.STABLE,
    color: "#3498db",
    sourceLogo: baseLogo,
  },
  "0xF621E3fF2379d9a64a614A4D8C6b0dD6fa014A18": {
    name: "Tether USD",
    symbol: "USDT",
    address: "0xF621E3fF2379d9a64a614A4D8C6b0dD6fa014A18",
    logo: usdtLogo,
    decimals: DECIMALS.STABLE,
    color: "#2ecc71",
    sourceLogo: baseLogo,
  },
  "0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b": {
    name: "DAI Stablecoin",
    symbol: "DAI",
    address: "0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b",
    logo: daiLogo,
    decimals: DECIMALS.STANDARD,
    color: "#FFC26F",
    sourceLogo: baseLogo,
  },
  "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511": {
    name: "Wrapped ETH",
    symbol: "WETH",
    address: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511",
    logo: etheruemLogo,
    decimals: DECIMALS.STANDARD,
    color: "#687EFF",
    sourceLogo: baseLogo,
  },
  "0x12110BA7e972D03f90fCDe07F92e603f9D1ED982": {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0x12110BA7e972D03f90fCDe07F92e603f9D1ED982",
    logo: bitcoinLogo,
    decimals: DECIMALS.BTC,
    color: "#FFC436",
    sourceLogo: baseLogo,
  },
  "0x2d5246fcC20Df5Cdf5346254702a7cBD77E7DBC3": {
    name: "Aerodrome",
    symbol: "AERO",
    address: "0x2d5246fcC20Df5Cdf5346254702a7cBD77E7DBC3",
    logo: aeroLogo,
    decimals: DECIMALS.STANDARD,
    color: "#D8D8D8",
    sourceLogo: baseLogo,
  },
  "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0": {
    name: "AAVE",
    symbol: "AAVE",
    address: "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0",
    logo: aaveLogo,
    decimals: DECIMALS.STANDARD,
    color: "#DDE6ED",
    sourceLogo: baseLogo,
  },
  "0xC58bb755381C43FC8A9505fFa7C44d8737203300": {
    name: "Compound",
    symbol: "COMP",
    address: "0xC58bb755381C43FC8A9505fFa7C44d8737203300",
    logo: compoundLogo,
    decimals: DECIMALS.STANDARD,
    color: "#85CDFD",
    sourceLogo: baseLogo,
  },
  "0x8166D0DeFb96900075a667FFb099DE8A493A4DfD": {
    name: "Uniswap",
    symbol: "UNI",
    address: "0x8166D0DeFb96900075a667FFb099DE8A493A4DfD",
    logo: uniswapLogo,
    decimals: DECIMALS.STANDARD,
    color: "#E26EE5",
    sourceLogo: baseLogo,
  },
  "0xFcA37314E6E1e399e7054C14B2746f3BC9F33fEB": {
    name: "Echelon Prime",
    symbol: "PRIME",
    address: "0xFcA37314E6E1e399e7054C14B2746f3BC9F33fEB",
    logo: primeLogo,
    decimals: DECIMALS.STANDARD,
    color: "#0E8388",
    sourceLogo: baseLogo,
  },
  "0xc1e5599f1ac90995762302D946AF619bD9824813": {
    name: "Heroes of Mavia",
    symbol: "MAVIA",
    address: "0xc1e5599f1ac90995762302D946AF619bD9824813",
    logo: maviaLogo,
    decimals: DECIMALS.STANDARD,
    color: "#DDE6ED",
    sourceLogo: baseLogo,
  },
  "0xf66312E6e525271C4d8F65353a24bA593079739c": {
    name: "Gala",
    symbol: "GALA",
    address: "0xf66312E6e525271C4d8F65353a24bA593079739c",
    logo: galaLogo,
    decimals: DECIMALS.STANDARD,
    color: "#DDE6ED",
    sourceLogo: etheruemLogo,
  },
  "0x85b21815bCe36a8AD51E8cba234E7A746FE1d41a": {
    name: "Beam",
    symbol: "BEAM",
    address: "0x85b21815bCe36a8AD51E8cba234E7A746FE1d41a",
    logo: beamLogo,
    decimals: DECIMALS.STANDARD,
    color: "#DDE6ED",
    sourceLogo: etheruemLogo,
  },
  "0x9eb80c8E7b37bbbA9024D400F38Df6eC95d7D9AD": {
    name: "The Sandbox",
    symbol: "SAND",
    address: "0x9eb80c8E7b37bbbA9024D400F38Df6eC95d7D9AD",
    logo: sandLogo,
    decimals: DECIMALS.STANDARD,
    color: "#A7F09B",
    sourceLogo: etheruemLogo,
  },
  "0xF1cF6113d2f6B44Bffa7C44D82640Db4e721B48a": {
    name: "Coinbase Wrapped ETH",
    symbol: "cbETH",
    address: "0xF1cF6113d2f6B44Bffa7C44D82640Db4e721B48a",
    logo: cbETHLogo,
    decimals: DECIMALS.STANDARD,
    color: "#87CEEB",
    sourceLogo: baseLogo,
  },
  "0x1bf0aeb4C1A1C0896887814d679defcc1325EdE3": {
    name: "Coinbase Wrapped BTC",
    symbol: "cbBTC",
    address: "0x1bf0aeb4C1A1C0896887814d679defcc1325EdE3",
    logo: cbBTCLogo,
    decimals: 8,
    color: "#F28B82",
    sourceLogo: baseLogo,
  },
  "0x324bdE7aA1b130bE41E6eE79d5B6f60Db2dE2D62": {
    name: "Brett",
    symbol: "BRETT",
    address: "0x324bdE7aA1b130bE41E6eE79d5B6f60Db2dE2D62",
    logo: brettLogo,
    decimals: DECIMALS.STANDARD,
    color: "#6495ED",
    sourceLogo: baseLogo,
  },
  "0x69c6AE47a9eCEB29b1d1a15c16f25AD9D74678df": {
    name: "Toshi",
    symbol: "TOSHI",
    address: "0x69c6AE47a9eCEB29b1d1a15c16f25AD9D74678df",
    logo: toshiLogo,
    decimals: DECIMALS.STANDARD,
    color: "#A0522D",
    sourceLogo: baseLogo,
  },
  "0x5BCf9dEe88Db86430E05bd244A31235163ee2B88": {
    name: "Basenji",
    symbol: "BENJI",
    address: "0x5BCf9dEe88Db86430E05bd244A31235163ee2B88",
    logo: benjiLogo,
    decimals: DECIMALS.STANDARD,
    color: "#F28B82",
    sourceLogo: baseLogo,
  },
  "0x54DDe893342e0295c0a9D4F188003Dca77067c6B": {
    name: "Mister Miggles",
    symbol: "MIGGLES",
    address: "0x54DDe893342e0295c0a9D4F188003Dca77067c6B",
    logo: migglesLogo,
    decimals: DECIMALS.STANDARD,
    color: "#F5F5DC",
    sourceLogo: baseLogo,
  },
};

export const bridgeTokens: IBridgeTokenConfig = {
  "0xAB3ABb5C1B69dC4fFe6B6FA0D633DD436E1639c2": {
    ...tokens["0xAB3ABb5C1B69dC4fFe6B6FA0D633DD436E1639c2"],
    type: "OFT",
    oftAdapter: "0x0",
    bridgedOft: "0x2D36952da155e396CB1E3ef196117CEFF8b9e55C",
    nativeChain: "base",
    source: "base",
  },
  "0x74EB135902B4A4B33FB218aff1D7Dd437DcB7186": {
    ...tokens["0xf66312E6e525271C4d8F65353a24bA593079739c"],
    address: "0x74EB135902B4A4B33FB218aff1D7Dd437DcB7186",
    type: "oftAdapter",
    oftAdapter: "0x311F0DD563582f7a94ED605429446dCc6bA68bBF",
    bridgedOft: "0xf66312E6e525271C4d8F65353a24bA593079739c",
    nativeChain: "ethereum",
    source: "ethereum",
  },
  "0xbf2a96C43636bcEE0826168E904CaB6C1072820D": {
    ...tokens["0x85b21815bCe36a8AD51E8cba234E7A746FE1d41a"],
    address: "0xbf2a96C43636bcEE0826168E904CaB6C1072820D",
    type: "oftAdapter",
    oftAdapter: "0x0dbb7d305434d01cd9E408b0ddc5A227d563a921",
    bridgedOft: "0x85b21815bCe36a8AD51E8cba234E7A746FE1d41a",
    nativeChain: "ethereum",
    source: "ethereum",
  },
  "0xAdBCD031E337453a2451f336194F9912Ff3D0893": {
    ...tokens["0x9eb80c8E7b37bbbA9024D400F38Df6eC95d7D9AD"],
    address: "0xAdBCD031E337453a2451f336194F9912Ff3D0893",
    type: "oftAdapter",
    oftAdapter: "0xCBfa283cCc60CF5151AAf5f73F9513e7321c8483",
    bridgedOft: "0x9eb80c8E7b37bbbA9024D400F38Df6eC95d7D9AD",
    nativeChain: "ethereum",
    source: "ethereum",
  },
};
