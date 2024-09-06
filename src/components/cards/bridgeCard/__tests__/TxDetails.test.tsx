import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TransactionDetails, MessageStatus } from "../TransactionDetails";
import { createClient } from "@layerzerolabs/scan-client";
import { LAYERZERO_TESTNET } from "@/utils/constants";
import { WalletConnect } from "@web3-react/walletconnect-v2";

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 84532,
    isActivating: false,
  })),
}));
// Mock next/navigation
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/markets"),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock createClient
jest.mock("@layerzerolabs/scan-client", () => ({
  createClient: jest.fn(),
}));

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
