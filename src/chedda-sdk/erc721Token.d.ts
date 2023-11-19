import { BigNumber, ethers, Contract, Signer } from 'ethers';
export declare class ERC721Token {
    private provider;
    private address;
    private signer;
    contract: Contract;
    constructor(provider: ethers.providers.WebSocketProvider, address: string, signer: Signer);
    name(): Promise<string>;
    symbol(): Promise<string>;
    approve(spender: string, amount: BigNumber): Promise<void>;
    allowance(account: string, spender: string): Promise<BigNumber>;
    balanceOf(account: string): Promise<BigNumber>;
    transfer(to: string, amount: BigNumber): Promise<void>;
    totalSupply(): Promise<BigNumber>;
    contractAt(address: string): void;
    initiateContract(): void;
}
