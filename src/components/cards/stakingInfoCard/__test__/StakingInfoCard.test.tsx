import React from "react";
import { render } from "@testing-library/react";
import { StakingInfoCard } from "../StakingInfoCard";

import { useStakingContractAddress } from "@/hooks";

jest.mock("../../../../hooks");

describe("StakingInfoCard Component", () => {
  beforeEach(() => {
    (useStakingContractAddress as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
  });
  test("renders with provided props", () => {
    const props = {
      assetSymbol: "ETH",
      assetDecimals: 18,
      totalStaked: BigInt("20000000000000000000"),
      lpStakers: BigInt("130"),
      lpAssetValue: BigInt("1000000000000000000"),
      totalSupply: BigInt("100000000000000000000"),
      lpDecimals: 18,
      lpSymbol: "chETH",
    };

    const { getByText } = render(<StakingInfoCard {...props} />);

    expect(getByText("Annual Percentage Rate")).toBeInTheDocument();
    expect(getByText("5.52%")).toBeInTheDocument();
    expect(getByText("Total Staked")).toBeInTheDocument();
    expect(getByText("20.00 chETH")).toBeInTheDocument();
    expect(getByText("Underlying Asset Amount")).toBeInTheDocument();
    expect(getByText("20.00 ETH")).toBeInTheDocument();
    expect(getByText("Percentage of LP Staked")).toBeInTheDocument();
    expect(getByText("20.00%")).toBeInTheDocument();
    expect(getByText("Stakers")).toBeInTheDocument();
    expect(getByText("130")).toBeInTheDocument();
  });
});
