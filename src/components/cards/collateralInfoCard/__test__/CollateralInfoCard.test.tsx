import React from "react";
import { render, screen } from "@testing-library/react";
import { CollateralInfoCard } from "../CollateralInfoCard";
import {
  mockAccountInfo,
  mockCollateralInfo,
  mockMarketInfo,
} from "@/utils/Mocks/MockTestData";

// Mocking the modules that are not available in the testing environment
jest.mock("chart.js");
jest.mock("ethers");

describe("CollateralInfoCard", () => {
  const mockProps = {
    collateralInfo: mockCollateralInfo,
    accountInfo: mockAccountInfo,
    marketInfo: mockMarketInfo,
    isLoading: false,
  };

  it("renders the component with provided data", () => {
    render(<CollateralInfoCard {...mockProps} />);

    // Check if collateral information container is rendered
    const collateralInfoContainer = screen.getByTestId(
      "collateral-info-container"
    );
    expect(collateralInfoContainer).toBeInTheDocument();

    // Check if my collateral value is rendered
    const myCollateralValue = screen.getByTestId("my-collateral-value");
    expect(myCollateralValue).toBeInTheDocument();
    expect(myCollateralValue).toHaveTextContent("$0.00"); // Replace with the expected content

    // Check if collateral header items are rendered
    const collateralHeaderItems = screen.getAllByTestId(
      /^collateral-header-item-/
    );
    expect(collateralHeaderItems).toHaveLength(4); // Assuming there are 4 header items

    // Check if individual collateral items are rendered
    mockCollateralInfo.forEach((_, index) => {
      const collateralItem = screen.getByTestId(`collateral-item-${index}`);
      expect(collateralItem).toBeInTheDocument();

      // Add more specific assertions based on your actual implementation
      // Example: Check if the logo, symbol, amounts, and factors are rendered correctly
      const collateralItemLogo = screen.getByTestId(
        `collateral-item-logo-${index}`
      );
      expect(collateralItemLogo).toBeInTheDocument();

      const collateralFactor = screen.getByTestId(`collateral-factor-${index}`);
      expect(collateralFactor).toBeInTheDocument();
      expect(collateralFactor).toHaveTextContent(
        mockCollateralInfo[index].collateralFactor
      );
    });
  });

  it("renders skeleton when loading", () => {
    render(<CollateralInfoCard {...mockProps} isLoading={true} />);

    // Check if the skeleton is rendered when loading
    expect(screen.getByText("Collateral Information")).toBeInTheDocument();
    expect(screen.getByTestId("collateral-info-skeleton")).toBeInTheDocument();
  });

  it("renders skeleton when marketInfo is not available", () => {
    render(<CollateralInfoCard {...mockProps} marketInfo={undefined} />);

    // Check if the skeleton is rendered when marketInfo is not available
    expect(screen.getByText("Collateral Information")).toBeInTheDocument();
    expect(screen.getByTestId("collateral-info-skeleton")).toBeInTheDocument();
  });
});
