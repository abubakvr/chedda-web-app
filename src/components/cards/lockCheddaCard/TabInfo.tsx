import React from "react";

interface TabInfoProps {
  allowance?: string;
  amountToLock?: string;
  maturityDate?: string;
  lockedAmount?: string;
  projectedMaturityDate?: string;
  isCheddaLocked?: boolean;
}

export const TabInfo: React.FC<TabInfoProps> = ({
  allowance,
  amountToLock,
  maturityDate,
  lockedAmount,
  projectedMaturityDate,
  isCheddaLocked,
}: TabInfoProps) =>
  !isCheddaLocked ? (
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
          data-testid="amount-to-lock-label"
        >
          Amount to Lock
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="amount-to-lock-value"
        >
          {amountToLock}
        </div>
      </div>
      <div className="flex justify-between text-sm">
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
          {projectedMaturityDate}
        </div>
      </div>
    </div>
  ) : (
    <div data-testid="lock-tab-info">
      <div className="flex justify-between text-sm pb-5">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="locked-amount-label"
        >
          Locked Amount
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="locked-amount-value"
        >
          {lockedAmount}
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="maturity-label"
        >
          Maturity Date
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="maturity-value"
        >
          {maturityDate}
        </div>
      </div>
    </div>
  );
