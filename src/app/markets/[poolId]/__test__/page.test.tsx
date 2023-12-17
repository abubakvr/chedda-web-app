import React from "react";
import Page from "../page";
import { render, screen, waitFor } from "@testing-library/react";
import { useParams } from "next/navigation";
import {
  usePoolStats,
  useAccountInfo,
  useTokenBalance,
  useMarketInfo,
  useCollateralInfo,
  useEnvironment,
} from "@/hooks";
import { getPoolSummaryData } from "@/utils/formatResponse";
import {
  mockAccountInfo,
  mockCollateralInfo,
  mockCurrentEnvironment,
  mockMarketInfo,
  mockPoolStats,
} from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("chart.js");
jest.mock("../../../../hooks/usePools");
jest.mock("../../../../hooks/useCheddaInfo");
jest.mock("../../../../hooks/useTokenBalance");
jest.mock("../../../../hooks/useEnvironment");

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("../../../../utils/formatResponse", () => ({
  getPoolSummaryData: jest.fn(),
  formatCollateralInfo: jest.fn(),
}));

const mockUseEnvironment = useEnvironment as jest.MockedFunction<
  typeof useEnvironment
>;

const mockUsePools = usePoolStats as jest.MockedFunction<typeof usePoolStats>;

describe("Pool details component", () => {
  const mockPoolId = "mockPoolId";

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ poolId: mockPoolId });
    (mockUseEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
  });

  it("renders pool details when data is available", async () => {
    (mockUsePools as jest.Mock).mockReturnValue({
      poolStats: mockPoolStats[0],
      isLoading: false,
    });
    (getPoolSummaryData as jest.Mock).mockReturnValue([
      { title: "Mock Title", value: "Mock Value" },
    ]);
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useMarketInfo as jest.Mock).mockImplementation(() => ({
      data: mockMarketInfo,
      isLoading: false,
    }));
    (useCollateralInfo as jest.Mock).mockImplementation(() => ({
      data: mockCollateralInfo,
      isLoading: false,
    }));
    (useAccountInfo as jest.Mock).mockImplementation(() => ({
      data: mockAccountInfo,
      isLoading: false,
    }));

    render(<Page />);

    // Wait for the pool details to be rendered
    await waitFor(() => {
      expect(screen.getByTestId("pool-container")).toBeInTheDocument();
      expect(screen.getByTestId("summary-card")).toBeInTheDocument();
      expect(screen.getByTestId("my-information-card")).toBeInTheDocument();
      expect(screen.getByTestId("market-info-card")).toBeInTheDocument();
      expect(screen.getByTestId("collateral-info-card")).toBeInTheDocument();
    });
  });

  it("renders loading state when data is still loading", async () => {
    (usePoolStats as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
    (useAccountInfo as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useMarketInfo as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
    }));
    (useCollateralInfo as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
    }));

    render(<Page />);

    // Wait for the loading state to be rendered
    await waitFor(() => {
      expect(screen.getByTestId("pool-container")).toBeInTheDocument();
      expect(screen.getByTestId("summary-card")).toBeInTheDocument();
      expect(screen.getByTestId("loading-element")).toBeInTheDocument();
      expect(
        screen.getByTestId("collateral-info-skeleton")
      ).toBeInTheDocument();
    });
  });
});
