import { act, renderHook } from "@testing-library/react";
import { ethers } from "ethers";
import { useAccountInfo, useMarketInfo } from "../usePoolInfo";
import { useCheddaSdk } from "../useCheddaSdk";
import { useEnvironment } from "../useEnvironment";
import {
  mockCurrentEnvironment,
  mockAccountInfo,
  mockMarketInfo,
} from "@/utils/Mocks/MockTestData";
import { useWeb3React } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect-v2";

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

describe("useAccountInfo Hook", () => {
  beforeEach(() => {
    jest.mock("@web3-react/core", () => {
      return {
        useWeb3React: () => ({
          account: "0x00",
        }),
      };
    });
    mockUseEnvironment.mockReset();
    mockUseCheddaSdk.mockReset();
  });

  it("fetches account info correctly", async () => {
    const mockProvider = {
      getSigner: jest.fn(),
    };
    // Mock the chedda instance and getPoolStats function
    const mockGetAccounInfo = jest.fn().mockResolvedValue(mockAccountInfo);
    const mockConnector = new WalletConnect({
      actions: {
        startActivation: jest.fn(),
        update: jest.fn(),
        resetState: jest.fn(),
      },
      defaultChainId: 5,
      options: {
        projectId: "string",
        showQrModal: false,
        optionalChains: [5, 1],
        // Other properties
      },
      timeout: 2000,
      onError: jest.fn(),
    });
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getPoolAccountInfo: mockGetAccounInfo,
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
    (mockUseWeb3React as jest.Mock).mockReturnValue({
      provider: undefined,
      connector: mockConnector,
      chainId: 5,
      accounts: ["0x737sddf68"],
      isActivating: false,
      account: "0x737sddf68000000000000000000000000000000000",
      isActive: false,
      ENSNames: [undefined],
      ENSName: undefined,
      hooks: {
        useSelectedStore: jest.fn(),
        useSelectedChainId: jest.fn(),
        useSelectedAccounts: jest.fn(),
        useSelectedIsActivating: jest.fn(),
        useSelectedAccount: jest.fn(),
        useSelectedIsActive: jest.fn(),
        useSelectedProvider: jest.fn(),
        useSelectedENSNames: jest.fn(),
        useSelectedENSName: jest.fn(),
        usePriorityConnector: jest.fn(),
        usePriorityStore: jest.fn(),
        usePriorityChainId: jest.fn(),
        usePriorityAccounts: jest.fn(),
        usePriorityIsActivating: jest.fn(),
        usePriorityAccount: jest.fn(),
        usePriorityIsActive: jest.fn(),
        usePriorityProvider: jest.fn(),
        usePriorityENSNames: jest.fn(),
        usePriorityENSName: jest.fn(),
      },
    });

    // Render the hook using renderHook
    const { result } = renderHook(() => useAccountInfo("0x00"));

    // Ensure that the hook initializes with the correct values
    expect(result.current.isLoading).toBe(true);
    expect(result.current.accountInfo).toBeUndefined();

    // Wait for the hook to fetch and update the values
    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.getAccountInfo()).resolves.not.toThrow();
    });

    expect(result.current.isLoading).toBe(false);
    if (result.current.accountInfo) {
      expect(result.current.accountInfo).toEqual(mockAccountInfo);
    }

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockGetAccounInfo).toHaveBeenCalled();
  });

  it("fetches account info correctly", async () => {
    const mockProvider = {
      getSigner: jest.fn(),
    };
    // Mock the chedda instance and getPoolStats function
    const mockGetMarketInfo = jest.fn().mockResolvedValue(mockMarketInfo);
    const mockConnector = new WalletConnect({
      actions: {
        startActivation: jest.fn(),
        update: jest.fn(),
        resetState: jest.fn(),
      },
      defaultChainId: 5,
      options: {
        projectId: "string",
        showQrModal: false,
        optionalChains: [5, 1],
        // Other properties
      },
      timeout: 2000,
      onError: jest.fn(),
    });
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn().mockReturnValue({
          getMarketInfo: mockGetMarketInfo,
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
    (mockUseWeb3React as jest.Mock).mockReturnValue({
      provider: undefined,
      connector: mockConnector,
      chainId: 5,
      accounts: ["0x737sddf68"],
      isActivating: false,
      account: "0x737sddf68000000000000000000000000000000000",
      isActive: false,
      ENSNames: [undefined],
      ENSName: undefined,
      hooks: {
        useSelectedStore: jest.fn(),
        useSelectedChainId: jest.fn(),
        useSelectedAccounts: jest.fn(),
        useSelectedIsActivating: jest.fn(),
        useSelectedAccount: jest.fn(),
        useSelectedIsActive: jest.fn(),
        useSelectedProvider: jest.fn(),
        useSelectedENSNames: jest.fn(),
        useSelectedENSName: jest.fn(),
        usePriorityConnector: jest.fn(),
        usePriorityStore: jest.fn(),
        usePriorityChainId: jest.fn(),
        usePriorityAccounts: jest.fn(),
        usePriorityIsActivating: jest.fn(),
        usePriorityAccount: jest.fn(),
        usePriorityIsActive: jest.fn(),
        usePriorityProvider: jest.fn(),
        usePriorityENSNames: jest.fn(),
        usePriorityENSName: jest.fn(),
      },
    });

    // Render the hook using renderHook
    const { result } = renderHook(() => useMarketInfo("0x00"));

    // Ensure that the hook initializes with the correct values
    expect(result.current.isLoading).toBe(true);
    expect(result.current.marketInfo).toBeUndefined();

    // Wait for the hook to fetch and update the values
    await act(async () => {
      // Call the function that triggers useEffect
      await expect(result.current.getMarketInfo()).resolves.not.toThrow();
    });

    expect(result.current.isLoading).toBe(false);
    if (result.current.marketInfo) {
      expect(result.current.marketInfo).toEqual(mockMarketInfo);
    }

    expect(mockUseCheddaSdk).toHaveBeenCalled();
    expect(mockGetMarketInfo).toHaveBeenCalled();
  });
});
