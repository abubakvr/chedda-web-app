import React from "react";
import { render, screen } from "@testing-library/react";
import { BridgeCardInfo, BridgeCardInfoProps } from "../BridgeCardInfo";

describe("BridgeCardInfo component", () => {
  const testData: BridgeCardInfoProps = {
    destination: "Optimism",
    amountToreceive: "100 ARB",
    gasFee: "0.005 ETH",
    transferTime: "30 minutes",
  };

  test("renders BridgeCardInfo component correctly", () => {
    render(<BridgeCardInfo {...testData} />);

    expect(screen.getByTestId("bridge-card-info")).toBeInTheDocument();
    expect(screen.getByTestId("receive-label")).toHaveTextContent(
      "You will receive on Optimism"
    );
    expect(screen.getByTestId("receive-value")).toHaveTextContent("100 ARB");
    expect(screen.getByTestId("gas-fee-label")).toHaveTextContent(
      "Gas on destination"
    );
    expect(screen.getByTestId("gas-fee-value")).toHaveTextContent("0.005 ETH");
    expect(screen.getByTestId("transfer-time-label")).toHaveTextContent(
      "Estimated transfer time"
    );
    expect(screen.getByTestId("transfer-time-value")).toHaveTextContent(
      "30 minutes"
    );
  });
});
