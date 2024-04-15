import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ClaimRewardsCard } from "../ClaimRewardsCard";
import { BigNumber } from "ethers";
import { useTokenPrice, useTransaction } from "@/hooks";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("../../../../hooks");

const mockClaimRewards = jest.fn();
describe("ClaimRewardsCard Component", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      claimRewards: jest.fn(),
    }));

    (useTokenPrice as jest.Mock).mockReturnValue({
      data: "1000",
      isLoading: false,
    });
  });
  test("renders with provided props", () => {
    const props = {
      claimableRewards: BigNumber.from("1000000000000000000"), // 1 CHEDDA
      decimals: 18,
      rewardType: "Lock" as "Lock",
      setActiveTab: jest.fn(),
      fetchClaimableRewards: jest.fn(),
    };

    const { getByText } = render(
      <MockAppProviders>
        <ClaimRewardsCard {...props} />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(getByText("CLAIM REWARDS")).toBeInTheDocument();
      expect(getByText("Claimable Rewards")).toBeInTheDocument();
      expect(getByText("1 CHEDDA")).toBeInTheDocument();
    });
  });

  test("clicking on the claim button calls handleClaimRewards function", async () => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      claimRewards: mockClaimRewards,
    }));
    const props = {
      claimableRewards: BigNumber.from("0000000000000000000"), // 1 CHEDDA
      decimals: 18,
      rewardType: "Lock" as "Lock",
      setActiveTab: jest.fn(),
      fetchClaimableRewards: jest.fn(),
    };

    const { getByText, getByTestId } = render(
      <MockAppProviders>
        <ClaimRewardsCard {...props} />
      </MockAppProviders>
    );

    const claimButton = getByText("Claim");
    fireEvent.click(claimButton);

    await waitFor(() => {
      expect(getByTestId("loading-button-icon")).toBeInTheDocument();
    });
  });
});
