import { StaticImageData } from "next/image";
import {
  IFormattedCollateral,
  IPoolStatsResponse,
  ISummaryStats,
} from "../types";
import { IAccountInfo, IMarketInfo, IPoolState, IPoolStats } from "chedda-sdk";

export const mockPoolStats: IPoolStatsResponse[] = [
  {
    pool: "Pool1",
    asset: {
      name: "Token1",
      symbol: "T1",
      address: "0x123abc",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
      sourceLogo: {} as StaticImageData,
      source: "Base",
    },
    characterization: "Characterization1",
    supplied: 1000,
    suppliedValue: 5000,
    borrowed: 200,
    borrowedValue: 1000,
    baseSupplyAPY: 5,
    maxSupplyAPY: 8,
    baseBorrowAPY: 2,
    maxBorrowAPY: 4,
    utilization: 50,
    feesPaid: 10,
    tvl: 15000,
    collaterals: [
      {
        name: "CollateralToken1",
        symbol: "CT1",
        address: "0x456def",
        logo: {} as StaticImageData,
        decimals: 18,
        color: "#ffffff",
        sourceLogo: {} as StaticImageData,
        source: "Base",
      },
      {
        name: "CollateralToken2",
        symbol: "CT2",
        address: "0x789ghi",
        logo: {} as StaticImageData,
        decimals: 18,
        color: "#ffffff",
        sourceLogo: {} as StaticImageData,
        source: "Base",
      },
    ],
    categories: ["defi"],
    rewardsAPY: 90909,
  },
  {
    pool: "Pool3",
    asset: {
      name: "Token3",
      symbol: "T3",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
      sourceLogo: {} as StaticImageData,
      source: "Base",
    },
    characterization: "Characterization3",
    supplied: 1200,
    suppliedValue: 6000,
    borrowed: 180,
    borrowedValue: 900,
    baseSupplyAPY: 6,
    maxSupplyAPY: 9,
    baseBorrowAPY: 2.5,
    maxBorrowAPY: 4.5,
    utilization: 60,
    feesPaid: 12,
    tvl: 18000,
    collaterals: [
      {
        name: "CollateralToken5",
        symbol: "CT5",
        address: "0x321fed",
        logo: {} as StaticImageData,
        decimals: 18,
        color: "#ffffff",
        sourceLogo: {} as StaticImageData,
        source: "Base",
      },
      {
        name: "CollateralToken6",
        symbol: "CT6",
        address: "0x987cba",
        logo: {} as StaticImageData,
        decimals: 18,
        color: "#ffffff",
        sourceLogo: {} as StaticImageData,
        source: "Base",
      },
    ],
    categories: ["bluechip"],
    rewardsAPY: 90909,
  },
];

export const mockGetPoolStats: IPoolStats[] = [
  {
    pool: "Pool1",
    asset: "Asset1",
    characterization: "Characterization1",
    supplied: BigInt(100),
    suppliedValue: BigInt(200),
    borrowed: BigInt(50),
    borrowedValue: BigInt(100),
    baseSupplyAPY: BigInt(5),
    maxSupplyAPY: BigInt(10),
    baseBorrowAPY: BigInt(3),
    maxBorrowAPY: BigInt(8),
    utilization: BigInt(89),
    feesPaid: BigInt(1),
    tvl: BigInt(300),
    collaterals: ["Collateral1", "Collateral2"],
    dailyRewards: BigInt(89),
    rewardsAPY: BigInt(89),
  },
  {
    pool: "Pool1",
    asset: "Asset1",
    characterization: "Characterization1",
    supplied: BigInt(100),
    suppliedValue: BigInt(200),
    borrowed: BigInt(50),
    borrowedValue: BigInt(100),
    baseSupplyAPY: BigInt(5),
    maxSupplyAPY: BigInt(10),
    baseBorrowAPY: BigInt(3),
    maxBorrowAPY: BigInt(8),
    utilization: BigInt(89),
    feesPaid: BigInt(1),
    tvl: BigInt(300),
    collaterals: ["Collateral1", "Collateral2"],
    dailyRewards: BigInt(89),
    rewardsAPY: BigInt(89),
  },
];

