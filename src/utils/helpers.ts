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
  { length: 51 },
  (_, index) => BigNumber.from(BigInt(index) * BigInt(20000000000000000))
);
