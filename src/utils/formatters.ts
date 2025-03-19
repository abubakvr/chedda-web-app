import { ethers } from "ethers";

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

/**
 * Converts a bigint to a formatted float string, considering optional decimals and float point precision.
 *
 * @param {bigint | undefined} val - The biting value to be converted.
 * @param {number | string | undefined} decimals - Optional: The number of decimals to consider in the conversion.
 * @param {number | undefined} floatPoint - Optional: The precision of the resulting float value.
 * @returns {string} The formatted float string.
 */
export const parseBigNumberToFloat = (
  val: bigint | undefined,
  decimals: number | string = "ether",
  floatPoint?: number
): number => {
  if (!val) {
    return 0.0;
  }

  try {
    const formatted = ethers.formatUnits(val, decimals);
    const parsedValue = parseFloat(formatted);
    if (isNaN(parsedValue)) {
      return 0.0;
    }

    const validFloatPoint = Number.isInteger(floatPoint) ? floatPoint : 2;
    return toFixedTrunc(parsedValue, validFloatPoint || 2);
  } catch (error) {
    // Handle unexpected errors and return default value
    return 0.0;
  }
};

/**
 * Formats a numeric value as a currency string with a leading "$".
 *
 * @param {string | number | undefined} number - The numeric value to be formatted as currency.
 * @param {boolean} plain - Specifies whether the should be formatted
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (number?: string | number, plain?: boolean) => {
  if (number === undefined || isNaN(parseFloat(String(number)))) {
    return "0.00";
  }

  const numericValue = typeof number === "string" ? parseFloat(number) : number;
  return `${
    plain
      ? "$" + dynamicFixed(numericValue)
      : "$" + formatLargeNumber(numericValue)
  }`;
};

const dynamicFixed = (num: number) => {
  let decimalPlaces = 2;
  const numStr = num.toString();

  if (numStr.includes(".") && num < 1) {
    const decimalPart = numStr.split(".")[1];
    let firstNonZeroIndex = -1;
    for (let i = 0; i < decimalPart.length; i++) {
      if (decimalPart[i] !== "0") {
        firstNonZeroIndex = i;
        break;
      }
    }

    if (firstNonZeroIndex >= 5) {
      return "0.00";
    }

    if (firstNonZeroIndex !== -1) {
      decimalPlaces = firstNonZeroIndex + 1;
    }
  }
  return toFixedTruncString(num, Math.max(2, Math.min(decimalPlaces, 5)));
};

/**
 * Formats a large numeric value with suffixes (K, M, B, T) based on magnitude.
 *
 * @param {string | number | undefined} value - The numeric value to be formatted.
 * @param {boolean} isFloat - Add a floating point.
 * @returns {string} The formatted string with suffixes (K, M, B, T).
 */
export const formatLargeNumber = (
  value?: string | number,
  isFloat: boolean = true
): string => {
  if (value === undefined || isNaN(parseFloat(String(value)))) {
    return "0.00";
  }

  const largerNumber = typeof value === "string" ? parseFloat(value) : value;
  const absValue = Math.abs(largerNumber);

  const units = ["T", "B", "M", "K", ""];
  let divisor = 1;

  for (let i = units.length - 1; i >= 1; i--) {
    const limit = Math.pow(10, i * 3);
    if (absValue >= limit) {
      divisor = Math.pow(10, i * 3);
      break;
    }
  }

  const num = largerNumber / divisor;

  const formattedNumber = isFloat ? dynamicFixed(num) : num.toString();

  return (
    formattedNumber +
    units[units.length - 1 - Math.floor(Math.log10(divisor) / 3)]
  );
};

/**
 * Formats a given value as a percentage.
 *
 * @param {number|string} value - The value to be formatted as a percentage.
 *
 * @returns {string|null} The formatted percentage string, or null if the input value is null.
 */
export const formatAsPercentage = (
  value?: number | string,
  floatPlaces?: number
) => {
  if (value === undefined || isNaN(parseFloat(String(value)))) {
    return "0.00%";
  }

  return toFixedTruncString(Number(value) * 100, floatPlaces || 2) + "%";
};

export function toFixedTruncString(x: number, n: number) {
  x = toFixed(x);

  const v = (typeof x === "string" ? x : x.toString()).split(".");
  if (n <= 0) return v[0];
  let f = v[1] || "";
  if (f.length > n) return `${v[0]}.${f.substring(0, n)}`;
  while (f.length < n) f += "0";
  return `${v[0]}.${f}`;
}

export function toFixedTrunc(x: number, n: number) {
  return parseFloat(toFixedTruncString(x, n));
}

function toFixed(x: number): number {
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = parseFloat("0." + new Array(e).join("0") + x.toString().substring(2));
    }
  } else {
    let e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += parseFloat(new Array(e + 1).join("0"));
    }
  }
  return x;
}

export function formatNumber(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Get the formatted number string
  const formattedString = formatter.format(amount);

  return formattedString;
}

export const formatToArrayOfStrings = (input: string[][]): string[] => {
  // Flatten the array of arrays into a single array of strings
  const flattenedArray: string[] = input.flat();

  // Trim any whitespace from each element and filter out any empty strings
  const formattedArray: string[] = flattenedArray
    .map((item) => item.trim())
    .filter((item) => item);

  return formattedArray;
};
