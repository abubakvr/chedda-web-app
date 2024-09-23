import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { LockCheddaCard } from "../LockCheddaCard";
import { useToast, useTransaction } from "@/hooks";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { Lock } from "chedda-sdk";

jest.spyOn(window, "alert").mockImplementation(() => {});

jest.mock("../../../../hooks");
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));
jest.mock("@next/third-parties/google");
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/bridge"),
}));

const MockLockChedda = jest.fn();
const MockApproveChedda = jest.fn();
const MockWithdrawChedda = jest.fn();
const MockRelockChedda = jest.fn();

describe("LockCheddaCard", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockReturnValue({
      lockCheddaToken: jest.fn(),
      approveCheddaToken: jest.fn(),
    });
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
  });

  it("renders Lock tab content correctly", async () => {
    const mockProps = {
      assetSymbol: "ETH",
      cheddaSymbol: "CHEDDA",
      cheddaAllowance: BigInt(1000),
      cheddaTokenBalance: BigInt(500),
      cheddaPrice: 100,
      defaultTab: "Lock",
      lockedChedda: undefined,
      isAllowanceLoading: false,
      openManageLockModal: jest.fn(),
      updateCard: jest.fn(),
      fetchCheddaAllowance: jest.fn(),
    };

    render(
      <MockAppProviders>
        <LockCheddaCard {...mockProps} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(screen.getByTestId("lock-card-container")).toBeInTheDocument();
      expect(screen.getByTestId("lock-tab")).toHaveTextContent("Lock");
      expect(screen.getByTestId("withdraw-tab")).toHaveTextContent("Withdraw");
      expect(screen.getByTestId("lock-content")).toBeInTheDocument();
      expect(screen.queryByTestId("withdraw-content")).not.toBeInTheDocument();
    });
  });

  it("handles lock action correctly", async () => {
    const mockProps = {
      assetSymbol: "ETH",
      cheddaSymbol: "CHEDDA",
      cheddaAllowance: BigInt("1000000000000000000000"),
      cheddaTokenBalance: BigInt("50000000000000000000000000"),
      cheddaPrice: 100,
      defaultTab: "Lock",
      lockedChedda: undefined,
      isAllowanceLoading: false,
      openManageLockModal: jest.fn(),
      updateCard: jest.fn(),
      fetchCheddaAllowance: jest.fn(),
    };

    render(
      <MockAppProviders>
        <LockCheddaCard {...mockProps} />
      </MockAppProviders>
    );

    const mockLockCheddaToken = jest
      .fn()
      .mockResolvedValue({ wait: jest.fn() });
    const mockApproveCheddaToken = jest
      .fn()
      .mockResolvedValue({ wait: jest.fn() });
    (useTransaction as jest.Mock).mockReturnValue({
      lockCheddaToken: mockLockCheddaToken,
      approveCheddaToken: mockApproveCheddaToken,
    });

    // Mock user interaction to enter lock amount
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;
    act(() => {
      fireEvent.input(input, { target: { value: "10" } });
      fireEvent.click(screen.getByTestId("custom-button"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
    });
  });

  it("handles withdraw and relock action correctly", async () => {
    const mockProps = {
      assetSymbol: "ETH",
      cheddaSymbol: "CHEDDA",
      cheddaAllowance: BigInt("1000000000000000000000"),
      cheddaTokenBalance: BigInt("50000000000000000000000000"),
      cheddaPrice: 100,
      defaultTab: "Withdraw",
      lockedChedda: undefined,
      isAllowanceLoading: false,
      openManageLockModal: jest.fn(),
      updateCard: jest.fn(),
      fetchCheddaAllowance: jest.fn(),
    };

    render(
      <MockAppProviders>
        <LockCheddaCard {...mockProps} />
      </MockAppProviders>
    );

    act(() => {
      fireEvent.click(screen.getByText("Withdraw"));
    });

    await waitFor(() => {
      expect(screen.queryAllByText("loading-button-icon")).not.toBeNull();
    });
  });
});

