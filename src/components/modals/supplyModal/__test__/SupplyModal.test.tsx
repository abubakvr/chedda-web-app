import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BigNumber, utils } from "ethers";
import { StaticImageData } from "next/image";
import { SupplyModal } from "../SupplyModal";
import {
  useAllowance,
  useAssetBalance,
  useAvailableLiquidity,
  useEnvironment,
  useTokenBalance,
  useTransaction,
} from "@/hooks";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";
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
  asset: mockAsset,
  assetPrice: 100,
  isOpen: true,
  tokenBalance: BigNumber.from(utils.parseEther("100")),
  baseSupplyAPY: "5%",
  supplied: BigNumber.from(utils.parseEther("50")),
  available: BigNumber.from(utils.parseEther("30")),
  onClose: jest.fn(),
  fetchAccountInfo: jest.fn(),
};

jest.spyOn(window, "alert").mockImplementation(() => {});

describe("SupplyModal", () => {
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
      supplyTxStatus: {
        isLoading: false,
        isApproved: false,
        isDeposited: false,
        isWithdrawn: false,
      },
      depositAsset: jest.fn(),
      approveAsset: jest.fn(),
      withdrawAsset: jest.fn(),
    }));

    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
  });

  it("renders deposit tab content correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    waitFor(() => {
      // Check if the modal title is rendered
      expect(screen.getByTestId("supply-modal-title")).toHaveTextContent(
        "Supply Asset"
      );

      // Check if the deposit tab is initially active
      expect(screen.getByTestId("deposit-tab")).toHaveClass(
        "modal-button rounded"
      );

      // Check if the deposit content is rendered
      expect(screen.getByTestId("deposit-content")).toBeInTheDocument();

      // Check if the withdrawal content is not rendered
      expect(screen.queryByTestId("withdraw-content")).not.toBeInTheDocument();
    });
  });

  it("renders withdraw tab content correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    act(() => {
      // Switch to the Withdraw tab
      fireEvent.click(screen.getByTestId("withdraw-tab"));
    });

    waitFor(() => {
      // Check if the modal title is rendered
      expect(screen.getByTestId("supply-modal-title")).toHaveTextContent(
        "Supply Asset"
      );

      // Check if the Withdraw tab is now active
      expect(screen.getByTestId("withdraw-tab")).toHaveClass(
        "modal-button rounded"
      );

      // Check if the withdrawal content is rendered
      expect(screen.getByTestId("withdraw-content")).toBeInTheDocument();

      // Check if the deposit content is not rendered
      expect(screen.queryByTestId("deposit-content")).not.toBeInTheDocument();
    });
  });

  it("handles deposit action correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    // Check if the deposit tab is initially active
    expect(screen.getByTestId("deposit-tab")).toHaveClass(
      "modal-button rounded"
    );

    // Enter a valid supply amount
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    act(() => {
      // Type a value into the input
      fireEvent.input(input, { target: { value: "0" } });

      // Click the deposit button
      fireEvent.click(screen.getByText("Supply T3"));
    });

    // Ensure the success modal is opened
    await waitFor(() =>
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument()
    );
  });

  it("handles withdraw action correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    // Switch to the Withdraw tab
    fireEvent.click(screen.getByTestId("withdraw-tab"));

    // Check if the Withdraw tab is now active
    expect(screen.getByTestId("withdraw-tab")).toHaveClass(
      "modal-button rounded"
    );

    // Enter a valid withdraw amount
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    // Type a value into the input
    fireEvent.input(input, { target: { value: "0" } });

    // Click the withdraw button
    fireEvent.click(screen.getByText("Withdraw T3"));

    // Ensure the success modal is opened
    await waitFor(() =>
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument()
    );
  });
});
