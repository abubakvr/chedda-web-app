import { BigNumber } from 'ethers';
declare enum TokenType {
    ERC20 = 0,
    ERC721 = 1,
    ERC1155 = 2
}
export interface IPoolStats {
    pool: string;
    asset: string;
    characterization: string;
    supplied: BigNumber;
    suppliedValue: BigNumber;
    borrowed: BigNumber;
    borrowedValue: BigNumber;
    baseSupplyAPY: BigNumber;
    maxSupplyAPY: BigNumber;
    baseBorrowAPY: BigNumber;
    maxBorrowAPY: BigNumber;
    utilization: BigNumber;
    feesPaid: BigNumber;
    tvl: BigNumber;
    collaterals: string[];
}
export interface IAggregateStats {
    totalSuppliedValue: BigNumber;
    totalBorrowedValue: BigNumber;
    totalAvailableValue: BigNumber;
    totalFeesPaid: BigNumber;
    numberOfVaults: BigNumber;
    tvl: BigNumber;
}
export interface IPoolCollateralInfo {
    collateral: string;
    amountDeposited: BigNumber;
    value: BigNumber;
    collateralFactor: BigNumber;
}
export interface ICollateralDeposited {
    token: string;
    tokenType: BigNumber;
    amount: BigNumber;
}
export interface IAccountCollateralDeposited {
    token: string;
    amount: BigNumber;
    value: BigNumber;
    tokenIds: BigNumber[];
}
export interface IAccountInfo {
    supplied: BigNumber;
    borrowed: BigNumber;
    healthFactor: BigNumber;
    totalCollateralValue: BigNumber;
    collateralDeposited: IAccountCollateralDeposited[];
}
export interface ICollateralInfo {
    token: string;
    collateralFactor: BigNumber;
    tokenType: TokenType;
}
export interface IInterestRates {
    supplyRate: BigNumber;
    borrowRate: BigNumber;
}
export {};
