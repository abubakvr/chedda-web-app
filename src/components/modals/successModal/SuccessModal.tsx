import React from "react";
import SuccessIcon from "@/assets/icon/success-icon.svg";
import Image from "next/image";
import { Button } from "@/components/common/buttons/Button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalMessage: string;
  continueAction: () => void;
}

export const SuccessModal = ({
  onClose,
  isOpen,
  modalMessage,
  continueAction,
}: SuccessModalProps) => {
  return isOpen ? (
    <div
      data-testid="successModalContainer"
      className={`fixed inset-0 ${
        isOpen ? "block" : "hidden"
      } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="app-modal p-8 rounded shadow-lg w-[550px]">
          <div className="flex justify-end items-center">
            <span
              className="text-4xl cursor-pointer font-bold text-white relative"
              onClick={onClose}
              data-testid="close-success-modal"
            >
              &times;
            </span>
          </div>
          <div className="flex flex-col mt-6 rounded-lg justify-center items-center p-2">
            <Image
              src={SuccessIcon}
              alt="success"
              className="flex self-center"
            />
            <div
              data-testid="transactionCompletedText"
              className="text-3xl text-white mt-6 font-bold"
            >
              Transaction Completed
            </div>
            <div className="text-2xl text-[#FFFFFF50] mt-6 ">
              {modalMessage}
            </div>
            <div className="mt-10 text-lg text-[#FFFFFF50] justify-center text-center">
              Stake LP tokens, earn CHEDDA — secure rewards in a streamlined and
              rewarding staking venture.
            </div>
            <Button type="primary" size="large" className="mt-12">
              Stake LP Tokens
            </Button>
            <div className="mt-3 text-2xl text-white">or</div>
            <Button
              type="secondary"
              size="large"
              className="mt-3"
              onClick={continueAction}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
