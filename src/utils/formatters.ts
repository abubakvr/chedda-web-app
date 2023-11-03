import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";

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

export function parseBigNumberToFloat(val: BigNumber, decimals = 18) {
  if (!val) {
    return 0;
  }

  const formatted = formatUnits(val, decimals);
  const parsed = parseFloat(formatted);
  return parsed;
}

export function formatCurrency(number: string | number) {
  let numberr;

  if (typeof number === "string") {
    numberr = parseInt(number);
    if (numberr >= 1000000) {
      numberr = numberr / 1000000;
    }
  } else {
    numberr = number;
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  if (numberr >= 1000000) {
    return formatter.format(numberr / 100000) + " M";
  } else {
    return formatter.format(numberr);
  }
}
