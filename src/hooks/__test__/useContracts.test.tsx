import { renderHook, act } from "@testing-library/react";
import {
  useAccountInfo,
  useMarketInfo,
  useCollateralInfo,
  usePoolStats,
  usePoolStatsList,
  useRatesProjector,
  usePoolState,
  useAggregateStats,
  useAvailableLiquidity,
  useAssetBalance,
  useFetcher,
  useTokenBalance,
  useAllowance,
} from "@/hooks";
import {
  mockAccountInfo,
  mockMarketInfo,
  mockCollateralInfo,
  mockGetPoolStats,
  mockInterestRates,
  mockPoolStateEvents,
  mockAggregateStats,
} from "@/utils/Mocks/MockTestData";
import { useDispatch } from "react-redux";

jest.mock("ethers");
jest.mock("react-redux");
jest.mock("../useFetcher");

const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

describe("useAccountInfo Hook", () => {
  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
  });

  it("fetches account info correctly", async () => {
    const mockGetAccounInfo = jest.fn().mockResolvedValue(mockAccountInfo);
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: "mockData",
      isLoading: false,
      fetchData: mockGetAccounInfo,
    });

    const { result } = renderHook(() => useAccountInfo());

    await act(async () => {
      await expect(result.current.fetchData());
    });

    expect(mockGetAccounInfo).toHaveBeenCalled();
    expect(result.current.data).toBe("mockData");
  });

  it("fetches market info correctly", async () => {
    const mockGetMarketInfo = jest.fn().mockResolvedValue(mockMarketInfo);
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: "mockData",
      isLoading: false,
      fetchData: mockGetMarketInfo,
    });

    const { result } = renderHook(() => useMarketInfo());

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockGetMarketInfo).toHaveBeenCalled();
    expect(result.current.data).toBe("mockData");
  });

  it("fetches collateral info correctly", async () => {
    const mockGetCollateralInfo = jest
      .fn()
      .mockResolvedValue(mockCollateralInfo);
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: "mockData",
      isLoading: false,
      fetchData: mockGetCollateralInfo,
    });

    const { result } = renderHook(() => useCollateralInfo());

    await act(async () => {
      await expect(result.current.fetchData());
    });

    expect(mockGetCollateralInfo).toHaveBeenCalled();
    expect(result.current.data).toBe("mockData");
  });

  it("fetches and formats poolStatsList correctly", async () => {
    // Mock the chedda instance and getPoolStats function
    const mockPoolStatsList = jest.fn().mockResolvedValue(mockGetPoolStats);
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: mockGetPoolStats,
      isLoading: false,
      fetchData: mockPoolStatsList,
    });

    const { result } = renderHook(() => usePoolStatsList());

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockPoolStatsList).toHaveBeenCalled();
    expect(result.current.data).toBe(mockGetPoolStats);
  });

  it("fetches and formats poolStats correctly", async () => {
    // Mock the chedda instance and getPoolStats function
    const mockPoolStats = jest.fn().mockResolvedValue(mockGetPoolStats[0]);
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: mockGetPoolStats[0],
      isLoading: false,
      fetchData: mockPoolStats,
    });

    const { result } = renderHook(() => usePoolStats());

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockPoolStats).toHaveBeenCalled();
    expect(result.current.data).toBe(mockGetPoolStats[0]);
  });

  it("fetches and updates interestRates correctly", async () => {
    const mockGetInterestRates = jest.fn().mockResolvedValue(mockInterestRates);
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: mockInterestRates,
      isLoading: false,
      fetchData: mockGetInterestRates,
    });

    const { result } = renderHook(() => useRatesProjector());

    // Wait for the hook to fetch and update state
    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockGetInterestRates).toHaveBeenCalled();
    expect(result.current.data).toBe(mockInterestRates);
  });

  it("fetches and updates poolStateEvents correctly", async () => {
    const mockGetPoolStateEvents = jest
      .fn()
      .mockResolvedValue(mockPoolStateEvents);
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: mockPoolStateEvents,
      isLoading: false,
      fetchData: mockGetPoolStateEvents,
    });

    const { result } = renderHook(() => usePoolState());

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockGetPoolStateEvents).toHaveBeenCalled();
    expect(result.current.data).toBe(mockPoolStateEvents);
  });

  it("fetches and sets aggregate stats correctly", async () => {
    const mockGetAggregateStats = jest
      .fn()
      .mockResolvedValue(mockAggregateStats);
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: mockAggregateStats,
      isLoading: false,
      fetchData: mockGetAggregateStats,
    });

    const { result } = renderHook(() => useAggregateStats());

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockGetAggregateStats).toHaveBeenCalled();
    expect(result.current.data).toBe(mockAggregateStats);
  });

  it("fetches and sets available liquidity correctly", async () => {
    const mockGetAvailableLiquidity = jest.fn().mockResolvedValue("0x00");

    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: "mockData",
      isLoading: false,
      fetchData: mockGetAvailableLiquidity,
    });

    const { result } = renderHook(() => useAvailableLiquidity());

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockGetAvailableLiquidity).toHaveBeenCalled();
    expect(result.current.data).toBe("mockData");
  });

  it("fetches and sets asset balance correctly", async () => {
    const mockGetAssetBalance = jest.fn().mockResolvedValue("0x00");
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: "mockData",
      isLoading: false,
      fetchData: mockGetAssetBalance,
    });

    const { result } = renderHook(() => useAssetBalance("0x00"));

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockGetAssetBalance).toHaveBeenCalled();
    expect(result.current.data).toBe("mockData");
  });

  it("fetches and sets allowance correctly", async () => {
    const mockGetAllowance = jest.fn().mockResolvedValue("0x00");
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: "mockData",
      isLoading: false,
      fetchData: mockGetAllowance,
    });

    const { result } = renderHook(() => useAllowance("0x00"));

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockGetAllowance).toHaveBeenCalled();
    expect(result.current.data).toBe("mockData");
  });

  it("fetches and sets token balance correctly", async () => {
    const mockGetTokenBalance = jest.fn().mockResolvedValue("0x00");
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: "mockData",
      isLoading: false,
      fetchData: mockGetTokenBalance,
    });

    const { result } = renderHook(() => useTokenBalance("0x00"));

    await act(async () => {
      expect(result.current.fetchData());
    });

    expect(mockGetTokenBalance).toHaveBeenCalled();
    expect(result.current.data).toBe("mockData");
  });
});
