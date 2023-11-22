import { BigNumber, ethers, utils } from "ethers";

export const n6 = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 6,
});
export const n4 = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

export const c2 = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const tokenValue = (value: number, decimals: number) =>
  decimals ? value / Math.pow(10, decimals) : value;

/**
 * Return a formatted string with the symbol at the end
 * @param {number} value integer value
 * @param {number} decimals number of decimals
 * @param {string} symbol token symbol
 * @returns {string}
 */
export const tokenValueTxt = (
  value: number,
  decimals: number,
  symbol: string
) => `${n4.format(tokenValue(value, decimals))} ${symbol}`;

export const parseBigNumberToFloat = (
  val: BigNumber | undefined,
  decimals?: number
): string => {
  if (!val || !ethers.BigNumber.isBigNumber(val)) {
    return "0.00";
  }

  const formatted = utils.formatUnits(val._hex, decimals ?? "ether");

  // Add error handling for parseFloat
  const parsedValue = parseFloat(formatted);
  if (isNaN(parsedValue)) {
    return "0.00";
  }

  return decimals === 0 ? `${parsedValue}` : parsedValue.toFixed(2);
};

export const formatCurrency = (number: string | number): string => {
  const numericValue = typeof number === "string" ? parseFloat(number) : number;

  return "$" + formatLargeNumber(numericValue);
};

export const formatLargeNumber = (value: string | number) => {
  const largerNumber = typeof value === "string" ? parseInt(value) : value;
  const absValue = Math.abs(largerNumber);

  if (absValue >= 1e12) {
    return (largerNumber / 1e12).toFixed(2) + "T";
  } else if (absValue >= 1e9) {
    return (largerNumber / 1e9).toFixed(2) + "B";
  } else if (absValue >= 1e6) {
    return (largerNumber / 1e6).toFixed(2) + "M";
  } else if (absValue >= 1e3) {
    return (largerNumber / 1e3).toFixed(2) + "K";
  } else {
    return largerNumber.toFixed(2);
  }
};
