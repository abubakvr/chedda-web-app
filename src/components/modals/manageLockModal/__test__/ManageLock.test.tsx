import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ManageLockCard } from "../ManageLockModal";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

import { useTransaction } from "@/hooks";

jest.mock("../../../../hooks");
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));

describe("ManageLockCard", () => {
  const defaultProps = {
    isOpen: true,
    cheddaSymbol: "CHEDDA",
    cheddaAllowance: BigInt(100),
    cheddaTokenBalance: BigInt(500),
    cheddaPrice: "200",
    defaultTab: null,
    lockedChedda: undefined,
    isAllowanceLoading: false,
    onClose: jest.fn(),
    updateCard: jest.fn(),
    fetchCheddaAllowance: jest.fn(),
  };

  beforeEach(() => {
    (useTransaction as jest.Mock).mockReturnValue({
      lockCheddaToken: jest.fn(),
      approveCheddaToken: jest.fn(),
    });
  });

  it("renders with default props", async () => {
    const { getByTestId, getAllByText, getByText } = render(
      <MockAppProviders>
        <ManageLockCard {...defaultProps} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(getByTestId("modal-container")).toBeInTheDocument();
      expect(getByText("Manage Lock")).toBeInTheDocument();
      expect(getAllByText("Extend Lock")).not.toBeNull();
      expect(getByText("Add More Chedda")).toBeInTheDocument();
    });
  });

  it("switches tabs on click", async () => {
    const { getByTestId } = render(
      <MockAppProviders>
        <ManageLockCard {...defaultProps} />
      </MockAppProviders>
    );
    const extendLockTab = getByTestId("extend-lock-tab");
    const addMoreTab = getByTestId("add-more-tab");

    fireEvent.click(addMoreTab);
    await waitFor(() => {
      expect(extendLockTab).not.toHaveClass("modal-button");
      expect(addMoreTab).toHaveClass("modal-button");
    });

    fireEvent.click(extendLockTab);
    await waitFor(() => {
      expect(extendLockTab).toHaveClass("modal-button");
      expect(addMoreTab).not.toHaveClass("modal-button");
    });
  });
});
