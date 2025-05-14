import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IPoolCategory, IPoolStatsResponse } from "@/utils/types";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";
import { StaticImageData } from "next/image";
import { FilterCard } from "../FilterCard";

const poolCategories: IPoolCategory[] = [
  {
    label: "Category 1",
    keyword: "cat1",
    itemCount: 0,
    activeClass: "active",
    activeIcon: {} as StaticImageData,
    icon: {} as StaticImageData,
    hoverClass: "hovered",
  },
  {
    label: "Category 2",
    keyword: "cat2",
    itemCount: 0,
    activeClass: "active",
    activeIcon: {} as StaticImageData,
    icon: {} as StaticImageData,
    hoverClass: "hovered",
  },
];

const poolStatsList: IPoolStatsResponse[] = mockPoolStats;

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("FilterCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={jest.fn()}
        handleFilter={jest.fn()}
        handleLayout={jest.fn()}
        currentFilter="none"
      />
    );

    expect(screen.getByTestId("filter-card")).toBeInTheDocument();
  });

  it("displays layout toggle buttons", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={jest.fn()}
        handleFilter={jest.fn()}
        handleLayout={jest.fn()}
        currentFilter="none"
      />
    );

    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Grid")).toBeInTheDocument();
  });

  it("calls handleLayout when layout buttons are clicked", async () => {
    const mockHandleLayout = jest.fn();
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={jest.fn()}
        handleFilter={jest.fn()}
        handleLayout={mockHandleLayout}
        currentFilter="none"
      />
    );

    const listButton = screen.getByText("List").closest("button");
    const gridButton = screen.getByText("Grid").closest("button");

    if (listButton && gridButton) {
      fireEvent.click(gridButton);
      expect(mockHandleLayout).toHaveBeenCalledWith("grid");

      fireEvent.click(listButton);
      expect(mockHandleLayout).toHaveBeenCalledWith("list");
    }
  });

  it("calls handleSearch on input change", async () => {
    const mockHandleSearch = jest.fn();
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={mockHandleSearch}
        handleFilter={jest.fn()}
        handleLayout={jest.fn()}
        currentFilter="none"
      />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith("test");
    });
  });

  it("has a search input field", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={jest.fn()}
        handleFilter={jest.fn()}
        handleLayout={jest.fn()}
        currentFilter="none"
      />
    );

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });
});
