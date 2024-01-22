// MyInformationCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MyInformationCard } from "../MyInformationCard";
import { mockAccountInfo, mockPoolStats } from "@/utils/Mocks/MockTestData";
import { useTokenBalance } from "@/hooks";
import { ethers } from "ethers";

jest.mock("ethers");
jest.mock("../../../../hooks");

const mockSupplyClick = jest.fn();
const mockBorrowClick = jest.fn();

describe("MyInformationCard", () => {
  it("renders MyInformationCard component correctly", () => {
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));

    render(
      <MyInformationCard
        accountInfo={mockAccountInfo}
        poolStats={mockPoolStats[0]}
        isLoading={false}
        assetPrice={1000}
        available={ethers.BigNumber.from("1000")}
        fetchAccountInfo={jest.fn()}
      />
    );

    // Test the rendering of components and elements
    expect(screen.getByText("My Information")).toBeInTheDocument();
    expect(screen.getByText("Vault Contract")).toBeInTheDocument();
    expect(screen.getAllByTestId("collateral-logo")).toHaveLength(2);
    expect(screen.getByTestId("collaterals-list")).toBeInTheDocument();
  });

  it("renders MyInformationCard component in loading state correctly", () => {
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));

    render(
      <MyInformationCard
        accountInfo={undefined}
        poolStats={undefined}
        isLoading={true}
        assetPrice={0}
        available={undefined}
        fetchAccountInfo={jest.fn()}
      />
    );

    // Test the rendering of components and elements when in loading state
    expect(screen.getByTestId("info-loading-element")).toBeInTheDocument();
  });
});
