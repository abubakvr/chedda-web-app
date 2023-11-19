/// <reference types="jest" />
import { LendingPool } from '../lendingPool';
import { PoolLens } from '../poolLens';
export declare const mockLendingPool: Partial<LendingPool>;
export declare const mockPoolLens: Partial<PoolLens>;
export declare const mockERC20Token: {
    name: Mock<any, any, any>;
    symbol: Mock<any, any, any>;
    approve: Mock<any, any, any>;
    allowance: Mock<any, any, any>;
    balanceOf: Mock<any, any, any>;
    ownedTokens: Mock<any, any, any>;
    transfer: Mock<any, any, any>;
    totalSupply: Mock<any, any, any>;
};
export declare const mockERC721Token: {
    name: Mock<any, any, any>;
    symbol: Mock<any, any, any>;
    approve: Mock<any, any, any>;
    allowance: Mock<any, any, any>;
    balanceOf: Mock<any, any, any>;
    ownedTokens: Mock<any, any, any>;
    transfer: Mock<any, any, any>;
    totalSupply: Mock<any, any, any>;
};
