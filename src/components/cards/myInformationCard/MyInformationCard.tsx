import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import { IAccountInfo } from "chedda-sdk";
import { formatLargeNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { IPoolStatsResponse } from "@/utils/types";
import { InfoCardSkeleton } from "@/components/ui";
import { BorrowModal, SupplyModal } from "@/components/modals";

import { Button } from "@/components/common";
import { currentEnvironment } from "@/data/environments";

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
    return <InfoCardSkeleton title="MY INFORMATION" itemCount={5} />;
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
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          My Information
        </div>
        <a
          href={`${currentEnvironment?.contractPrefix}/${poolStats?.pool}`}
          target="_blank"
          rel="noreferrer"
          className="flex gap-x-1 border-2 rounded-md py-[6px] px-3 border-[#ffffff60] hover:opacity-70"
        >
          <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[10px]">
            Vault Contract
          </div>
          <Image src={LinkOut} alt="link out" />
        </a>
      </div>
      <div className="p-8 pb-0">
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">Available to Supply</div>
          <div className="text-sm font-bold">
            {`${formatLargeNumber(
              parseBigNumberToFloat(
                accountInfo?.walletAssetBalance,
                accountInfo?.decimals
              )
            )} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between text-sm pb-5">
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
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">Total Borrowed</div>
          <div className="font-bold">
            {`${formatLargeNumber(totalBorrowed)} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between text-sm ">
          <div className="opacity-50 font-semibold">Health Factor</div>
          <div className="font-bold">
            {parseBigNumberToFloat(accountInfo?.healthFactor)}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8 gap-y-6">
        <Button
          onClick={() => setIsSupplyModalOpen(true)}
          type="primary"
          size="small"
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
