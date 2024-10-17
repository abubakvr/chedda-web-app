"use client";
import React from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import {
  formatAsPercentage,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { currentEnvironment } from "@/data/environments";

interface StakingInfoCardProps {
  assetSymbol: string | undefined;
  assetDecimals: number | undefined;
  totalStaked: bigint | undefined;
  lpStakers: bigint | undefined;
  lpAssetValue: bigint | undefined;
  totalSupply: bigint | undefined;
  lpDecimals: number | undefined;
  lpSymbol: string | undefined;
  stakingPoolAddress: string | undefined;
}

export const StakingInfoCard = ({
  assetSymbol,
  assetDecimals,
  totalStaked,
  lpStakers,
  lpDecimals,
  lpSymbol,
  lpAssetValue,
  totalSupply,
  stakingPoolAddress,
}: StakingInfoCardProps) => {
  const parsedAssetValue = parseBigNumberToFloat(lpAssetValue, lpDecimals);
  const parsedTotalStaked = parseBigNumberToFloat(totalStaked, lpDecimals);
  const parsedTotalSupply = parseBigNumberToFloat(totalSupply, assetDecimals);
  const underlyingAssetAmount = parsedAssetValue * parsedTotalStaked;

  const percentageStaked = underlyingAssetAmount / parsedTotalSupply;

  return (
    <div className="w-full">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 lg:px-8 h-10 lg:h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-2xs lg:text-sm uppercase">
          STAKE INFO
        </div>
        <a
          href={`${currentEnvironment?.contractPrefix}/${stakingPoolAddress}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-x-1 border-2 rounded-md py-1 px-2 md:py-[6px] md:px-3 border-[#ffffff60] hover:opacity-70"
        >
          <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-3xs xl:text-2xs">
            Staking Pool
          </div>
          <Image
            style={{ color: "" }}
            src={LinkOut}
            alt="link out"
            className="w-2.5 h-2.5 xl:w-4 xl:h-4"
          />
        </a>
      </div>
      <div className="p-4 md:p-6 lg:p-8 text-white">
        <div className="flex justify-between text-xs lg:text-sm pb-5">
          <div className="opacity-50 font-semibold">Annual Percentage Rate</div>
          <div className="font-bold">5.52%</div>
        </div>
        <div className="flex justify-between text-xs lg:text-sm pb-5">
          <div className="opacity-50 font-semibold">Total Staked</div>
          <div className="font-bold">
            {formatNumber(parsedTotalStaked)} {lpSymbol}
          </div>
        </div>
        <div className="flex justify-between text-xs lg:text-sm pb-5">
          <div className="opacity-50 font-semibold">
            Underlying Asset Amount
          </div>
          <div className="font-bold">
            {formatNumber(underlyingAssetAmount)} {assetSymbol}
          </div>
        </div>
        <div className="flex justify-between text-xs lg:text-sm pb-5">
          <div className="opacity-50 font-semibold">
            Percentage of LP Staked
          </div>
          <div className="font-bold">
            {formatAsPercentage(percentageStaked)}
          </div>
        </div>
        <div className="flex justify-between text-xs lg:text-sm ">
          <div className="opacity-50 font-semibold">Stakers</div>
          <div className="font-bold">
            {parseBigNumberToFloat(lpStakers, 0, 0)}
          </div>
        </div>
      </div>
    </div>
  );
};
