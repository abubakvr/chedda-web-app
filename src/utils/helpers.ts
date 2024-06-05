import { Chedda } from "chedda-sdk";
import { BigNumber, ethers, Signer } from "ethers";
import { IBridgeChain, IConfigToken } from "./types";

export function findNearestIndex(sortedArray: number[], targetNumber: number) {
  // Check if the array is empty
  if (sortedArray.length === 0) {
    return -1; // Return -1 to indicate that the array is empty
  }

  let low = 0;
  let high = sortedArray.length - 1;
  let nearestIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (sortedArray[mid] === targetNumber) {
      return mid; // Exact match found
    }

    if (sortedArray[mid] < targetNumber) {
      nearestIndex = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return nearestIndex;
}

export function createTimestamps(interval: number, stamps: number) {
  const timestamps = [];
  const intervalInSeconds = interval * 24 * 60 * 60;

  // Get the current date and time in local time
  const currentDate = new Date();

  // Set the current time to the current date
  const currentTimestamp = Math.floor(currentDate.getTime() / 1000);

  for (let i = stamps - 1; i >= 0; i--) {
    const timestamp = currentTimestamp - i * intervalInSeconds;
    timestamps.push(timestamp);
  }

  return timestamps;
}

export const utilizationsArray: BigNumber[] = Array.from(
  { length: 101 },
  (_, index) => BigNumber.from(BigInt(index) * BigInt(10000000000000000))
);

export function displayProjectedHealthFactor(
  totalBorrowed: number,
  projectedHealthFactor: number | null | undefined,
  parsedHealthFactor: number
): number {
  if (
    totalBorrowed !== 0 &&
    projectedHealthFactor !== null &&
    projectedHealthFactor !== undefined &&
    projectedHealthFactor < 100 &&
    projectedHealthFactor > 0
  ) {
    return projectedHealthFactor;
  } else if (!projectedHealthFactor) {
    return parsedHealthFactor;
  } else {
    return 100;
  }
}

export function getErrorMessageFromCode(errorCode: string): string {
  switch (errorCode) {
    case ethers.errors.INVALID_ARGUMENT:
      return "Invalid argument. Please check your input.";

    case ethers.errors.MISSING_ARGUMENT:
      return "Missing argument. Please provide all required parameters.";

    case ethers.errors.UNPREDICTABLE_GAS_LIMIT:
      return "Gas estimation failed. Transaction may fail or require manual gas limit.";

    case ethers.errors.INSUFFICIENT_FUNDS:
      return "Insufficient funds. Please make sure your account has enough balance.";

    case ethers.errors.NONCE_EXPIRED:
      return "Nonce expired. The provided transaction nonce is too low.";

    case ethers.errors.REPLACEMENT_UNDERPRICED:
      return "Replacement transaction gas price is too low.";

    case ethers.errors.ACTION_REJECTED:
      return "User rejected the transaction.";

    case ethers.errors.CALL_EXCEPTION:
      return "Exception occurred during contract call.";

    default:
      return `Unknown error with code ${errorCode}.`;
  }
}

export function formatProjectedDate(days: number): string {
  let projectedDate = projectDateTime(days);
  let formattedProjectedDate: string = formatDate(projectedDate);

  return formattedProjectedDate;
}

export function formatDate(projectedDate: Date): string {
  const formattedDate = projectedDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}

export const getPoolInstance = async (
  chedda: Chedda,
  poolId: string,
  signer: Signer | undefined,
  poolType: "lendingPool" | "stakingPool" | "cheddaLockingGauge"
): Promise<any> => {
  const lendingPool = chedda.lendingPool(poolId, signer as Signer);
  switch (poolType) {
    case "lendingPool":
      return lendingPool;
    case "stakingPool":
      const stakePoolContract = await lendingPool.stakePool();
      return chedda.stakingPool(stakePoolContract, signer as Signer);
    case "cheddaLockingGauge":
      const gaugeAddress = await lendingPool.gauge();
      return chedda.cheddaLockingGauge(gaugeAddress, signer as Signer);
    default:
      throw new Error("Invalid pool type");
  }
};

export function projectDateTime(days: number) {
  const currentDate: Date = new Date();
  return new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
}

export const getTokenBridgeAddress = (
  selectedToken: IConfigToken,
  selectedChain: IBridgeChain
) => {
  return selectedToken.source === selectedChain.key &&
    selectedToken.type === "OFT"
    ? selectedToken.address
    : selectedToken.source === selectedChain.key &&
        selectedToken.type === "oftAdapter"
      ? selectedToken.oftAdapter || ""
      : selectedToken.bridgedOft;
};

export const getTokenBalanceAddress = (
  selectedToken: IConfigToken,
  selectedChain: IBridgeChain
) => {
  return selectedToken.source === selectedChain.key
    ? selectedToken.address
    : selectedToken.bridgedOft;
};
