import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/icon/arrow-right.svg";

interface TabInfoProps {
  lockTime: {
    value: number | undefined;
    days: number | undefined;
  };
  allowance: string;
  maturityDate: string;
  lockedAmount: string;
  projectedMaturityDate?: string;
  projectedLockAmount: string;
}

export const TabInfo: React.FC<TabInfoProps> = ({
  allowance,
  lockTime,
  maturityDate,
  lockedAmount,
  projectedLockAmount,
  projectedMaturityDate,
}: TabInfoProps) => (
  <div data-testid="lock-tab-info">
    <div className="flex justify-between text-sm pb-5">
      <div
        className="opacity-50 font-semibold flex gap-x-2"
        data-testid="allowance-label"
      >
        Allowance
      </div>
      <div
        className="flex items-center font-bold"
        data-testid="allowance-value"
      >
        {allowance}
      </div>
    </div>
    <div className="flex justify-between text-sm pb-5">
      <div
        className="opacity-50 font-semibold flex gap-x-2"
        data-testid="projected-maturity-label"
      >
        Maturity Date
      </div>
      <div
        className="flex items-center font-bold"
        data-testid="projected-maturity-value"
      >
        {lockTime.value !== undefined ? projectedMaturityDate : maturityDate}
      </div>
    </div>
    <div className="flex justify-between text-sm">
      <div className="opacity-50 font-semibold">Amount To Lock</div>
      <div className="flex space-x-2">
        <div className="font-bold">{lockedAmount}</div>
        <Image
          src={ArrowRight}
          alt="right arrow"
          className="flex self-center"
        />
        <div className="font-bold">{projectedLockAmount}</div>
      </div>
    </div>
  </div>
);
