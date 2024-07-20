import { useWeb3React } from "@web3-react/core";
import { useCheddaSdk } from "./useCheddaSdk";
import { useParams } from "next/navigation";
import { getErrorMessageFromCode } from "@/utils/helpers";
import { currentEnvironment } from "@/data/environments";
import { useCallback, useMemo } from "react";
import { UncheckedJsonRpcSigner } from "@/utils/UncheckedJsonRpcSigner";
import { BrowserProvider } from "ethers";

export const useTransaction = (asset: string) => {
  const { account } = useWeb3React();
  const { chedda } = useCheddaSdk();
  const { poolId } = useParams();

  const strPoolId = poolId ? poolId.toString() : "0x00";

  const provider = useMemo(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      return new BrowserProvider(window.ethereum);
    }
    return undefined;
  }, []);

  const signer = useMemo(() => {
    if (provider && account) {
      return new UncheckedJsonRpcSigner(provider, account);
    }
    return undefined;
  }, [provider, account]);

  const cheddaTokenAddress = currentEnvironment.contracts.CheddaToken;
  const accountActorAddress = currentEnvironment.contracts.AccountActor;

  const token = chedda?.erc20token(asset || strPoolId, signer as any);
  const lendingPool = chedda?.lendingPool(strPoolId, signer as any);
  const cheddaToken = chedda?.cheddaToken(cheddaTokenAddress, signer as any);
  const accountActor = chedda?.accountActor(accountActorAddress, signer as any);

  const executeTransaction = async (
    transaction: (params: {
      lendingPool: any;
      token: any;
      amount?: bigint;
    }) => Promise<any>,
    amount?: bigint
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

  const approveAsset = async (amount: bigint) =>
    executeTransaction(async () => {
      if (!amount) return;
      return token?.approve(strPoolId, amount);
    }, amount);

  const depositAsset = async (amount: bigint, useAsCollateral: boolean) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.supply(amount, account, useAsCollateral);
    }, amount);

  const withdrawAsset = async (amount: bigint) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.withdraw(amount, account, account);
    }, amount);

  const depositCollateral = async (amount: bigint) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.addCollateral(asset, amount);
    }, amount);

  const approveLpToken = async (amount: bigint) =>
    executeTransaction(async () => {
      const stakingPoolAddress = await lendingPool?.stakePool();
      if (!amount || !stakingPoolAddress) return;
      return lendingPool?.approve(stakingPoolAddress, amount);
    }, amount);

  const withdrawCollateral = async (amount: bigint) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.removeCollateral(asset, amount);
    }, amount);

  const borrowAsset = async (amount: bigint) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.take(amount);
    }, amount);

  const repayAsset = async (amount: bigint) =>
    executeTransaction(async () => {
      if (!account) return;
      return lendingPool?.putAmount(amount);
    }, amount);

  const stakeLpToken = async (amount: bigint) =>
    executeTransaction(async () => {
      const stakingPoolAddress = await lendingPool?.stakePool();
      if (!amount || !stakingPoolAddress) return;
      const stakingPool = chedda?.stakingPool(
        stakingPoolAddress,
        signer as any
      );
      return stakingPool?.stake(amount);
    }, amount);

  const unStakeLpToken = async (amount: bigint) =>
    executeTransaction(async () => {
      const stakingPoolAddress = await lendingPool?.stakePool();
      if (!amount || !stakingPoolAddress) return;
      const stakingPool = chedda?.stakingPool(
        stakingPoolAddress,
        signer as any
      );
      return stakingPool?.unStake(amount);
    }, amount);

  const claimStakeRewards = async () =>
    executeTransaction(async () => {
      const stakingPoolAddress = await lendingPool?.stakePool();
      if (!stakingPoolAddress) return;
      const stakingPool = chedda?.stakingPool(
        stakingPoolAddress,
        signer as any
      );
      return stakingPool?.claim();
    });

  const approveCheddaToken = async (amount: bigint) =>
    executeTransaction(async () => {
      const gaugeAddress = await lendingPool?.gauge();
      if (!amount || !gaugeAddress) return;
      return cheddaToken?.approve(gaugeAddress, amount);
    }, amount);

  const lockCheddaToken = async (amount: bigint, time: number) =>
    executeTransaction(async () => {
      const gaugeAddress = await lendingPool?.gauge();
      if (!amount || !gaugeAddress) return;
      const cheddaLockingGauge = chedda?.cheddaLockingGauge(
        gaugeAddress,
        signer as any
      );
      return cheddaLockingGauge?.createLock(amount, time);
    }, amount);

  const withdrawCheddaToken = async () =>
    executeTransaction(async () => {
      const gaugeAddress = await lendingPool?.gauge();
      if (!gaugeAddress) return;
      const cheddaLockingGauge = chedda?.cheddaLockingGauge(
        gaugeAddress,
        signer as any
      );
      return cheddaLockingGauge?.withdraw();
    });

  const relockCheddaToken = async (lockTime: number) =>
    executeTransaction(async () => {
      const gaugeAddress = await lendingPool?.gauge();
      if (!gaugeAddress) return;
      const cheddaLockingGauge = chedda?.cheddaLockingGauge(
        gaugeAddress,
        signer as any
      );
      return cheddaLockingGauge?.extendLock(lockTime);
    });

  const claimLockRewards = async () =>
    executeTransaction(async () => {
      const gaugeAddress = await lendingPool?.gauge();
      if (!gaugeAddress) return;
      const cheddaLockingGauge = chedda?.cheddaLockingGauge(
        gaugeAddress,
        signer as any
      );
      return cheddaLockingGauge?.claim();
    });

  const lockMoreCheddaToken = async (amount: bigint) =>
    executeTransaction(async () => {
      const gaugeAddress = await lendingPool?.gauge();
      if (!gaugeAddress) return;
      const cheddaLockingGauge = chedda?.cheddaLockingGauge(
        gaugeAddress,
        signer as any
      );
      return cheddaLockingGauge?.addToLock(amount);
    }, amount);

  const getTokenBalance = useCallback(
    async (tokenAddress: string) => {
      if (!account || !tokenAddress) return;
      const token = chedda?.cheddaToken(tokenAddress, signer as any);
      return await token?.balanceOf(account);
    },
    [account, chedda, signer]
  );

  const claimAllRewards = async () =>
    executeTransaction(async () => {
      if (!account) return;
      return await accountActor?.claimAllRewards(account);
    });

  return {
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
    claimStakeRewards,
    approveCheddaToken,
    lockCheddaToken,
    withdrawCheddaToken,
    relockCheddaToken,
    claimLockRewards,
    lockMoreCheddaToken,
    getTokenBalance,
    claimAllRewards,
  };
};
