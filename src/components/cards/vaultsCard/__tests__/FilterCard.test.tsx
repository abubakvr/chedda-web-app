import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterCard } from "../FilterCard"; // Adjust the path as needed
import { IPoolCategory, IPoolStatsResponse } from "@/utils/types";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";
import { StaticImageData } from "next/image";

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
const matchFilterItems = jest.fn().mockReturnValue(true);

describe("FilterCard", () => {
  it("renders without crashing", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        selectedCategory={poolCategories[0]}
        setSelectedCategory={jest.fn()}
        poolStatsList={poolStatsList}
        handleSearch={handleSearch}
        matchFilterItems={matchFilterItems}
      />
    );

    expect(screen.getByTestId("filter-card")).toBeInTheDocument();
  });

  it("displays pool categories", () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        selectedCategory={poolCategories[0]}
        setSelectedCategory={jest.fn()}
        poolStatsList={poolStatsList}
        handleSearch={handleSearch}
        matchFilterItems={matchFilterItems}
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
        selectedCategory={poolCategories[0]}
        setSelectedCategory={jest.fn()}
        poolStatsList={poolStatsList}
        handleSearch={handleSearch}
        matchFilterItems={matchFilterItems}
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
        selectedCategory={poolCategories[0]}
        setSelectedCategory={setSelectedCategory}
        poolStatsList={poolStatsList}
        handleSearch={handleSearch}
        matchFilterItems={matchFilterItems}
      />
    );

    const categoryButton = screen.getByText(poolCategories[1].label);
    fireEvent.click(categoryButton);

    expect(setSelectedCategory).toHaveBeenCalledWith(poolCategories[1]);
  });
});
