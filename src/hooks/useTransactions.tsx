import { Chedda } from "chedda-sdk";
import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, Signer } from "ethers";
import { useCheddaSdk } from "./useCheddaSdk";
import { useParams } from "next/navigation";

export const useTransaction = (asset: string) => {
  const [transactionStatus, setTransactionStatus] = useState({
    isLoading: false,
    isApproved: false,
    isDeposited: false,
    isWithdrawn: false,
  });
  const { account } = useWeb3React();
  const { chedda, signer } = useCheddaSdk();
  const { poolId } = useParams();
  const strPoolId = poolId.toString();

  const lendingPool = chedda?.lendingPool(strPoolId, signer as Signer);
  const token = chedda?.erc20token(asset, signer as Signer);

  const executeTransaction = async (
    transaction: (params: {
      lendingPool: any;
      token: any;
      amount: BigNumber;
    }) => Promise<any>,
    amount: BigNumber
  ) => {
    if (!account) {
      alert("Please connect your wallet");
      return;
    }

    try {
      setTransactionStatus({
        isLoading: true,
        isApproved: false,
        isDeposited: false,
        isWithdrawn: false,
      });
      return await transaction({ chedda, amount });
    } catch (error: any) {
      alert("An error occurred: " + error.message);
      setTransactionStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: false,
      }));
    }
  };

  const approveAsset = async (amount: BigNumber) =>
    executeTransaction(async () => {
      if (!amount) return;
      return await token?.approve(strPoolId, amount);
    }, amount);

  const depositAsset = async (amount: BigNumber, useAsCollateral: boolean) =>
    executeTransaction(async () => {
      if (!account) return;
      return await lendingPool?.supply(amount, account, useAsCollateral);
    }, amount);

  const withdrawAsset = async (amount: BigNumber) =>
    executeTransaction(async () => {
      if (!account) return;
      return await lendingPool?.withdraw(amount, account, account);
    }, amount);

  const depositHandler = useCallback(
    (owner: string) => {
      if (owner === account) {
        setTransactionStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isDeposited: true,
        }));
      }
    },
    [account, setTransactionStatus]
  );

  const withdrawHandler = useCallback(
    (owner: string) => {
      if (owner === account) {
        setTransactionStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isWithdrawn: true,
        }));
      }
    },
    [account, setTransactionStatus]
  );

  const approvalHandler = useCallback(
    (owner: string) => {
      if (owner === account) {
        setTransactionStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isApproved: true,
        }));
      }
    },
    [account, setTransactionStatus]
  );

  useEffect(() => {
    lendingPool?.contract?.on("Deposit", depositHandler);
    lendingPool?.contract?.on("Withdraw", withdrawHandler);
    token?.contract?.on("Approval", approvalHandler);
  }, [
    chedda,
    lendingPool?.contract,
    token?.contract,
    depositHandler,
    withdrawHandler,
    approvalHandler,
  ]);

  return {
    isLoading: transactionStatus.isLoading,
    transactionStatus,
    lendingPool,
    approveAsset,
    depositAsset,
    withdrawAsset,
    depositCollateral,
  };
};
