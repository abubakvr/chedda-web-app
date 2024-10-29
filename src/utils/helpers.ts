import { Chedda } from "chedda-sdk";
import { Signer, ErrorCode } from "ethers";
import { ISourceChain, IToken, IPositionResponse } from "./types";

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

export const utilizationsArray: bigint[] = Array.from(
  { length: 101 },
  (_, index) => BigInt(BigInt(index) * BigInt("10000000000000000"))
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

export function getErrorMessageFromCode(errorCode: ErrorCode): string {
  switch (errorCode) {
    case "UNKNOWN_ERROR":
      return "An unknown error occurred. Please try again later.";
    case "NOT_IMPLEMENTED":
      return "This feature is not implemented yet.";
    case "UNSUPPORTED_OPERATION":
      return "The operation is unsupported.";
    case "NETWORK_ERROR":
      return "A network error occurred. Please check your connection.";
    case "SERVER_ERROR":
      return "The server encountered an error. Please try again later.";
    case "TIMEOUT":
      return "The operation timed out. Please try again.";
    case "BAD_DATA":
      return "Received bad data. Please check the input and try again.";
    case "CANCELLED":
      return "The operation was cancelled.";
    case "BUFFER_OVERRUN":
      return "Buffer overrun error. Please try again.";
    case "NUMERIC_FAULT":
      return "Numeric fault error. Please check the input values.";
    case "INVALID_ARGUMENT":
      return "Invalid argument provided. Please check the input and try again.";
    case "MISSING_ARGUMENT":
      return "A required argument is missing. Please check the input and try again.";
    case "UNEXPECTED_ARGUMENT":
      return "An unexpected argument was provided. Please check the input and try again.";
    case "VALUE_MISMATCH":
      return "Value mismatch error. Please check the input values.";
    case "CALL_EXCEPTION":
      return "An exception occurred during the call. Please try again.";
    case "INSUFFICIENT_FUNDS":
      return "Insufficient funds to complete the operation.";
    case "NONCE_EXPIRED":
      return "The nonce has expired. Please try again.";
    case "REPLACEMENT_UNDERPRICED":
      return "Replacement transaction underpriced. Please check the gas price.";
    case "TRANSACTION_REPLACED":
      return "The transaction was replaced by another transaction.";
    case "UNCONFIGURED_NAME":
      return "The name is unconfigured. Please check the configuration.";
    case "OFFCHAIN_FAULT":
      return "An offchain fault occurred. Please try again.";
    case "ACTION_REJECTED":
      return "The action was rejected.";
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
  const formattedDate = projectedDate.toLocaleString("en-GB", {
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
  const lendingPool = chedda.lendingPool(poolId, signer as any);
  switch (poolType) {
    case "lendingPool":
      return lendingPool;
    case "stakingPool":
      const stakePoolContract = await lendingPool.stakePool();
      return chedda.stakingPool(stakePoolContract, signer as any);
    case "cheddaLockingGauge":
      const gaugeAddress = await lendingPool.gauge();
      return chedda.cheddaLockingGauge(gaugeAddress, signer as any);
    default:
      throw new Error("Invalid pool type");
  }
};

export function projectDateTime(days: number) {
  const currentDate: Date = new Date();
  return new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
}

/**
 * Retrieves the appropriate token bridge address based on the selected token and chain.
 *
 * @param {IToken} selectedToken - The token configuration object.
 * @param {ISourceChain} selectedChain - The chain configuration object.
 * @returns {string} - The token bridge address, which can be the token's address, oftAdapter address, or bridgedOft address.
 *
 * The function follows these rules:
 * - It returns the token's address if the token is an OFT and the source matches the destination.
 * - It returns the token's OFT adapter address if the token is of type "oftAdapter" and the source matches the destination.
 * - It returns the token's bridged address if the source does not match the destination.
 */
export const getTokenBridgeAddress = (
  selectedToken: IToken,
  selectedChain: ISourceChain
) => {
  return selectedToken.source === selectedChain.key &&
    selectedToken.type === "OFT"
    ? selectedToken.address
    : selectedToken.source === selectedChain.key &&
        selectedToken.type === "oftAdapter"
      ? selectedToken.oftAdapter || ""
      : selectedToken.bridgedOft;
};

/**
 * Retrieves the appropriate token balance address based on the selected token and chain.
 *
 * @param {IToken} selectedToken - The token configuration object.
 * @param {ISourceChain} selectedChain - The chain configuration object.
 * @returns {string} - The token balance address, which can be the token's address or bridgedOft address.
 *
 * The function follows these rules:
 * - It returns the token's address if the source matches the destination chain key.
 * - It returns the token's bridged address if the source does not match the destination chain key.
 */
export const getTokenBalanceAddress = (
  selectedToken: IToken,
  selectedChain: ISourceChain
) => {
  return selectedToken.source === selectedChain.key
    ? selectedToken.address
    : selectedToken.bridgedOft;
};

/**
 * Returns a color code based on the given health factor.
 * @param healthFactor - The health factor to evaluate.
 * @returns The corresponding color code as a string.
 */
export function getHealthFactorColor(healthFactor: number): string {
  if (healthFactor < 1.5) {
    return "text-error";
  } else if (healthFactor >= 1.5 && healthFactor <= 3.0) {
    return "text-warning";
  } else {
    return "text-success";
  }
}

export function getAccountPositions(
  allPositions: IPositionResponse[] | undefined
): IPositionResponse[] {
  if (!allPositions) return [];
  return allPositions.filter(
    (position) =>
      position.staked > 0 ||
      position.locked > 0 ||
      position.supplied > 0 ||
      position.borrowed > 0
  );
}

export function getIpUrl(ipAddress: string, access_key: string) {
  return `https://api.ipstack.com/${ipAddress}?access_key=${access_key}`;
}

export const createKey = (
  hookName: string,
  pathname: string,
  asset: string = ""
) => {
  return `${hookName} + ${pathname} + ${asset}`;
};
