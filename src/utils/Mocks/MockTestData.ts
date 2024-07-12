import { StaticImageData } from "next/image";
import {
  IFormattedCollateral,
  IPoolStatsResponse,
  ISummaryStats,
} from "../types";
import { BigNumber } from "ethers";
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
      },
      {
        name: "CollateralToken2",
        symbol: "CT2",
        address: "0x789ghi",
        logo: {} as StaticImageData,
        decimals: 18,
        color: "#ffffff",
      },
    ],
    categories: ["defi", "bluechip"],
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
      },
      {
        name: "CollateralToken6",
        symbol: "CT6",
        address: "0x987cba",
        logo: {} as StaticImageData,
        decimals: 18,
        color: "#ffffff",
      },
    ],
    categories: ["defi"],
    rewardsAPY: 90909,
  },
];

export const mockGetPoolStats: IPoolStats[] = [
  {
    pool: "Pool1",
    asset: "Asset1",
    characterization: "Characterization1",
    supplied: BigNumber.from(100),
    suppliedValue: BigNumber.from(200),
    borrowed: BigNumber.from(50),
    borrowedValue: BigNumber.from(100),
    baseSupplyAPY: BigNumber.from(5),
    maxSupplyAPY: BigNumber.from(10),
    baseBorrowAPY: BigNumber.from(3),
    maxBorrowAPY: BigNumber.from(8),
    utilization: BigNumber.from(89),
    feesPaid: BigNumber.from(1),
    tvl: BigNumber.from(300),
    collaterals: ["Collateral1", "Collateral2"],
    dailyRewards: BigNumber.from(89),
    rewardsAPY: BigNumber.from(89),
  },
  {
    pool: "Pool1",
    asset: "Asset1",
    characterization: "Characterization1",
    supplied: BigNumber.from(100),
    suppliedValue: BigNumber.from(200),
    borrowed: BigNumber.from(50),
    borrowedValue: BigNumber.from(100),
    baseSupplyAPY: BigNumber.from(5),
    maxSupplyAPY: BigNumber.from(10),
    baseBorrowAPY: BigNumber.from(3),
    maxBorrowAPY: BigNumber.from(8),
    utilization: BigNumber.from(89),
    feesPaid: BigNumber.from(1),
    tvl: BigNumber.from(300),
    collaterals: ["Collateral1", "Collateral2"],
    dailyRewards: BigNumber.from(89),
    rewardsAPY: BigNumber.from(89),
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
  walletAssetBalance: BigNumber.from(1000),
  supplied: BigNumber.from(1000),
  borrowed: BigNumber.from(500),
  decimals: 2,
  healthFactor: BigNumber.from(250),
  totalCollateralValue: BigNumber.from(20000),
  collateralDeposited: [
    {
      token: "0x00",
      decimals: 2,
      amount: BigNumber.from(10),
      value: BigNumber.from(5000),
      tokenIds: [1, 2, 3].map((id) => BigNumber.from(id)),
    },
    {
      token: "0x00",
      decimals: 2,
      amount: BigNumber.from(15),
      value: BigNumber.from(8000),
      tokenIds: [4, 5, 6].map((id) => BigNumber.from(id)),
    },
  ],
};

export const mockMarketInfo: IMarketInfo = {
  oraclePrice: BigNumber.from("1000000000000000000"),
  oraclePriceDecimals: BigNumber.from("18"),
  interestFee: BigNumber.from("500"),
  supplyCap: BigNumber.from("100000000000000000000"),
  liquidationThreshold: BigNumber.from("7500"),
  liquidationPenalty: BigNumber.from("1500"),
  liquidity: BigNumber.from("1500"),
  utilization: BigNumber.from("1500"),
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
    },
    decimals: 18,
    value: 1000,
    amountDeposited: "500",
    myCollateralValue: "250",
    myCollateralAmount: "50",
    collateralFactor: "1.5",
  },
  {
    asset: {
      name: "Token2",
      symbol: "T2",
      address: "0xfedcba",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#112233",
    },
    decimals: 18,
    value: 2000,
    amountDeposited: "1000",
    myCollateralValue: "500",
    myCollateralAmount: "100",
    collateralFactor: "2.0",
  },
];

export const mockPoolStateEvents: IPoolState[] = [
  {
    pool: "MockPool1",
    timestamp: BigNumber.from(1640995200),
    supplied: BigNumber.from("1000000000000000000"),
    borrowed: BigNumber.from("500000000000000000"),
    supplyRate: BigNumber.from("1000000000000000"),
    borrowRate: BigNumber.from("500000000000000"),
  },
  {
    pool: "MockPool2",
    timestamp: BigNumber.from(1641081600),
    supplied: BigNumber.from("1500000000000000000"),
    borrowed: BigNumber.from("750000000000000000"),
    supplyRate: BigNumber.from("1500000000000000"),
    borrowRate: BigNumber.from("750000000000000"),
  },
];

export const mockInterestRates = [
  {
    utilization: BigNumber.from("750000000000000000"),
    supplyRate: BigNumber.from("50000000000000000"),
    borrowRate: BigNumber.from("150000000000000000"),
  },
  {
    utilization: BigNumber.from("510000000000000000"),
    supplyRate: BigNumber.from("50000000000000000"),
    borrowRate: BigNumber.from("750000000000000000"),
  },
  {
    utilization: BigNumber.from("40000000000000000"),
    supplyRate: BigNumber.from("650000000000000000"),
    borrowRate: BigNumber.from("7000000000000000"), // 6%
  },
];
