import {
  formatPoolStatsList,
  formatPoolStats,
  mapCollateralsToTokens,
  getAggregateInfo,
  getPoolSummaryData,
  formatCollateralInfo,
  calculateAssetPrice,
  formatPositionsList,
} from "../formatResponse";
import { ITokenConfig, IPoolStatsResponse, ICollateralInfo } from "../types";
import {
  IAccountCollateralDeposited,
  IAggregateStats,
  IPoolStats,
  IPosition,
} from "chedda-sdk";
import { StaticImageData } from "next/image";

jest.mock("../constants", () => ({
  poolFilters: {
    mockPool1: {
      categories: ["bluechip"],
    },
    mockPool2: {
      categories: ["defi"],
    },
  },
}));

const mockResponse: IPoolStats[] = [
  {
    pool: "mockPool1",
    asset: "asset1",
    characterization: "characterization1",
    supplied: BigInt("1000000000000000000"),
    suppliedValue: BigInt("2000000000000000000"),
    borrowed: BigInt("3000000000000000000"),
    borrowedValue: BigInt("4000000000000000000"),
    baseSupplyAPY: BigInt("5000000000000000000"),
    maxSupplyAPY: BigInt("6000000000000000000"),
    baseBorrowAPY: BigInt("7000000000000000000"),
    maxBorrowAPY: BigInt("8000000000000000000"),
    utilization: BigInt("9000000000000000000"),
    rewardsAPY: BigInt("10000000000000000000"),
    feesPaid: BigInt("11000000000000000000"),
    tvl: BigInt("12000000000000000000"),
    collaterals: ["collateral1", "collateral2"],
    dailyRewards: BigInt("12000000000000000000"),
  },
];

const mockTokens: ITokenConfig = {
  asset1: {
    name: "Token1",
    symbol: "T1",
    address: "0x123abc",
    logo: {} as StaticImageData,
    decimals: 18,
    color: "#ffffff",
    source: "base",
    sourceLogo: {} as StaticImageData,
  },
  collateral1: {
    name: "Token1",
    symbol: "T1",
    address: "0x123abc",
    logo: {} as StaticImageData,
    decimals: 18,
    color: "#ffffff",
    source: "base",
    sourceLogo: {} as StaticImageData,
  },
  collateral2: {
    name: "Token1",
    symbol: "T1",
    address: "0x123abc",
    logo: {} as StaticImageData,
    decimals: 18,
    color: "#ffffff",
    source: "base",
    sourceLogo: {} as StaticImageData,
  },
};

describe("formatPoolStatsList", () => {
  it("should format pool stats correctly", () => {
    // Act
    const result = formatPoolStatsList(mockResponse, mockTokens);

    // Assert
    expect(result).toEqual([
      {
        pool: "mockPool1",
        asset: {
          name: "Token1",
          symbol: "T1",
          address: "0x123abc",
          logo: {} as StaticImageData,
          decimals: 18,
          color: "#ffffff",
          source: "base",
          sourceLogo: {} as StaticImageData,
        },
        characterization: "characterization1",
        supplied: 1,
        suppliedValue: 2,
        borrowed: 3,
        borrowedValue: 4,
        baseSupplyAPY: 5,
        maxSupplyAPY: 6,
        baseBorrowAPY: 7,
        maxBorrowAPY: 8,
        utilization: 9,
        rewardsAPY: 10,
        feesPaid: 11,
        tvl: 12,
        collaterals: [
          {
            name: "Token1",
            symbol: "T1",
            address: "0x123abc",
            logo: {} as StaticImageData,
            decimals: 18,
            color: "#ffffff",
            source: "base",
            sourceLogo: {} as StaticImageData,
          },
          {
            name: "Token1",
            symbol: "T1",
            address: "0x123abc",
            logo: {} as StaticImageData,
            decimals: 18,
            color: "#ffffff",
            source: "base",
            sourceLogo: {} as StaticImageData,
          },
        ],
        categories: ["bluechip"],
      },
    ]);
  });
});

