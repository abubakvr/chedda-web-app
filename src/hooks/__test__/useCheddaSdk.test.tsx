import { act, renderHook } from "@testing-library/react";
import { useCheddaSdk } from "../useCheddaSdk";
import { useWeb3React } from "@web3-react/core";
import { useEnvironment } from "../useEnvironment";
import { Chedda } from "@/chedda-sdk";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";

jest.mock("ethers");
jest.mock("@web3-react/core");
jest.mock("../useEnvironment");

const mockUseWeb3React = useWeb3React as jest.MockedFunction<
  typeof useWeb3React
>;
const mockUseEnvironment = useEnvironment as jest.MockedFunction<
  typeof useEnvironment
>;
const mockProvider = {
  getSigner: jest.fn(),
};

describe("useCheddaSdk Hook", () => {
  beforeEach(() => {
    // Use the mock in your tests

    // Reset the mock implementation before each test
    mockUseEnvironment.mockReset();
    (mockUseWeb3React as jest.Mock).mockImplementation(() => ({
      provider: undefined,
      connector: CoinbaseWallet,
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
    }));
  });

  it("should not setUp Chedda if enviroment is undefined", async () => {
    mockUseEnvironment.mockReturnValue({
      currentEnvironment: undefined,
      switchEnvironment: jest.fn(),
    });

    const { result } = renderHook(() => useCheddaSdk());

    // Ensure that the hook initializes with the correct values
    expect(result.current.chedda).toBeUndefined();
    expect(result.current.signer).toBeUndefined();
  });

  it("sets up Chedda correctly if environment is defined", async () => {
    mockUseEnvironment.mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });

    const { result } = renderHook(() => useCheddaSdk());

    await act(async () => {
      expect(async () => result.current.setupChedda());
    });
    expect(result.current.chedda).toBeInstanceOf(Chedda);
    expect(result.current.signer).toEqual(mockProvider.getSigner());

    expect(mockUseWeb3React).toHaveBeenCalled();
    expect(mockUseEnvironment).toHaveBeenCalled();
  });
});
