import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BigNumber, utils } from "ethers";
import { StaticImageData } from "next/image";
import { StakeCard } from "../StakeCard";
import {
  useAllowance,
  useAssetBalance,
  useAvailableLiquidity,
  useTokenBalance,
  useTransaction,
} from "@/hooks";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("ethers");
jest.mock("../../../../hooks");

const mockAsset = {
  name: "Token3",
  symbol: "T3",
  address: "0xfed321",
  logo: {} as StaticImageData,
  decimals: 18,
  color: "#ffffff",
};

const mockProps = {
  assetSymbol: "ETH",
  lpSymbol: "chETH",
  lpDecimals: 18,
  lpAssetValue: BigNumber.from(utils.parseEther("50")),
  lpAllowance: BigNumber.from(utils.parseEther("50")),
  lpStakingBalance: BigNumber.from(utils.parseEther("50")),
  lpTokenBalance: BigNumber.from(utils.parseEther("50")),
  assetValue: 10000,
  defaultTab: "Pool",
  updateCard: jest.fn(),
  fetchLpAllowance: jest.fn(),
};

jest.spyOn(window, "alert").mockImplementation(() => {});

describe("StakeCard", () => {
  beforeEach(() => {
    (useAllowance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));

    (useAssetBalance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));

    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));
    (useAvailableLiquidity as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));

    (useTransaction as jest.Mock).mockImplementation(() => ({
      approveLpToken: jest.fn(),
      stakeLpToken: jest.fn(),
    }));
  });

  it("renders stake tab content correctly", async () => {
    render(
      <MockAppProviders>
        <StakeCard {...mockProps} />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByTestId("stake-tab")).toHaveClass(
        "modal-button rounded"
      );

      expect(screen.getByTestId("stake-content")).toBeInTheDocument();

      expect(screen.queryByTestId("unstake-content")).not.toBeInTheDocument();
    });
  });

  it("renders unstake tab content correctly", async () => {
    render(
      <MockAppProviders>
        <StakeCard {...mockProps} />
      </MockAppProviders>
    );

    act(() => {
      // Switch to the unstake tab
      fireEvent.click(screen.getByTestId("unstake-tab"));
    });

    waitFor(() => {
      // Check if the unstake tab is now active
      expect(screen.getByTestId("unstake-tab")).toHaveClass(
        "modal-button rounded"
      );

      expect(screen.getByTestId("unstake-content")).toBeInTheDocument();

      expect(screen.queryByTestId("stake-content")).not.toBeInTheDocument();
    });
  });

  it("handles stake action correctly", async () => {
    render(
      <MockAppProviders>
        <StakeCard {...mockProps} />
      </MockAppProviders>
    );

    fireEvent.click(screen.getByTestId("stake-tab"));

    expect(screen.getByTestId("stake-tab")).toHaveClass("modal-button rounded");

    // Enter a valid unstake amount
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    act(() => {
      // Type a value into the input
      fireEvent.input(input, { target: { value: "0" } });

      fireEvent.click(screen.getByTestId("custom-button"));
    });

    // Ensure the success modal is opened
    await waitFor(() =>
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument()
    );
  });

  it("handles unstake action correctly", async () => {
    render(
      <MockAppProviders>
        <StakeCard {...mockProps} />
      </MockAppProviders>
    );

    // Switch to the unstake tab
    fireEvent.click(screen.getByTestId("unstake-tab"));

    expect(screen.getByTestId("unstake-tab")).toHaveClass(
      "modal-button rounded"
    );

    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    // Type a value into the input
    fireEvent.input(input, { target: { value: "0" } });

    fireEvent.click(screen.getByTestId("custom-button"));

    // Ensure the success modal is opened
    await waitFor(() =>
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument()
    );
  });
});
