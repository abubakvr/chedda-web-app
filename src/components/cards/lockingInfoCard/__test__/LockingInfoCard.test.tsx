import React from "react";
import { render } from "@testing-library/react";
import { LockingInfoCard } from "../LockingInfoCard";
import { BigNumber } from "ethers";
import { useEnvironment, useGaugeAddress } from "@/hooks";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";

jest.mock("../../../../hooks");

describe("StakingInfoCard Component", () => {
  beforeEach(() => {
    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
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
    expect(getByText("200 ETH")).toBeInTheDocument();
    expect(getByText("50")).toBeInTheDocument();
    expect(getByText("20%")).toBeInTheDocument();

    const externalLink = getByAltText("link out").closest("a");
    expect(externalLink).toHaveAttribute(
      "href",
      "http://mockContractPrefix.com/0x00"
    );
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noreferrer");
  });
});
