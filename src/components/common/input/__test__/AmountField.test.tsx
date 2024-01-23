import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AmountField } from "../AmountField";

const mockOnChange = jest.fn();
const mockSetClearInputField = jest.fn();

const defaultProps = {
  onChange: mockOnChange,
  maxValue: "100",
  clearInputField: false,
  assetPrice: 10,
  setClearInputField: mockSetClearInputField,
};

describe("AmountField Component", () => {
  it("renders AmountField correctly", () => {
    render(<AmountField {...defaultProps} />);

    // Check if input, max button, and calculated value are rendered
    expect(screen.getByPlaceholderText("0.00")).toBeInTheDocument();
    expect(screen.getByText("$0.00")).toBeInTheDocument();
    expect(screen.getByText("MAX")).toBeInTheDocument();
  });

  it("handles input change correctly", () => {
    render(<AmountField {...defaultProps} />);

    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    // Type a value into the input
    fireEvent.input(input, { target: { value: "50" } });

    // Check if onChange and setClearInputField were called
    expect(mockOnChange).toHaveBeenCalledWith("50");
    expect(mockSetClearInputField).toHaveBeenCalledWith(false);

    // Check if the input value is updated
    expect(input.value).toBe("50");
  });

  it("handles Max button click correctly", () => {
    render(<AmountField {...defaultProps} />);

    const maxButton = screen.getByTestId("max-button");

    // Click the Max button
    fireEvent.click(maxButton);

    // Check if onChange and setClearInputField were called
    expect(mockOnChange).toHaveBeenCalledWith("100");
    expect(mockSetClearInputField).toHaveBeenCalledWith(false);

    // Check if the input value is updated
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;
    expect(input.value).toBe("100");
  });

  it("shows the asset dollar price", () => {
    render(<AmountField {...defaultProps} clearInputField={true} />);

    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    // Type a value into the input
    fireEvent.input(input, { target: { value: "50" } });

    // Check if the input value is updated
    expect(screen.getByTestId("value-box")).toHaveTextContent("500");
  });

  it("clears input field on clearInputField prop change", () => {
    render(<AmountField {...defaultProps} clearInputField={true} />);

    // Check if input field is cleared
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;
    expect(input.value).toBe("");
  });
});
