import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { LockTab } from "../tabs/LockTab";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

const mockButtonAction = jest.fn();

jest.mock("../../../../hooks");
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));

describe("LockTab Component", () => {
  beforeEach(() => {});
  test("renders LockTab component with unlocked Chedda", async () => {
    const props = {
      title: "Lock",
      maxAmount: "100",
      cheddaSymbol: "CHEDDA",
      subTitle: "Subtitle",
      cheddaPrice: 1,
      allowance: 200,
      modalInfo: <div>Modal Info</div>,
      amount: 50,
      clearInputField: false,
      isTransactionLoading: false,
      lockTime: 0,
      lockedChedda: undefined,
      openManageLockModal: jest.fn(),
      lockCheddaToken: mockButtonAction,
      setClearInputField: jest.fn(),
      setAmount: jest.fn(),
      setLockTime: jest.fn(),
    };

    const { getByTestId, getByText } = render(
      <MockAppProviders>
        <LockTab {...props} />
      </MockAppProviders>
    );

    // Assert elements in unlocked state
    expect(getByTestId("lock-card-content")).toBeInTheDocument();
    expect(getByTestId("amount-label")).toHaveTextContent(
      "Enter amount to Lock"
    );
    expect(getByTestId("max-amount")).toHaveTextContent("Max: 100.00 CHEDDA");
    expect(getByTestId("modal-info")).toHaveTextContent("Modal Info");

    // Simulate clicking the lock time button
    fireEvent.click(getByText("30 days"));

    const input = screen.queryByTestId("amount-input") as HTMLInputElement;
    act(() => {
      fireEvent.input(input, { target: { value: "10" } });
      fireEvent.click(screen.getByTestId("custom-button"));
    });

    await waitFor(() => {
      expect(props.setLockTime).toHaveBeenCalledWith({ value: 1, days: 30 });
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
    });
  });

  test("renders LockTab component with locked Chedda", async () => {
    const props = {
      title: "Lock",
      maxAmount: "100",
      cheddaSymbol: "CHEDDA",
      subTitle: "Subtitle",
      cheddaPrice: 1,
      allowance: 0,
      modalInfo: <div>Modal Info</div>,
      amount: 0,
      clearInputField: false,
      isTransactionLoading: false,
      lockTime: undefined,
      lockedChedda: 50,
      openManageLockModal: jest.fn(),
      lockCheddaToken: jest.fn(),
      setClearInputField: jest.fn(),
      setAmount: jest.fn(),
      setLockTime: jest.fn(),
    };

    const { getByTestId } = render(
      <MockAppProviders>
        <LockTab {...props} />
      </MockAppProviders>
    );

    // Assert elements in locked state
    expect(getByTestId("lock-card-content")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("locked-chedda-asset")).toHaveTextContent(
        "50.00 CHEDDA"
      );
      expect(screen.getByTestId("locked-chedda-price")).toHaveTextContent(
        "$50"
      );
    });
  });
});
