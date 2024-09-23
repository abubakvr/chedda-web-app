import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { ManageLockCard } from "../ManageLockModal";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { useToast, useTransaction } from "@/hooks";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { Lock } from "chedda-sdk";

jest.mock("../../../../hooks", () => ({
  ...jest.requireActual("../../../../hooks"), // Use the actual implementation of the hooks module
  useTransaction: jest.fn().mockImplementation(() => ({
    lockMoreCheddaToken: jest.fn(),
    approveCheddaToken: jest.fn(),
    relockCheddaToken: jest.fn(),
  })),
  useToast: jest.fn().mockImplementation(() => ({
    addToast: jest.fn(),
  })),
}));

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 84532,
    isActivating: false,
  })),
}));

jest.mock("@next/third-parties/google");
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/markets"),
}));

// const enum LockTime {
//   zero = 0,
//   thirtyDays = 1,
//   ninetyDays = 2,
//   oneEightyDays = 3,
//   threeSixtyDays = 4
// }

const mockLockedChedda: Lock = {
  amount: BigInt(2000),
  expiry: BigInt(1725000000), // September 5, 2024
  timeWeighted: BigInt(0),
  rewardDebt: BigInt(0),
  lockTime: 0,
};

const defaultProps = {
  isOpen: true,
  cheddaSymbol: "CHEDDA",
  cheddaAllowance: BigInt(1000000000000000000000),
  cheddaTokenBalance: BigInt(5000000000000000000000),
  cheddaPrice: 1.5,
  defaultTab: null,
  lockedChedda: mockLockedChedda,
  isAllowanceLoading: false,
  onClose: jest.fn(),
  updateCard: jest.fn(),
  fetchCheddaAllowance: jest.fn(),
};
const MockLockCheddaToken = jest.fn();
const MockApproveChedda = jest.fn();
const MockRelocKChedda = jest.fn();

describe("ManageLockCard", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
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
    const addMoreTab = getByTestId("manage-add-more-tab");

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

describe("Extend Lock Tab", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
    (useTransaction as jest.Mock).mockImplementation(() => ({
      lockMoreCheddaToken: MockLockCheddaToken,
      approveCheddaToken: MockApproveChedda,
      relockCheddaToken: MockRelocKChedda,
    }));
    render(<ManageLockCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId("extend-lock-tab"));
  });

  it("updates lock time when selecting a period", async () => {
    const selectElement = screen.getByTestId("extend-lock-button-1");
    fireEvent.click(selectElement);

    const extendButton = screen.getByTestId("loading-button-icon");
    fireEvent.click(extendButton);

    await waitFor(() => {
      expect(screen.getByText("30 days")).toBeInTheDocument();
    });
  });

  it("calls relockCheddaToken when extending lock", async () => {
    const selectElement = screen.getByTestId("extend-lock-button-1");
    fireEvent.click(selectElement);

    const extendButton = screen.getByTestId("loading-button-icon");
    fireEvent.click(extendButton);

    await waitFor(() => {
      expect(MockRelocKChedda).toHaveBeenCalled();
    });
  });
});

describe("Add More Tab", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
    (useTransaction as jest.Mock).mockImplementation(() => ({
      lockMoreCheddaToken: MockLockCheddaToken,
      approveCheddaToken: MockApproveChedda,
      relockCheddaToken: MockRelocKChedda,
    }));
  });

  it("updates lock amount when entering a value", async () => {
    render(<ManageLockCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId("manage-add-more-tab"));

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "100" } });

    await waitFor(() => {
      expect(inputElement).toHaveValue("100");
    });
  });

  it("displays an error when trying to add more than balance", async () => {
    render(<ManageLockCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId("manage-add-more-tab"));

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "5000" } });

    const addMoreButton = screen.getByText("Approve");
    fireEvent.click(addMoreButton);

    await waitFor(() => {
      expect(MockLockCheddaToken).not.toHaveBeenCalled();
    });
  });

  it("calls approveCheddaToken when adding more CHEDDA (amount > allowance)", async () => {
    render(<ManageLockCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId("manage-add-more-tab"));

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "1050" } });

    const addMoreButton = screen.getByText("Approve");
    fireEvent.click(addMoreButton);

    await waitFor(() => {
      expect(MockApproveChedda).toHaveBeenCalled();
    });
  });

  it("calls lockMoreCheddaToken when adding more CHEDDA (balance > amount < allowance)", async () => {
    render(<ManageLockCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId("manage-add-more-tab"));

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "500" } });

    const addMoreButton = screen.getByText("Lock More Chedda");
    fireEvent.click(addMoreButton);

    await waitFor(() => {
      expect(MockLockCheddaToken).toHaveBeenCalled();
    });
  });
});
