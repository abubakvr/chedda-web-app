import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SupplyModalContent } from "../SupplyModalContent";
import { StaticImageData } from "next/image";

describe("SupplyModalContent Component", () => {
  const mockProps = {
    title: "Deposit",
    maxAmount: "1000",
    asset: {
      name: "Ethereum",
      symbol: "ETH",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
    },
    assetPrice: 200,
    modalInfo: <div>Mock Modal Info</div>,
    allowance: 500,
    buttonAction: jest.fn(),
    isTransactionLoading: false,
    clearInputField: false,
    setClearInputField: jest.fn(),
    setAmount: jest.fn(),
    amount: 0,
  };

  it("renders component with correct data-testid", () => {
    render(<SupplyModalContent {...mockProps} />);

    const component = screen.getByTestId("supply-modal-content");
    expect(component).toBeInTheDocument();
  });

  it("updates amount on input change", () => {
    render(<SupplyModalContent {...mockProps} />);

    const amountInput = screen.getByTestId("amount-input");

    fireEvent.change(amountInput, { target: { value: "50" } });

    expect(mockProps.setAmount).toHaveBeenCalledWith(50);
  });

  it("uses max amount on MAX button click", () => {
    render(<SupplyModalContent {...mockProps} />);

    const maxButton = screen.getByTestId("max-button");

    fireEvent.click(maxButton);

    expect(mockProps.setAmount).toHaveBeenCalledWith(1000);
  });

  it("calls button action on button click", () => {
    render(<SupplyModalContent {...mockProps} />);

    const actionButton = screen.getByTestId("custom-button");

    fireEvent.click(actionButton);

    expect(mockProps.buttonAction).toHaveBeenCalled();
  });
});
