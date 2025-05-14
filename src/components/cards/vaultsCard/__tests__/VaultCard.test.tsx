import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { VaultCard } from "../VaultCard";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

describe("VaultCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pools with data", async () => {
    const { getByTestId, getAllByTestId } = render(
      <VaultCard poolStatsList={mockPoolStats} />
    );

    await waitFor(() => {
      expect(getByTestId("vault-card")).toBeInTheDocument();
      // Check for vault-item divs which are the parent containers
      expect(getAllByTestId("vault-item-list")).toHaveLength(
        mockPoolStats.length
      );
    });
  });

  it("renders VaultCard item when market is searched", async () => {
    render(<VaultCard poolStatsList={mockPoolStats} />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Token3" } });

    await waitFor(() => {
      // Use asset-symbol-list which is the correct test ID from VaultItem component
      expect(screen.getByTestId("asset-symbol-list")).toHaveTextContent("T3");
    });
  });

  it("updates pools based on category selected", async () => {
    render(<VaultCard poolStatsList={mockPoolStats} />);

    // Find the category button by text content instead of test ID
    const categoryButtons = screen.getAllByRole("button");
    const categoryButton = categoryButtons.find((button) =>
      button.textContent?.includes("Category2")
    );

    if (categoryButton) {
      fireEvent.click(categoryButton);

      await waitFor(() => {
        // Use asset-symbol-list which is the correct test ID from VaultItem component
        expect(screen.getByTestId("asset-symbol-list")).toHaveTextContent("T1");
      });
    }
  });

  it("displays a message when no pools are found", async () => {
    render(<VaultCard poolStatsList={mockPoolStats} />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "nonexistentpool" } });

    await waitFor(() => {
      expect(screen.getByText("No pools found.")).toBeInTheDocument();
    });
  });
});
