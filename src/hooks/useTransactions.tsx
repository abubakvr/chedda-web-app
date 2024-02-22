import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, Signer } from "ethers";
import { useCheddaSdk } from "./useCheddaSdk";
import { useParams } from "next/navigation";

export const useTransaction = (asset: string) => {
  const [supplyTxStatus, setSupplyTxStatus] = useState({
    isLoading: false,
    isApproved: false,
    isDeposited: false,
    isWithdrawn: false,
  });
  const [borrowTxStatus, setBorrowTxStatus] = useState({
    isLoading: false,
    isApproved: false,
    isCollateralDeposited: false,
    isCollateralWithdrawn: false,
    isAssetBorrowed: false,
    isAssetRepaid: false,
  });
  const { account } = useWeb3React();
  const { chedda, signer } = useCheddaSdk();
  const { poolId } = useParams();
  const strPoolId = poolId.toString();

  const token = chedda?.erc20token(asset, signer as Signer);
  const lendingPool = chedda?.lendingPool(strPoolId, signer as Signer);

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
      setSupplyTxStatus({
        isLoading: true,
        isApproved: false,
        isDeposited: false,
        isWithdrawn: false,
      });
      setBorrowTxStatus({
        isLoading: true,
        isApproved: false,
        isCollateralDeposited: false,
        isCollateralWithdrawn: false,
        isAssetBorrowed: false,
        isAssetRepaid: false,
      });
      return await transaction({ amount, token, lendingPool });
    } catch (error: any) {
      alert("An error occurred: " + error.message);
      setSupplyTxStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: false,
      }));
      setBorrowTxStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: false,
      }));
    }
  };

  const resetTxState = () => {
    setSupplyTxStatus({
      isLoading: false,
      isApproved: false,
      isDeposited: false,
      isWithdrawn: false,
    });
    setBorrowTxStatus({
      isLoading: false,
      isApproved: false,
      isCollateralDeposited: false,
      isCollateralWithdrawn: false,
      isAssetBorrowed: false,
      isAssetRepaid: false,
    });
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

  const depositHandler = useCallback(
    (owner: string) => {
      if (owner === account) {
        setSupplyTxStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isDeposited: true,
        }));
      }
    },
    [account, setSupplyTxStatus]
  );

  const withdrawHandler = useCallback(
    (owner: string) => {
      if (owner === account) {
        setSupplyTxStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isWithdrawn: true,
        }));
      }
    },
    [account, setSupplyTxStatus]
  );

  const approvalHandler = useCallback(
    (owner: string) => {
      console.log(borrowTxStatus);

      if (owner === account) {
        setSupplyTxStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isApproved: true,
        }));
        setBorrowTxStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isApproved: true,
        }));
      }
    },
    [account, setSupplyTxStatus]
  );

  const depositCollateralHandler = useCallback(
    (_token: string, owner: string) => {
      if (owner === account) {
        setBorrowTxStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isApproved: false,
          isCollateralDeposited: true,
        }));
      }
    },
    [account, setBorrowTxStatus]
  );

  const withdrawCollateralHandler = useCallback(
    (_token: string, owner: string) => {
      if (owner === account) {
        setBorrowTxStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isCollateralWithdrawn: true,
        }));
      }
    },
    [account, setBorrowTxStatus]
  );

  const borrowAssetHandler = useCallback(
    (owner: string) => {
      if (owner === account) {
        setBorrowTxStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isAssetBorrowed: true,
        }));
      }
    },
    [account, setBorrowTxStatus]
  );

  const repayAssetHandler = useCallback(
    (owner: string) => {
      if (owner === account) {
        setBorrowTxStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isApproved: false,
          isAssetRepaid: true,
        }));
      }
    },
    [account, setBorrowTxStatus]
  );

  useEffect(() => {
    token?.contract?.on("Approval", approvalHandler);
    lendingPool?.contract?.on("Deposit", depositHandler);
    lendingPool?.contract?.on("Withdraw", withdrawHandler);
    lendingPool?.contract?.on("CollateralAdded", depositCollateralHandler);
    lendingPool?.contract?.on("CollateralRemoved", withdrawCollateralHandler);
    lendingPool?.contract?.on("AssetBorrowed", borrowAssetHandler);
    lendingPool?.contract?.on("AssetRepaid", repayAssetHandler);
  }, [
    chedda,
    lendingPool?.contract,
    token?.contract,
    depositHandler,
    withdrawHandler,
    approvalHandler,
    depositCollateralHandler,
    withdrawCollateralHandler,
    borrowAssetHandler,
    repayAssetHandler,
  ]);

  return {
    supplyTxStatus,
    borrowTxStatus,
    lendingPool,
    approveAsset,
    depositAsset,
    withdrawAsset,
    depositCollateral,
    withdrawCollateral,
    borrowAsset,
    repayAsset,
    resetTxState,
  };
};
