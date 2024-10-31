import React from "react";
import Page from "../page";
import { render, screen, waitFor } from "@testing-library/react";
import { useParams, useSearchParams } from "next/navigation";
import {
  usePoolStats,
  useAccountInfo,
  useTokenBalance,
  useMarketInfo,
  useCollateralInfo,
  usePoolState,
  useRatesProjector,
  useAvailableLiquidity,
  useStakingBalance,
  useLpSymbol,
  useLpAssetValue,
  useLpDecimals,
  useCheddaPrice,
  useLpAllowance,
  useLpTokenBalance,
  useTransaction,
  useCheddaBalance,
  useTotalStaked,
  useClaimableStakeRewards,
  useLpStakers,
  useTotalSupply,
  useStakingContractAddress,
  useTokenPrice,
  useCheddaAllowance,
  useLockedChedda,
  useTotalWeight,
  useTotalWeightSum,
  useTotalAmountLocked,
  useClaimableLockRewards,
  useGaugeAddress,
  useTokenMaxLoanValue,
  useAccountHealth,
  useSelectTokenBalance,
  useAccountCollateral,
  useAssetBalance,
  useAllowance,
  useToast,
} from "@/hooks";
import { getPoolSummaryData } from "@/utils/formatResponse";
import {
  mockAccountInfo,
  mockCollateralInfo,
  mockInterestRates,
  mockMarketInfo,
  mockPoolStateEvents,
  mockPoolStats,
} from "@/utils/Mocks/MockTestData";

import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("ethers");
jest.mock("chart.js");
jest.mock("../../../../hooks");

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    prefetch: jest.fn(),
    replace: jest.fn(),
  })),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("../../../../utils/formatResponse", () => ({
  getPoolSummaryData: jest.fn(),
  formatCollateralInfo: jest.fn(),
  calculateAssetPrice: jest.fn(),
}));

const mockUsePools = usePoolStats as jest.MockedFunction<typeof usePoolStats>;

describe("Pool details component", () => {
  const mockPoolId = "mockPoolId";

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ poolId: mockPoolId });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => {
        if (key === "tab") return null;
        return null;
      }),
    });
    (usePoolState as jest.Mock).mockReturnValue({
      isLoading: true,
      data: mockPoolStateEvents,
    });
    (useRatesProjector as jest.Mock).mockReturnValue({
      isLoading: true,
      data: mockInterestRates,
    });
    (useStakingBalance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLpTokenBalance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLpAllowance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useCheddaPrice as jest.Mock).mockReturnValue({
      data: "1000",
      isLoading: false,
    });
    (useLpDecimals as jest.Mock).mockReturnValue({
      data: 18,
      isLoading: false,
    });
    (useLpAssetValue as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLpSymbol as jest.Mock).mockReturnValue({
      data: "ETH",
      isLoading: false,
    });
    (useCheddaBalance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTotalStaked as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLpStakers as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useClaimableStakeRewards as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTotalSupply as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useStakingContractAddress as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTokenPrice as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useCheddaAllowance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useLockedChedda as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTotalWeight as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTotalWeightSum as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTotalAmountLocked as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useClaimableLockRewards as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useGaugeAddress as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isAssetBorrowed: false,
      },
      stakeLpToken: jest.fn(),
      approveLpToken: jest.fn(),
    }));
  });

  it("renders pool details when data is available", async () => {
    (mockUsePools as jest.Mock).mockReturnValue({
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
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
    (useAllowance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useAssetBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useAvailableLiquidity as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useTransaction as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useAccountCollateral as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useSelectTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useAccountHealth as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useCheddaPrice as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useTokenMaxLoanValue as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));

    render(
      <MockAppProviders>
        <Page />
      </MockAppProviders>
    );

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
      data: null,
      isLoading: true,
    }));
    (useMarketInfo as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: true,
    }));
    (useCollateralInfo as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: true,
    }));

    render(
      <MockAppProviders>
        <Page />
      </MockAppProviders>
    );

    // Wait for the loading state to be rendered
    await waitFor(() => {
      expect(screen.getByTestId("pool-container")).toBeInTheDocument();
      expect(screen.getByTestId("loading-element")).toBeInTheDocument();
      expect(
        screen.getByTestId("collateral-info-skeleton")
      ).toBeInTheDocument();
    });
  });
});
