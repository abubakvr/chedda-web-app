import { Chedda } from "chedda-sdk";
import { JsonRpcSigner } from "ethers";
import { currentEnvironment } from "@/data/environments";
import { formatPoolStatsList, getAggregateInfo } from "@/utils/formatResponse";
import { formatToArrayOfStrings } from "@/utils/formatters";
import { IPoolStatsResponse, ISummaryStats } from "@/utils/types";

const chedda = new Chedda(currentEnvironment.jsonRpcUrl);
const lens = chedda?.poolLens(
  currentEnvironment.contracts.LendingPoolLens,
  {} as JsonRpcSigner
);

// Fetch aggregate stats
export const getAggregateStats = async (): Promise<
  ISummaryStats[] | undefined
> => {
  if (!lens) return;
  try {
    const aggregateStats = await lens.getAggregateStats(true);
    return getAggregateInfo(aggregateStats);
  } catch (error) {
    console.error("Error getting aggregate stats:", error);
    return undefined;
  }
};

// Fetch pool stats list
export const getPoolStatsList = async (): Promise<
  IPoolStatsResponse[] | undefined
> => {
  if (!lens) return;
  try {
    const pools = (await lens.activePools()) as any;
    const statsList = await lens.getPoolStatsList(
      formatToArrayOfStrings(pools)
    );
    return formatPoolStatsList(statsList, currentEnvironment.tokens);
  } catch (error) {
    console.error("Error getting pool stats list:", error);
    return undefined;
  }
};
