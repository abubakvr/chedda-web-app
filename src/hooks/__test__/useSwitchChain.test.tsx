import { renderHook, act } from "@testing-library/react";
import { useWeb3React } from "@web3-react/core";
import { useSwitchChain } from "../useSwitchChain";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { getAddChainParameters } from "@/data/networks";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";
import { useEnvironment } from "../useEnvironment";
import { MetaMask } from "@web3-react/metamask";

jest.mock("ethers");
jest.mock("@web3-react/core");
jest.mock("../useEnvironment");
jest.mock("@web3-react/walletconnect-v2");

const mockUseWeb3React = useWeb3React as jest.MockedFunction<
  typeof useWeb3React
>;
const mockUseEnvironment = useEnvironment as jest.MockedFunction<
  typeof useEnvironment
>;

describe("useSwitchChain Hook", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseEnvironment.mockReset();
  });

  it("switches the chain correctly", async () => {
    const mockSwitchEnvironment = jest.fn();
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

    // Use jest.mock to mock the entire module
    jest.mock("@web3-react/walletconnect-v2", () => ({
      WalletConnect: jest.fn().mockImplementation(() => mockConnector),
    }));

    (mockUseWeb3React as jest.Mock).mockReturnValue({
      provider: undefined,
      connector: mockConnector,
      chainId: 5,
      accounts: ["0x737sddf68"],
      isActivating: false,
      account: "0x737sddf68",
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

    mockUseEnvironment.mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: mockSwitchEnvironment,
    });

    const { result } = renderHook(() => useSwitchChain());

    // Call the function that triggers the chain switch
    await act(async () => {
      await result.current(-1); // Example: Switch to chain -1
    });

    // Assert that the connector's activate method was called with the correct parameters
    expect(mockConnector.activate).toHaveBeenCalled();

    // Assert that the switchEnvironment function was called with the correct parameter
    expect(mockSwitchEnvironment).toHaveBeenCalledWith(-1);
  });

  it("handles different connector types", async () => {
    const mockSwitchEnvironment = jest.fn();
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

    (mockUseWeb3React as jest.Mock).mockReturnValue({
      provider: undefined,
      connector: mockConnector,
      chainId: 5,
      accounts: ["0x737sddf68"],
      isActivating: false,
      account: "0x737sddf68",
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

    mockUseEnvironment.mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: mockSwitchEnvironment,
    });

    const { result } = renderHook(() => useSwitchChain());

    // Call the function that triggers the chain switch
    await act(async () => {
      await result.current(5); // Example: Switch to chain 42
    });

    // Assert that the connector's activate method was called with the correct parameters
    expect(mockConnector.activate).toHaveBeenCalledWith(5);

    // Assert that the switchEnvironment function was called with the correct parameter
    expect(mockSwitchEnvironment).toHaveBeenCalledWith(5);
  });
});
