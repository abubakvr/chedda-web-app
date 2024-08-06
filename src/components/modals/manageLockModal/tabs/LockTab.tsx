import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import Image from "next/image";
import InfoIcon from "@/assets/icon/warning-icon.svg";
import { AmountField, Button } from "@/components/common";
import { formatLargeNumber } from "@/utils/formatters";
import { LOCKTIMES } from "@/utils/constants";
import { projectDateTime } from "@/utils/helpers";

type LockTimeState = { value: number | undefined; days: number | undefined };

interface LockTabProps {
  isExtendTab: boolean;
  title: string;
  cheddaSymbol: string | undefined;
  info: string;
  lockExpiry: Date;
  maxAmount: number;
  cheddaPrice: number | undefined;
  allowance: number;
  modalInfo: ReactElement<any, any>;
  amount: number;
  clearInputField: boolean;
  isTransactionLoading: boolean;
  lockTime: LockTimeState | undefined;
  buttonAction: () => void;
  setClearInputField: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number>>;
  setLockTime: Dispatch<SetStateAction<LockTimeState>>;
}

export const LockTab: FC<LockTabProps> = ({
  isExtendTab,
  title,
  info,
  amount,
  maxAmount,
  cheddaSymbol,
  cheddaPrice,
  modalInfo,
  allowance,
  isTransactionLoading,
  clearInputField,
  lockTime,
  lockExpiry,
  buttonAction,
  setClearInputField,
  setAmount,
  setLockTime,
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const buttonTitle =
    !isExtendTab && allowance < amount ? "Approve" : "Lock More Chedda";

  const maturityDate = lockExpiry.getTime();
  const projectedMaturityDate = projectDateTime(lockTime?.days || 0).getTime();

  const handleButtonAction = () => {
    if (isExtendTab && lockTime?.value === undefined) {
      setShowWarning(true);
      setWarningMessage("Select lock period before proceeding.");
      return;
    } else if (isExtendTab && projectedMaturityDate < maturityDate) {
      setShowWarning(true);
      setWarningMessage(
        "You can't extend the lock to a date earlier than your current expiry date."
      );
      return;
    } else {
      buttonAction();
    }
  };

  return (
    <div data-testid="lock-card-content" className="mt-2 md:mt-3">
      <div className="text-warning text-[10px] lg:text-sm flex gap-x-2 items-center">
        <Image
          src={InfoIcon}
          alt="info icon"
          className="w-[12px] h-[12px] md:w-[14px] md:h-[14px]"
        />
        <span>{info}</span>
      </div>
      <div className="text-xs lg:text-xl font-bold mt-3 md:mt-4 lg:mt-6">
        {title}
      </div>
      {isExtendTab ? (
        <>
          <div className="mt-3 md:mt-4 lg:mt-6 text-xs text-[#FFFFFF80]">
            Select Lock Period
          </div>
          <div className="flex space-between gap-x-2 mt-3 md:mt-4 lg:mt-5">
            {LOCKTIMES.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setLockTime({ value: item.value, days: item.duration });
                  setShowWarning(false);
                }}
                className={`bg-[#201D47] rounded-lg flex justify-center items-center w-full relative lock-time-box transition-all ${lockTime?.value === item.value ? "modal-button" : ""}`}
              >
                <div className="absolute -top-2 lg:-top-3 right-0">
                  <span className="multiplier-circle  bg-[#151532] text-white rounded-full w-4 h-4 lg:w-7 lg:h-7 text-[5px] lg:text-[8px] flex justify-center items-center">
                    {item.multiplier}x
                  </span>
                </div>
                <div className="text-white text-xs lg:text-sm py-3 font-bold">
                  {item.title}
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between mt-3 md:mt-4 lg:mt-6 items-center text-[10px] lg:text-xs">
            <div data-testid="amount-label" className="text-[#FFFFFF70]">
              Enter amount to Lock
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
            maxValue={maxAmount.toString()}
            assetPrice={cheddaPrice || 0}
          />
        </>
      )}
      <Button
        type="primary"
        onClick={() => handleButtonAction()}
        className="mt-3 md:mt-4 lg:mt-6 h-7"
        size="large"
        isLoading={isTransactionLoading}
      >
        {isExtendTab ? "Extend Lock" : buttonTitle}
      </Button>
      {showWarning && isExtendTab ? (
        <div className="text-error mt-2 text-[10px] md:text-xs">
          {warningMessage}
        </div>
      ) : null}
      <div data-testid="modal-info" className="mt-3 md:mt-4 lg:mt-6 pb-0 ">
        {modalInfo}
      </div>
    </div>
  );
};
