import { Contract, ethers, Signer } from 'ethers';
import { IAccountInfo, IAggregateStats, IPoolCollateralInfo, IPoolStats } from './utils/types';
export declare class PoolLens {
    private provider;
    private address;
    signer: Signer;
    contract: Contract;
    constructor(provider: ethers.providers.WebSocketProvider, address: string, signer: Signer);
    private initiateContract;
    activePools(): Promise<string[]>;
    getAggregateStats(): Promise<IAggregateStats>;
    getPoolAccountInfo(poolAddress: string, account: string): Promise<IAccountInfo>;
    getPoolCollateral(poolAddress: string): Promise<IPoolCollateralInfo[]>;
    getPoolStats(poolAddress: string): Promise<IPoolStats>;
    getPoolStatsList(pools: string[]): Promise<IPoolStats[]>;
    owner(): Promise<string>;
    registeredPools(): Promise<string[]>;
    registerPool(pool: string, isActive: boolean): Promise<void>;
    renounceOwnership(): Promise<void>;
    setActive(pool: string, isActive: boolean): Promise<void>;
    transferOwnership(newOwner: string): Promise<void>;
    unregisterPool(pool: string): Promise<void>;
    private handleContractError;
}
