import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterCard } from "../FilterCard"; // Adjust the path as needed
import { IPoolCategory, IPoolStatsResponse } from "@/utils/types";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";
import { StaticImageData } from "next/image";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "filter"),
  })),
}));

const poolCategories: IPoolCategory[] = [
  {
    label: "Category 1",
    keyword: "cat1",
    itemCount: 0,
    activeClass: "active",
    activeIcon: {} as StaticImageData,
    icon: {} as StaticImageData,
  },
  {
    label: "Category 2",
    keyword: "cat2",
    itemCount: 0,
    activeClass: "active",
    activeIcon: {} as StaticImageData,
    icon: {} as StaticImageData,
  },
];

const poolStatsList: IPoolStatsResponse[] = mockPoolStats;

const handleSearch = jest.fn();

describe("FilterCard", () => {
  it("renders without crashing", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
      />
    );

    expect(screen.getByTestId("filter-card")).toBeInTheDocument();
  });

  it("displays pool categories", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
      />
    );

    poolCategories.forEach((category) => {
      expect(screen.getByText(category.label)).toBeInTheDocument();
    });
  });

  it("calls handleSearch on input change", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(handleSearch).toHaveBeenCalled();
  });

  it("updates selected category on button click", () => {
    const setSelectedCategory = jest.fn();

    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
      />
    );

    const categoryButton = screen.getByText(poolCategories[1].label);
    fireEvent.click(categoryButton);

    expect(setSelectedCategory).toHaveBeenCalledWith(poolCategories[1]);
  });
});
