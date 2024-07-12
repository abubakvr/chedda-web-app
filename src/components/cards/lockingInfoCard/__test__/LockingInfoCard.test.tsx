import React from "react";
import { render } from "@testing-library/react";
import { LockingInfoCard } from "../LockingInfoCard";
import { BigNumber } from "ethers";
import { useGaugeAddress } from "@/hooks";

jest.mock("../../../../hooks");

describe("StakingInfoCard Component", () => {
  beforeEach(() => {
    (useGaugeAddress as jest.Mock).mockReturnValue({
      data: "0x00",
      isLoading: false,
    });
  });
  it("renders with provided props", () => {
    const props = {
      assetSymbol: "ETH",
      totalWeightSum: BigNumber.from("2000000000000000000000"),
      totalWeight: BigNumber.from("50000000000000000000"),
      totalAmountLocked: BigNumber.from("200000000000000000000"),
    };

    const { getByText, getByAltText } = render(<LockingInfoCard {...props} />);

    // Check if elements with specific text content are rendered
    expect(getByText("LOCK INFORMATION")).toBeInTheDocument();
    expect(getByText("Annual Percentage Rate")).toBeInTheDocument();
    expect(getByText("Total Locked")).toBeInTheDocument();
    expect(getByText("Weight")).toBeInTheDocument();
    expect(getByText("Weight Percentage")).toBeInTheDocument();
    expect(getByText("Max Slashing")).toBeInTheDocument();

    expect(getByText("0.0% - 5.5%")).toBeInTheDocument();
    expect(getByText("200.00 ETH")).toBeInTheDocument();
    expect(getByText("50.00")).toBeInTheDocument();
    expect(getByText("20%")).toBeInTheDocument();

    const externalLink = getByAltText("link out").closest("a");
    expect(externalLink).toHaveAttribute(
      "href",
      "https://sepolia.basescan.org/address/0x00"
    );
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noreferrer");
  });
});
