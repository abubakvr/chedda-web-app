import { mockAccountInfo } from "@/utils/Mocks/MockTestData";
import { renderHook, act, waitFor } from "@testing-library/react";
import { ethers } from "ethers";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useCheddaSdk } from "../useCheddaSdk";
import { useFetcher } from "../useFetcher";

jest.mock("ethers");
jest.mock("@web3-react/core");
jest.mock("react-redux");
jest.mock("next/navigation");
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

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
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

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe("useFetcher hook", () => {
  beforeEach(() => {
    (mockUseParams as jest.Mock).mockReturnValue({
      poolId: "0x00",
    });
    jest.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    const dispatch = jest.fn();
    const mockProvider = {
      getSigner: jest.fn(),
    };

    const mockGetAccountInfo = jest.fn().mockReturnValue(mockAccountInfo);

    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn(),
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
      useFetcher<string>(mockGetData, "mockPoolId")
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
