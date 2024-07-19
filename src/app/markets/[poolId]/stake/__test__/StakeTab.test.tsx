import React from "react";
import { render, screen } from "@testing-library/react";
import StakeTab from "../StakeTab";
import {
  useClaimableStakeRewards,
  useLpAllowance,
  useLpAssetValue,
  useLpDecimals,
  useLpStakers,
  useLpSymbol,
  useLpTokenBalance,
  useStakingBalance,
  useStakingContractAddress,
  useTokenPrice,
  useTokenValue,
  useTotalStaked,
  useTotalSupply,
  useTransaction,
} from "@/hooks";
import { StaticImageData } from "next/image";

// Mocking hooks
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));
jest.mock("../../../../../hooks");

const mockStakeLpToken = jest.fn().mockResolvedValue({ hash: "0x00" });
const mockApproveLpToken = jest.fn().mockResolvedValue({ hash: "0x00" });

describe("StakeTab Component", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isAssetBorrowed: false,
      },
      stakeLpToken: mockStakeLpToken,
      approveLpToken: mockApproveLpToken,
    }));
    (useStakingBalance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLpTokenBalance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLpAllowance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTokenValue as jest.Mock).mockReturnValue({
      data: "1000",
      isLoading: false,
    });
    (useLpDecimals as jest.Mock).mockReturnValue({
      data: 18,
      isLoading: false,
    });
    (useLpAssetValue as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLpSymbol as jest.Mock).mockReturnValue({
      data: "ETH",
      isLoading: false,
    });
    (useTotalStaked as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLpStakers as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTotalSupply as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useStakingContractAddress as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useClaimableStakeRewards as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTokenPrice as jest.Mock).mockReturnValue({
      data: "1000",
      isLoading: false,
    });
  });
  test("renders stake tab with correct data", () => {
    const asset = {
      name: "Token3",
      symbol: "ETH",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
    };
    render(
      <StakeTab
        asset={asset}
        setActiveTab={jest.fn()}
        fetchPoolStats={jest.fn()}
      />
    );

    expect(screen.getByTestId("stake-card")).toBeInTheDocument();
    expect(screen.getByTestId("stake-container")).toBeInTheDocument();
    expect(screen.getByTestId("rewards-card")).toBeInTheDocument();
    expect(screen.getByTestId("stake-information-card")).toBeInTheDocument();
  });
});
