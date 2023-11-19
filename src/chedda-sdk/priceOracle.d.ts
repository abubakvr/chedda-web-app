import { BigNumber, ethers, Contract } from "ethers";
export declare class PriceOracle {
    oracleContract: Contract | undefined;
    provider: ethers.providers.WebSocketProvider;
    constructor(provider: ethers.providers.WebSocketProvider);
    getAssetPrice(address: string, MultiAssetPriceOracle: {
        abi: ethers.ContractInterface;
    }, priceFeedAddress: string): Promise<BigNumber>;
}
