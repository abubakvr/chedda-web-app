import React from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import {
  formatAsPercentage,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";

import { useGaugeAddress } from "@/hooks";
import { currentEnvironment } from "@/data/environments";

interface LockingInfoCardProps {
  assetSymbol: string | undefined;
  totalWeightSum: bigint | undefined;
  totalWeight: bigint | undefined;
  totalAmountLocked: bigint | undefined;
}

export const LockingInfoCard = ({
  assetSymbol,
  totalWeight,
  totalWeightSum,
  totalAmountLocked,
}: LockingInfoCardProps) => {
  const { data: lockingGaugeAddress } = useGaugeAddress();

  const parsedTotalWeight = parseBigNumberToFloat(totalWeight);
  const parsedTotalAmountLocked = parseBigNumberToFloat(totalAmountLocked);
  const parsedTotalWeightSum = parseBigNumberToFloat(totalWeightSum);

  const weightPercentage = parsedTotalWeight / parsedTotalWeightSum;

  return (
    <div className="w-full">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          LOCK INFORMATION
        </div>
        <a
          href={`${currentEnvironment?.contractPrefix}/${lockingGaugeAddress}`}
          target="_blank"
          rel="noreferrer"
          className="flex gap-x-1 border-2 rounded-md py-[6px] px-3 border-[#ffffff60] hover:opacity-70"
        >
          <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[10px]">
            GUAGE CONTRACT
          </div>
          <Image src={LinkOut} alt="link out" />
        </a>
      </div>
      <div className="p-8 pb-0 text-white">
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">Annual Percentage Rate</div>
          <div className="text-sm font-bold">0.0% - 5.5%</div>
        </div>
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">Total Locked</div>
          <div className="font-bold">
            {formatNumber(parsedTotalAmountLocked)} {assetSymbol}
          </div>
        </div>
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">Weight</div>
          <div className="font-bold">{formatNumber(parsedTotalWeight)}</div>
        </div>
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">Weight Percentage</div>
          <div className="font-bold">
            {formatAsPercentage(weightPercentage, 3)}
          </div>
        </div>
        <div className="flex justify-between text-sm ">
          <div className="opacity-50 font-semibold">Max Slashing</div>
          <div className="font-bold">20%</div>
        </div>
      </div>
    </div>
  );
};
