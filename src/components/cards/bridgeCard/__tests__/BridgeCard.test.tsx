import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BridgeCard from "../BridgeCard";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { useBridge, useSwitchChain } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { mockLocalStorage } from "@/utils/Mocks/MockLocalStorage";

jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

jest.mock("../../../../hooks", () => ({
  useBridge: jest.fn(() => ({
    quoteSend: jest.fn().mockResolvedValue([
      /* Your iterable value here */
    ]),
    getTokenPrice: jest.fn(),
    getEthPrice: jest.fn(),
  })),
  useSwitchChain: jest.fn(),
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

const mockUseBridge = {
  sendOFT: jest.fn(),
  quoteSend: jest.fn().mockResolvedValue([
    /* Your iterable value here */
  ]),
  approveAsset: jest.fn(),
  getTokenPrice: jest.fn(),
  getTokenAllowance: jest.fn(),
  getTokenBalance: jest.fn(),
};

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/bridge"),
  useRouter: jest.fn(() => ({
    prefetch: jest.fn(),
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(),
}));

describe("BridgeCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useWeb3React as jest.Mock).mockReturnValue({
      account: "0xABC",
      chainId: 1,
    });
    (useBridge as jest.Mock).mockReturnValue(mockUseBridge);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => {
        if (key === "screen") return null;
        return null;
      }),
    });
  });
  test("renders BridgeCard component correctly", async () => {
    render(
      <MockAppProviders>
        <BridgeCard />
      </MockAppProviders>
    );
    await waitFor(() => {
      expect(screen.getByText("BRIDGE")).toBeInTheDocument();
    });
  });

  test("renders TokenSelect component when activeScreen is 'tokenselect'", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => {
        if (key === "screen") return "tokenselect";
        return null;
      }),
    });
    render(
      <MockAppProviders>
        <BridgeCard />
      </MockAppProviders>
    );
    await waitFor(() => {
      expect(screen.getByText("Select a Token")).toBeInTheDocument();
    });
  });

  test("renders TransactionDetails component when activeScreen is 'details'", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => {
        if (key === "screen") return "details";
        return null;
      }),
    });
    render(
      <MockAppProviders>
        <BridgeCard />
      </MockAppProviders>
    );

    // Ensure the component renders with the expected screen
    await waitFor(() => {
      expect(screen.getByText("Transaction Details")).toBeInTheDocument();
    });
  });

  test("renders BridgeInput component when activeScreen is default", async () => {
    render(
      <MockAppProviders>
        <BridgeCard />
      </MockAppProviders>
    );
    await waitFor(() => {
      expect(screen.getByTestId("bridge-input-title")).toHaveTextContent(
        "Transfer"
      );
    });
  });
});
