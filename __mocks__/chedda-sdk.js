// __mocks__/chedda.ts

import { ethers, Signer } from "ethers";

export class Chedda {
  provider;

  constructor(provider) {
    this.provider = new ethers.JsonRpcProvider(provider);
  }

  lendingPool = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  erc20token = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  poolLens = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  interestRateProjector = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  priceOracle = jest.fn().mockImplementation((address) => {
    return { address };
  });

  stakingPool = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  cheddaLockingGauge = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  lockingGaugeRewardsDistributor = jest
    .fn()
    .mockImplementation((address, signer) => {
      return { address, signer };
    });

  cheddaToken = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  cheddaTokenBridged = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  cxToken = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  cheddaOFTAdapter = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });

  accountActor = jest.fn().mockImplementation((address, signer) => {
    return { address, signer };
  });
}
