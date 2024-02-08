import React, { FC, useCallback, useState } from "react";
import { IToken } from "@/utils/types";
import { DepositTab } from "./DepositTab";
import {
  useAccountCollateral,
  useAccountHealth,
  useAllowance,
  useSelectTokenBalance,
  useTokenCollateralValue,
  useTokenValue,
} from "@/hooks";

export interface BorrowModalProps {
  isOpen: boolean;
  collaterals: IToken[];
  assetPrice: number;
  totalBorrowed: string;
  onClose: () => void;
  fetchAccountInfo: (showLoading?: boolean) => void;
}

const Tab: FC<{
  label: string;
  isActive: boolean;
  testId: string;
  onClick: () => void;
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
  collaterals,
  assetPrice,
  totalBorrowed,
  onClose,
  fetchAccountInfo,
}) => {
  const [activeTab, setActiveTab] = useState("Deposit");
  const [selectedCollateral, setSelectedCollateral] = useState<IToken>(
    collaterals[0]
  );
  const { address: tokenAddress, decimals } = selectedCollateral;
  const {
    isLoading: allowanceLoading,
    data: allowance,
    fetchData: fetchAllowance,
  } = useAllowance(tokenAddress);
  const {
    isLoading: accountCollateralLoading,
    data: accountCollateral,
    fetchData: fetchAccountCollateral,
  } = useAccountCollateral(tokenAddress);
  const {
    isLoading: tokenBalanceLoading,
    data: tokenBalance,
    fetchData: fetchTokenBalance,
  } = useSelectTokenBalance(tokenAddress);
  const {
    isLoading: healthFactorLoading,
    data: healthFactor,
    fetchData: fetchHealthFactor,
  } = useAccountHealth();
  const { data: tokenValue } = useTokenValue(tokenAddress);
  const { data: tokenCollateralValue } = useTokenCollateralValue(
    tokenAddress,
    decimals
  );

  const isLoading = {
    allowanceLoading,
    accountCollateralLoading,
    tokenBalanceLoading,
    healthFactorLoading,
  };

  const refreshModal = useCallback(() => {
    fetchAllowance(false);
    fetchAccountCollateral(false);
    fetchHealthFactor(false);
    fetchTokenBalance(false);
    fetchAccountInfo(false);
  }, [
    fetchAllowance,
    fetchAccountCollateral,
    fetchHealthFactor,
    fetchTokenBalance,
    fetchAccountInfo,
  ]);

  return (
    <>
      <div
        data-testid="modal-container"
        className={`fixed inset-0 ${
          isOpen ? "block overflow-hidden" : "hidden"
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
                isActive={activeTab === "Borrow"}
                onClick={() => {
                  setActiveTab("Borrow");
                }}
                testId="borrow-tab"
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
                isActive={activeTab === "Repay"}
                onClick={() => {
                  setActiveTab("Repay");
                }}
                testId="repay-tab"
              />
            </div>
            {activeTab === "Deposit" && (
              <DepositTab
                collaterals={collaterals}
                selectedCollateral={selectedCollateral}
                setSelectedCollateral={setSelectedCollateral}
                isLoading={isLoading}
                allowance={allowance}
                accountCollateral={accountCollateral}
                tokenBalance={tokenBalance}
                healthFactor={healthFactor}
                tokenValue={tokenValue}
                assetPrice={assetPrice}
                refreshModal={refreshModal}
                fetchAllowance={fetchAllowance}
                totalBorrowed={totalBorrowed}
                tokenCollateralValue={tokenCollateralValue}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
