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
  CHEDDA: "0xAA74BE45C0e21c105b7981C6E6FdFd946dc49f27",
  USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  USDT: "0xF621E3fF2379d9a64a614A4D8C6b0dD6fa014A18",
  DAI: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
  WETH: "0x4200000000000000000000000000000000000006",
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
  cbETH: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
  cbBTC: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
  BRETT: "0x532f27101965dd16442E59d40670FaF5eBB142E4",
  TOSHI: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4",
  BENJI: "0x5BCf9dEe88Db86430E05bd244A31235163ee2B88",
  MIGGLES: "0x54DDe893342e0295c0a9D4F188003Dca77067c6B",
  DEGEN: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
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

const mainnetTokens = generateTokenConfig(
  Object.entries(TOKEN_ADDRESSES).map(([symbol, address]) => ({
    symbol: symbol as keyof typeof TOKEN_ADDRESSES,
    address,
  }))
);

const bridgeTokens = generateBridgeTokenConfig(bridgeTokenList, mainnetTokens);

export const stagingEnvironment: IEnvironment = {
  production: false,
  environmentName: "Base",
  jsonRpcUrl: `https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`,
  webSocketUrl: `wss://base-mainnet.g.alchemy.com/v2/${alchemyKey}`,
  hostUrl: `https://staging.chedda.finance`,
  txUrlPrefix: "https://basescan.org/tx",
  contractPrefix: "https://basescan.org/address",
  chainId: CHAIN_IDS.BASE_MAINNET,
  contracts: {
    LendingPoolLens: "0xe7C94063e55d1E8333dcb5807399aC5C05d9Acc9",
    AccountActor: "0x976B5b9e89378e9299849f033150eE302657A3Ed",
    InterestRatesProjector: "0xfE985fEf25DC44c6359BAC01BA1D34d1596b24eC",
    PriceFeed: "0x989ae31649095f8Ccd687f74c005FAB55c3B1999",
    LockingGaugeRewardsDistributor:
      "0xB0A47be6707E3122F1CF4C2259897E6e97380E1A",
    CheddaToken: "0xAA74BE45C0e21c105b7981C6E6FdFd946dc49f27",
    veChedda: "0x0",
    Faucet: "0x0A5Fe3dd684B1aA04d156d42C259a9feF887255e",
  },
  tokens: mainnetTokens,
  bridgeTokens,
};
