import React, { useState } from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import { IAccountInfo } from "chedda-sdk";
import { useTokenBalance } from "@/hooks";
import { formatLargeNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { IPoolStatsResponse, IToken } from "@/utils/types";
import { InfoCardSkeleton } from "@/components/ui";
import { BorrowModal, SupplyModal } from "@/components/modals";
import { BigNumber } from "ethers";

interface MyInformationCardProps {
  poolStats: IPoolStatsResponse | undefined;
  accountInfo: IAccountInfo | undefined;
  available: BigNumber | undefined;
  isLoading: boolean;
  assetPrice: number;
  fetchAccountInfo: (showLoading?: false) => void;
}

export const MyInformationCard: React.FC<MyInformationCardProps> = ({
  poolStats,
  accountInfo,
  isLoading,
  assetPrice,
  available,
  fetchAccountInfo,
}) => {
  const { data: tokenBalance } = useTokenBalance(
    poolStats?.asset.address ?? ""
  );
  const [isSupplyModalOpen, setIsSupplyModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const closeSupplyModal = () => {
    setIsSupplyModalOpen(false);
  };

  const closeBorrowModal = () => {
    setIsBorrowModalOpen(false);
  };

  if (isLoading || !poolStats) {
    // Render loading placeholder if poolStats is undefined
    return <InfoCardSkeleton title="MY INFORMATION" itemCount={5} />;
  }

  return (
    <div
      className="flex flex-col justify-between"
      data-testid="my-information-card"
    >
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          My Information
        </div>
        <button className="flex gap-x-1 border-2 rounded-md py-[6px] px-3 border-[#ffffff60] hover:opacity-70">
          <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[10px]">
            Vault Contract
          </div>
          <Image src={LinkOut} alt="link out" />
        </button>
      </div>

      <div className="flex justify-between items-center p-8 border-b border-gray-500">
        <div className="h-fit">
          <div className="flex">
            {poolStats?.collaterals.map((collateral: IToken, i) => (
              <div key={i} className="logo-cascade round-image">
                <Image
                  src={collateral.logo}
                  className="cascade-img h-10 w-10 round-image"
                  alt={collateral.symbol}
                  data-testid="collateral-logo"
                />
              </div>
            ))}
          </div>
          <div
            className={`w-40 mt-2 font-bold flex flex-wrap m-0 gap-x-1 text-ellipsis overflow-hidden`}
            data-testid="collaterals-list"
          >
            {poolStats?.collaterals.map((collateral, i) => (
              <div
                className=" flex justify-start items-start text-ellipsis text-white text-lg font-bold"
                key={i}
              >
                {collateral.symbol}
                {i !== poolStats?.collaterals.length - 1 && <span>,</span>}
              </div>
            ))}
          </div>
        </div>
        <button
          className="secondary-button manage-gradient-text flex gap-x-1 h-10 items-center text-white text-opacity-100-2 uppercase font-bold text-xs py-[5px] px-4 hover:opacity-80"
          onClick={() => {}}
        >
          Manage Collateral
        </button>
      </div>

      <div className="p-8 pb-0">
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">Available to Supply</div>
          <div className="text-sm font-bold">
            {`${formatLargeNumber(
              parseBigNumberToFloat(tokenBalance, accountInfo?.decimals)
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
            {`${formatLargeNumber(
              parseBigNumberToFloat(
                accountInfo?.borrowed,
                accountInfo?.decimals
              )
            )} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between text-sm ">
          <div className="opacity-50 font-semibold">Health Factor</div>
          <div className="font-bold">
            {parseBigNumberToFloat(accountInfo?.healthFactor)}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8 space-y-5">
        <button
          className="primary-button text-center h-11 items-center rounded-lg text-white text-opacity-100-2 uppercase font-bold text-lg hover:opacity-80"
          onClick={() => setIsSupplyModalOpen(true)}
        >
          Supply
        </button>
        <button
          className="secondary-button button-gradient-text text-center h-11 items-center text-white text-opacity-100-2 uppercase font-bold text-lg hover:opacity-80"
          onClick={() => setIsBorrowModalOpen(true)}
        >
          Borrow
        </button>
      </div>
      {isSupplyModalOpen && (
        <SupplyModal
          isOpen={isSupplyModalOpen}
          onClose={closeSupplyModal}
          asset={poolStats?.asset}
          assetPrice={assetPrice}
          supplied={accountInfo?.supplied}
          available={available}
          tokenBalance={tokenBalance}
          baseSupplyAPY={poolStats.baseBorrowAPY}
          fetchAccountInfo={fetchAccountInfo}
        />
      )}
      {isBorrowModalOpen && (
        <BorrowModal
          isOpen={isBorrowModalOpen}
          onClose={closeBorrowModal}
          asset={poolStats?.asset}
          assetPrice={assetPrice}
          supplied={accountInfo?.supplied}
          available={available}
          tokenBalance={tokenBalance}
          baseSupplyAPY={poolStats.baseBorrowAPY}
          fetchAccountInfo={fetchAccountInfo}
        />
      )}
    </div>
  );
};
