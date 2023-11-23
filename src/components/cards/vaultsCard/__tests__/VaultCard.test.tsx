import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { VaultCard } from "../VaultCard";
import { usePools } from "../../../../hooks/usePools";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("../../../../hooks/usePools");

describe("VaultCard Component", () => {
  it("renders pools with data when not loading", () => {
    (usePools as jest.Mock).mockImplementation(() => ({
      poolStats: mockPoolStats,
      isLoading: false,
    }));
    const { getByTestId, getAllByTestId } = render(<VaultCard />);

    expect(getByTestId("vault-card")).toBeInTheDocument();
    expect(getByTestId("vaults-title")).toHaveTextContent("Vaults");
    expect(getAllByTestId("vault-item")).toHaveLength(mockPoolStats.length);
  });

  it("renders VaultCard item when market is searched", () => {
    // Mock usePools hook to simulate loading state
    (usePools as jest.Mock).mockImplementation(() => ({
      poolStats: mockPoolStats,
      isLoading: false,
    }));
    const { getByTestId } = render(<VaultCard />);

    // Test search input
    const searchInput = getByTestId("search-input").querySelector("input")!;
    act(() => {
      fireEvent.change(searchInput, { target: { value: "Token1" } });
    });
    expect(searchInput.value).toBe("Token1");
    expect(getByTestId("asset-symbol")).toHaveTextContent("T1");
  });

  it("renders VaultCard with loading state when loading", async () => {
    (usePools as jest.Mock).mockImplementation(() => ({
      poolStats: null,
      isLoading: true,
    }));
    const { getByTestId } = render(<VaultCard />);

    await waitFor(() => {
      expect(getByTestId("vault-card")).toBeInTheDocument();
      expect(getByTestId("loading-skeleton")).toBeInTheDocument();
    });
  });
});
