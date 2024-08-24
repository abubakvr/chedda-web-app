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
        currentFilter="none"
      />
    );

    expect(screen.getByTestId("filter-card")).toBeInTheDocument();
  });

  it("displays pool categories", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={jest.fn()}
        handleFilter={jest.fn()}
        currentFilter="none"
      />
    );

    poolCategories.forEach((category) => {
      expect(screen.getByText(category.label)).toBeInTheDocument();
    });
  });

  test("updates item counts correctly", () => {
    const mockHandleSearch = jest.fn();
    const mockHandleFilter = jest.fn();

    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={mockHandleSearch}
        handleFilter={mockHandleFilter}
        currentFilter={undefined}
      />
    );

    // Check that the item counts are updated correctly
    poolCategories.forEach((category) => {
      expect(category.itemCount).toBe(
        poolStatsList.filter((item) =>
          item.categories.includes(category.keyword!)
        ).length
      );
    });
  });

  it("calls handleSearch on input change", async () => {
    const mockHandleSearch = jest.fn();
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={mockHandleSearch}
        handleFilter={jest.fn()}
        currentFilter="none"
      />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith("test");
    });
  });

  it("updates selected category on button click", async () => {
    const mockHandleFilter = jest.fn();

    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleSearch={jest.fn()}
        handleFilter={mockHandleFilter}
        currentFilter="none"
      />
    );

    const categoryButton = screen.getByTestId("button-0");
    fireEvent.click(categoryButton);

    await waitFor(() => {
      expect(mockHandleFilter).toHaveBeenCalledWith("cat1");
    });
  });
});
