import { renderHook, act } from "@testing-library/react";
import { Chedda } from "chedda-sdk";
import { currentEnvironment } from "@/data/environments";
import { useMarkets } from "@/hooks/useMarkets";
import { getAggregateInfo } from "@/utils/formatResponse";
import { formatToArrayOfStrings } from "@/utils/formatters";
import { formatPoolStatsList } from "@/utils/formatResponse";

jest.mock("chedda-sdk", () => ({
  Chedda: jest.fn(),
}));

jest.mock("../../utils/formatResponse", () => ({
  getAggregateInfo: jest.fn(),
  formatPoolStatsList: jest.fn(),
}));

jest.mock("../../utils/formatters", () => ({
  formatToArrayOfStrings: jest.fn(),
}));

let originalConsoleError: typeof console.error;

describe("useMarkets", () => {
  const mockLens = {
    getAggregateStats: jest.fn(),
    activePools: jest.fn(),
    getPoolStatsList: jest.fn(),
  };

  beforeEach(() => {
    (Chedda as jest.Mock).mockImplementation(() => ({
      poolLens: jest.fn().mockReturnValue(mockLens),
    }));
    originalConsoleError = console.error;

    // Mock console.error to suppress error messages
    console.error = jest.fn();
    jest.clearAllMocks();
  });

  it("should return undefined when lens is not available", async () => {
    (Chedda as jest.Mock).mockImplementation(() => ({
      poolLens: jest.fn().mockReturnValue(undefined),
    }));

    const { result } = renderHook(() => useMarkets());

    const aggregateStats = await result.current.getAggregateStats();
    const poolStatsList = await result.current.getPoolStatsList();

    expect(aggregateStats).toBeUndefined();
    expect(poolStatsList).toBeUndefined();
  });

  it("should fetch aggregate stats successfully", async () => {
    const mockAggregateStats = ["mockAggregateStats"];
    const mockFormattedStats = ["formattedStats"];

    mockLens.getAggregateStats.mockResolvedValue(mockAggregateStats);
    (getAggregateInfo as jest.Mock).mockReturnValue(mockFormattedStats);

    const { result } = renderHook(() => useMarkets());

    await act(async () => {
      const aggregateStats = await result.current.getAggregateStats();
      expect(aggregateStats).toEqual(mockFormattedStats);
    });

    expect(mockLens.getAggregateStats).toHaveBeenCalledWith(true);
    expect(getAggregateInfo).toHaveBeenCalledWith(mockAggregateStats);
  });

  it("should fetch pool stats list successfully", async () => {
    const mockPools = ["mockPool1", "mockPool2"];
    const mockStatsList = ["mockStatsList"];
    const mockFormattedStatsList = ["formattedStatsList"];

    mockLens.activePools.mockResolvedValue(mockPools);
    mockLens.getPoolStatsList.mockResolvedValue(mockStatsList);
    (formatToArrayOfStrings as jest.Mock).mockReturnValue(mockPools);
    (formatPoolStatsList as jest.Mock).mockReturnValue(mockFormattedStatsList);

    const { result } = renderHook(() => useMarkets());

    await act(async () => {
      const poolStatsList = await result.current.getPoolStatsList();
      expect(poolStatsList).toEqual(mockFormattedStatsList);
    });

    expect(mockLens.activePools).toHaveBeenCalled();
    expect(formatToArrayOfStrings).toHaveBeenCalledWith(mockPools);
    expect(mockLens.getPoolStatsList).toHaveBeenCalledWith(mockPools);
    expect(formatPoolStatsList).toHaveBeenCalledWith(
      mockStatsList,
      currentEnvironment.tokens
    );
  });

  it("should handle errors in getAggregateStats", async () => {
    mockLens.getAggregateStats.mockRejectedValue(
      new Error("Error fetching aggregate stats")
    );

    const { result } = renderHook(() => useMarkets());

    await act(async () => {
      const aggregateStats = await result.current.getAggregateStats();
      expect(aggregateStats).toBeUndefined();
    });

    expect(mockLens.getAggregateStats).toHaveBeenCalledWith(true);
  });

  it("should handle errors in getPoolStatsList", async () => {
    mockLens.activePools.mockRejectedValue(new Error("Error fetching pools"));

    const { result } = renderHook(() => useMarkets());

    await act(async () => {
      const poolStatsList = await result.current.getPoolStatsList();
      expect(poolStatsList).toBeUndefined();
    });

    expect(mockLens.activePools).toHaveBeenCalled();
  });
});
