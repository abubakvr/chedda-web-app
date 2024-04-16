import React from "react";
import { render } from "@testing-library/react";
import { NetworkIndicator } from "../NetworkIndicator";

describe("NetworkIndicator component", () => {
  test("renders Network Indicator with correct content", () => {
    const { getByText, getByTestId } = render(
      <NetworkIndicator network="Arbitrum" account="0x55" />
    );

    // Check if the main container is rendered
    const mainContainer = getByTestId("network-indicator");
    expect(mainContainer).toBeInTheDocument();

    // Check if the text "Network: " is rendered
    const networkText = getByText(/Network:/);
    expect(networkText).toBeInTheDocument();

    // Check if the network name "Arbitrum" is rendered
    const networkName = getByText(/Arbitrum/);
    expect(networkName).toBeInTheDocument();

    // Check if the circle element for network status is rendered
    const networkCircle = getByTestId("network-status-circle");
    expect(networkCircle).toBeInTheDocument();
  });

  test("renders Network Indicator with account circle if account is provided", () => {
    // Arrange
    const network = "Test Network";
    const account = "test_account";
    const { getByText, getByTestId } = render(
      <NetworkIndicator network={network} account={account} />
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

  test("renders Network Indicator without account circle if account is not provided", () => {
    // Arrange
    const network = "Test Network";
    const { getByText, queryByTestId, getByTestId } = render(
      <NetworkIndicator network={network} account={undefined} />
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

    // Check if the account circle is not rendered
    const accountCircle = queryByTestId("network-status-circle");
    expect(accountCircle).toBeNull();
  });
});
