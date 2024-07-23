import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IPoolCategory, IPoolStatsResponse } from "@/utils/types";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";
import { StaticImageData } from "next/image";
import { FilterCard } from "../FilterCard";
import { useSearchParams, useRouter } from "next/navigation";

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

const mockReplace = jest.fn();

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

const mockGet = jest.fn();

describe("FilterCard", () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));
    (useSearchParams as jest.Mock).mockReturnValue({ get: mockGet });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it("calls handleSearch on input change", async () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/?q=test", {
        scroll: false,
      });
    });
  });

  it("updates selected category on button click", async () => {
    render(
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
      />
    );

    const categoryButton = screen.getByTestId("button-0");
    fireEvent.click(categoryButton);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/?filter=cat1", {
        scroll: false,
      });
    });
  });
});
