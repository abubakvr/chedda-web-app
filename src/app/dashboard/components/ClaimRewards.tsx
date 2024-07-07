import { useState } from "react";
import { Button, Card } from "@/components/common";
import { Toast } from "@/components/ui";
import { useAllClaimableRewards, useTransaction } from "@/hooks";
import { formatLargeNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { ConnectWalletBox } from "./ConnectWalletBox";

interface ClaimRewardsProps {
  isWalletConnected: boolean;
  cheddaTokenPrice: number | undefined;
  cheddaTokenPriceLoading: boolean;
}

export const ClaimRewards = ({
  isWalletConnected,
  cheddaTokenPrice,
  cheddaTokenPriceLoading,
}: ClaimRewardsProps) => {
  const [showToast, setShowToast] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [{ txMessage, txHash, txStatus, copyText }, setTxDetails] = useState<{
    txMessage: string;
    txHash: string | null;
    copyText: string | null;
    txStatus: "success" | "failed";
  }>({
    copyText: "",
    txMessage: "",
    txHash: "",
    txStatus: "success",
  });

  const {
    data: claimableRewards,
    isLoading: claimableRewardsLoading,
    fetchData: fetchAllClaimableRewards,
  } = useAllClaimableRewards();
  const { claimAllRewards } = useTransaction("");

  const parsedCheddaTokenPrice = Number(cheddaTokenPrice);
  const parsedLockRewards = parseBigNumberToFloat(claimableRewards?.[1], 18, 5);
  const parsedStakeRewards = parseBigNumberToFloat(
    claimableRewards?.[0],
    18,
    5
  );

  const isDataLoading = cheddaTokenPriceLoading || claimableRewardsLoading;

  const handleClaimAllRewards = async () => {
    try {
      if (parsedLockRewards || parsedStakeRewards) {
        setTxLoading(true);
        setShowToast(false);
        claimAllRewards()
          .then(async (res: any) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = "You've successfully claimed all rewards";
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setShowToast(true);
                fetchAllClaimableRewards(false);
              } else {
                const txMessage = `An error occurred while proccessing your transaction`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "failed",
                });
                setShowToast(true);
              }
            }
            setTxLoading(false);
          })
          .catch((error: any) => {
            const errorObject = JSON.parse(error.message);
            setTxDetails({
              txMessage: errorObject.errorMessage,
              copyText: errorObject.fullText,
              txHash: null,
              txStatus: "failed",
            });
            setShowToast(true);
            setTxLoading(false);
          });
      }
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      setTxDetails({
        txMessage: errorObject.errorMessage,
        copyText: errorObject.fullText,
        txHash: null,
        txStatus: "failed",
      });
      setShowToast(true);
      setTxLoading(false);
    }
  };
  return (
    <>
      <Toast
        isOpen={showToast}
        toastMessage={txMessage}
        txHash={txHash}
        status={txStatus}
        copyText={copyText}
      />
      <Card title="CLAIM REWARDS" data-test-id="custom-card">
        {isWalletConnected ? (
          <>
            <div className="hazy-bg flex justif-between gap-x-2">
              <div className="flex flex-col items-center p-4 w-full">
                <p className="text-sm text-[#FFFFFF70] font-semibold">
                  Lock Rewards
                </p>
                {isDataLoading ? (
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="mt-2 h-7 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="mt-2 h-5 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="mt-2 h-4 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-1">
                    <p
                      className="text-3xl font-bold card-gradient-text"
                      data-testid="lock-rewards"
                    >
                      {formatLargeNumber(parsedLockRewards)}
                    </p>
                    <p className="text-sm font-bold card-gradient-text">
                      CHEDDA
                    </p>
                    <p
                      className="text-sm text-[#FFFFFF70]"
                      data-testid="lock-rewards-value"
                    >
                      $
                      {formatLargeNumber(
                        parsedLockRewards * parsedCheddaTokenPrice
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="border-0.5 border-l border-[#7F56D9] h-10/12 my-3 opacity-70"></div>
              <div className="flex flex-col items-center p-4 w-full space-y-1">
                <p className="text-sm text-[#FFFFFF70] font-semibold">
                  Stake Rewards
                </p>
                {isDataLoading ? (
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="mt-2 h-7 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="mt-2 h-5 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="mt-2 h-3 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-1">
                    <p
                      className="text-3xl font-bold card-gradient-text"
                      data-testid="stake-rewards"
                    >
                      {formatLargeNumber(parsedStakeRewards)}
                    </p>
                    <p className="text-sm font-bold card-gradient-text">
                      CHEDDA
                    </p>
                    <p
                      className="text-sm text-[#FFFFFF70]"
                      data-testid="stake-rewards-value"
                    >
                      $
                      {formatLargeNumber(
                        parsedStakeRewards * parsedCheddaTokenPrice
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between relative">
              <div className="text-xs text-[#FFFFFF70]">
                Claim all your rewards on the protocol in one place
              </div>
              <div className="w-32">
                <Button
                  type="tertiary"
                  onClick={() => handleClaimAllRewards()}
                  className="h-10 text-sm"
                  isLoading={txLoading}
                  disabled={!parsedLockRewards && !parsedStakeRewards}
                  data-testid="custom-button"
                >
                  Claim all
                </Button>
              </div>
            </div>
          </>
        ) : (
          <ConnectWalletBox title="rewards" data-testid="connect-wallet-box" />
        )}
      </Card>
    </>
  );
};
