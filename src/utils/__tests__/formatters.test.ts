import { ethers } from "ethers";
import {
  getEllipsisTxt,
  tokenValue,
  tokenValueTxt,
  parseBigNumberToFloat,
  formatCurrency,
  formatLargeNumber,
  formatAsPercentage,
  toFixedTruncString,
  toFixedTrunc,
  formatNumber,
  formatToArrayOfStrings,
} from "../formatters";

describe("Utility Functions", () => {
  describe("getEllipsisTxt", () => {
    it("should return ellipsized text", () => {
      const result = getEllipsisTxt("abcdefghij", 3);
      expect(result).toBe("abc...hij");
    });

    it("should return an empty string for an empty input", () => {
      const result = getEllipsisTxt("", 3);
      expect(result).toBe("");
    });
  });

  describe("tokenValue", () => {
    it("should return the correct token value based on decimals", () => {
      const result = tokenValue(1000000000, 9);
      expect(result).toBe(1);
    });

    it("should return the value as is when decimals are 0", () => {
      const result = tokenValue(1000, 0);
      expect(result).toBe(1000);
    });
  });

  describe("tokenValueTxt", () => {
    it("should return the formatted token value with symbol", () => {
      const result = tokenValueTxt(1000000000, 9, "ETH");
      expect(result).toBe("1 ETH");
    });
  });

  describe("parseBigNumberToFloat", () => {
    it("should parse a BigInt and return a float", () => {
      const val = BigInt("1000000000000000000"); // 1 Ether
      const result = parseBigNumberToFloat(val, 18, 2);
      expect(result).toBe(1.0);
    });

    it("should return 0.0 for an undefined value", () => {
      const result = parseBigNumberToFloat(undefined, 18, 2);
      expect(result).toBe(0.0);
    });

    it("should return 0.0 if parsing results in NaN", () => {
      const result = parseBigNumberToFloat(BigInt("-9030"), 18, 2);
      expect(result).toBe(0.0);
    });
  });

  describe("formatCurrency", () => {
    it("should format number as currency", () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe("$1.23K");
    });

    it("should format number as plain currency", () => {
      const result = formatCurrency(1234.56, true);
      expect(result).toBe("$1234.56");
    });

    it("should return '0.00' when number is undefined", () => {
      const result = formatCurrency(undefined);
      expect(result).toBe("0.00");
    });
  });

  describe("formatLargeNumber", () => {
    it("should format large numbers with suffix", () => {
      const result = formatLargeNumber(1234567890);
      expect(result).toBe("1.23B");
    });

    it("should return the number as a string without suffix for small numbers", () => {
      const result = formatLargeNumber(123);
      expect(result).toBe("123.00");
    });
  });

  describe("formatAsPercentage", () => {
    it("should format number as a percentage", () => {
      const result = formatAsPercentage(0.1234);
      expect(result).toBe("12.34%");
    });

    it("should return '0.00%' for undefined input", () => {
      const result = formatAsPercentage(undefined);
      expect(result).toBe("0.00%");
    });
  });

  describe("toFixedTruncString", () => {
    it("should truncate a number to the specified decimal places as a string", () => {
      const result = toFixedTruncString(123.45678, 2);
      expect(result).toBe("123.45");
    });

    it("should add zeroes if decimal places are less than specified", () => {
      const result = toFixedTruncString(123.4, 3);
      expect(result).toBe("123.400");
    });
  });

  describe("toFixedTrunc", () => {
    it("should truncate a number to the specified decimal places", () => {
      const result = toFixedTrunc(123.45678, 2);
      expect(result).toBe(123.45);
    });
  });

  describe("formatNumber", () => {
    it("should format a number with two decimal places", () => {
      const result = formatNumber(1234.5678);
      expect(result).toBe("1,234.57");
    });
  });

  describe("formatToArrayOfStrings", () => {
    it("should flatten and trim a 2D array of strings", () => {
      const input = [
        ["  hello ", "world  "],
        ["  foo", "bar "],
      ];
      const result = formatToArrayOfStrings(input);
      expect(result).toEqual(["hello", "world", "foo", "bar"]);
    });

    it("should filter out empty strings", () => {
      const input = [
        ["  ", "world  "],
        ["", "bar "],
      ];
      const result = formatToArrayOfStrings(input);
      expect(result).toEqual(["world", "bar"]);
    });
  });
});
