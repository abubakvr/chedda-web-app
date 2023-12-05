// MyInformationCard.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MyInformationCard } from "../MyInformationCard";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");

const mockSupplyClick = jest.fn();
const mockBorrowClick = jest.fn();

describe("MyInformationCard", () => {
  it("renders MyInformationCard component correctly", () => {
    render(
      <MyInformationCard
        poolStats={mockPoolStats[0]}
        isLoading={false}
        onSupplyClick={mockSupplyClick}
        onBorrowClick={mockBorrowClick}
      />
    );

    // Test the rendering of components and elements
    expect(screen.getByText("My Information")).toBeInTheDocument();
    expect(screen.getByText("Vault Contract")).toBeInTheDocument();
    expect(screen.getAllByTestId("collateral-logo")).toHaveLength(2);
    expect(screen.getByTestId("collaterals-list")).toBeInTheDocument();

    expect(screen.getByText("200.00 T1")).toBeInTheDocument();
    expect(screen.getByText("1.00K T1")).toBeInTheDocument();
  });

  it("calls onSupplyClick and onBorrowClick when corresponding buttons are clicked", () => {
    render(
      <MyInformationCard
        isLoading={false}
        poolStats={mockPoolStats[0]}
        onSupplyClick={mockSupplyClick}
        onBorrowClick={mockBorrowClick}
      />
    );

    // Simulate button clicks
    fireEvent.click(screen.getByText("Supply"));
    fireEvent.click(screen.getByText("Borrow"));

    // Verify that the corresponding functions were called
    expect(mockSupplyClick).toHaveBeenCalledTimes(1);
    expect(mockBorrowClick).toHaveBeenCalledTimes(1);
  });

  it("renders MyInformationCard component in loading state correctly", () => {
    render(
      <MyInformationCard
        poolStats={undefined}
        isLoading={true}
        onSupplyClick={mockSupplyClick}
        onBorrowClick={mockBorrowClick}
      />
    );

    // Test the rendering of components and elements when in loading state
    expect(
      screen.getByTestId("myinformation-loading-element")
    ).toBeInTheDocument();
  });
});
