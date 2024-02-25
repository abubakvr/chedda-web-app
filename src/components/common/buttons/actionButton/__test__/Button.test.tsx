import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Button } from "../Button";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { WalletConnect } from "@web3-react/walletconnect-v2";

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 1,
    isActivating: false,
  })),
}));

describe("Button Component", () => {
  it("renders button correctly", () => {
    render(
      <MockAppProviders>
        <Button
          type="primary"
          onClick={() => {}}
          size="large"
          data-testid="custom-button"
        >
          Click me
        </Button>
      </MockAppProviders>
    );

    const button = screen.getByTestId("custom-button");

    // Check if button is rendered with correct styles
    waitFor(() => {
      expect(button).toHaveClass(
        "primary-button w-full text-center h-[56px] rounded-lg text-white uppercase font-bold text-xl hover:opacity-80 flex justify-center gap-x-3"
      );
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
    });
  });

  it("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(
      <MockAppProviders>
        <Button type="primary" onClick={onClickMock} size="large">
          Click me
        </Button>
      </MockAppProviders>
    );

    const button = screen.getByTestId("custom-button");

    act(() => {
      fireEvent.click(button);
    });

    waitFor(() => {
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  it("does not call onClick handler when disabled", () => {
    const onClickMock = jest.fn();
    render(
      <MockAppProviders>
        <Button type="primary" onClick={onClickMock} size="large" isLoading>
          Click me
        </Button>
      </MockAppProviders>
    );

    const button = screen.getByTestId("custom-button");

    act(() => {
      fireEvent.click(button);
    });

    waitFor(() => {
      expect(onClickMock).not.toHaveBeenCalled();
    });
  });
});
