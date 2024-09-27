import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ClaimRewardsCard } from "../ClaimRewardsCard";
import { useToast, useTokenPrice, useTransaction } from "@/hooks";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { WalletConnect } from "@web3-react/walletconnect-v2";

jest.mock("../../../../hooks", () => ({
  ...jest.requireActual("../../../../hooks"), // Use the actual implementation of the hooks module
  useTransaction: jest.fn().mockImplementation(() => ({
    claimLockRewards: jest.fn(),
    claimStakeRewards: jest.fn(),
  })),
  useToast: jest.fn(),
  useTokenPrice: jest.fn(),
  useAllClaimableRewards: jest.fn(),
}));

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 1,
    isActivating: false,
  })),
}));

jest.mock("@next/third-parties/google");
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/markets"),
}));

jest.mock("../../../../data/environments", () => ({
  currentEnvironment: {
    chainId: 1,
  },
}));

const mockClaimStakeRewards = jest.fn();
const mockClaimLockRewards = jest.fn();
describe("ClaimRewardsCard Component", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      claimStakeRewards: mockClaimStakeRewards,
      claimLockRewards: mockClaimLockRewards,
    }));
    (useTokenPrice as jest.Mock).mockReturnValue({
      data: "1000",
      isLoading: false,
    });
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn,
    }));
  });
  test("renders with provided props", () => {
    const props = {
      claimableRewards: BigInt("10000000000000000000"), // 1 CHEDDA
      decimals: 18,
      rewardType: "Lock" as "Lock",
      setActiveTab: jest.fn(),
      fetchClaimableRewards: jest.fn(),
      assetPrice: 1000,
      fetchCheddaTokenBalance: jest.fn(),
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

  test("should claim lock rewards", async () => {
    const props = {
      claimableRewards: BigInt("100000000000000000000"), // 10 CHEDDA
      decimals: 18,
      rewardType: "Lock" as "Lock",
      setActiveTab: jest.fn(),
      fetchClaimableRewards: jest.fn(),
      assetPrice: 1000,
      fetchCheddaTokenBalance: jest.fn(),
    };

    const { getByText } = render(
      <MockAppProviders>
        <ClaimRewardsCard {...props} />
      </MockAppProviders>
    );

    const claimButton = getByText("Claim");
    fireEvent.click(claimButton);

    await waitFor(() => {
      expect(mockClaimLockRewards).toHaveBeenCalled();
    });
  });

  test("should claim stake rewards", async () => {
    const props = {
      claimableRewards: BigInt("100000000000000000000"), // 10 CHEDDA
      decimals: 18,
      rewardType: "Stake" as "Stake",
      setActiveTab: jest.fn(),
      fetchClaimableRewards: jest.fn(),
      assetPrice: 1000,
      fetchCheddaTokenBalance: jest.fn(),
    };

    const { getByText } = render(
      <MockAppProviders>
        <ClaimRewardsCard {...props} />
      </MockAppProviders>
    );

    const claimButton = getByText("Claim");
    fireEvent.click(claimButton);

    await waitFor(() => {
      expect(mockClaimStakeRewards).toHaveBeenCalled();
    });
  });
});
