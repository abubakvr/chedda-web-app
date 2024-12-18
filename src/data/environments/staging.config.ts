import { alchemyKey } from "@/utils/constants";
import { IEnvironment } from "@/utils/types";
import { CHAIN_IDS } from "../chainIds";
import {
  generateBridgeTokenConfig,
  generateTokenConfig,
} from "@/utils/generateTokens";

enum Chain {
  BASE = "base",
  ETHEREUM = "ethereum",
}

enum TokenType {
  OFT = "OFT",
  OFT_ADAPTER = "oftAdapter",
}

const TOKEN_ADDRESSES = {
  CHEDDA: "0xAB3ABb5C1B69dC4fFe6B6FA0D633DD436E1639c2",
  USDC: "0xc349d33292F4958d5E616035241bE2ab2dE85100",
  USDT: "0xF621E3fF2379d9a64a614A4D8C6b0dD6fa014A18",
  DAI: "0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b",
  WETH: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511",
  WBTC: "0x12110BA7e972D03f90fCDe07F92e603f9D1ED982",
  AERO: "0x2d5246fcC20Df5Cdf5346254702a7cBD77E7DBC3",
  AAVE: "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0",
  COMP: "0xC58bb755381C43FC8A9505fFa7C44d8737203300",
  UNI: "0x8166D0DeFb96900075a667FFb099DE8A493A4DfD",
  PRIME: "0xFcA37314E6E1e399e7054C14B2746f3BC9F33fEB",
  MAVIA: "0xc1e5599f1ac90995762302D946AF619bD9824813",
  GALA: "0xf66312E6e525271C4d8F65353a24bA593079739c",
  BEAM: "0x85b21815bCe36a8AD51E8cba234E7A746FE1d41a",
  SAND: "0x9eb80c8E7b37bbbA9024D400F38Df6eC95d7D9AD",
  cbETH: "0xF1cF6113d2f6B44Bffa7C44D82640Db4e721B48a",
  cbBTC: "0x1bf0aeb4C1A1C0896887814d679defcc1325EdE3",
  BRETT: "0x324bdE7aA1b130bE41E6eE79d5B6f60Db2dE2D62",
  TOSHI: "0x69c6AE47a9eCEB29b1d1a15c16f25AD9D74678df",
  BENJI: "0x5BCf9dEe88Db86430E05bd244A31235163ee2B88",
  MIGGLES: "0x54DDe893342e0295c0a9D4F188003Dca77067c6B",
};

const bridgeTokenList = [
  {
    symbol: "CHEDDA",
    address: "0xAB3ABb5C1B69dC4fFe6B6FA0D633DD436E1639c2",
    type: TokenType.OFT,
    oftAdapter: "0x0",
    bridgedOft: "0x2D36952da155e396CB1E3ef196117CEFF8b9e55C",
    nativeChain: Chain.BASE,
    source: Chain.BASE,
  },
  {
    symbol: "GALA",
    type: TokenType.OFT_ADAPTER,
    address: "0x74EB135902B4A4B33FB218aff1D7Dd437DcB7186",
    oftAdapter: "0x311F0DD563582f7a94ED605429446dCc6bA68bBF",
    bridgedOft: "0xf66312E6e525271C4d8F65353a24bA593079739c",
    nativeChain: Chain.ETHEREUM,
    source: Chain.ETHEREUM,
  },
  {
    symbol: "BEAM",
    type: TokenType.OFT_ADAPTER,
    address: "0xbf2a96C43636bcEE0826168E904CaB6C1072820D",
    oftAdapter: "0x0dbb7d305434d01cd9E408b0ddc5A227d563a921",
    bridgedOft: "0x85b21815bCe36a8AD51E8cba234E7A746FE1d41a",
    nativeChain: Chain.ETHEREUM,
    source: Chain.ETHEREUM,
  },
  {
    symbol: "SAND",
    type: TokenType.OFT_ADAPTER,
    address: "0xAdBCD031E337453a2451f336194F9912Ff3D0893",
    oftAdapter: "0xCBfa283cCc60CF5151AAf5f73F9513e7321c8483",
    bridgedOft: "0x9eb80c8E7b37bbbA9024D400F38Df6eC95d7D9AD",
    nativeChain: Chain.ETHEREUM,
    source: Chain.ETHEREUM,
  },
];

const testnetTokens = generateTokenConfig(
  Object.entries(TOKEN_ADDRESSES).map(([symbol, address]) => ({
    symbol: symbol as keyof typeof TOKEN_ADDRESSES,
    address,
  }))
);

const bridgeTokens = generateBridgeTokenConfig(bridgeTokenList, testnetTokens);

export const stagingEnvironment: IEnvironment = {
  production: false,
  environmentName: "Base Sepolia",
  jsonRpcUrl: `https://base-sepolia.g.alchemy.com/v2/${alchemyKey}`,
  webSocketUrl: `wss://base-sepolia.g.alchemy.com/v2/${alchemyKey}`,
  txUrlPrefix: "https://sepolia.basescan.org/tx",
  contractPrefix: "https://sepolia.basescan.org/address",
  chainId: CHAIN_IDS.BASE_SEPOLIA,
  contracts: {
    LendingPoolLens: "0xB99Caa9905cf847AD19e5435FaB5743F37dDf0d7",
    AccountActor: "0x86C61197E8fc0904F0458C81Ab32E3fB5F2e138C",
    InterestRatesProjector: "0xcbaA2bBCE7d15131914Cf7Db7944E06b2143dEB1",
    PriceFeed: "0x4f69E2b5c3a93F33932e0faFAb3B516510aa5ab6",
    LockingGaugeRewardsDistributor:
      "0xB0A47be6707E3122F1CF4C2259897E6e97380E1A",
    CheddaToken: "0xAB3ABb5C1B69dC4fFe6B6FA0D633DD436E1639c2",
    veChedda: "0x0",
    Faucet: "0x0A5Fe3dd684B1aA04d156d42C259a9feF887255e",
  },
  tokens: testnetTokens,
  bridgeTokens,
};
