import { renderHook, act } from "@testing-library/react";
import {
  useAccountInfo,
  useMarketInfo,
  useCollateralInfo,
  useCheddaSdk,
  useEnvironment,
} from "@/hooks";
import {
  mockCurrentEnvironment,
  mockAccountInfo,
  mockMarketInfo,
  mockCollateralInfo,
} from "@/utils/Mocks/MockTestData";
import { useWeb3React } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { ethers } from "ethers";

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
    jest.mock("@web3-react/core", () => ({
      useWeb3React: () => ({
        account: "0x00",
      }),
    }));
    mockUseEnvironment.mockReset();
    mockUseCheddaSdk.mockReset();
  });

  it("fetches account info correctly", async () => {
    const mockProvider = {
      getSigner: jest.fn(),
    };

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
    const mockProvider = {
      getSigner: jest.fn(),
    };

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
    const mockProvider = {
      getSigner: jest.fn(),
    };

    const mockGetCollateralInfo = jest
      .fn()
      .mockResolvedValue(mockCollateralInfo);
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
      },
      timeout: 2000,
      onError: jest.fn(),
    });

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
});
