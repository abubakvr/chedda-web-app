import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { NetworkSwitchBanner } from "../NetworkSwitchBanner"; // Update the import path accordingly
import { useSwitchChain } from "@/hooks";

jest.mock("ethers");
jest.mock("../../../../hooks");

describe("NetworkSwitchBanner", () => {
  const mockSwitchChain = jest.fn();

  beforeEach(() => {
    (useSwitchChain as jest.Mock).mockImplementation(() => mockSwitchChain);
  });

  const renderComponent = (
    currentChain?: number | undefined,
    chainName?: string
  ): RenderResult => {
    return render(
      <NetworkSwitchBanner currentChain={currentChain} chainName={chainName} />
    );
  };

  it("renders with correct content", () => {
    const { getByText, getByTestId } = renderComponent(1, "TestChain");

    expect(getByTestId("info-icon")).toBeInTheDocument();
    expect(getByText(/You are on the wrong network/)).toBeInTheDocument();
    expect(getByText(/switch network to TestChain/i)).toBeInTheDocument();
    expect(getByTestId("switch-button")).toBeInTheDocument();
  });

  it("calls switchChain when the Switch button is clicked", () => {
    const { getByTestId } = renderComponent(1, "TestChain");

    fireEvent.click(getByTestId("switch-button"));
    expect(mockSwitchChain).toHaveBeenCalledWith(1);
  });

  it("does not call switchChain when currentChain is undefined", async () => {
    const { getByTestId } = render(
      <NetworkSwitchBanner currentChain={undefined} chainName={undefined} />
    );

    await act(async () => {
      fireEvent.click(getByTestId("switch-button"));
    });
    waitFor(() => {
      expect(mockSwitchChain).not.toHaveBeenCalled();
    });
  });
});
