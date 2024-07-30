import { Chedda } from "chedda-sdk";
import { JsonRpcSigner } from "ethers";
import { currentEnvironment } from "@/data/environments";
import { formatPoolStatsList, getAggregateInfo } from "@/utils/formatResponse";
import { formatToArrayOfStrings } from "@/utils/formatters";
import { IPoolStatsResponse, ISummaryStats } from "@/utils/types";

export const useMarkets = () => {
  const chedda = new Chedda(currentEnvironment.jsonRpcUrl);

  const lens = chedda?.poolLens(
    currentEnvironment.contracts.LendingPoolLens,
    {} as JsonRpcSigner
  );

  const getAggregateStats = async (): Promise<ISummaryStats[] | undefined> => {
    if (!lens) return;
    const aggregateStats = await lens.getAggregateStats(true);
    return getAggregateInfo(aggregateStats);
  };

  const getPoolStatsList = async (): Promise<
    IPoolStatsResponse[] | undefined
  > => {
    if (!lens) return;
    const pools = (await lens.activePools()) as any;
    const statsList = await lens.getPoolStatsList(
      formatToArrayOfStrings(pools)
    );
    return formatPoolStatsList(statsList, currentEnvironment.tokens);
  };

  return { getPoolStatsList, getAggregateStats };
};
