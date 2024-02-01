import React, { FC, useState } from "react";
import { BigNumber } from "ethers";
import { IToken } from "@/utils/types";
import { SuccessModal } from "@/components/modals";
import { Toast } from "@/components/ui";
import { DepositTab } from "./DepositTab";

interface BorrowModalProps {
  collaterals: IToken[];
  asset: IToken;
  assetPrice: number;
  isOpen: boolean;
  tokenBalance: BigNumber | undefined;
  baseSupplyAPY: string | number;
  supplied: BigNumber | undefined;
  available: BigNumber | undefined;
  onClose: () => void;
  fetchAccountInfo: () => void;
}

const Tab: FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  testId: string;
}> = ({ label, isActive, onClick, testId }) => (
  <button
    data-testid={testId}
    className={`text-sm font-bold px-4 py-2 focus:outline-none relative w-full hover:bg-[#4c37a740] ${
      isActive && "modal-button rounded"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const BorrowModal: FC<BorrowModalProps> = ({
  isOpen,
  onClose,
  collaterals,
}) => {
  const [activeTab, setActiveTab] = useState("Deposit");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedCollateral, setSelectedCollateral] = useState<IToken>(
    collaterals[0]
  );

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
    onClose();
  };

  return (
    <>
      {openSuccessModal && (
        <SuccessModal
          onClose={closeSuccessModal}
          isOpen={openSuccessModal}
          modalMessage={""}
          continueAction={() => setOpenSuccessModal(false)}
        />
      )}
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        toastMessage={""}
        duration={10000}
      />
      <div
        data-testid="modal-container"
        className={`fixed inset-0 ${
          isOpen && !openSuccessModal ? "block" : "hidden"
        } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="app-modal p-8 rounded shadow-lg w-[550px]">
            <div className="flex justify-between items-center">
              <h2
                className="text-3xl font-bold"
                data-testid="supply-modal-title"
              >
                Borrow Asset
              </h2>
              <span
                className="text-4xl cursor-pointer font-bold text-white relative"
                onClick={onClose}
              >
                &times;
              </span>
            </div>
            <div className="flex mt-6 bg-[#201D47] rounded-lg justify-between p-2">
              <Tab
                label="Deposit"
                isActive={activeTab === "Deposit"}
                onClick={() => {
                  setActiveTab("Deposit");
                }}
                testId="deposit-tab"
              />
              <Tab
                label="Borrow"
                isActive={activeTab === "Withdraw"}
                onClick={() => {
                  setActiveTab("Withdraw");
                }}
                testId="withdraw-tab"
              />
              <Tab
                label="Withdraw"
                isActive={activeTab === "Withdraw"}
                onClick={() => {
                  setActiveTab("Withdraw");
                }}
                testId="withdraw-tab"
              />
              <Tab
                label="Repay"
                isActive={activeTab === "Withdraw"}
                onClick={() => {
                  setActiveTab("Withdraw");
                }}
                testId="withdraw-tab"
              />
            </div>
            {activeTab === "Deposit" && (
              <DepositTab
                collaterals={collaterals}
                selectedCollateral={selectedCollateral}
                setSelectedCollateral={setSelectedCollateral}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
