import { BigNumber, ethers } from "ethers";

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

  // Determine the closest 12-hour clock time (12 AM or 12 PM)
  const currentHour = currentDate.getHours();
  const closest12HourTime = currentHour < 12 ? 0 : 12;

  // Set the time to the closest 12-hour clock time
  currentDate.setHours(closest12HourTime, 0, 0, 0);

  const endTimestamp = Math.floor(currentDate.getTime() / 1000);

  for (let i = stamps - 1; i >= 0; i--) {
    const timestamp = endTimestamp - i * intervalInSeconds;
    timestamps.push(timestamp);
  }

  return timestamps;
}

export const utilizationsArray: BigNumber[] = Array.from(
  { length: 101 },
  (_, index) => BigNumber.from(BigInt(index) * BigInt(10000000000000000))
);

export function displayProjectedHealthFactor(
  totalBorrowed: string,
  projectedHealthFactor: number | null | undefined,
  parsedHealthFactor: number
): number {
  if (
    parseFloat(totalBorrowed) !== 0 &&
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
