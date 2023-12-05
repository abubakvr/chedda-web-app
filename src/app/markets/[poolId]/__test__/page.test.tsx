import React from "react";
import Page from "../page";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useParams } from "next/navigation";
import { usePoolStats, useAccountInfo } from "@/hooks";
import { getPoolSummaryData } from "@/utils/formatResponse";
import { mockAccountInfo, mockPoolStats } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("../../../../hooks/usePools");
jest.mock("../../../../hooks/useAccountInfo");

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("../../../../utils/formatResponse", () => ({
  getPoolSummaryData: jest.fn(),
}));

const mockUsePools = usePoolStats as jest.MockedFunction<typeof usePoolStats>;
const mockUseAccountInfo = useAccountInfo as jest.MockedFunction<
  typeof useAccountInfo
>;

describe("Page component", () => {
  const mockPoolId = "mockPoolId";

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ poolId: mockPoolId });
  });

  it("renders pool details when data is available", async () => {
    (mockUsePools as jest.Mock).mockReturnValue({
      poolStats: mockPoolStats[0],
      isLoading: false,
    });
    (mockUseAccountInfo as jest.Mock).mockReturnValue({
      accountInfo: mockAccountInfo,
      isLoading: false,
    });
    (getPoolSummaryData as jest.Mock).mockReturnValue([
      { title: "Mock Title", value: "Mock Value" },
    ]);

    render(<Page />);

    // Wait for the pool details to be rendered
    await waitFor(() => {
      expect(screen.getByTestId("pool-container")).toBeInTheDocument();
      expect(screen.getByTestId("summary-card-container")).toBeInTheDocument();
      expect(screen.getByTestId("summary-card")).toBeInTheDocument();
    });
  });

  it("renders loading state when data is still loading", async () => {
    (usePoolStats as jest.Mock).mockReturnValue({
      poolStats: null,
      isLoading: true,
    });
    (useAccountInfo as jest.Mock).mockReturnValue({
      accountInfo: null,
      isLoading: true,
    });

    render(<Page />);

    // Wait for the loading state to be rendered
    await waitFor(() => {
      expect(screen.getByTestId("pool-container")).toBeInTheDocument();
      expect(screen.getByTestId("summary-card")).toBeInTheDocument();
      expect(screen.getByTestId("loading-element")).toBeInTheDocument();
    });
  });
});
