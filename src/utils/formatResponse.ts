import { IPoolStats } from "chedda-sdk";
import { BigNumber, ethers } from "ethers";
import { TokenConfig } from "./types";

export interface ResponseItem {
  pool: string;
  asset: string;
  characterization: string;
  supplied: string;
  suppliedValue: string;
  borrowed: string;
  borrowedValue: string;
  baseSupplyAPY: string;
  maxSupplyAPY: string;
  baseBorrowAPY: string;
  maxBorrowAPY: string;
  utilization: string;
  feesPaid: string;
  tvl: string;
  collaterals: string[];
}

export const convertResponseToObject = (
  response: IPoolStats[],
  tokens: TokenConfig
): Array<Record<string, any>> => {
  const formatValue = (value: BigNumber) => {
    return value ? ethers.BigNumber.from(value._hex).toString() : 0;
  };

  const formatRatio = (value: BigNumber) => {
    return value ? ethers.BigNumber.from(value._hex).toString() : 0;
  };

  return response.map((item) => ({
    pool: item.pool,
    asset: tokens[item.asset],
    characterization: item.characterization,
    supplied: formatValue(item.supplied),
    suppliedValue: formatValue(item.suppliedValue),
    borrowed: formatValue(item.borrowed),
    borrowedValue: formatValue(item.borrowedValue),
    baseSupplyAPY: formatRatio(item.baseSupplyAPY),
    maxSupplyAPY: formatRatio(item.maxSupplyAPY),
    baseBorrowAPY: formatRatio(item.baseBorrowAPY),
    maxBorrowAPY: formatRatio(item.maxBorrowAPY),
    utilization: formatRatio(item.utilization),
    feesPaid: formatValue(item.feesPaid),
    tvl: formatValue(item.tvl),
    collaterals: mapCollateralsToTokens(item.collaterals, tokens),
  }));
};

function mapCollateralsToTokens(collaterals: string[], tokens: TokenConfig) {
  return collaterals.map((collateralAddress: string) => {
    const token = tokens[collateralAddress];
    if (token) {
      return token;
    }
    return null;
  });
}
