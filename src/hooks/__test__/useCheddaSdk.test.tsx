import { renderHook } from "@testing-library/react";
import { useCheddaSdk } from "../useCheddaSdk";
import { useWeb3React } from "@web3-react/core";
import { Chedda } from "chedda-sdk";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";

jest.mock("ethers");
jest.mock("@web3-react/core");

const mockUseWeb3React = useWeb3React as jest.MockedFunction<
  typeof useWeb3React
>;
const mockProvider = {
  getSigner: jest.fn(),
};

describe("useCheddaSdk Hook", () => {
  beforeEach(() => {
    // Use the mock in your tests

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

  it("sets up Chedda correctly if environment is defined", async () => {
    const { result } = renderHook(() => useCheddaSdk());

    expect(result.current.chedda).toBeInstanceOf(Chedda);
    expect(result.current.signer).toEqual(mockProvider.getSigner());

    expect(mockUseWeb3React).toHaveBeenCalled();
  });
});
