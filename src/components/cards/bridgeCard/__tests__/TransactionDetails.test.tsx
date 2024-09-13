import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TransactionDetails } from "../TransactionDetails";
import { useRouter } from "next/navigation";
import { createClient } from "@layerzerolabs/scan-client";
import { ISourceChain, IToken } from "@/utils/types";
import { StaticImageData } from "next/image";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { LAYERZERO_TESTNET } from "@/utils/constants";

enum MessageStatus {
  INFLIGHT = "INFLIGHT",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  PAYLOAD_STORED = "PAYLOAD_STORED",
  BLOCKED = "BLOCKED",
  CONFIRMING = "CONFIRMING",
}

jest.mock("ethers");
jest.mock("../../../../hooks");

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/bridge"),
  useRouter: jest.fn(),
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

jest.mock("@layerzerolabs/scan-client", () => ({
  ...jest.requireActual("@layerzerolabs/scan-client"),
  createClient: jest.fn(),
}));

const props = {
  handleActiveScreen: jest.fn(),
  returnToInput: jest.fn(),
  selectedChain: {
    chainId: 1,
    key: "ETH",
    name: "Ethereum",
    logo: {} as StaticImageData,
    endpointId: 100,
    jsonRpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    priceFeed: "https://api.etherscan.io/api?module=stats&action=ethprice",
    ethAddress: "0x0000000000000000000000000000000000000000",
  } as ISourceChain,
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
  } as IToken,
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
  ] as IToken[],
  destinationChain: {
    chainId: 5,
    key: "BNB",
    name: "Binance",
    logo: {} as StaticImageData,
    endpointId: 200,
    jsonRpcUrl: "https://bsc-dataseed.binance.org/",
    priceFeed: "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT",
    ethAddress: "0x0000000000000000000000000000000000000000",
  } as ISourceChain,
  amountToSend: 100,
  tokenPrice: 1.0,
  txHash: "sample-tx-hash",
};

const mockRouter = jest.fn();

describe("TransactionDetails", () => {
  const mockProps = {
    handleActiveScreen: jest.fn(),
    returnToInput: jest.fn(),
    selectedToken: {
      symbol: "ETH",
      logo: "/eth-logo.png",
    } as any,
    selectedChain: {
      name: "Ethereum",
      logo: "/ethereum-logo.png",
      txUrlPrefix: "https://etherscan.io/tx",
    } as any,
    destinationChain: {
      name: "Polygon",
      logo: "/polygon-logo.png",
      txUrlPrefix: "https://polygonscan.com/tx",
    } as any,
    amountToSend: 1,
    tokenPrice: 2000,
    txHash: "0x123456789",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial state", () => {
    render(<TransactionDetails {...mockProps} />);

    expect(screen.getByTestId("transaction-details-title")).toHaveTextContent(
      "Transaction Details"
    );
    expect(screen.getByTestId("source-chain")).toBeInTheDocument();
    expect(screen.getByTestId("transaction-status")).toBeInTheDocument();
    expect(screen.getByTestId("destination-chain")).toBeInTheDocument();
    expect(screen.getByTestId("destination-chain-info")).toBeInTheDocument();
  });

  it("displays correct transaction amount and value", () => {
    render(<TransactionDetails {...mockProps} />);

    expect(screen.getAllByText("1 ETH")).toBeTruthy();
    expect(screen.getAllByText("~ $2000.00 • ETH on Ethereum")).toBeTruthy();
  });

  it('shows "Transaction Confirmed" when txHash is provided', () => {
    render(<TransactionDetails {...mockProps} />);

    expect(screen.getByText("Transaction Confirmed")).toBeInTheDocument();
  });

  it('shows "Transaction Processing" when txHash is not provided', () => {
    const propsWithoutTxHash = { ...mockProps, txHash: "" };
    render(<TransactionDetails {...propsWithoutTxHash} />);

    expect(screen.getByText("Transaction Processing")).toBeInTheDocument();
  });

  it("calls returnToInput when back button is clicked", () => {
    render(<TransactionDetails {...mockProps} />);

    fireEvent.click(screen.getByTestId("back-button"));
    expect(mockProps.returnToInput).toHaveBeenCalled();
  });

  it("displays correct links for source and destination chains", () => {
    render(<TransactionDetails {...mockProps} />);

    const sourceChainLink = screen.getByTestId("source-chain-link");
    expect(sourceChainLink).toHaveAttribute(
      "href",
      `${mockProps.selectedChain.txUrlPrefix}/${mockProps.txHash}`
    );

    const destinationChainLink = screen.getByTestId("destination-chain-link");
    expect(destinationChainLink).toHaveAttribute(
      "href",
      `${mockProps.destinationChain.txUrlPrefix}/`
    );
  });

  it("displays LayerZero link with correct URL", () => {
    render(<TransactionDetails {...mockProps} />);

    const layerZeroLink = screen.getByTestId("layerzero-link");
    expect(layerZeroLink).toHaveAttribute(
      "href",
      `${LAYERZERO_TESTNET}/${mockProps.txHash}`
    );
  });

  it('shows "Continue" button when transaction is not completed', () => {
    render(<TransactionDetails {...mockProps} />);

    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it('shows "GO TO MARKETS" and "CONTINUE" buttons when transaction is completed', async () => {
    const mockGetMessagesBySrcTxHash = jest.fn().mockResolvedValue({
      messages: [{ status: MessageStatus.DELIVERED, dstTxHash: "0x987654321" }],
    });
    (createClient as jest.Mock).mockReturnValue({
      getMessagesBySrcTxHash: mockGetMessagesBySrcTxHash,
    });

    render(<TransactionDetails {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByTestId("custom-button")).toBeInTheDocument();
    });
  });
});

