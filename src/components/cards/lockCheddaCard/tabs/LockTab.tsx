import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import { AmountField, Button } from "@/components/common";
import { formatCurrency, formatLargeNumber } from "@/utils/formatters";
import { LOCKTIMES } from "@/utils/constants";

type LockTimeState = { value: number | undefined; days: number | undefined };

interface LockTabProps {
  title: string;
  maxAmount: string;
  cheddaSymbol: string | undefined;
  subTitle: string;
  cheddaPrice: number;
  allowance: string | number;
  modalInfo: ReactElement<any, any>;
  amount: number;
  clearInputField: boolean;
  isTransactionLoading: boolean;
  lockTime: number | undefined;
  lockedChedda: string | undefined;
  buttonAction: () => void;
  setClearInputField: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number>>;
  setLockTime: Dispatch<SetStateAction<LockTimeState>>;
}

export const LockTab: FC<LockTabProps> = ({
  title,
  maxAmount,
  cheddaSymbol,
  cheddaPrice,
  modalInfo,
  allowance,
  isTransactionLoading,
  clearInputField,
  subTitle,
  amount,
  lockTime,
  lockedChedda,
  buttonAction,
  setClearInputField,
  setAmount,
  setLockTime,
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const buttonTitle =
    parseFloat(allowance.toString()) < amount ? "Approve" : "Lock";

  const isCheddaLocked = Number(lockedChedda) > 0;

  const handleLockChedda = () => {
    if (lockTime === undefined) {
      setShowWarning(true);
      return;
    } else {
      buttonAction();
    }
  };

  return (
    <div data-testid="lock-card-content" className="mt-6">
      <div className="text-xl font-bold">{title} your CHEDDA</div>
      <div className="text-[#FFFFFF50] text-sm mt-2">{subTitle}</div>
      {!isCheddaLocked ? (
        <>
          <div className="flex justify-between mt-6 items-center text-xs">
            <div data-testid="amount-label" className="text-[#DEDEDE]">
              Enter amount to {title}
            </div>
            <div data-testid="max-amount" className="font-bold">
              Max: {`${formatLargeNumber(maxAmount)} ${cheddaSymbol}`}
            </div>
          </div>
          <AmountField
            onChange={(value) => {
              setAmount(parseFloat(value));
            }}
            clearInputField={clearInputField}
            setClearInputField={setClearInputField}
            maxValue={maxAmount}
            assetPrice={cheddaPrice}
          />
          <div className="mt-6 text-xs text-[#FFFFFF80]">
            Select Lock Period
          </div>

          <div className="flex space-between gap-x-2 mt-5">
            {LOCKTIMES.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setLockTime({ value: item.value, days: item.duration });
                  setShowWarning(false);
                }}
                className={`bg-[#201D47] rounded-lg flex justify-center items-center w-full relative lock-time-box transition-all ${lockTime === item.value ? "modal-button" : ""}`}
              >
                <div className="absolute -top-3 right-0">
                  <span className="multiplier-circle  bg-[#151532] text-white rounded-full w-7 h-7 text-[8px] flex justify-center items-center">
                    {item.multiplier}x
                  </span>
                </div>
                <div className="text-white text-sm py-3 font-bold">
                  {item.duration} days
                </div>
              </button>
            ))}
          </div>
          <Button
            type="primary"
            onClick={() => handleLockChedda()}
            className="mt-6 h-7"
            size="large"
            isLoading={isTransactionLoading}
          >
            {buttonTitle}
          </Button>
          {showWarning ? (
            <div className="text-error mt-2 text-xs">
              Select lock period before proceeding.
            </div>
          ) : (
            <div className="text-warning mt-2 text-xs">
              Note: You can&apos;t withdraw your locked assets till the end
              date.
            </div>
          )}
          <div data-testid="modal-info" className="mt-6 pb-0 ">
            {modalInfo}
          </div>
        </>
      ) : (
        <div className="mt-6 text-5xl text-white relative">
          <div className="text-xl text-white  border-[#ffffff19] bg-[#ffffff02] border rounded-lg p-3">
            <div className="text-sm font-bold text-[#ffffff70]">
              Locked Assets
            </div>
            <div
              className="mt-2 text-2xl card-gradient-text font-bold"
              data-testid="locked-chedda-asset"
            >
              {lockedChedda} CHEDDA
            </div>
            <div
              className="text-xs  text-[#ffffff70] mt-2"
              data-testid="locked-chedda-price"
            >
              {formatCurrency(cheddaPrice * Number(lockedChedda))}
            </div>
          </div>
          <div data-testid="modal-info" className="mt-6 pb-0 ">
            {modalInfo}
          </div>
          <div className="text-xs text-[#ffffff70] flex gap-x-1 mt-6 justify-between items-center">
            Extend or add more assets to your locked assets
            <button
              onClick={() => {}}
              className="button-gradient-text px-3 font-bold py-3 border border-[#ffffff19] rounded  hover:opacity-80 relative"
            >
              MANAGE LOCK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