describe("getAggregateInfo", () => {
  it("should format aggregate stats correctly", () => {
    // Arrange
    const mockAggregateStats: IAggregateStats = {
      totalSuppliedValue: BigInt("1000000000000000000"),
      totalBorrowedValue: BigInt("2000000000000000000"),
      totalAvailableValue: BigInt("3000000000000000000"),
      numberOfVaults: BigInt("4"),
      totalFeesPaid: BigInt("5"),
      tvl: BigInt("6000000000000000000"),
    };

    // Act
    const result = getAggregateInfo(mockAggregateStats);

    // Assert
    expect(result).toEqual([
      { title: "Total Supplied", value: "$1.00" },
      { title: "Total Borrowed", value: "$2.00" },
      { title: "Total Available", value: "$3.00" },
      { title: "No. Of Pools", value: 4 },
      { title: "Total Earned", value: "0" },
      { title: "TVL", value: "$6.00" },
    ]);
  });
});

describe("formatPoolStats", () => {
  it("should format pool stats correctly", () => {
    // Act
    const result = formatPoolStats(mockResponse[0], mockTokens);

    // Assert
    expect(result).toEqual({
      pool: "mockPool1",
      asset: {
        name: "Token1",
        symbol: "T1",
        address: "0x123abc",
        logo: {} as StaticImageData,
        decimals: 18,
        color: "#ffffff",
        source: "base",
        sourceLogo: {} as StaticImageData,
      },
      characterization: "characterization1",
      supplied: 1,
      suppliedValue: 2,
      borrowed: 3,
      borrowedValue: 4,
      baseSupplyAPY: 5,
      maxSupplyAPY: 6,
      baseBorrowAPY: 7,
      maxBorrowAPY: 8,
      utilization: 9,
      rewardsAPY: 10,
      feesPaid: 11,
      tvl: 12,
      collaterals: [
        {
          name: "Token1",
          symbol: "T1",
          address: "0x123abc",
          logo: {} as StaticImageData,
          decimals: 18,
          color: "#ffffff",
          source: "base",
          sourceLogo: {} as StaticImageData,
        },
        {
          name: "Token1",
          symbol: "T1",
          address: "0x123abc",
          logo: {} as StaticImageData,
          decimals: 18,
          color: "#ffffff",
          source: "base",
          sourceLogo: {} as StaticImageData,
        },
      ],
      categories: ["bluechip"],
    });
  });
});

describe("mapCollateralsToTokens", () => {
  it("should map collaterals to tokens", () => {
    // Arrange
    const collaterals = ["collateral1", "collateral2"];

    // Act
    const result = mapCollateralsToTokens(collaterals, mockTokens);

    // Assert
    expect(result).toEqual([
      mockTokens["collateral1"],
      mockTokens["collateral2"],
    ]);
  });

  it("should return null for unmapped collaterals", () => {
    // Arrange
    const collaterals = ["collateral1", "collateral2", "collateralX"];

    // Act
    const result = mapCollateralsToTokens(collaterals, mockTokens);

    // Assert
    expect(result).toEqual([
      mockTokens["collateral1"],
      mockTokens["collateral2"],
      null,
    ]);
  });
});

describe("getPoolSummaryData", () => {
  it("should format pool summary data correctly", () => {
    // Arrange
    const poolSummary: IPoolStatsResponse = {
      supplied: 1000,
      baseSupplyAPY: 0.05,
      borrowed: 500,
      baseBorrowAPY: 0.03,
      maxSupplyAPY: 0.07,
      maxBorrowAPY: 0.04,
      pool: "mockPool1",
      asset: {
        name: "Token1",
        symbol: "T1",
        address: "0x123abc",
        logo: {} as StaticImageData,
        decimals: 18,
        color: "#ffffff",
        source: "base",
        sourceLogo: {} as StaticImageData,
      },
      characterization: "characterization1",
      suppliedValue: 2,
      borrowedValue: 4,
      utilization: 9,
      rewardsAPY: 10,
      feesPaid: 11,
      tvl: 12,
      collaterals: [
        {
          name: "Token1",
          symbol: "T1",
          address: "0x123abc",
          logo: {} as StaticImageData,
          decimals: 18,
          color: "#ffffff",
          source: "base",
          sourceLogo: {} as StaticImageData,
        },
        {
          name: "Token1",
          symbol: "T1",
          address: "0x123abc",
          logo: {} as StaticImageData,
          decimals: 18,
          color: "#ffffff",
          source: "base",
          sourceLogo: {} as StaticImageData,
        },
      ],
      categories: ["bluechip"],
    };

    // Act
    const result = getPoolSummaryData(poolSummary);

    // Assert
    expect(result).toEqual([
      { title: "Total Supply", value: "1.00K" },
      { title: "Base Supply APY", value: "5.00%" },
      { title: "Total Borrowed", value: "500.00" },
      { title: "Base Borrow APR", value: "3.00%" },
      { title: "MAX Supply APR", value: "7.00%" },
      { title: "MAX Borrow APR", value: "4.00%" },
    ]);
  });
});

