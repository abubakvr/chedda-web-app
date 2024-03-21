import { useWeb3React } from "@web3-react/core";
import { BigNumber, Signer } from "ethers";
import { useCheddaSdk } from "./useCheddaSdk";
import { useParams } from "next/navigation";
import { getErrorMessageFromCode } from "@/utils/helpers";
import { useState } from "react";

export const useTransaction = (asset: string) => {
  const { account } = useWeb3React();
  const { chedda, signer } = useCheddaSdk();
  const { poolId } = useParams();
  const strPoolId = poolId.toString();

  const token = chedda?.erc20token(asset || strPoolId, signer as Signer);
  const lendingPool = chedda?.lendingPool(strPoolId, signer as Signer);
  const [errorMessage, setErrorMessage] = useState("");

  const executeTransaction = async (
    transaction: (params: {
      lendingPool: any;
      token: any;
      amount?: BigNumber;
    }) => Promise<any>,
    amount?: BigNumber
  ) => {
    if (!account) return;

    try {
      return await transaction({ amount, token, lendingPool });
    } catch (error: any) {
      const errorMessage = getErrorMessageFromCode(error.code);

      const errorObject = {
        errorMessage,
        fullText: error,
      };
      throw new Error(JSON.stringify(errorObject));
    }
  };

  const approveAsset = async (amount: BigNumber) =>
    executeTransaction(async () => {
      if (!amount) return;
      return token?.approve(strPoolId, amount);
    }, amount);

  const depositAsset = async (amount: BigNumber, useAsCollateral: boolean) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.supply(amount, account, useAsCollateral);
    }, amount);

  const withdrawAsset = async (amount: BigNumber) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.withdraw(amount, account, account);
    }, amount);

  const depositCollateral = async (amount: BigNumber) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.addCollateral(asset, amount);
    }, amount);

  const approveLpToken = async (amount: BigNumber) =>
    executeTransaction(async () => {
      const stakingPoolAddress = await lendingPool?.stakePool();
      if (!amount || !stakingPoolAddress) return;
      return lendingPool?.approve(stakingPoolAddress, amount);
    }, amount);

  const withdrawCollateral = async (amount: BigNumber) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.removeCollateral(asset, amount);
    }, amount);

  const borrowAsset = async (amount: BigNumber) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.take(amount);
    }, amount);

  const repayAsset = async (amount: BigNumber) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.putAmount(amount);
    }, amount);

  const stakeLpToken = async (amount: BigNumber) =>
    executeTransaction(async () => {
      const stakingPoolAddress = await lendingPool?.stakePool();
      if (!amount || !stakingPoolAddress) return;
      const stakingPool = chedda?.stakingPool(
        stakingPoolAddress,
        signer as Signer
      );
      return stakingPool?.stake(amount);
    }, amount);

  const unStakeLpToken = async (amount: BigNumber) =>
    executeTransaction(async () => {
      const stakingPoolAddress = await lendingPool?.stakePool();
      if (!amount || !stakingPoolAddress) return;
      const stakingPool = chedda?.stakingPool(
        stakingPoolAddress,
        signer as Signer
      );
      return stakingPool?.unStake(amount);
    }, amount);

  const claimRewards = async () =>
    executeTransaction(async () => {
      const stakingPoolAddress = await lendingPool?.stakePool();
      if (!stakingPoolAddress) return;
      const stakingPool = chedda?.stakingPool(
        stakingPoolAddress,
        signer as Signer
      );
      return stakingPool?.claim();
    });

  return {
    errorMessage,
    lendingPool,
    approveAsset,
    depositAsset,
    withdrawAsset,
    depositCollateral,
    withdrawCollateral,
    borrowAsset,
    repayAsset,
    approveLpToken,
    stakeLpToken,
    unStakeLpToken,
    claimRewards,
  };
};
