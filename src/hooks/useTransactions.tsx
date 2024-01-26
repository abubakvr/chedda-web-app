import { Chedda } from "chedda-sdk";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, Signer } from "ethers";
import { useCheddaSdk } from "./useCheddaSdk";
import { useParams } from "next/navigation";

export const useTransaction = (asset: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { account } = useWeb3React();
  const { chedda, signer } = useCheddaSdk();
  const { poolId } = useParams();

  const strPoolId = poolId.toString();

  const executeTransaction = async (
    transaction: (params: {
      chedda: Chedda | undefined | null;
      amount: BigNumber;
    }) => Promise<any>,
    amount: BigNumber
  ) => {
    if (!account) {
      alert("Please connect your wallet");
      return;
    }

    try {
      setIsLoading(true);
      setIsSuccess(false);
      return await transaction({ chedda, amount });
    } catch (error: any) {
      alert("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const approveAsset = async (amount: BigNumber) =>
    executeTransaction(async ({ chedda }) => {
      if (!chedda) return;
      const token = chedda?.erc20token(asset, signer as Signer);
      return await token?.approve(strPoolId, amount);
    }, amount);

  const depositAsset = async (amount: BigNumber, useAsCollateral: boolean) =>
    executeTransaction(async ({ chedda }) => {
      if (!account) return;
      const lendingPool = chedda?.lendingPool(strPoolId, signer as Signer);
      return await lendingPool?.supply(amount, account, useAsCollateral);
    }, amount);

  const withdrawAsset = async (amount: BigNumber) =>
    executeTransaction(async ({ chedda }) => {
      if (!account) return;
      const lendingPool = chedda?.lendingPool(strPoolId, signer as Signer);
      return await lendingPool?.withdraw(amount, account, account);
    }, amount);

  return {
    isLoading,
    isSuccess,
    approveAsset,
    depositAsset,
    withdrawAsset,
  };
};