export const mockCurrentEnvironment = {
  production: false,
  environmentName: "mockEnvironment",
  jsonRpcUrl: "http://mock-json-rpc-url",
  webSocketUrl: "wss://mock-websocket-url",
  txUrlPrefix: "http://mock-prefix-url",
  contractPrefix: "http://mockContractPrefix.com",
  chainId: 1,
  contracts: {
    LendingPoolLens: "mockLendingPoolLensAddress",
    InterestRatesProjector: "mockLendingPoolLensAddress",
    Chedda: "mockCheddaAddress",
    PriceFeed: "mockPriceFeedAddress",
    LockingGaugeRewardsDistributor: "mockLockingGaugeRewardsAddress",
    veChedda: "mockVeCheddaAddress",
    Faucet: "mockFaucetAddress",
  },
  tokens: {
    4334: {
      name: "CollateralToken5",
      symbol: "CT5",
      address: "0x321fed",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#FFFFFF",
    },
    35234: {
      name: "CollateralToken6",
      symbol: "CT6",
      address: "0x987cba",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#FFFFFF",
    },
  },
};

export const mockAggregateStats: ISummaryStats[] = [
  {
    title: "Total Supplied",
    value: "$0.00",
  },
  {
    title: "Total Borrowed",
    value: "$0.00",
  },
  {
    title: "Total Available",
    value: "$0.00",
  },
  {
    title: "No. Of Vaults",
    value: "0.00",
  },
  {
    title: "Total Earned",
    value: "$0.00",
  },
  {
    title: "TVL",
    value: "$0.00",
  },
];

export const mockAccountInfo: IAccountInfo = {
  walletAssetBalance: BigInt(1000),
  supplied: BigInt(1000),
  borrowed: BigInt(500),
  decimals: 2,
  healthFactor: BigInt(250),
  totalCollateralValue: BigInt(20000),
  collateralDeposited: [
    {
      token: "0x00",
      decimals: 2,
      amount: BigInt(10),
      value: BigInt(5000),
      tokenIds: [1, 2, 3].map((id) => BigInt(id)),
    },
    {
      token: "0x00",
      decimals: 2,
      amount: BigInt(15),
      value: BigInt(8000),
      tokenIds: [4, 5, 6].map((id) => BigInt(id)),
    },
  ],
};

export const mockMarketInfo: IMarketInfo = {
  oraclePrice: BigInt("1000000000000000000"),
  oraclePriceDecimals: BigInt("18"),
  interestFee: BigInt("500"),
  supplyCap: BigInt("100000000000000000000"),
  liquidationThreshold: BigInt("7500"),
  liquidationPenalty: BigInt("1500"),
  liquidity: BigInt("1500"),
  utilization: BigInt("1500"),
};

export const mockCollateralInfo: IFormattedCollateral[] = [
  {
    asset: {
      name: "Token1",
      symbol: "T1",
      address: "0xabcdef",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#FFAABB",
      sourceLogo: {} as StaticImageData,
      source: "Base",
    },
    decimals: 18,
    value: 1000,
    amountDeposited: "500",
    myCollateralValue: "250",
    myCollateralAmount: "50",
    lltv: "1.5",
    ltv: "2.5",
    bonus: "3.5",
    penalty: "4.5",
  },
  {
    asset: {
      name: "Token2",
      symbol: "T2",
      address: "0xfedcba",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#112233",
      sourceLogo: {} as StaticImageData,
      source: "Base",
    },
    decimals: 18,
    value: 2000,
    amountDeposited: "1000",
    myCollateralValue: "500",
    myCollateralAmount: "100",
    ltv: "2.0",
    lltv: "2.0",
    bonus: "2.0",
    penalty: "2.0",
  },
];

export const mockPoolStateEvents: IPoolState[] = [
  {
    pool: "MockPool1",
    timestamp: BigInt(1640995200),
    supplied: BigInt("1000000000000000000"),
    borrowed: BigInt("500000000000000000"),
    supplyRate: BigInt("1000000000000000"),
    borrowRate: BigInt("500000000000000"),
  },
  {
    pool: "MockPool2",
    timestamp: BigInt(1641081600),
    supplied: BigInt("1500000000000000000"),
    borrowed: BigInt("750000000000000000"),
    supplyRate: BigInt("1500000000000000"),
    borrowRate: BigInt("750000000000000"),
  },
];

export const mockInterestRates = [
  {
    utilization: BigInt("750000000000000000"),
    supplyRate: BigInt("50000000000000000"),
    borrowRate: BigInt("150000000000000000"),
  },
  {
    utilization: BigInt("510000000000000000"),
    supplyRate: BigInt("50000000000000000"),
    borrowRate: BigInt("750000000000000000"),
  },
  {
    utilization: BigInt("40000000000000000"),
    supplyRate: BigInt("650000000000000000"),
    borrowRate: BigInt("7000000000000000"), // 6%
  },
];
