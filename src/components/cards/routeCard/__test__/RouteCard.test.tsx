import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouteCard } from "../RouteCard";

describe("RouteCard", () => {
  const mockSetActiveTab = jest.fn();
  const mockRouteInfo = "This is a route info";
  const mockActiveTab = "Pool";

  it("renders without crashing", () => {
    render(
      <RouteCard
        setActiveTab={mockSetActiveTab}
        activeTab={mockActiveTab}
        routeInfo={mockRouteInfo}
      />
    );
  });

  it("calls setActiveTab when a tab button is clicked", () => {
    render(
      <RouteCard
        setActiveTab={mockSetActiveTab}
        activeTab={mockActiveTab}
        routeInfo={mockRouteInfo}
      />
    );

    fireEvent.click(screen.getByText("Stake")); // Click on the "Stake" tab

    expect(mockSetActiveTab).toHaveBeenCalledWith("Stake");
  });

  it("displays route info correctly", () => {
    render(
      <RouteCard
        setActiveTab={mockSetActiveTab}
        activeTab={mockActiveTab}
        routeInfo={mockRouteInfo}
      />
    );

    expect(screen.getByText(mockRouteInfo)).toBeInTheDocument();
  });
});
