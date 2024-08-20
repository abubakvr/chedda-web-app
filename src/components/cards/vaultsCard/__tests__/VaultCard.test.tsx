import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { VaultCard } from "../VaultCard";
import { usePoolStatsList } from "@/hooks";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("../../../../hooks/useContracts");

describe("VaultCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pools with data when not loading", async () => {
    (usePoolStatsList as jest.Mock).mockImplementation(() => ({
      data: mockPoolStats,
      isLoading: false,
    }));
    const { getByTestId, getAllByTestId } = render(
      <VaultCard poolStatsList={mockPoolStats} />
    );

    await waitFor(() => {
      expect(getByTestId("vault-card")).toBeInTheDocument();
      expect(getAllByTestId("vault-item")).toHaveLength(mockPoolStats.length);
    });
  });

  it("renders VaultCard item when market is searched", async () => {
    // Mock usePoolStatsList hook to simulate loading state
    (usePoolStatsList as jest.Mock).mockImplementation(() => ({
      data: mockPoolStats,
      isLoading: false,
    }));
    render(<VaultCard poolStatsList={mockPoolStats} />);
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Token3" } });

    await waitFor(() => {
      expect(screen.getByTestId("asset-symbol")).toHaveTextContent("T3");
    });
  });

  it("updates pools based on category selected", async () => {
    (usePoolStatsList as jest.Mock).mockImplementation(() => ({
      data: mockPoolStats,
      isLoading: false,
    }));
    render(<VaultCard poolStatsList={mockPoolStats} />);

    const categoryButton = screen.getByTestId("button-2");
    fireEvent.click(categoryButton);

    await waitFor(() => {
      expect(screen.getByTestId("asset-symbol")).toHaveTextContent("T1");
    });
  });

  it("displays a message when no pools are found", async () => {
    render(<VaultCard poolStatsList={mockPoolStats} />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("No pools found.")).toBeInTheDocument();
    });
  });
});
