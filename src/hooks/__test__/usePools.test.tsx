import { act, renderHook } from "@testing-library/react";
import { ethers } from "ethers";
import { usePoolStatsList, usePoolStats } from "../usePools";
import { useCheddaSdk } from "../useCheddaSdk";
import { useEnvironment } from "../useEnvironment";
import {
  mockCurrentEnvironment,
  mockGetPoolStats,
} from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("../useCheddaSdk");
jest.mock("../useEnvironment");

const mockUseCheddaSdk = useCheddaSdk as jest.MockedFunction<
  typeof useCheddaSdk
>;
const mockUseEnvironment = useEnvironment as jest.MockedFunction<
  typeof useEnvironment
>;

describe("usePoolStatsList Hook", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    mockUseEnvironment.mockReset();
    mockUseCheddaSdk.mockReset();
  });

  it("fetches and formats poolStatsList correctly", async () => {
    const mockProvider = {
      getSigner: jest.fn(),
    };
    // Mock the chedda instance and getPoolStats function
    const mockPoolStats = jest.fn().mockResolvedValue(mockGetPoolStats);
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          activePools: jest.fn().mockResolvedValue(["pool1", "pool2"]),
          getPoolStatsList: mockPoolStats,
        }),

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

    // Render the hook using renderHook
    const { result } = renderHook(() => usePoolStatsList());

    // Ensure that the hook initializes with the correct values
    expect(result.current.isLoading).toBe(true);
    expect(result.current.poolStatsList).toBeUndefined();

    // Wait for the hook to fetch and update the values
    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.getPoolStatsList()).resolves.not.toThrow();
    });

    // Make assertions based on the expected behavior
    expect(result.current.isLoading).toBe(false);
    if (result.current.poolStatsList) {
      expect(result.current.poolStatsList[0].pool).toEqual("Pool1");
    }

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockPoolStats).toHaveBeenCalled();
  });

  it("fetches and formats poolStats correctly", async () => {
    const mockProvider = {
      getSigner: jest.fn(),
    };
    // Mock the chedda instance and getPoolStats function
    const mockPoolStats = jest.fn().mockResolvedValue(mockGetPoolStats[0]);
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getPoolStats: mockPoolStats,
        }),

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

    // Render the hook using renderHook
    const { result } = renderHook(() => usePoolStats("0x00"));

    // Ensure that the hook initializes with the correct values
    expect(result.current.isLoading).toBe(true);
    expect(result.current.poolStats).toBeUndefined();

    // Wait for the hook to fetch and update the values
    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.getPoolStats()).resolves.not.toThrow();
    });

    // Make assertions based on the expected behavior
    expect(result.current.isLoading).toBe(false);
    if (result.current.poolStats) {
      expect(result.current.poolStats.pool).toEqual("Pool1");
    }

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockPoolStats).toHaveBeenCalled();
  });
});
