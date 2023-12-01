import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SummaryCard } from "../SummaryCard";

describe("SummaryCard Component", () => {
  it("renders SummaryCard with data when not loading", () => {
    const props = {
      index: 1,
      title: "Sample Title",
      value: "100",
      isLoading: false,
    };

    const { getByTestId } = render(<SummaryCard {...props} />);

    expect(getByTestId("summary-card")).toBeInTheDocument();
    expect(getByTestId("summary-title")).toHaveTextContent("Sample Title");
    expect(getByTestId("summary-value")).toHaveTextContent("100");
  });

  it("renders SummaryCard with loading state when isLoading is true", () => {
    const props = {
      index: 1,
      title: "Sample Title",
      isLoading: true,
    };

    const { getByTestId } = render(<SummaryCard {...props} />);

    expect(getByTestId("summary-card")).toBeInTheDocument();
    expect(getByTestId("loading-element")).toBeInTheDocument();
  });
});
