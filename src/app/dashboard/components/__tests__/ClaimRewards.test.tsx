import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ClaimRewards } from "../ClaimRewards";
import { useAllClaimableRewards, useTokenValue, useTransaction } from "@/hooks";

jest.mock("../../../../hooks");

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 84532,
    isActivating: false,
  })),
}));

describe("ClaimRewards Component", () => {
  const mockUseAllClaimableRewards = useAllClaimableRewards as jest.Mock;
  const mockUseTokenValue = useTokenValue as jest.Mock;
  const mockUseTransaction = useTransaction as jest.Mock;

  beforeEach(() => {
    mockUseAllClaimableRewards.mockReturnValue({
      data: [BigInt("1000000000000000000"), BigInt("5000000000000000000")],
      isLoading: false,
      fetchData: jest.fn(),
    });
    mockUseTokenValue.mockReturnValue({
      data: "3",
      isLoading: false,
    });
    mockUseTransaction.mockReturnValue({
      claimAllRewards: jest.fn().mockResolvedValue({
        wait: jest.fn().mockResolvedValue({ status: 1, hash: "0x123" }),
      }),
    });
  });

  it("renders lock rewards and stake rewards correctly when wallet is connected", () => {
    render(
      <ClaimRewards
        isWalletConnected={true}
        cheddaTokenPrice={3}
        cheddaTokenPriceLoading={false}
      />
    );

    waitFor(() => {
      expect(screen.getByTestId("lock-rewards")).toHaveTextContent("5.00");
      expect(screen.getByTestId("lock-rewards-value")).toHaveTextContent(
        "$15.00"
      );
      expect(screen.getByTestId("stake-rewards")).toHaveTextContent("1.00");
      expect(screen.getByTestId("stake-rewards-value")).toHaveTextContent(
        "$3.00"
      );
    });
  });

  it("renders ConnectWalletBox when wallet is not connected", () => {
    render(
      <ClaimRewards
        isWalletConnected={false}
        cheddaTokenPrice={3}
        cheddaTokenPriceLoading={false}
      />
    );

    waitFor(() => {
      expect(screen.getByTestId("connect-wallet-box")).toBeInTheDocument();
    });
  });

  it("calls handleClaimAllRewards when claim all button is clicked", async () => {
    render(
      <ClaimRewards
        isWalletConnected={true}
        cheddaTokenPrice={3}
        cheddaTokenPriceLoading={false}
      />
    );

    fireEvent.click(screen.getByTestId("custom-button"));

    // Assert that claimAllRewards was called
    waitFor(() => {
      expect(mockUseTransaction().claimAllRewards).toHaveBeenCalled();
    });
  });
});
