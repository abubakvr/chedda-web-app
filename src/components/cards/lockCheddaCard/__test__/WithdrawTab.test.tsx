import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WithdrawTab } from "../tabs/WithdrawTab";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("../../../../hooks");
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 84532,
    isActivating: false,
  })),
}));

describe("WithdrawTab", () => {
  const mockProps = {
    title: "Withdraw",
    cheddaSymbol: "CHEDDA",
    cheddaPrice: 100,
    subTitle: "Earn more CHEDDA while staking",
    modalInfo: <div>Mock modal info</div>,
    isTransactionLoading: false,
    lockedChedda: 10,
    cheddaExpiry: new Date(Date.now() - 86400000),
    withdrawChedda: jest.fn(),
    relockChedda: jest.fn(),
  };

  it("renders correctly", async () => {
    render(
      <MockAppProviders>
        <WithdrawTab {...mockProps} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(screen.getByText("Withdraw your CHEDDA")).toBeInTheDocument();
      expect(
        screen.getByText("Earn more CHEDDA while staking")
      ).toBeInTheDocument();
      expect(screen.getByTestId("locked-chedda-asset")).toHaveTextContent(
        "10 CHEDDA"
      );
      expect(screen.getByTestId("locked-chedda-price")).toHaveTextContent(
        "$1.00K"
      );
      expect(screen.getByText("WITHDRAW")).toBeInTheDocument();
      expect(screen.getByText("RELOCK")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Note: You can't withdraw your locked assets till the end date."
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId("modal-info")).toBeInTheDocument();
      expect(screen.getByTestId("modal-info")).toHaveTextContent(
        "Mock modal info"
      );
    });
  });

  it("handles withdraw action correctly", async () => {
    render(
      <MockAppProviders>
        <WithdrawTab {...mockProps} />
      </MockAppProviders>
    );

    // Mock user interaction to click withdraw button
    fireEvent.click(screen.getByText("WITHDRAW"));

    await waitFor(() => {
      expect(mockProps.withdrawChedda).toHaveBeenCalledTimes(1);
    });
  });

  it("handles relock action correctly", async () => {
    render(
      <MockAppProviders>
        <WithdrawTab {...mockProps} />
      </MockAppProviders>
    );

    // Mock user interaction to click relock button
    fireEvent.click(screen.getByText("RELOCK"));

    await waitFor(() => {
      expect(mockProps.relockChedda).toHaveBeenCalledTimes(1);
    });
  });
});
