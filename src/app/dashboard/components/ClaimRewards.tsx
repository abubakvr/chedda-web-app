import { useState } from "react";
import { Button, Card } from "@/components/common";
import { useAllClaimableRewards, useToast, useTransaction } from "@/hooks";
import { formatLargeNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { ConnectWalletBox } from "./ConnectWalletBox";

interface ClaimRewardsProps {
  isWalletConnected: boolean;
  cheddaTokenPrice: number | undefined;
  cheddaTokenPriceLoading: boolean;
  fetchCheddaBalance: () => void;
}

export const ClaimRewards = ({
  isWalletConnected,
  cheddaTokenPrice,
  cheddaTokenPriceLoading,
  fetchCheddaBalance,
}: ClaimRewardsProps) => {
  const [txLoading, setTxLoading] = useState(false);
  const {
    data: claimableRewards,
    isLoading: claimableRewardsLoading,
    fetchData: fetchAllClaimableRewards,
  } = useAllClaimableRewards();
  const { claimAllRewards } = useTransaction("");
  const { addToast } = useToast();

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
        claimAllRewards()
          .then(async (res: any) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = "You've successfully claimed all rewards";
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "success",
                });
                fetchAllClaimableRewards(false);
                fetchCheddaBalance();
              } else {
                const txMessage = `An error occurred while proccessing your transaction`;
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "error",
                });
              }
            }
            setTxLoading(false);
          })
          .catch((error: any) => {
            const errorObject = JSON.parse(error.message);
            addToast({
              message: errorObject.errorMessage,
              copyText: errorObject.fullText,
              type: "error",
            });
            setTxLoading(false);
          });
      }
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        copyText: errorObject.fullText,
        type: "error",
      });
      setTxLoading(false);
    }
  };
  return (
    <>
      <Card title="CLAIM REWARDS" data-test-id="custom-card">
        {isWalletConnected ? (
          <>
            <div className="hazy-bg flex justift-between gap-x-2">
              <div className="flex flex-col items-center p-2 md:p- lg:p-7 w-full justify-center">
                <p className="text-3xs lg:text-xs text-mist font-semibold w-max">
                  Lock Rewards
                </p>
                {isDataLoading ? (
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="mt-1 lg:mt-2 h-4 lg:h-7 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="mt-1 lg:mt-2 h-4 lg:h-5 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="mt-1 lg:mt-2 h-3 lg:h-3 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center lg:space-y-1">
                    <p
                      className="lg:mt-2 text-sm lg:text-2xl font-bold card-gradient-text"
                      data-testid="lock-rewards"
                    >
                      {formatLargeNumber(parsedLockRewards)}
                    </p>
                    <p className="text-2xs lg:text-sm font-bold card-gradient-text">
                      CHEDDA
                    </p>
                    <p
                      className="lg:mt-2 text-3xs lg:text-xs text-mist"
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
              <div className="border-0.5 border-l border-accent-purple h-10/12 my-3 opacity-70"></div>
              <div className="flex flex-col items-center p-1 md:p-1 lg:p-7 w-full space-y-1">
                <p className="text-3xs lg:text-xs text-mist font-semibold w-max">
                  Stake Rewards
                </p>
                {isDataLoading ? (
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="mt-1 lg:mt-2 h-4 lg:h-7 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="mt-1 lg:mt-2 h-4 lg:h-5 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="mt-1 lg:mt-2 h-3 lg:h-3 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center lg:space-y-1">
                    <p
                      className="lg:mt-2 text-sm lg:text-2xl font-bold card-gradient-text"
                      data-testid="stake-rewards"
                    >
                      {formatLargeNumber(parsedStakeRewards)}
                    </p>
                    <p className="text-2xs lg:text-sm font-bold card-gradient-text">
                      CHEDDA
                    </p>
                    <p
                      className="lg:mt-2 text-3xs lg:text-xs text-mist"
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
            <div className="mt-2 lg:mt-4 flex items-center justify-between relative gap-x-2">
              <div className="text-3xs lg:text-xs text-mist">
                Claim all your rewards on the protocol in one place
              </div>
              <div className="w-20 lg:w-32">
                <Button
                  type="tertiary"
                  onClick={() => handleClaimAllRewards()}
                  className="py-2 lg:py-3 xl:py-2.5 text-3xs lg:text-xs"
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
          <ConnectWalletBox
            title="rewards"
            data-testid="connect-wallet-box"
            height={20}
          />
        )}
      </Card>
    </>
  );
};
