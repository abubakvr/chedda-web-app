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
    const myCollateralValue = screen.getByTestId("my-collateral-value");
    expect(myCollateralValue).toBeInTheDocument();
    expect(myCollateralValue).toHaveTextContent("$0.00"); // Replace with the expected content
    const collateralHeaderItems = screen.getAllByTestId(
      /^collateral-header-item-/
    );
    expect(collateralHeaderItems).toHaveLength(4); // Assuming there are 4 header items

    // Check if individual collateral items are rendered
    mockCollateralInfo.forEach((_, index) => {
      const collateralItem = screen.getByTestId(`collateral-item-${index}`);
      expect(collateralItem).toBeInTheDocument();
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
    render(
      <CollateralInfoCard
        collateralInfo={undefined}
        accountInfo={undefined}
        isLoading={true}
        marketInfo={undefined}
      />
    );

    // Check if the skeleton is rendered when loading
    expect(screen.getByText("Collateral Information")).toBeInTheDocument();
    expect(screen.getByTestId("collateral-info-skeleton")).toBeInTheDocument();
  });
});
