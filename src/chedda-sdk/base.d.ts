import { ethers, Signer } from 'ethers';
import { ERC20Token } from './erc20Token';
import { LendingPool } from './lendingPool';
import { PriceOracle } from './priceOracle';
import { PoolLens } from './poolLens';
export declare class Chedda {
    provider: ethers.providers.WebSocketProvider;
    constructor(provider: string);
    lendingPool(address: string, signer: Signer): LendingPool;
    erc20token(address: string, signer: Signer): ERC20Token;
    poolLens(address: string, signer: Signer): PoolLens;
    priceOracle(): PriceOracle;
    closeProvider(): void;
}
