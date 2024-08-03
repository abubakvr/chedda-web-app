import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouteCard } from "../RouteCard";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    prefetch: jest.fn(),
    replace: jest.fn(),
  })),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("RouteCard", () => {
  const mockSetActiveTab = jest.fn();
  const mockRouteInfo = "This is a route info";
  const mockActiveTab = "Pool";
  const routePaths = ["Stake", "About"];

  it("renders without crashing", () => {
    render(
      <RouteCard
        setActiveTab={mockSetActiveTab}
        activeTab={mockActiveTab}
        routhPaths={routePaths}
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
        routhPaths={routePaths}
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
        routhPaths={routePaths}
      />
    );

    expect(screen.getByText(mockRouteInfo)).toBeInTheDocument();
  });
});
