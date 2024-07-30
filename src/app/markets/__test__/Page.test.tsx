import { ethers } from "ethers";
import { mockAggregateStats, mockPoolStats } from "@/utils/Mocks/MockTestData";
import { useMarkets } from "@/hooks/useMarkets";
import Page from "../page";

// Mock the useAggregateStats hook
jest.mock("ethers");
jest.mock("../../../hooks/useCheddaSdk");
jest.mock("../../../hooks/useContracts");
jest.mock("../../../hooks/useMarkets");

const mockGetAggregateStats = jest.fn();
const mockGetPoolStatsList = jest.fn();

describe("Page Component", () => {
  beforeEach(() => {
    const mockProvider = {
      getSigner: jest.fn(),
    };
    (useMarkets as jest.Mock).mockReturnValue({
      getAggregateStats: mockGetAggregateStats,
      getPoolStatsList: mockGetPoolStatsList,
    });

    mockGetAggregateStats.mockReset();
    mockGetPoolStatsList.mockReset();
  });

  it("renders the Page component with market information and VaultCard", async () => {
    mockGetAggregateStats.mockResolvedValue(mockAggregateStats);
    mockGetPoolStatsList.mockResolvedValue(mockPoolStats);

    const result = await Page({ searchParams: { q: "sfdf", filter: "werfe" } });

    expect(result).toBeTruthy();
  });
});
