"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import { IAccountInfo } from "chedda-sdk";
import { Button } from "@/components/common";
import { formatLargeNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { IPoolStatsResponse } from "@/utils/types";
import { InfoCardSkeleton } from "@/components/ui";
import { BorrowModal, SupplyModal } from "@/components/modals";
import { currentEnvironment } from "@/data/environments";
import { getHealthFactorColor } from "@/utils/helpers";

interface MyInformationCardProps {
  poolStats: IPoolStatsResponse | undefined;
  accountInfo: IAccountInfo | undefined;
  available: bigint | undefined;
  isLoading: boolean;
  assetPrice: number;
  fetchPoolInfo: () => void;
  setActivePoolTab: Dispatch<SetStateAction<string>>;
}

export const MyInformationCard: React.FC<MyInformationCardProps> = ({
  poolStats,
  accountInfo,
  isLoading,
  assetPrice,
  available,
  fetchPoolInfo,
  setActivePoolTab,
}) => {
  const [isSupplyModalOpen, setIsSupplyModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<string | null>();

  const closeSupplyModal = () => {
    setIsSupplyModalOpen(false);
    setDefaultTab(null);
  };

  const closeBorrowModal = () => {
    setIsBorrowModalOpen(false);
  };

  const totalBorrowed = parseBigNumberToFloat(
    accountInfo?.borrowed,
    accountInfo?.decimals,
    10
  );

  const totalCollateralValue = parseBigNumberToFloat(
    accountInfo?.totalCollateralValue,
    18,
    10
  );

  if (isLoading || !poolStats) {
    // Render loading placeholder if poolStats is undefined
    return <InfoCardSkeleton title="MY INFORMATION" itemCount={4} />;
  }

  const openSupplyModal = (activeTab: "Deposit" | "Withdraw") => {
    setIsBorrowModalOpen(false);
    setIsSupplyModalOpen(true);
    setDefaultTab(activeTab);
  };

  return (
    <div
      className="flex flex-col justify-between"
      data-testid="my-information-card"
    >
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 xl:px-8 h-11 xl:h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-[10px] text-xs xl:text-sm uppercase">
          My Information
        </div>
        <a
          href={`${currentEnvironment?.contractPrefix}/${poolStats?.pool}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-x-1 border-2 rounded-md py-1 px-2 md:py-[6px] md:px-3 border-[#ffffff60] hover:opacity-70"
        >
          <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[8px] xl:text-[10px]">
            Vault Contract
          </div>
          <Image
            style={{ color: "" }}
            src={LinkOut}
            alt="link out"
            className="w-2.5 h-2.5 xl:w-4 xl:h-4"
          />
        </a>
      </div>
      <div className="p-4 md:p-6 xl:p-8 pb-0 md:pb-0 xl:pb-0">
        <div className="flex justify-between text-[10px] md:text-xs text-xs xl:text-sm pb-4 md:pb-5">
          <div className="opacity-50 font-semibold">Available to Supply</div>
          <div className=" font-bold">
            {`${formatLargeNumber(
              parseBigNumberToFloat(
                accountInfo?.walletAssetBalance,
                accountInfo?.decimals
              )
            )} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between text-[10px] md:text-xs text-xs xl:text-sm pb-4 md:pb-5">
          <div className="opacity-50 font-semibold">Total Supplied</div>
          <div className="font-bold">
            {`${formatLargeNumber(
              parseBigNumberToFloat(
                accountInfo?.supplied,
                accountInfo?.decimals
              )
            )} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between text-[10px] md:text-xs text-xs xl:text-sm pb-4 md:pb-5">
          <div className="opacity-50 font-semibold">Total Borrowed</div>
          <div className="font-bold">
            {`${formatLargeNumber(totalBorrowed)} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between text-[10px] md:text-xs text-xs xl:text-sm ">
          <div className={`opacity-50 font-semibold`}>Health Factor</div>
          <div
            className={`font-bold ${getHealthFactorColor(parseBigNumberToFloat(accountInfo?.healthFactor))}`}
          >
            {parseBigNumberToFloat(accountInfo?.healthFactor)}
          </div>
        </div>
      </div>

      <div className="flex xl:flex-col justify-center p-4 md:p-6 xl:p-8 gap-x-4 lg-gap-x-0 xl:gap-y-6">
        <Button
          onClick={() => setIsSupplyModalOpen(true)}
          type="primary"
          size="small"
          className="text-sm"
        >
          Supply
        </Button>
        <Button
          onClick={() => setIsBorrowModalOpen(true)}
          type="secondary"
          size="small"
        >
          Borrow
        </Button>
      </div>
      {isSupplyModalOpen && (
        <SupplyModal
          isOpen={isSupplyModalOpen}
          onClose={closeSupplyModal}
          asset={poolStats?.asset}
          assetPrice={assetPrice}
          supplied={accountInfo?.supplied}
          available={available}
          tokenBalance={accountInfo?.walletAssetBalance}
          baseSupplyAPY={poolStats.baseSupplyAPY}
          fetchPoolInfo={fetchPoolInfo}
          defaultTab={defaultTab}
          setActivePoolTab={setActivePoolTab}
        />
      )}
      {isBorrowModalOpen && (
        <BorrowModal
          asset={poolStats?.asset}
          isOpen={isBorrowModalOpen}
          collaterals={poolStats.collaterals}
          assetPrice={assetPrice}
          availableLiquidity={available}
          totalBorrowed={totalBorrowed}
          totalCollateralValue={totalCollateralValue}
          onClose={closeBorrowModal}
          fetchPoolInfo={fetchPoolInfo}
          openSupplyModal={openSupplyModal}
        />
      )}
    </div>
  );
};
