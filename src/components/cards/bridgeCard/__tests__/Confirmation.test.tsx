import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ConfirmationScreen } from "../ConfirmationScreen";
import { StaticImageData } from "next/image";
import { IBridgeChain, IConfigToken } from "@/utils/types";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { useWeb3React } from "@web3-react/core";

const mockProps = {
  returnToInput: jest.fn(),
  bridgeToken: jest.fn(),
  selectedChain: {
    chainId: 1,
    key: "ETH",
    name: "Ethereum",
    logo: {} as StaticImageData,
    endpointId: 100,
    jsonRpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    priceFeed: "https://api.etherscan.io/api?module=stats&action=ethprice",
    ethAddress: "0x0000000000000000000000000000000000000000",
  } as IBridgeChain,
  selectedToken: {
    address: "0x123",
    symbol: "USDT",
    decimals: 18,
    source: "ETH",
    type: "OFT",
    oftAdapter: "0x456",
    bridgeToken: true,
    bridgedOft: "0x789",
    name: "Tether USD",
    logo: {} as StaticImageData,
    color: "#26a17b",
  } as IConfigToken,
  tokenList: [
    {
      address: "0x123",
      symbol: "USDT",
      decimals: 18,
      source: "ETH",
      type: "oftAdapter",
      oftAdapter: "0x456",
      bridgeToken: true,
      bridgedOft: "0x789",
      name: "Tether USD",
      logo: {} as StaticImageData,
      color: "#26a17b",
    },
  ] as IConfigToken[],
  destinationChain: {
    chainId: 5,
    key: "BNB",
    name: "Binance",
    logo: {} as StaticImageData,
    endpointId: 200,
    jsonRpcUrl: "https://bsc-dataseed.binance.org/",
    priceFeed: "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT",
    ethAddress: "0x0000000000000000000000000000000000000000",
  } as IBridgeChain,
  amountToSend: 0,
  tokenPrice: 3000,
  estimatedGasFee: { gasETHFee: 0.01, gasUSDFee: 30 },
  isLoading: false,
};

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 4,
    isActivating: false,
  })),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/bridge"),
}));

describe("ConfirmationScreen component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useWeb3React as jest.Mock).mockReturnValue({
      account: "0xABC",
      chainId: 1,
    });
  });

  test("renders back button", async () => {
    render(
      <MockAppProviders>
        <ConfirmationScreen {...mockProps} />
      </MockAppProviders>
    );
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(mockProps.returnToInput).toHaveBeenCalledWith();
    });
  });

  test("renders bridge button", async () => {
    render(
      <MockAppProviders>
        <ConfirmationScreen {...mockProps} />
      </MockAppProviders>
    );
    const bridgeButton = screen.getByTestId("custom-button");
    fireEvent.click(bridgeButton);

    await waitFor(() => {
      expect(mockProps.bridgeToken).toHaveBeenCalled();
    });
  });

  test("renders bridge card info", async () => {
    render(
      <MockAppProviders>
        <ConfirmationScreen {...mockProps} />
      </MockAppProviders>
    );
    const bridgeCardInfo = screen.getByTestId("bridge-card-info");

    await waitFor(() => {
      expect(bridgeCardInfo).toBeInTheDocument();
      expect(screen.getByTestId("receive-label")).toBeInTheDocument();
      expect(screen.getByTestId("receive-value")).toBeInTheDocument();
      expect(screen.getByTestId("gas-fee-label")).toBeInTheDocument();
      expect(screen.getByTestId("gas-fee-value")).toBeInTheDocument();
      expect(screen.getByTestId("transfer-time-label")).toBeInTheDocument();
      expect(screen.getByTestId("transfer-time-value")).toBeInTheDocument();
    });
  });
});
