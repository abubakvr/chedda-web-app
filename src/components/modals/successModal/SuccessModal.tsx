"use client";
import React from "react";
import SuccessIcon from "@/assets/icon/success-icon.svg";
import Image from "next/image";
import { Button } from "@/components/common";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalMessage: string;
  continueAction: () => void;
  stakeAction: () => void;
}

export const SuccessModal = ({
  onClose,
  isOpen,
  modalMessage,
  continueAction,
  stakeAction,
}: SuccessModalProps) => {
  return isOpen ? (
    <div
      data-testid="successModalContainer"
      className={`fixed inset-0 transition-all duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="app-modal p-4 md:p-6 lg:p-8 rounded shadow-lg  w-11/12 max-w-[380px] md:max-w-[450px] lg:max-w-[550px]">
          <div className="flex justify-end items-center">
            <button
              className="text-2xl md:text-3xl lg:text-4xl cursor-pointer font-bold text-white relative hover:opacity-85"
              onClick={onClose}
              data-testid="close-success-modal"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col mt-1 lg:mt- rounded-lg justify-center items-center p-2">
            <Image
              style={{ color: "" }}
              src={SuccessIcon}
              alt="success"
              className="flex self-center w-[56px] h-[56px] md:w-[72px] md:h-[72px] lg:w-[96px] lg:h-[96px]"
            />
            <div
              data-testid="transactionCompletedText"
              className="text-lg md:text-2xl lg:text-3xl text-white mt-3 md:mt-4 lg:mt-6 font-bold"
            >
              Transaction Completed
            </div>
            <div className="text-xs text-center md:text-lg lg:text-2xl text-mist mt-4 md:mt-6 lg:mt-8">
              {modalMessage}
            </div>
            <div className="mt-6 md:mt-9 lg:mt-10 text-2xs md:text-xs lg:text-lg text-mist justify-center text-center">
              Stake LP tokens, earn CHEDDA — secure rewards in a streamlined and
              rewarding staking venture.
            </div>
            <Button
              type="primary"
              size="large"
              className="mt-6 md:mt-10 lg:mt-12"
              onClick={() => {
                stakeAction();
                onClose();
              }}
            >
              Stake LP Tokens
            </Button>
            <div className="my-1 md:my-3 text-2xl text-white">or</div>
            <Button
              type="secondary"
              size="large"
              onClick={continueAction}
              className="mt-1"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
