import React, { FC, useCallback, useState } from "react";
import { IToken } from "@/utils/types";
import { DepositTab, WithdrawTab, BorrowTab, RepayTab } from "./Tabs";
import {
  useAccountCollateral,
  useAccountHealth,
  useAllowance,
  useAvailableLiquidity,
  useSelectTokenBalance,
  useTokenCollateralValue,
  useTokenValue,
} from "@/hooks";

export interface BorrowModalProps {
  asset: IToken;
  isOpen: boolean;
  collaterals: IToken[];
  assetPrice: number;
  totalBorrowed: number;
  totalCollateralValue: number;
  availableLiquidity: bigint | undefined;
  onClose: () => void;
  fetchPoolInfo: () => void;
  openSupplyModal: (activeTab: "Deposit" | "Withdraw") => void;
}

const Tab: FC<{
  label: string;
  isActive: boolean;
  testId: string;
  onClick: () => void;
}> = ({ label, isActive, onClick, testId }) => (
  <button
    data-testid={testId}
    className={`text-[10px] md:text-xs lg:text-sm px-4 py-2 focus:outline-none font-bold relative w-full hover:bg-[#4c37a740] ${
      isActive && "modal-button rounded"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const BorrowModal: FC<BorrowModalProps> = ({
  isOpen,
  asset,
  collaterals,
  assetPrice,
  totalBorrowed,
  totalCollateralValue,
  availableLiquidity,
  onClose,
  fetchPoolInfo,
  openSupplyModal,
}) => {
  const [activeTab, setActiveTab] = useState<
    "Deposit" | "Withdraw" | "Repay" | "Borrow"
  >("Deposit");
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
  const { fetchData: fetchAvailable } = useAvailableLiquidity();

  const isLoading = {
    allowanceLoading,
    accountCollateralLoading,
    tokenBalanceLoading,
    healthFactorLoading,
  };

  const refreshModal = useCallback(() => {
    fetchAllowance();
    fetchAccountCollateral();
    fetchHealthFactor();
    fetchTokenBalance();
    fetchAvailable();
    fetchPoolInfo();
  }, [
    fetchAllowance,
    fetchAccountCollateral,
    fetchHealthFactor,
    fetchTokenBalance,
    fetchPoolInfo,
    fetchAvailable,
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
          <div className="app-modal p-4 md:p-6 lg:p-8 rounded shadow-lg w-11/12 max-w-[370px] sm:max-w-[400px] md:max-w-[470px] lg:max-w-[550px]">
            <div className="flex justify-between items-center">
              <h2
                className="text-lg md:text-2xl lg:text-3xl font-bold"
                data-testid="supply-modal-title"
              >
                Borrow Asset
              </h2>
              <button
                className="text-2xl md:text-3xl lg:text-4xl cursor-pointer font-bold text-white relative"
                onClick={() => {
                  onClose();
                  setSelectedCollateral(collaterals[0]);
                }}
              >
                &times;
              </button>
            </div>
            <div className="flex mt-3 md:mt-4 lg:mt-6 bg-[#201D47] rounded-lg justify-between p-2">
              <Tab
                label="Deposit"
                isActive={activeTab === "Deposit"}
                onClick={() => {
                  setActiveTab("Deposit");
                  setSelectedCollateral(collaterals[0]);
                  fetchAllowance(true);
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
                  setSelectedCollateral(collaterals[0]);
                }}
                testId="withdraw-tab"
              />
              <Tab
                label="Repay"
                isActive={activeTab === "Repay"}
                onClick={() => {
                  setActiveTab("Repay");
                  setSelectedCollateral(collaterals[0]);
                  fetchAllowance(true);
                }}
                testId="repay-tab"
              />
            </div>
            {activeTab === "Deposit" && (
              <DepositTab
                asset={asset}
                openSupplyModal={openSupplyModal}
                collaterals={collaterals}
                selectedCollateral={selectedCollateral}
                setSelectedCollateral={setSelectedCollateral}
                isLoading={isLoading}
                allowance={allowance}
                accountCollateralAmount={accountCollateral}
                totalCollateralValue={totalCollateralValue}
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
            {activeTab === "Withdraw" && (
              <WithdrawTab
                asset={asset}
                openSupplyModal={openSupplyModal}
                collaterals={collaterals}
                selectedCollateral={selectedCollateral}
                setSelectedCollateral={setSelectedCollateral}
                isLoading={isLoading}
                accountCollateralAmount={accountCollateral}
                totalCollateralValue={totalCollateralValue}
                healthFactor={healthFactor}
                tokenValue={tokenValue}
                assetPrice={assetPrice}
                refreshModal={refreshModal}
                fetchAllowance={fetchAllowance}
                totalBorrowed={totalBorrowed}
                tokenCollateralValue={tokenCollateralValue}
              />
            )}
            {activeTab === "Borrow" && (
              <BorrowTab
                asset={asset}
                isLoading={isLoading}
                accountCollateralAmount={accountCollateral}
                totalCollateralValue={totalCollateralValue}
                healthFactor={healthFactor}
                tokenValue={tokenValue}
                assetPrice={assetPrice}
                refreshModal={refreshModal}
                fetchAllowance={fetchAllowance}
                availableLiquidity={availableLiquidity}
                totalBorrowed={totalBorrowed}
                tokenCollateralValue={tokenCollateralValue}
              />
            )}
            {activeTab === "Repay" && (
              <RepayTab
                asset={asset}
                isLoading={isLoading}
                allowance={allowance}
                accountCollateralAmount={accountCollateral}
                totalCollateralValue={totalCollateralValue}
                tokenBalance={tokenBalance}
                healthFactor={healthFactor}
                tokenValue={tokenValue}
                assetPrice={assetPrice}
                refreshModal={refreshModal}
                fetchAllowance={fetchAllowance}
                availableLiquidity={availableLiquidity}
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
