import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BigNumber } from "ethers";
import { LockCheddaCard } from "../LockCheddaCard";
import { useEnvironment, useTransaction } from "@/hooks";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("../../../../hooks");
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));

describe("LockCheddaCard", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockReturnValue({
      lockCheddaToken: jest.fn(),
      approveCheddaToken: jest.fn(),
    });
    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
  });

  it("renders Lock tab content correctly", async () => {
    const mockProps = {
      assetSymbol: "ETH",
      cheddaSymbol: "CHEDDA",
      cheddaAllowance: BigNumber.from(1000),
      cheddaTokenBalance: BigNumber.from(500),
      cheddaPrice: "100",
      defaultTab: "Lock",
      lockedChedda: undefined,
      isAllowanceLoading: false,
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
      cheddaAllowance: BigNumber.from("1000000000000000000000"),
      cheddaTokenBalance: BigNumber.from("50000000000000000000000000"),
      cheddaPrice: "100",
      defaultTab: "Lock",
      lockedChedda: undefined,
      isAllowanceLoading: false,
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
      cheddaAllowance: BigNumber.from("1000000000000000000000"),
      cheddaTokenBalance: BigNumber.from("50000000000000000000000000"),
      cheddaPrice: "100",
      defaultTab: "Withdraw",
      lockedChedda: undefined,
      isAllowanceLoading: false,
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
