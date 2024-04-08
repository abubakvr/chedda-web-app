import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { LockTab } from "../tabs/LockTab";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { useEnvironment } from "@/hooks";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";

jest.mock("../../../../hooks");
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));

describe("LockTab", () => {
  beforeEach(() => {
    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
  });
  it("renders with provided props", async () => {
    const props = {
      isExtendTab: false,
      title: "Lock Information",
      info: "This is a test information.",
      amount: 100,
      maxAmount: "500",
      cheddaSymbol: "ETH",
      cheddaPrice: 200,
      modalInfo: <div>Test Modal Info</div>,
      allowance: 300,
      isTransactionLoading: false,
      clearInputField: false,
      lockTime: {
        value: 30,
        days: 30,
      },
      lockExpiry: new Date("2024-05-01"),
      buttonAction: jest.fn(),
      setClearInputField: jest.fn(),
      setAmount: jest.fn(),
      setLockTime: jest.fn(),
    };

    const { getByTestId, getByText } = render(
      <MockAppProviders>
        <LockTab {...props} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(getByTestId("lock-card-content")).toBeInTheDocument();
      expect(getByText("Lock Information")).toBeInTheDocument();
      expect(getByText("This is a test information.")).toBeInTheDocument();
      expect(getByText("Enter amount to Lock")).toBeInTheDocument();
      expect(getByTestId("max-amount")).toHaveTextContent("Max: 500.00 ETH");
      expect(getByText("Test Modal Info")).toBeInTheDocument();
    });
  });

  it('displays "Add More Chedda" button if allowance is greater than amount', async () => {
    const buttonActionMock = jest.fn();
    const props = {
      isExtendTab: false,
      title: "Lock Information",
      info: "This is a test information.",
      amount: 100,
      maxAmount: "500",
      cheddaSymbol: "ETH",
      cheddaPrice: 200,
      modalInfo: <div>Test Modal Info</div>,
      allowance: 300,
      isTransactionLoading: false,
      clearInputField: false,
      lockTime: {
        value: 30,
        days: 30,
      },
      lockExpiry: new Date("2024-05-01"),
      buttonAction: buttonActionMock,
      setClearInputField: jest.fn(),
      setAmount: jest.fn(),
      setLockTime: jest.fn(),
    };

    const { getByText } = render(
      <MockAppProviders>
        <LockTab {...props} />
      </MockAppProviders>
    );
    act(() => {
      fireEvent.click(getByText("Add More Chedda"));
    });

    await waitFor(() => {
      expect(buttonActionMock).toHaveBeenCalled();
    });
  });

  it("displays warning message when extending lock to a date earlier than current expiry date", async () => {
    const props = {
      isExtendTab: true,
      title: "Extend Lock",
      info: "This is a test information.",
      amount: 0,
      maxAmount: "500",
      cheddaSymbol: "ETH",
      cheddaPrice: 200,
      modalInfo: <div>Test Modal Info</div>,
      allowance: 300,
      isTransactionLoading: false,
      clearInputField: false,
      lockTime: {
        value: 0,
        days: 0.024,
      },
      lockExpiry: new Date("2024-05-01"),
      buttonAction: jest.fn(),
      setClearInputField: jest.fn(),
      setAmount: jest.fn(),
      setLockTime: jest.fn(),
    };

    const { getByText, getByTestId } = render(
      <MockAppProviders>
        <LockTab {...props} />
      </MockAppProviders>
    );

    act(() => {
      fireEvent.click(getByTestId("custom-button"));
    });

    await waitFor(() => {
      expect(
        getByText(
          "You can't extend the lock to a date earlier than your current expiry date."
        )
      ).toBeInTheDocument();
    });
  });

  it("calls buttonAction when extending lock", async () => {
    const buttonActionMock = jest.fn();

    const props = {
      isExtendTab: true,
      title: "Extend Lock",
      info: "This is a test information.",
      amount: 0,
      maxAmount: "500",
      cheddaSymbol: "ETH",
      cheddaPrice: 200,
      modalInfo: <div>Test Modal Info</div>,
      allowance: 300,
      isTransactionLoading: false,
      clearInputField: false,
      lockTime: {
        value: 30,
        days: 30,
      },
      lockExpiry: new Date("2024-05-01"),
      buttonAction: buttonActionMock,
      setClearInputField: jest.fn(),
      setAmount: jest.fn(),
      setLockTime: jest.fn(),
    };

    const { getByTestId } = render(
      <MockAppProviders>
        <LockTab {...props} />
      </MockAppProviders>
    );

    act(() => {
      fireEvent.click(getByTestId("custom-button"));
    });

    await waitFor(() => {
      expect(buttonActionMock).toHaveBeenCalled();
    });
  });
});
