import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SuccessModal } from "../SuccessModal";

// Mock the Image component to avoid issues with Next.js Image component in tests
jest.mock("next/image");

describe("SuccessModal", () => {
  const onCloseMock = jest.fn();
  const continueActionMock = jest.fn();

  const renderComponent = (isOpen: boolean, modalMessage: string) => {
    render(
      <SuccessModal
        isOpen={isOpen}
        onClose={onCloseMock}
        modalMessage={modalMessage}
        continueAction={continueActionMock}
      />
    );
  };

  it("renders the component when isOpen is true", () => {
    renderComponent(true, "Modal Message");
    expect(screen.getByText("Transaction Completed")).toBeInTheDocument();
    expect(screen.getByText("Modal Message")).toBeInTheDocument();
  });

  it("does not render the component when isOpen is false", () => {
    renderComponent(false, "Modal Message");
    expect(screen.queryByText("Transaction Completed")).toBeNull();
    expect(screen.queryByText("Modal Message")).toBeNull();
  });

  it("calls onClose when close button is clicked", () => {
    renderComponent(true, "Modal Message");
    fireEvent.click(screen.getByText("×"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls continueAction when Continue button is clicked", () => {
    renderComponent(true, "Modal Message");
    fireEvent.click(screen.getByText("Continue"));
    expect(continueActionMock).toHaveBeenCalledTimes(1);
  });

  it("has correct IDs for main container and transaction completed text", () => {
    renderComponent(true, "Modal Message");
    expect(screen.getByTestId("successModalContainer")).toBeInTheDocument();
    expect(screen.getByTestId("transactionCompletedText")).toBeInTheDocument();
  });
});
