import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MarketInfoCard } from "../MarketInfoCard";

describe("MarketInfoCard Component", () => {
  it("renders MarketInfoCard with data when not loading", () => {
    const props = {
      index: 1,
      title: "Sample Title",
      value: "100",
      isLoading: false,
    };

    const { getByTestId } = render(<MarketInfoCard {...props} />);

    expect(getByTestId("market-info-card")).toBeInTheDocument();
    expect(getByTestId("title")).toHaveTextContent("Sample Title");
    expect(getByTestId("value")).toHaveTextContent("100");
  });

  it("renders MarketInfoCard with loading state when isLoading is true", () => {
    const props = {
      index: 1,
      title: "Sample Title",
      isLoading: true,
    };

    const { getByTestId } = render(<MarketInfoCard {...props} />);

    expect(getByTestId("market-info-card")).toBeInTheDocument();
    expect(getByTestId("loading-element")).toBeInTheDocument();
  });
});
