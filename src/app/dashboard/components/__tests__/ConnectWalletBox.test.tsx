import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ConnectWalletBox } from "../ConnectWalletBox";

// Mock the ConnectModal component
jest.mock("../../../../components/modals", () => ({
  ConnectModal: jest.fn(({ isModalOpen, setIsModalOpen }) =>
    isModalOpen ? (
      <div data-testid="connect-modal">Connect Modal Content</div>
    ) : null
  ),
}));

describe("ConnectWalletBox", () => {
  test("renders connect wallet box with button", () => {
    render(<ConnectWalletBox title="Test Title" />);

    // Assert main container and its contents
    const connectWalletBox = screen.getByTestId("connect-wallet-box");
    expect(connectWalletBox).toBeInTheDocument();

    const connectMessage = screen.getByTestId("connect-wallet-message");
    expect(connectMessage).toHaveTextContent(
      "Connect your wallet to see your Test Title"
    );

    const connectButton = screen.getByTestId("connect-wallet-button");
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toHaveTextContent("Connect Wallet");

    // Assert ConnectModal is initially not rendered
    const connectModal = screen.queryByTestId("connect-modal");
    expect(connectModal).toBeNull();

    // Click the connect button to open the modal
    fireEvent.click(connectButton);

    // Assert that ConnectModal is now rendered
    const openConnectModal = screen.getByTestId("connect-modal");
    expect(openConnectModal).toBeInTheDocument();
    expect(openConnectModal).toHaveTextContent("Connect Modal Content");
  });
});
