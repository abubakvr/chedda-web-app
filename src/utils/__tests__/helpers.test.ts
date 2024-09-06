import {
  findNearestIndex,
  createTimestamps,
  displayProjectedHealthFactor,
  getErrorMessageFromCode,
  formatProjectedDate,
  getHealthFactorColor,
  getAccountPositions,
} from "../helpers";

import { ErrorCode } from "ethers";

describe("Helper functions", () => {
  describe("findNearestIndex", () => {
    it("should return the correct index for an exact match", () => {
      const sortedArray = [1, 3, 5, 7, 9];
      expect(findNearestIndex(sortedArray, 5)).toBe(2);
    });

    it("should return the nearest lower index when no exact match", () => {
      const sortedArray = [1, 3, 5, 7, 9];
      expect(findNearestIndex(sortedArray, 6)).toBe(2);
    });

    it("should return -1 for an empty array", () => {
      expect(findNearestIndex([], 5)).toBe(-1);
    });
  });

  describe("createTimestamps", () => {
    it("should create the correct number of timestamps", () => {
      const timestamps = createTimestamps(1, 5);
      expect(timestamps.length).toBe(5);
    });

    it("should create timestamps in ascending order", () => {
      const timestamps = createTimestamps(1, 3);
      expect(timestamps[0]).toBeLessThan(timestamps[1]);
      expect(timestamps[1]).toBeLessThan(timestamps[2]);
    });

    it("should create timestamps with the correct interval", () => {
      const timestamps = createTimestamps(1, 3); // 1 day interval
      const oneDayInSeconds = 24 * 60 * 60;
      expect(timestamps[1] - timestamps[0]).toBeCloseTo(oneDayInSeconds, -2); // Allow for small discrepancies due to daylight saving time
      expect(timestamps[2] - timestamps[1]).toBeCloseTo(oneDayInSeconds, -2);
    });

    it("should create timestamps relative to the current time", () => {
      const timestamps = createTimestamps(1, 1);
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      expect(timestamps[0]).toEqual(now);
      expect(timestamps[0]).toBeGreaterThan(now - 24 * 60 * 60); // Should be within the last day
    });
  });

  describe("displayProjectedHealthFactor", () => {
    it("should return projectedHealthFactor when conditions are met", () => {
      expect(displayProjectedHealthFactor(100, 1.5, 2)).toBe(1.5);
    });

    it("should return parsedHealthFactor when projectedHealthFactor is null", () => {
      expect(displayProjectedHealthFactor(100, null, 2)).toBe(2);
    });

    it("should return 100 when totalBorrowed is 0", () => {
      expect(displayProjectedHealthFactor(0, 1.5, 2)).toBe(100);
    });
  });

  describe("getErrorMessageFromCode", () => {
    it("should return the correct message for known error codes", () => {
      expect(getErrorMessageFromCode("INSUFFICIENT_FUNDS")).toBe(
        "Insufficient funds to complete the operation."
      );
    });

    it("should return a default message for unknown error codes", () => {
      expect(getErrorMessageFromCode("UNKNOWN_CODE" as ErrorCode)).toBe(
        "Unknown error with code UNKNOWN_CODE."
      );
    });
  });

  describe("formatProjectedDate", () => {
    it("should return a date one day in the future", () => {
      const result = formatProjectedDate(1); // Assuming this function gives you the future date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const expectedMonth = tomorrow.toLocaleString("en-GB", {
        month: "short",
      });
      const expectedYear = tomorrow.getFullYear();

      // Adjust the regex to handle the "day month year" format
      expect(result).toMatch(
        new RegExp(`\\d{1,2} ${expectedMonth} ${expectedYear}`)
      );
    });
  });

  describe("getHealthFactorColor", () => {
    it("should return text-error for health factor < 1.5", () => {
      expect(getHealthFactorColor(1.4)).toBe("text-error");
    });

    it("should return text-warning for health factor between 1.5 and 3.0", () => {
      expect(getHealthFactorColor(2.0)).toBe("text-warning");
    });

    it("should return text-success for health factor > 3.0", () => {
      expect(getHealthFactorColor(3.1)).toBe("text-success");
    });
  });

  describe("getAccountPositions", () => {
    it("should filter out positions with all zero values", () => {
      const allPositions = [
        { staked: 0, locked: 0, supplied: 0, borrowed: 0 },
        { staked: 1, locked: 0, supplied: 0, borrowed: 0 },
        { staked: 0, locked: 0, supplied: 2, borrowed: 3 },
      ] as any;
      const result = getAccountPositions(allPositions);
      expect(result.length).toBe(2);
      expect(result).toEqual([
        { staked: 1, locked: 0, supplied: 0, borrowed: 0 },
        { staked: 0, locked: 0, supplied: 2, borrowed: 3 },
      ]);
    });

    it("should return an empty array when allPositions is undefined", () => {
      expect(getAccountPositions(undefined)).toEqual([]);
    });
  });
});