//-------------/------------------/---------------/----------------/--------------------------/

describe("formatCollateralInfo", () => {
  it("should format collateral info correctly", () => {
    // Arrange
    const collateralInfo: ICollateralInfo[] = [
      {
        collateral: "collateral1",
        decimals: 18,
        value: BigInt("1000000000000000000"),
        amountDeposited: BigInt("2000000000000000000"),
        collateralBalance: BigInt("2000000000000000000"),
        collateralValue: 1,
        ltv: BigInt("3000000000000000000"),
        lltv: BigInt("3000000000000000000"),
        liqBonus: BigInt("3000000000000000000"),
        liqPenalty: BigInt("3000000000000000000"),
      },
    ];

    const collateralDeposited: IAccountCollateralDeposited[] = [
      {
        tokenIds: [BigInt("2000000000000000000")],
        token: "collateral1",
        value: BigInt("1000000000000000000"),
        amount: BigInt("2000000000000000000"),
        decimals: 18,
      },
    ];

    // (parseBigNumberToFloat as jest.Mock).mockImplementation(
    //   (value: bigint, decimals = 18, precision = 2) =>
    //     Number(value) / Math.pow(10, decimals)
    // );
    // (formatLargeNumber as jest.Mock).mockImplementation((value) =>
    //   value.toString()
    // );
    // (formatCurrency as jest.Mock).mockImplementation((value) => `$${value}`);
    // (formatAsPercentage as jest.Mock).mockImplementation(
    //   (value) => `${value * 100}%`
    // );

    // Act
    const result = formatCollateralInfo(
      collateralInfo,
      mockTokens,
      collateralDeposited
    );

    // Assert
    expect(result).toEqual([
      {
        asset: {
          name: "Token1",
          symbol: "T1",
          address: "0x123abc",
          logo: {} as StaticImageData,
          decimals: 18,
          color: "#ffffff",
          source: "base",
          sourceLogo: {} as StaticImageData,
        },
        decimals: 18,
        value: 1,
        amountDeposited: "2.00",
        myCollateralValue: "$1.00",
        myCollateralAmount: "2.00",
        bonus: "300.00%",
        lltv: "300.00%",
        ltv: "300.00%",
        penalty: "300.00%",
      },
    ]);
  });
});

describe("calculateAssetPrice", () => {
  it("should calculate asset price correctly", () => {
    // Arrange
    const marketInfo = {
      oraclePriceDecimals: 0,
      oraclePrice: 2,
    } as any;

    // Act
    const result = calculateAssetPrice(marketInfo);

    // Assert
    expect(result).toBe(2);
  });
});

describe("formatPositionsList", () => {
  it("should format positions list correctly", () => {
    // Arrange
    const mockResponse: IPosition[] = [
      {
        account: "account1",
        pool: "pool1",
        asset: "asset1",
        decimals: 18,
        supplied: BigInt("1000000000000000000"),
        suppliedValue: BigInt("2000000000000000000"),
        borrowed: BigInt("3000000000000000000"),
        borrowedValue: BigInt("4000000000000000000"),
        collateralValue: BigInt("5000000000000000000"),
        healthFactor: BigInt("6000000000000000000"),
        staked: BigInt("7000000000000000000"),
        locked: BigInt("8000000000000000000"),
        stakeRewardsClaimable: BigInt("9000000000000000000"),
        lockRewardsClaimable: BigInt("10000000000000000000"),
        exposure: BigInt("11000000000000000000"),
      },
    ];

    // Act
    const result = formatPositionsList(mockResponse);

    // Assert
    expect(result).toEqual([
      {
        account: "account1",
        pool: "pool1",
        asset: undefined,
        decimals: 18,
        supplied: 1,
        suppliedValue: 2,
        borrowed: 3,
        borrowedValue: 4,
        collateralValue: 5,
        healthFactor: 6,
        staked: 7,
        locked: 8,
        stakeRewardsClaimable: 9,
        lockRewardsClaimable: 10,
        exposure: 11,
      },
    ]);
  });
});
