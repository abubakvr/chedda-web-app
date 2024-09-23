import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StakeCard } from "../StakeCard";
import {
  useAllowance,
  useAssetBalance,
  useAvailableLiquidity,
  useToast,
  useTokenBalance,
  useTransaction,
} from "@/hooks";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

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
  useAllowance: jest.fn(),
  useAssetBalance: jest.fn(),
  useTokenBalance: jest.fn(),
  useAvailableLiquidity: jest.fn(),
}));

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

jest.mock("chedda-sdk");

jest.spyOn(window, "alert").mockImplementation(() => {});

const MockApproveLpToken = jest.fn();
const MockStakeLpToken = jest.fn();
const MockUnstakeLpToken = jest.fn();

const mockProps = {
  assetSymbol: "ETH",
  lpSymbol: "chETH",
  lpDecimals: 18,
  lpAssetValue: BigInt("50000000000000000000"),
  lpAllowance: BigInt("500000000000000000000"),
  lpStakingBalance: BigInt("50000000000000000000000"),
  lpTokenBalance: BigInt("50000000000000000000000"),
  lpAllowanceLoading: false,
  assetValue: 10000,
  defaultTab: "Pool",
  updateCard: jest.fn(),
  fetchLpAllowance: jest.fn(),
};

describe("Stake Tab", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
    (useTransaction as jest.Mock).mockImplementation(() => ({
      approveLpToken: MockApproveLpToken,
      stakeLpToken: MockStakeLpToken,
      unStakeLpToken: MockUnstakeLpToken,
    }));
    (useAllowance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: BigInt("500000000000000000000"),
    }));

    (useAssetBalance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: BigInt("500000000000000000000"),
    }));

    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: BigInt("500000000000000000000"),
    }));
    (useAvailableLiquidity as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: BigInt("500000000000000000000"),
    }));

    render(
      <MockAppProviders>
        <StakeCard {...mockProps} />
      </MockAppProviders>
    );
    fireEvent.click(screen.getByTestId("stake-tab"));
  });

  it("shows error when input amount is invalid", async () => {
    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "0" } });

    const approveButton = screen.getByTestId("custom-button");
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(MockApproveLpToken).not.toHaveBeenCalled();
      expect(MockStakeLpToken).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Enter valid amount");
    });
  });

  it("handles approving chedda lp token", async () => {
    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "6000" } });

    const approveButton = screen.getByText("Approve");
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(MockApproveLpToken).toHaveBeenCalled();
    });
  });

  it("handles staking chedda token", async () => {
    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "300" } });

    const stakeButton = screen.getByTestId("custom-button");
    fireEvent.click(stakeButton);

    await waitFor(() => {
      expect(MockStakeLpToken).toHaveBeenCalled();
    });
  });
});

describe("Unstake Tab", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
    (useTransaction as jest.Mock).mockImplementation(() => ({
      approveLpToken: MockApproveLpToken,
      stakeLpToken: MockStakeLpToken,
      unStakeLpToken: MockUnstakeLpToken,
    }));
    (useAllowance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: BigInt("500000000000000000000"),
    }));

    (useAssetBalance as jest.Mock).mockReturnValue(() => ({
      isLoading: false,
      data: BigInt("500000000000000000000"),
    }));

    (useTokenBalance as jest.Mock).mockReturnValue(() => ({
      isLoading: false,
      data: BigInt("500000000000000000000"),
    }));
    (useAvailableLiquidity as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: BigInt("500000000000000000000"),
    }));
  });

  it("displays an error when trying to withdraw more than balance", async () => {
    render(
      <MockAppProviders>
        <StakeCard {...mockProps} />
      </MockAppProviders>
    );
    fireEvent.click(screen.getByTestId("unstake-tab"));

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "0" } });

    const unstakeButton = screen.getByTestId("custom-button");
    fireEvent.click(unstakeButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Enter valid amount");
    });
  });

  it("handles withdrawing staked lp tokens", async () => {
    render(
      <MockAppProviders>
        <StakeCard {...mockProps} />
      </MockAppProviders>
    );
    fireEvent.click(screen.getByTestId("unstake-tab"));

    const inputElement = screen.getByTestId("amount-input");
    fireEvent.change(inputElement, { target: { value: "6000" } });

    const unstakeButton = screen.getByTestId("custom-button");
    fireEvent.click(unstakeButton);

    await waitFor(() => {
      expect(MockUnstakeLpToken).toHaveBeenCalled();
    });
  });
});
