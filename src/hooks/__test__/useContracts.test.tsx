import { renderHook, act } from "@testing-library/react";
import {
  useFetcher,
  useAccountInfo,
  useMarketInfo,
  useCollateralInfo,
  useAggregateStats,
  usePoolState,
  usePoolStatsList,
  usePoolStats,
  useRatesProjector,
  useAvailableLiquidity,
  useAllowance,
  useTokenBalance,
  useAssetBalance,
  useTokenValue,
  useTokenPrice,
  useAccountCollateral,
  useAccountHealth,
  useSelectTokenBalance,
  useTokenMaxLoanValue,
  useLpAllowance,
  useLpSymbol,
  useLpTokenBalance,
  useLpAssetValue,
  useStakingBalance,
  useLpDecimals,
  useLpStakers,
  useTotalStaked,
  useTotalSupply,
  useStakingContractAddress,
  useClaimableStakeRewards,
  useCheddaBalance,
  useCheddaAllowance,
  useLockedChedda,
  useClaimableLockRewards,
  useTotalAmountLocked,
  useTotalWeight,
  useTotalWeightSum,
  useGaugeAddress,
  useCheddaTotalSupply,
  useAllClaimableRewards,
  usePositionSummary,
  useAllPositions,
} from "@/hooks";
import { useDispatch } from "react-redux";
import {
  mockAccountInfo,
  mockMarketInfo,
  mockCollateralInfo,
  mockGetPoolStats,
  mockInterestRates,
  mockPoolStateEvents,
  mockAggregateStats,
} from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("react-redux");
jest.mock("../useFetcher");

const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

const mockFetchedData = jest.fn();

describe("useFetchers Hooks", () => {
  beforeEach(() => {
    (useFetcher as jest.Mock).mockReturnValueOnce({
      data: "mockData",
      isLoading: false,
      fetchData: mockFetchedData,
    });
    mockUseDispatch.mockImplementation(() => jest.fn());
  });

  const testCases = [
    { hook: useAllowance, args: ["0x00"], name: "Allowance" },
    { hook: useAccountInfo, args: [], name: "Account Info" },
    { hook: useMarketInfo, args: [], name: "Market Info" },
    { hook: useCollateralInfo, args: [], name: "Collateral Info" },
    { hook: useAggregateStats, args: [], name: "Aggregate Stats" },
    { hook: usePoolState, args: [], name: "Pool State" },
    { hook: usePoolStatsList, args: [], name: "Pool Stats List" },
    { hook: usePoolStats, args: [], name: "Pool Stats" },
    { hook: useRatesProjector, args: [], name: "Rates Projector" },
    { hook: useAvailableLiquidity, args: [], name: "Available Liquidity" },
    { hook: useTokenBalance, args: ["0x00"], name: "Token Balance" },
    { hook: useAssetBalance, args: ["0x00"], name: "Asset Balance" },
    { hook: useTokenValue, args: ["0x00"], name: "Token Value" },
    { hook: useTokenPrice, args: ["0x00"], name: "Token Price" },
    { hook: useAccountCollateral, args: ["0x00"], name: "Account Collateral" },
    { hook: useAccountHealth, args: [], name: "Account Health" },
    {
      hook: useSelectTokenBalance,
      args: ["0x00"],
      name: "Select Token Balance",
    },
    {
      hook: useTokenMaxLoanValue,
      args: ["0x00", 18],
      name: "Token Collateral Value",
    },
    { hook: useLpAllowance, args: [], name: "LP Allowance" },
    { hook: useLpSymbol, args: [], name: "LP Symbol" },
    { hook: useLpTokenBalance, args: [], name: "LP Token Balance" },
    { hook: useLpAssetValue, args: [], name: "LP Asset Value" },
    { hook: useStakingBalance, args: [], name: "Staking Balance" },
    { hook: useLpDecimals, args: [], name: "LP Decimals" },
    { hook: useLpStakers, args: [], name: "LP Stakers" },
    { hook: useTotalStaked, args: [], name: "Total Staked" },
    { hook: useTotalSupply, args: [], name: "Total Supply" },
    {
      hook: useStakingContractAddress,
      args: [],
      name: "Staking Contract Address",
    },
    {
      hook: useClaimableStakeRewards,
      args: [],
      name: "Claimable Stake Rewards",
    },
    { hook: useCheddaBalance, args: [], name: "Chedda Balance" },
    { hook: useCheddaAllowance, args: [], name: "Chedda Allowance" },
    { hook: useLockedChedda, args: [], name: "Locked Chedda" },
    { hook: useClaimableLockRewards, args: [], name: "Claimable Lock Rewards" },
    { hook: useTotalAmountLocked, args: [], name: "Total Amount Locked" },
    { hook: useTotalWeight, args: [], name: "Total Weight" },
    { hook: useTotalWeightSum, args: [], name: "Total Weight Sum" },
    { hook: useGaugeAddress, args: [], name: "Gauge Address" },
    { hook: useCheddaTotalSupply, args: [], name: "Chedda Total Supply" },
    { hook: useAllClaimableRewards, args: [], name: "All Claimable Rewards" },
    { hook: usePositionSummary, args: [], name: "Position Summary" },
    { hook: useAllPositions, args: [], name: "All Positions" },
  ];

  testCases.forEach(({ hook, args, name }) => {
    describe(`${name} Hook`, () => {
      it("fetches and sets data correctly", async () => {
        const { result } = renderHook(() => hook(...(args as [any, any])));
        await act(async () => {
          result.current.fetchData();
        });
        expect(mockFetchedData).toHaveBeenCalled();
      });

      it("handles loading state", async () => {
        (useFetcher as jest.Mock).mockReturnValueOnce({
          data: null,
          isLoading: false,
          fetchData: mockFetchedData,
        });
        const { result } = renderHook(() => hook(...(args as [any, any])));
        expect(result.current.isLoading).toBe(false);
        await act(async () => {
          result.current.fetchData();
        });
        expect(mockFetchedData).toHaveBeenCalled();
      });

      it("handles error state", async () => {
        (useFetcher as jest.Mock).mockReturnValueOnce({
          data: null,
          isLoading: false,
          error: undefined,
          fetchData: mockFetchedData,
        });
        const { result } = renderHook(() => hook(...(args as [any, any])));
        await act(async () => {
          result.current.fetchData();
        });
        expect(result.current.isError).toEqual(undefined);
        expect(mockFetchedData).toHaveBeenCalled();
      });
    });
  });
});
