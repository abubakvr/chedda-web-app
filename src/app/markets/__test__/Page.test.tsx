import React from "react";
import Page from "../page";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useAggregateStats } from "@/hooks/useAggregateStats";
import { ethers } from "ethers";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { useCheddaSdk } from "@/hooks/useCheddaSdk";
import { mockAggregateStats, mockPoolStats } from "@/utils/Mocks/MockTestData";
import { usePoolStatsList } from "@/hooks";

// Mock the useAggregateStats hook
jest.mock("ethers");
jest.mock("../../../hooks/useAggregateStats");
jest.mock("../../../hooks/useCheddaSdk");
jest.mock("../../../hooks/usePools");

const mockUseAggregateStats = useAggregateStats as jest.MockedFunction<
  typeof useAggregateStats
>;

const mockUseCheddaSdk = useCheddaSdk as jest.MockedFunction<
  typeof useCheddaSdk
>;

const mockUsePools = usePoolStatsList as jest.MockedFunction<
  typeof usePoolStatsList
>;

describe("Page Component", () => {
  beforeEach(() => {
    act(() => {
      const mockProvider = {
        getSigner: jest.fn(),
      };

      mockUseCheddaSdk.mockReturnValue({
        chedda: {
          provider: new ethers.providers.WebSocketProvider(
            "wss://testgoerliurl"
          ),
          lendingPool: jest.fn(),
          erc20token: jest.fn(),
          poolLens: jest.fn(),
          priceOracle: jest.fn(),
          closeProvider: jest.fn(),
        },
        signer: mockProvider.getSigner(),
        setupChedda: jest.fn(),
      });

      (mockUsePools as jest.Mock).mockReturnValue({
        poolStats: mockPoolStats,
        isLoading: false,
      });

      mockUseAggregateStats.mockReset();
    });
  });

  it("renders the Page component with market information and VaultCard", async () => {
    mockUseAggregateStats.mockReturnValue({
      aggregateStats: mockAggregateStats,
      isLoading: false,
      getAggregateStats: jest.fn(),
    });

    render(
      <MockAppProviders>
        <Page />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByText("MARKETS")).toBeInTheDocument(); // Use screen to access getByText
      expect(screen.getAllByTestId("vault-card")).toHaveLength(1); // Use screen to access getAllByTestId
    });
  });

  it("renders loading state when aggregate stats are loading", async () => {
    // Mock loading state
    mockUseAggregateStats.mockReturnValue({
      aggregateStats: undefined,
      isLoading: true,
      getAggregateStats: jest.fn(),
    });

    render(
      <MockAppProviders>
        <Page />
      </MockAppProviders>
    );

    // Check if loading state is rendered
    waitFor(() => {
      expect(screen.getAllByTestId("loading-element")).toHaveLength(6); // Use screen to access getAllByTestId
    });
  });
});
