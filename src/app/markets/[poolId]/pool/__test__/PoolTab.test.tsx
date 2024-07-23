import React from "react";
import { render, screen } from "@testing-library/react";
import PoolTab from "../PoolTab";
import {
  useAccountInfo,
  useAvailableLiquidity,
  useCollateralInfo,
  useMarketInfo,
  usePoolState,
  usePoolStats,
  useRatesProjector,
  useTokenBalance,
  useTransaction,
} from "@/hooks";

import {
  mockAccountInfo,
  mockCollateralInfo,
  mockInterestRates,
  mockMarketInfo,
  mockPoolStateEvents,
  mockPoolStats,
} from "@/utils/Mocks/MockTestData";
import { getPoolSummaryData } from "@/utils/formatResponse";

jest.mock("recharts");
// Mocking hooks
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));
jest.mock("../../../../../hooks");

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/bridge"),
}));

jest.mock("../../../../../utils/formatResponse", () => ({
  getPoolSummaryData: jest.fn(),
  formatCollateralInfo: jest.fn(),
  calculateAssetPrice: jest.fn(),
}));

describe("PoolTab", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isAssetBorrowed: false,
      },
      stakeLpToken: jest.fn(),
      approveLpToken: jest.fn(),
    }));

    (usePoolStats as jest.Mock).mockReturnValue({
      data: mockPoolStats[0],
      isLoading: false,
    });
    (getPoolSummaryData as jest.Mock).mockReturnValue([
      { title: "Mock Title", value: "Mock Value" },
    ]);
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      data: "1000",
      isLoading: false,
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
    (useAvailableLiquidity as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (usePoolState as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockPoolStateEvents,
    });
    (useRatesProjector as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockInterestRates,
    });
  });
  it("renders without crashing", () => {
    render(
      <PoolTab
        poolStats={mockPoolStats[0]}
        setActivePoolTab={jest.fn()}
        fetchPoolStats={jest.fn()}
      />
    );
  });

  it("displays the correct child components", () => {
    render(
      <PoolTab
        poolStats={mockPoolStats[0]}
        setActivePoolTab={jest.fn()}
        fetchPoolStats={jest.fn()}
      />
    );
    expect(screen.getByTestId("collateral-info-card")).toBeInTheDocument();
    expect(screen.getByTestId("supply-borrow-chart")).toBeInTheDocument();
    expect(screen.getByTestId("interest-rates-chart")).toBeInTheDocument();
    expect(screen.getByTestId("my-information-card")).toBeInTheDocument();
    expect(screen.getByTestId("market-info-card")).toBeInTheDocument();
  });
});
