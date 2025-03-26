import React from "react";
import { render, screen } from "@testing-library/react";
import { CollateralInfoCard } from "../CollateralInfoCard";
import {
  mockAccountInfo,
  mockCollateralInfo,
  mockMarketInfo,
} from "@/utils/Mocks/MockTestData";
import { NonceProvider } from "@/contexts/NonceContext";

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
    render(
      <NonceProvider nonce="0x90">
        <CollateralInfoCard {...mockProps} />
      </NonceProvider>
    );

    // Check if collateral information container is rendered
    const collateralInfoContainer = screen.getByTestId(
      "collateral-info-container"
    );
    expect(collateralInfoContainer).toBeInTheDocument();
    const myCollateralValue = screen.getByTestId("my-collateral-value");
    expect(myCollateralValue).toBeInTheDocument();
    expect(myCollateralValue).toHaveTextContent("$0"); // Replace with the expected content
    const collateralHeaderItems = screen.getAllByTestId(
      /^collateral-header-item-/
    );
    expect(collateralHeaderItems).toHaveLength(7); // Assuming there are 4 header items

    // Check if individual collateral items are rendered
    mockCollateralInfo.forEach((_, index) => {
      const collateralItem = screen.getByTestId(`collateral-item-${index}`);
      const mobileCollateralItem = screen.getByTestId(
        `mobile-collateral-item-${index}`
      );
      expect(collateralItem).toBeInTheDocument();
      expect(mobileCollateralItem).toBeInTheDocument();
      const collateralItemLogo = screen.getByTestId(
        `collateral-item-logo-${index}`
      );
      expect(collateralItemLogo).toBeInTheDocument();

      const ltv = screen.getByTestId(`ltv-${index}`);
      expect(ltv).toBeInTheDocument();

      const lltv = screen.getByTestId(`lltv-${index}`);
      expect(lltv).toBeInTheDocument();

      const bonus = screen.getByTestId(`bonus-${index}`);
      expect(bonus).toBeInTheDocument();

      const penalty = screen.getByTestId(`penalty-${index}`);
      expect(penalty).toBeInTheDocument();
    });
  });

  it("renders skeleton when loading", () => {
    render(
      <NonceProvider nonce="0x90">
        <CollateralInfoCard
          collateralInfo={undefined}
          accountInfo={undefined}
          isLoading={true}
          marketInfo={undefined}
        />
      </NonceProvider>
    );

    // Check if the skeleton is rendered when loading
    expect(screen.getByText("Collateral Info")).toBeInTheDocument();
    expect(screen.getByTestId("collateral-info-skeleton")).toBeInTheDocument();
  });
});
