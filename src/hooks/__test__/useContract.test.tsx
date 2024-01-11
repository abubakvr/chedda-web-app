import { renderHook, act } from "@testing-library/react";
import {
  useAccountInfo,
  useMarketInfo,
  useCollateralInfo,
  useCheddaSdk,
  useEnvironment,
  usePoolStats,
  usePoolStatsList,
  useRatesProjector,
  usePoolState,
  useAggregateStats,
} from "@/hooks";
import {
  mockCurrentEnvironment,
  mockAccountInfo,
  mockMarketInfo,
  mockCollateralInfo,
  mockGetPoolStats,
  mockInterestRates,
  mockPoolStateEvents,
  mockAggregateStats,
} from "@/utils/Mocks/MockTestData";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { mockUseWeb3ReactData } from "@/utils/Mocks/MockUseWeb3React";

jest.mock("ethers");
jest.mock("@web3-react/core");
jest.mock("../useCheddaSdk");
jest.mock("../useEnvironment");

const mockUseCheddaSdk = useCheddaSdk as jest.MockedFunction<
  typeof useCheddaSdk
>;
const mockUseEnvironment = useEnvironment as jest.MockedFunction<
  typeof useEnvironment
>;
const mockUseWeb3React = useWeb3React as jest.MockedFunction<
  typeof useWeb3React
>;

const mockProvider = {
  getSigner: jest.fn(),
};

describe("useAccountInfo Hook", () => {
  beforeEach(() => {
    jest.mock("@web3-react/core", () => ({
      useWeb3React: () => ({
        account: "0x00",
      }),
    }));
    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
    mockUseCheddaSdk.mockReset();
  });

  it("fetches account info correctly", async () => {
    const mockGetAccounInfo = jest.fn().mockResolvedValue(mockAccountInfo);

    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getPoolAccountInfo: mockGetAccounInfo,
        }),
        interestRateProjector: jest.fn(),
        lendingPool: jest.fn(),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    (mockUseWeb3React as jest.Mock).mockReturnValue(mockUseWeb3ReactData);

    const { result } = renderHook(() => useAccountInfo("0x00"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockAccountInfo);

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockGetAccounInfo).toHaveBeenCalled();
  });

  it("fetches market info correctly", async () => {
    const mockGetMarketInfo = jest.fn().mockResolvedValue(mockMarketInfo);

    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getMarketInfo: mockGetMarketInfo,
        }),
        interestRateProjector: jest.fn(),
        lendingPool: jest.fn(),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    (mockUseWeb3React as jest.Mock).mockReturnValue(mockUseWeb3ReactData);

    const { result } = renderHook(() => useMarketInfo("0x00"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockMarketInfo);

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockGetMarketInfo).toHaveBeenCalled();
  });

  it("fetches collateral info correctly", async () => {
    const mockGetCollateralInfo = jest
      .fn()
      .mockResolvedValue(mockCollateralInfo);

    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getPoolCollateral: mockGetCollateralInfo,
        }),
        lendingPool: jest.fn(),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        interestRateProjector: jest.fn(),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    (mockUseWeb3React as jest.Mock).mockReturnValue(mockUseWeb3ReactData);

    const { result } = renderHook(() => useCollateralInfo("0x00"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockCollateralInfo);

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockGetCollateralInfo).toHaveBeenCalled();
  });

  it("fetches and formats poolStatsList correctly", async () => {
    // Mock the chedda instance and getPoolStats function
    const mockPoolStats = jest.fn().mockResolvedValue(mockGetPoolStats);
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          activePools: jest.fn().mockResolvedValue(["pool1", "pool2"]),
          getPoolStatsList: mockPoolStats,
        }),
        interestRateProjector: jest.fn(),
        lendingPool: jest.fn(),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    // Render the hook using renderHook
    const { result } = renderHook(() => usePoolStatsList());

    // Ensure that the hook initializes with the correct values
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for the hook to fetch and update the values
    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    // Make assertions based on the expected behavior
    expect(result.current.isLoading).toBe(false);
    if (result.current.data) {
      expect(result.current.data[0].pool).toEqual("Pool1");
    }

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockPoolStats).toHaveBeenCalled();
  });

  it("fetches and formats poolStats correctly", async () => {
    // Mock the chedda instance and getPoolStats function
    const mockPoolStats = jest.fn().mockResolvedValue(mockGetPoolStats[0]);
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getPoolStats: mockPoolStats,
        }),
        interestRateProjector: jest.fn(),
        lendingPool: jest.fn(),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    // Render the hook using renderHook
    const { result } = renderHook(() => usePoolStats("0x00"));

    // Ensure that the hook initializes with the correct values
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for the hook to fetch and update the values
    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    // Make assertions based on the expected behavior
    expect(result.current.isLoading).toBe(false);
    if (result.current.data) {
      expect(result.current.data.pool).toEqual("Pool1");
    }

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockPoolStats).toHaveBeenCalled();
  });

  it("fetches and updates interestRates correctly", async () => {
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn(),
        lendingPool: jest.fn().mockReturnValue({
          interestRatesModel: jest.fn().mockResolvedValue("0x00"),
        }),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        interestRateProjector: jest.fn().mockReturnValue({
          projection: jest.fn().mockResolvedValue(mockInterestRates),
        }),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    const { result } = renderHook(() => useRatesProjector("yourPoolId"));

    // Ensure that the initial state is correct
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(mockProvider.getSigner).toHaveBeenCalled();

    // Wait for the hook to fetch and update state
    await act(async () => {
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toHaveLength(3);
  });

  it("fetches and updates poolStateEvents correctly", async () => {
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn(),
        lendingPool: jest.fn().mockReturnValue({
          getEventLogs: jest.fn().mockResolvedValue(mockPoolStateEvents),
        }),
        interestRateProjector: jest.fn(),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    const { result } = renderHook(() => usePoolState("yourPoolId"));

    // Ensure that the initial state is correct
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(mockProvider.getSigner).toHaveBeenCalled();

    // Wait for the hook to fetch and update state
    await act(async () => {
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toHaveLength(25);
  });

  it("fetches and sets aggregate stats correctly", async () => {
    const mockProvider = {
      getSigner: jest.fn(),
    };

    const mockGetAggregateStats = jest
      .fn()
      .mockResolvedValue(mockAggregateStats);

    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getAggregateStats: mockGetAggregateStats,
        }),
        interestRateProjector: jest.fn(),
        lendingPool: jest.fn(),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    mockUseEnvironment.mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });

    const { result } = renderHook(() => useAggregateStats());

    // Ensure that the hook initializes with the correct values
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for the hook to fetch and update the values
    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    // Make assertions based on the expected behavior
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockAggregateStats);

    // Ensure clean-up
    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockGetAggregateStats).toHaveBeenCalled();
  });
});
