import React from "react";
import { render } from "@testing-library/react";
import { MobileSummaryCard } from "../MobileSummaryCard";
import { ISummaryStats } from "@/utils/types";

describe("MobileSummaryCard", () => {
  const mockStats: ISummaryStats[] = [
    { title: "Stat 1", value: "100" },
    { title: "Stat 2", value: "200" },
    { title: "Stat 3", value: "300" },
    { title: "Stat 4", value: "400" },
    { title: "Stat 5", value: "500" },
    { title: "Stat 6", value: "600" },
  ];

  it("renders correctly with full stats", () => {
    const { getByText } = render(
      <MobileSummaryCard aggregateStats={mockStats} />
    );

    mockStats.forEach((stat) => {
      expect(getByText(stat.title)).toBeInTheDocument();
      expect(getByText(stat.value)).toBeInTheDocument();
    });
  });

  it("renders correctly with fewer stats", () => {
    const partialStats = mockStats.slice(0, 2);
    const { getByText } = render(
      <MobileSummaryCard aggregateStats={partialStats} />
    );

    partialStats.forEach((stat) => {
      expect(getByText(stat.title)).toBeInTheDocument();
      expect(getByText(stat.value)).toBeInTheDocument();
    });
  });

  it("renders correctly with undefined stats", () => {
    const { container } = render(
      <MobileSummaryCard aggregateStats={undefined} />
    );
    expect(container).toBeDefined();
  });
});
