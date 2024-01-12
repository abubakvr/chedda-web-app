import { mockAggregateStats } from "@/utils/Mocks/MockTestData";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SummaryCard } from "../SummaryCard";

jest.mock("ethers");
describe("SummaryCard Component", () => {
  it("renders SummaryCard with data when not loading", () => {
    const props = {
      stats: mockAggregateStats,
      isLoading: false,
    };

    const { getByTestId } = render(<SummaryCard {...props} />);

    expect(getByTestId("summary-card")).toBeInTheDocument();
  });

  it("renders SummaryCard with loading state when isLoading is true", () => {
    const props = {
      stats: [],
      isLoading: true,
    };

    const { getByTestId } = render(<SummaryCard {...props} />);

    expect(getByTestId("loading-element")).toBeInTheDocument();
  });
});
