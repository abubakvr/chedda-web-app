import React from "react";
import { render } from "@testing-library/react";
import { CollateralInfoSkeleton } from "../CollateralInfoSkeleton";

describe("CollateralInfoSkeleton", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<CollateralInfoSkeleton />);

    // Check if the component renders
    const component = getByTestId("collateral-info-skeleton");
    expect(component).toBeInTheDocument();

    // Check if loading chart is present
    const loadingChart = getByTestId("loading-chart");
    expect(loadingChart).toBeInTheDocument();
  });
});
