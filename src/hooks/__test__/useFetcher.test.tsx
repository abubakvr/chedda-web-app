import { mockAccountInfo } from "@/utils/Mocks/MockTestData";
import { renderHook, act, waitFor } from "@testing-library/react";
import { ethers } from "ethers";
import { useCheddaSdk } from "../useCheddaSdk";
import { useFetcher } from "../useFetcher";

jest.mock("ethers");
jest.mock("@web3-react/core");
jest.mock("../useCheddaSdk");
jest.mock("../useEnvironment");

// Mock useCheddaSdk and useEnvironment
jest.mock("../useCheddaSdk", () => ({
  useCheddaSdk: jest.fn(() => ({ chedda: {}, signer: {} })),
}));

jest.mock("../useEnvironment", () => ({
  useEnvironment: jest.fn(() => ({
    currentEnvironment: { contracts: { LendingPoolLens: {} } },
  })),
}));

// Mock useWeb3React
jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(() => ({ account: "mockAccount" })),
}));

export const mockConsoleError = (): void => {
  jest.spyOn(console, "error").mockImplementation(() => {});
};

export const restoreConsoleError = (): void => {
  jest.spyOn(console, "error").mockRestore();
};

const mockUseCheddaSdk = useCheddaSdk as jest.MockedFunction<
  typeof useCheddaSdk
>;

describe("useFetcher hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockProvider = {
      getSigner: jest.fn(),
    };

    const mockGetAccountInfo = jest.fn().mockReturnValue(mockAccountInfo);

    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getPoolAccountInfo: mockGetAccountInfo,
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

    let mockGetData = jest.fn().mockReturnValue("mockData");

    const { result } = renderHook(() =>
      useFetcher<string>("mockPoolId", mockGetData)
    );
    // Assert initial state
    await waitFor(async () => {
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
    });

    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    expect(result.current.data).toBe("mockData");
  });
});
