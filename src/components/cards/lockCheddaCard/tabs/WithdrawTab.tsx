import React, { FC, ReactElement, useState } from "react";
import { Button } from "@/components/common";
import { formatCurrency } from "@/utils/formatters";

interface LockTabProps {
  title: string;
  cheddaSymbol: string | undefined;
  cheddaPrice: number;
  subTitle: string;
  modalInfo: ReactElement<any, any>;
  isTransactionLoading: boolean;
  lockedChedda: number | undefined;
  cheddaExpiry: Date;
  withdrawChedda: () => void;
  relockChedda: (isRelockChedda: boolean) => void;
}

export const WithdrawTab: FC<LockTabProps> = ({
  title,
  cheddaSymbol,
  cheddaPrice,
  modalInfo,
  isTransactionLoading,
  subTitle,
  lockedChedda,
  cheddaExpiry,
  withdrawChedda,
  relockChedda,
}) => {
  const [isWithdrawClicked, setIsWithdrawCliked] = useState(false);

  const currentDate = Date.now();
  const cheddaExpiryTimestamp = cheddaExpiry.getTime();

  const isLockedExpired = currentDate > cheddaExpiryTimestamp;

  return (
    <div data-testid="lock-card-content" className="mt-4 lg:mt-6">
      <div className="text-lg lg:text-2xl font-bold">{title} your CHEDDA</div>
      <div className="text-mist text-xs lg:text-sm mt-2">{subTitle}</div>

      <div className="mt-6 text-5xl text-white relative">
        <div className="text-xl text-white  border-frost bg-glass border rounded-lg p-3">
          <div className="text-xs lg:text-sm font-bold text-mist">
            Available Asset to withdraw
          </div>
          <div
            className="mt-2 text-lg lg:text-2xl card-gradient-text font-bold"
            data-testid="locked-chedda-asset"
          >
            {lockedChedda} {cheddaSymbol}
          </div>
          <div
            className="text-xs text-mist lg:mt-2"
            data-testid="locked-chedda-price"
          >
            {formatCurrency(cheddaPrice * (lockedChedda || 0))}
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setIsWithdrawCliked(true);
            withdrawChedda();
          }}
          className="mt-4 lg:mt-6 h-7"
          size="large"
          isLoading={isWithdrawClicked && isTransactionLoading}
          disabled={!isLockedExpired || !lockedChedda}
        >
          WITHDRAW
        </Button>
        <div className="uppercase text-sm text-mist my-1 lg:my-2 text-center">
          Or
        </div>
        <Button
          type="secondary"
          onClick={() => {
            setIsWithdrawCliked(false);
            relockChedda(true);
          }}
          className="h-7"
          disabled={!isLockedExpired || !lockedChedda}
          isLoading={!isWithdrawClicked && isTransactionLoading}
          size="large"
        >
          RELOCK
        </Button>
        <div className="text-warning mt-2 text-xs">
          Note: You can&apos;t withdraw your locked assets till the end date.
        </div>
        <div data-testid="modal-info" className="mt-6 pb-0 ">
          {modalInfo}
        </div>
      </div>
    </div>
  );
};
