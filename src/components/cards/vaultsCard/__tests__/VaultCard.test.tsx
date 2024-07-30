import "@testing-library/jest-dom";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { VaultCard } from "../VaultCard";
import { usePoolStatsList } from "@/hooks";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";
import { useRouter } from "next/navigation";

jest.mock("ethers");
jest.mock("../../../../hooks/useContracts");
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

describe("VaultCard Component", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    replace: mockReplace,
  }));

  it("renders pools with data when not loading", () => {
    (usePoolStatsList as jest.Mock).mockImplementation(() => ({
      data: mockPoolStats,
      isLoading: false,
    }));
    const { getByTestId, getAllByTestId } = render(
      <VaultCard poolStatsList={mockPoolStats} query="" filter="" />
    );

    expect(getByTestId("vault-card")).toBeInTheDocument();
    expect(getAllByTestId("vault-item")).toHaveLength(mockPoolStats.length);
  });

  it("renders VaultCard item when market is searched", async () => {
    // Mock usePoolStatsList hook to simulate loading state
    (usePoolStatsList as jest.Mock).mockImplementation(() => ({
      data: mockPoolStats,
      isLoading: false,
    }));
    const { getByTestId } = render(
      <VaultCard poolStatsList={mockPoolStats} query="Token1" filter="" />
    );

    await waitFor(() => {
      expect(getByTestId("asset-symbol")).toHaveTextContent("T1");
    });
  });

  it("updates pools based on category selected", async () => {
    (usePoolStatsList as jest.Mock).mockImplementation(() => ({
      data: mockPoolStats,
      isLoading: false,
    }));
    const { getByTestId } = render(
      <VaultCard poolStatsList={mockPoolStats} query="" filter="bluechip" />
    );
    await waitFor(() => {
      expect(getByTestId("asset-symbol")).toHaveTextContent("T1");
    });
  });
});