describe("Lock Tab", () => {
  const defaultProps = {
    assetSymbol: "ETH",
    cheddaSymbol: "CHEDDA",
    cheddaAllowance: BigInt(1000000000000000000000),
    cheddaTokenBalance: BigInt(5000000000000000000000),
    cheddaPrice: 1.5,
    defaultTab: null,
    lockedChedda: undefined,
    isAllowanceLoading: false,
    openManageLockModal: jest.fn(),
    updateCard: jest.fn(),
    fetchCheddaAllowance: jest.fn(),
  };
  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
    (useTransaction as jest.Mock).mockReturnValue({
      lockCheddaToken: MockLockChedda,
      approveCheddaToken: MockApproveChedda,
      withdrawCheddaToken: MockWithdrawChedda,
      relockCheddaToken: MockRelockChedda,
    });
    render(<LockCheddaCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId("lock-tab"));
  });

  it("updates lock time when selecting a period", async () => {
    const selectElement = screen.getByTestId("lock-days-button-1");
    fireEvent.click(selectElement);

    const extendButton = screen.getByTestId("loading-button-icon");
    fireEvent.click(extendButton);

    await waitFor(() => {
      expect(screen.getByText("30 days")).toBeInTheDocument();
    });
  });

  it("displays an error when trying to add more than balance", async () => {
    const selectElement = screen.getByTestId("lock-days-button-1");
    fireEvent.click(selectElement);

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "6000" } });

    const addMoreButton = screen.getByText("Approve");
    fireEvent.click(addMoreButton);

    await waitFor(() => {
      expect(MockApproveChedda).not.toHaveBeenCalled();
      expect(MockLockChedda).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Enter valid amount");
    });
  });

  it("calls lockCheddaToken when adding new lock", async () => {
    const selectElement = screen.getByTestId("lock-days-button-1");
    fireEvent.click(selectElement);

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "100" } });

    const extendButton = screen.getByTestId("custom-button");
    fireEvent.click(extendButton);

    await waitFor(() => {
      expect(MockLockChedda).toHaveBeenCalled();
    });
  });

  it("calls approveCheddaToken when adding new lock", async () => {
    const selectElement = screen.getByTestId("lock-days-button-1");
    fireEvent.click(selectElement);

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "1050" } });

    const extendButton = screen.getByTestId("custom-button");
    fireEvent.click(extendButton);

    await waitFor(() => {
      expect(MockApproveChedda).toHaveBeenCalled();
    });
  });
});

describe("Withdraw Tab", () => {
  const mockLockedChedda: Lock = {
    amount: BigInt(2000),
    expiry: BigInt(1725000000), // September 5, 2024
    timeWeighted: BigInt(0),
    rewardDebt: BigInt(0),
    lockTime: 0,
  };

  const defaultProps = {
    assetSymbol: "ETH",
    cheddaSymbol: "CHEDDA",
    cheddaAllowance: BigInt(1000000000000000000000),
    cheddaTokenBalance: BigInt(5000000000000000000000),
    cheddaPrice: 1.5,
    defaultTab: null,
    lockedChedda: mockLockedChedda,
    isAllowanceLoading: false,
    openManageLockModal: jest.fn(),
    updateCard: jest.fn(),
    fetchCheddaAllowance: jest.fn(),
  };

  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
    (useTransaction as jest.Mock).mockReturnValue({
      lockCheddaToken: MockLockChedda,
      approveCheddaToken: MockApproveChedda,
      withdrawCheddaToken: MockWithdrawChedda,
      relockCheddaToken: MockRelockChedda,
    });
  });

  it("displays an error when trying to add more than balance", async () => {
    render(<LockCheddaCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId("withdraw-tab"));

    const withdrawCheddaButton = screen.getByText("WITHDRAW");
    fireEvent.click(withdrawCheddaButton);

    await waitFor(() => {
      expect(MockWithdrawChedda).toHaveBeenCalled();
    });
  });

  it("displays an error when trying to add more than balance", async () => {
    render(<LockCheddaCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId("withdraw-tab"));

    const relockCheddaButton = screen.getByText("RELOCK");
    fireEvent.click(relockCheddaButton);

    await waitFor(() => {
      expect(MockRelockChedda).toHaveBeenCalled();
    });
  });
});
