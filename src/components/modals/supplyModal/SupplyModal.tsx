import React, { FC, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useAllowance, useAssetBalance, useTransaction } from "@/hooks";
import {
  formatAsPercentage,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IToken } from "@/utils/types";
import { SuccessModal } from "@/components/modals";
import { SupplyModalContent } from "@/components/common";
import { SupplyTabInfo, WithdrawTabInfo } from "./TabInfo";

interface SupplyModalProps {
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

const Tab: FC<{ label: string; isActive: boolean; onClick: () => void }> = ({
  label,
  isActive,
  onClick,
}) => (
  <button
    className={`text-sm font-bold px-4 py-2 focus:outline-none relative w-full hover:bg-[#4c37a740] ${
      isActive && "modal-button rounded"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const SupplyModal: FC<SupplyModalProps> = ({
  asset,
  assetPrice,
  tokenBalance,
  isOpen,
  supplied,
  available,
  baseSupplyAPY,
  onClose,
  fetchAccountInfo,
}) => {
  const [activeTab, setActiveTab] = useState("Deposit");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [clearInputField, setClearInputField] = useState(false);
  const [supplyAmount, setSupplyAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [modalMessage, setModalMessage] = useState<string>("");
  const { data: allowance, fetchData: fetchAllowance } = useAllowance(
    asset.address
  );
  const { data: assetBalance } = useAssetBalance(asset.address);
  const { isLoading, approveAsset, depositAsset, withdrawAsset } =
    useTransaction(asset.address);

  const parsedAllowance = parseFloat(
    parseBigNumberToFloat(allowance, asset.decimals)
  );
  const parsedSupplied = parseFloat(
    parseBigNumberToFloat(supplied, asset.decimals)
  );

  const parsedAssetBalance = parseBigNumberToFloat(
    assetBalance,
    asset.decimals
  );
  const parsedMaxAmount = parseBigNumberToFloat(tokenBalance, asset.decimals);
  const parsedAvailableLiquidity = parseFloat(
    parseBigNumberToFloat(available, asset.decimals)
  );
  const maxWithdrawAmount = Math.min(
    parseFloat(parsedAssetBalance),
    parsedAvailableLiquidity
  );

  const handleDeposit = async (useAsCollateral: boolean) => {
    try {
      if (!supplyAmount || supplyAmount > parseFloat(parsedMaxAmount)) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.utils.parseUnits(
        supplyAmount.toString(),
        asset.decimals
      );

      if (supplyAmount <= parsedAllowance) {
        depositAsset(parsedAmount, useAsCollateral)
          .then(() => {
            const modalMessage = `You supplied ${supplyAmount} ${asset.symbol}`;
            setModalMessage(modalMessage);
            setClearInputField(true);
            setOpenSuccessModal(true);
          })
          .catch((res) => {
            console.log(res);
          });
      } else {
        await approveAsset(parsedAmount);
        fetchAllowance();
      }
    } catch (error: any) {
      throw Error("Error handling deposit:", error);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || withdrawAmount > parsedSupplied) {
      return alert("Enter valid amount");
    }
    const parsedAmount = ethers.utils.parseUnits(
      withdrawAmount.toString(),
      asset.decimals
    );
    withdrawAsset(parsedAmount)
      .then(() => {
        const modalMessage = `You withdrew ${withdrawAmount} ${asset.symbol}`;
        setModalMessage(modalMessage);
        setClearInputField(true);
        setOpenSuccessModal(true);
      })
      .catch((res) => {
        console.log(res);
      });
  };

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
          modalMessage={modalMessage}
          continueAction={() => setOpenSuccessModal(false)}
        />
      )}

      <div
        className={`fixed inset-0 ${
          isOpen && !openSuccessModal ? "block" : "hidden"
        } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="app-modal p-8 rounded shadow-lg w-[550px]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Supply Asset</h2>
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
                  setSupplyAmount(0);
                }}
              />
              <Tab
                label="Withdraw"
                isActive={activeTab === "Withdraw"}
                onClick={() => {
                  setActiveTab("Withdraw");
                  setWithdrawAmount(0);
                }}
              />
            </div>
            {activeTab === "Deposit" && (
              <SupplyModalContent
                title="Deposit"
                maxAmount={parsedMaxAmount}
                asset={asset}
                assetPrice={assetPrice}
                setClearInputField={setClearInputField}
                clearInputField={clearInputField}
                allowance={parsedAllowance}
                modalInfo={
                  <SupplyTabInfo
                    supplied={`${formatNumber(parsedSupplied)} ${asset.symbol}`}
                    projectedSupply={
                      supplyAmount
                        ? `${formatNumber(parsedSupplied + supplyAmount)} ${
                            asset.symbol
                          }`
                        : `${formatNumber(parsedSupplied)} ${asset.symbol}`
                    }
                    allowance={`${formatNumber(parsedAllowance)} ${
                      asset.symbol
                    }`}
                    baseSupplyAPY={formatAsPercentage(baseSupplyAPY)}
                  />
                }
                buttonAction={handleDeposit}
                isTransactionLoading={isLoading}
                setAmount={setSupplyAmount}
                amount={supplyAmount}
              />
            )}
            {activeTab === "Withdraw" && (
              <SupplyModalContent
                title="Withdraw"
                asset={asset}
                assetPrice={assetPrice}
                allowance={parsedAllowance}
                modalInfo={
                  <WithdrawTabInfo
                    supplied={`${formatNumber(parsedSupplied)} ${asset.symbol}`}
                    baseSupplyAPY={formatAsPercentage(baseSupplyAPY)}
                    projectedSupply={
                      withdrawAmount
                        ? `${formatNumber(parsedSupplied - withdrawAmount)} ${
                            asset.symbol
                          }`
                        : `${formatNumber(parsedSupplied)} ${asset.symbol}`
                    }
                    liquidity={`${formatNumber(parsedAvailableLiquidity)} ${
                      asset.symbol
                    }`}
                    projectedLiquidity={
                      withdrawAmount
                        ? `${formatNumber(
                            parsedAvailableLiquidity - withdrawAmount
                          )} ${asset.symbol}`
                        : `${formatNumber(parsedAvailableLiquidity)} ${
                            asset.symbol
                          }`
                    }
                  />
                }
                maxAmount={maxWithdrawAmount.toString()}
                setClearInputField={setClearInputField}
                clearInputField={clearInputField}
                buttonAction={handleWithdraw}
                isTransactionLoading={isLoading}
                setAmount={setWithdrawAmount}
                amount={withdrawAmount}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
