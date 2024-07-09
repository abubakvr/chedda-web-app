import React from "react";
import { render, screen } from "@testing-library/react";
import { NetworkIndicator } from "../NetworkIndicator";

describe("NetworkIndicator component", () => {
  test("renders Network Indicator with correct content", () => {
    const { getByText, getByTestId } = render(
      <NetworkIndicator
        network="Arbitrum"
        account="0x55"
        isWrongNetwork={false}
      />
    );

    // Check if the main container is rendered
    const mainContainer = getByTestId("network-indicator");
    expect(mainContainer).toBeInTheDocument();

    // Check if the text "Network: " is rendered
    const networkText = getByText(/Network:/);
    expect(networkText).toBeInTheDocument();

    // Check if the network name "Arbitrum" is rendered
    const networkName = getByTestId("app-network");
    expect(networkName).toHaveTextContent(/Arbitrum/);

    // Check if the circle element for network status is rendered
    const networkCircle = getByTestId("network-status-circle");
    expect(networkCircle).toBeInTheDocument();
  });

  test("renders Network Indicator with account circle if account is provided", () => {
    // Arrange
    const network = "Test Network";
    const account = "test_account";
    const { getByText, getByTestId } = render(
      <NetworkIndicator
        network={network}
        account={account}
        isWrongNetwork={false}
      />
    );

    // Act
    // Check if the main container is rendered
    const mainContainer = getByTestId("network-indicator");
    expect(mainContainer).toBeInTheDocument();

    // Check if the text "Network: " is rendered
    const networkText = getByText(/Network:/);
    expect(networkText).toBeInTheDocument();

    // Check if the network name is rendered correctly
    const networkName = getByText(network);
    expect(networkName).toBeInTheDocument();

    // Check if the account circle is rendered
    const accountCircle = getByTestId("network-status-circle");
    expect(accountCircle).toBeInTheDocument();
  });

  test("renders the network and account status correctly", () => {
    // Arrange
    const network = "Ethereum";
    const account = "0x123";

    // Act
    render(
      <NetworkIndicator
        network={network}
        account={account}
        isWrongNetwork={false}
      />
    );

    // Assert
    expect(screen.getByText(/Network:/i)).toBeInTheDocument();
    expect(screen.getByText(network)).toBeInTheDocument();
    expect(screen.getByTestId("network-status-circle")).toHaveClass(
      "bg-success"
    );
  });

  test("renders the error status correctly when account is undefined", () => {
    // Arrange
    const network = "Ethereum";
    const account = undefined;

    // Act
    render(
      <NetworkIndicator
        network={network}
        account={account}
        isWrongNetwork={false}
      />
    );

    // Assert
    expect(screen.getByText(/Network:/i)).toBeInTheDocument();
    expect(screen.getByText(network)).toBeInTheDocument();
    expect(screen.getByTestId("network-status-circle")).toHaveClass(
      "border-error"
    );
  });
});
