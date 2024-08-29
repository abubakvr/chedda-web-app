"use client";
import React from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import { currentEnvironment } from "@/data/environments";
import {
  formatAsPercentage,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";

interface LockingInfoCardProps {
  lockingGaugeAddress: string | undefined;
  assetSymbol: string | undefined;
  totalWeightSum: bigint | undefined;
  totalWeight: bigint | undefined;
  totalAmountLocked: bigint | undefined;
}

export const LockingInfoCard = ({
  assetSymbol,
  lockingGaugeAddress,
  totalWeight,
  totalWeightSum,
  totalAmountLocked,
}: LockingInfoCardProps) => {
  const parsedTotalWeight = parseBigNumberToFloat(totalWeight);
  const parsedTotalAmountLocked = parseBigNumberToFloat(totalAmountLocked);
  const parsedTotalWeightSum = parseBigNumberToFloat(totalWeightSum);

  const weightPercentage = parsedTotalWeight / parsedTotalWeightSum;

  return (
    <div className="w-full">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 lg:px-8 h-10 lg:h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-[10px] lg:text-sm uppercase">
          LOCK INFO
        </div>
        <a
          href={`${currentEnvironment?.contractPrefix}/${lockingGaugeAddress}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-x-1 border-2 rounded-md py-1 px-2 md:py-[6px] md:px-3 border-[#ffffff60] hover:opacity-70"
          data-testid="gauge-link"
        >
          <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[8px] xl:text-[10px]">
            GUAGE CONTRACT
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
          <div className="tfont-bold">0.0% - 5.5%</div>
        </div>
        <div className="flex justify-between text-xs lg:text-sm pb-5">
          <div className="opacity-50 font-semibold">Total Locked</div>
          <div className="font-bold">
            {formatNumber(parsedTotalAmountLocked)} {assetSymbol}
          </div>
        </div>
        <div className="flex justify-between text-xs lg:text-sm pb-5">
          <div className="opacity-50 font-semibold">Weight</div>
          <div className="font-bold">{formatNumber(parsedTotalWeight)}</div>
        </div>
        <div className="flex justify-between text-xs lg:text-sm pb-5">
          <div className="opacity-50 font-semibold">Weight Percentage</div>
          <div className="font-bold">
            {formatAsPercentage(weightPercentage, 3)}
          </div>
        </div>
        <div className="flex justify-between text-xs lg:text-sm ">
          <div className="opacity-50 font-semibold">Max Slashing</div>
          <div className="font-bold">20%</div>
        </div>
      </div>
    </div>
  );
};
