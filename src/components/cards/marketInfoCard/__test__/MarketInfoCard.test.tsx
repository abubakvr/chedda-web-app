import React from "react";
import { render, screen } from "@testing-library/react";
import { MarketInfoCard } from "../MarketInfoCard";
import { mockMarketInfo, mockPoolStats } from "@/utils/Mocks/MockTestData";
import { useTokenBalance } from "@/hooks";

jest.mock("ethers");
jest.mock("../../../../hooks/useTokenBalance");

describe("MarketInfoCard", () => {
  it("renders MarketInfoCard component correctly", () => {
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));

    render(
      <MarketInfoCard
        marketInfo={mockMarketInfo}
        asset={mockPoolStats[0].asset}
        isLoading={false}
      />
    );

    // Test the rendering of components and elements
    expect(screen.getByTestId("market-info-card")).toBeInTheDocument();
    expect(screen.getByTestId("market-info-label-1")).toHaveTextContent(
      "Interest Fee"
    );
    expect(screen.getByTestId("market-info-value-1")).toHaveTextContent(
      "0.00%"
    );
  });

  it("renders MarketInfoCard component in loading state correctly", () => {
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));

    render(
      <MarketInfoCard
        marketInfo={undefined}
        asset={undefined}
        isLoading={true}
      />
    );

    // Test the rendering of components and elements when in loading state
    expect(screen.getByTestId("info-loading-element")).toBeInTheDocument();
  });
});
