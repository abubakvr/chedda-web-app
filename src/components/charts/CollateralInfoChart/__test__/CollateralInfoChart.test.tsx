import { mockCollateralInfo } from "@/utils/Mocks/MockTestData";
import { render, screen } from "@testing-library/react";
import { CollateralInfoChart } from "../CollateralInfoChart";

jest.mock("ethers");
jest.mock("chart.js");

describe("CollateralInfoChart", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders chart component", () => {
    render(<CollateralInfoChart collateralInfo={mockCollateralInfo} />);

    // Check if chart container is rendered
    const chartContainer = screen.getByTestId("chart-container");
    expect(chartContainer).toBeInTheDocument();
  });
});