describe("TransactionDetails", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouter,
    });
    (createClient as jest.Mock).mockReturnValue({
      getMessagesBySrcTxHash: {
        messages: [
          {
            dstTxHash: "destination-tx-hash",
            srcTxHash: "source-tx-hash",
            status: MessageStatus.INFLIGHT,
          },
        ],
      },
    });
  });

  it("renders the transaction details correctly", async () => {
    (createClient as jest.Mock).mockImplementation(() => ({
      getMessagesBySrcTxHash: jest.fn().mockReturnValue({
        messages: [
          {
            dstTxHash: "destination-tx-hash",
            srcTxHash: "source-tx-hash",
            status: MessageStatus.INFLIGHT,
          },
        ],
      }),
    }));

    render(
      <MockAppProviders>
        <TransactionDetails {...props} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(screen.getByText("Transaction Details")).toBeInTheDocument();
      expect(screen.findAllByText("USDT")).toBeTruthy();
      expect(
        screen.getByText("~ $100.00 • USDT on Ethereum")
      ).toBeInTheDocument();
    });
  });

  it("polls the transaction status and updates the state", async () => {
    (createClient as jest.Mock).mockImplementation(() => ({
      getMessagesBySrcTxHash: jest.fn().mockReturnValue({
        messages: [
          {
            dstTxHash: "destination-tx-hash",
            srcTxHash: "source-tx-hash",
            status: MessageStatus.DELIVERED,
          },
        ],
      }),
    }));

    render(
      <MockAppProviders>
        <TransactionDetails {...props} />
      </MockAppProviders>
    );

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("Transaction Confirmed")).toBeInTheDocument();
        expect(screen.getByText("Bridge Processed")).toBeInTheDocument();
      }, 100);
    });
  });

  it("renders initial state correctly", async () => {
    (createClient as jest.Mock).mockReturnValue({
      getMessagesBySrcTxHash: jest.fn().mockReturnValue({
        messages: [
          {
            dstTxHash: "destination-tx-hash",
            srcTxHash: "source-tx-hash",
            status: MessageStatus.INFLIGHT,
          },
        ],
      }),
    });

    render(
      <MockAppProviders>
        <TransactionDetails {...props} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(screen.getByTestId("back-button")).toBeInTheDocument();
      expect(screen.getByTestId("transaction-details-title")).toHaveTextContent(
        "Transaction Details"
      );
      expect(screen.getByTestId("source-chain")).toBeInTheDocument();
      expect(screen.getByTestId("transaction-status")).toHaveTextContent(
        "Transaction Confirmedon Ethereum"
      );
      expect(screen.queryByTestId("source-chain-link")).toBeVisible();
      expect(screen.queryByTestId("destination-chain-link")).toHaveClass(
        "hidden"
      );
      expect(screen.getByText("Continue")).toBeInTheDocument();
      expect(
        screen.queryByTestId("go-to-markets-button")
      ).not.toBeInTheDocument();
    });
  });

  it("clears interval and timeout when unmounting", () => {
    jest.useFakeTimers();

    // Mock clearInterval and clearTimeout
    const clearIntervalMock = jest.spyOn(global, "clearInterval");
    const clearTimeoutMock = jest.spyOn(global, "clearTimeout");

    const { unmount } = render(<TransactionDetails {...props} />);

    unmount();
    expect(clearIntervalMock).toHaveBeenCalledTimes(1);
    expect(clearTimeoutMock).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
