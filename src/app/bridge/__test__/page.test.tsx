import React from "react";
import Page from "../page";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useBridge, useToast } from "@/hooks";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { NonceProvider } from "@/contexts/NonceContext";

// Mock hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("../../../hooks", () => ({
  useBridge: jest.fn(() => ({
    quoteSend: jest.fn().mockResolvedValue([[]]),
    getTokenPrice: jest.fn(),
    getEthPrice: jest.fn(),
    getTokenBalance: jest.fn(),
  })),
  useSwitchChain: jest.fn(),
  useLocalStorageGet: jest.fn(),
  useToast: jest.fn(),
}));

jest.mock("ethers");

jest.mock("../../../utils/helpers", () => ({
  getTokenBalanceAddress: jest.fn(),
  getTokenBridgeAddress: jest.fn(),
}));

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 4,
    isActivating: false,
  })),
}));

const mockRouterReplace = jest.fn();
const mockGetTokenPrice = jest.fn();
const mockGetTokenAllowance = jest.fn();
const mockQuoteSend = jest.fn();
const mockGetEthPrice = jest.fn();

describe("Page Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });
    (usePathname as jest.Mock).mockReturnValue("/path");
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("?screen=home")
    );
    (useBridge as jest.Mock).mockReturnValue({
      getTokenPrice: mockGetTokenPrice,
      getTokenAllowance: mockGetTokenAllowance,
      quoteSend: mockQuoteSend,
      getEthPrice: mockGetEthPrice,
      getTokenBalance: jest.fn(),
    });
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));

    mockGetTokenPrice.mockResolvedValue(100);
    mockGetTokenAllowance.mockResolvedValue("1000000000000000000");
    mockQuoteSend.mockResolvedValue([{ 0: "1000000000000000000" }]);
    mockGetEthPrice.mockResolvedValue(2000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Page component correctly", async () => {
    render(
      <NonceProvider nonce="0xc8">
        <Page />
      </NonceProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Transfer")).toBeInTheDocument();
    });
  });

  it("updates gas fee on selected token or chain change", async () => {
    render(
      <NonceProvider nonce="0xc8">
        <Page />
      </NonceProvider>
    );

    await waitFor(() => {
      expect(mockQuoteSend).toHaveBeenCalled();
      expect(mockGetEthPrice).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByTestId("gas-fee-value")).toBeInTheDocument();
    });
  });

  it("handles active screen changes", async () => {
    render(
      <NonceProvider nonce="0xc8">
        <Page />
      </NonceProvider>
    );

    fireEvent.click(screen.getByTestId("bridge-input-from-chain"));
    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith(
        "/path?screen=tokenselect"
      );
    });
  });
});
