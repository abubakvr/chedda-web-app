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

export function createTimestamps(end: Date, interval: number, stamps: number) {
  const timestamps = [];
  const intervalInSeconds = interval * 24 * 60 * 60;
  const endTimestamp = Math.floor(new Date(end).getTime() / 1000);

  for (let i = stamps - 1; i >= 0; i--) {
    const timestamp = endTimestamp - i * intervalInSeconds;
    timestamps.push(timestamp);
  }

  return timestamps;
}
