"use client";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { ethers } from "ethers";
import {
  useAllowance,
  useAssetBalance,
  useAvailableLiquidity,
  useToast,
  useTokenBalance,
  useTransaction,
} from "@/hooks";
import {
  formatAsPercentage,
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IToken } from "@/utils/types";
import { SuccessModal } from "@/components/modals";
import { SupplyTabInfo, WithdrawTabInfo } from "./TabInfo";
import { SupplyModalContent } from "./modalContent/SupplyModalContent";
import { sendGAEvent } from "@next/third-parties/google";

interface SupplyModalProps {
  asset: IToken;
  assetPrice: number;
  isOpen: boolean;
  tokenBalance: bigint | undefined;
  baseSupplyAPY: string | number;
  supplied: bigint | undefined;
  available: bigint | undefined;
  defaultTab?: string | null;
  onClose: () => void;
  fetchPoolInfo: () => void;
  setActivePoolTab: Dispatch<SetStateAction<string>>;
}

const Tab: FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  testId: string;
}> = ({ label, isActive, onClick, testId }) => (
  <button
    data-testid={testId}
    className={`text-2xs md:text-xs lg:text-sm font-bold px-4 py-2 focus:outline-none relative w-full hover:bg-haze-purple ${
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
  defaultTab,
  onClose,
  fetchPoolInfo,
  setActivePoolTab,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || "Deposit");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    message: "",
    txHash: "",
  });
  const [txLoading, setTxLoading] = useState(false);
  const [clearInputField, setClearInputField] = useState(false);
  const [supplyAmount, setSupplyAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const { addToast } = useToast();
  const {
    data: allowance,
    fetchData: fetchAllowance,
    isLoading: allowanceLoading,
  } = useAllowance(asset.address);
  const { data: assetBalance, fetchData: fetchAssetBalance } = useAssetBalance(
    asset.address
  );
  const { fetchData: fetchTokenBalance } = useTokenBalance(asset.address);
  const { fetchData: fetchAvailable } = useAvailableLiquidity();
  const { approveAsset, depositAsset, withdrawAsset } = useTransaction(
    asset.address
  );

  const parsedAllowance = parseBigNumberToFloat(
    allowance,
    asset.decimals,
    asset.decimals
  );
  const parsedSupplied = parseBigNumberToFloat(
    supplied,
    asset.decimals,
    asset.decimals
  );
  const parsedAssetBalance = parseBigNumberToFloat(
    assetBalance,
    asset.decimals,
    asset.decimals
  );
  const parsedMaxAmount = parseBigNumberToFloat(
    tokenBalance,
    asset.decimals,
    asset.decimals
  );
  const parsedAvailableLiquidity = parseBigNumberToFloat(
    available,
    asset.decimals,
    asset.decimals
  );
  const maxWithdrawAmount = Math.min(
    parsedAssetBalance,
    parsedAvailableLiquidity
  );

  const fetchModalData = useCallback(() => {
    fetchAssetBalance(false);
    fetchAllowance(false);
    fetchTokenBalance(false);
    fetchAvailable(false);
    fetchPoolInfo();
  }, [
    fetchAssetBalance,
    fetchAllowance,
    fetchTokenBalance,
    fetchAvailable,
    fetchPoolInfo,
  ]);

  const handleDeposit = async (useAsCollateral: boolean) => {
    if (!supplyAmount || supplyAmount > parsedMaxAmount) {
      return alert("Enter valid amount");
    }

    try {
      setTxLoading(true);
      const parsedAmount = ethers.parseUnits(
        supplyAmount.toString(),
        asset.decimals
      );

      if (supplyAmount <= parsedAllowance) {
        const res = await depositAsset(parsedAmount, useAsCollateral);
        if (res) {
          const result = await res.wait();
          if (result.status === 1) {
            const txMessage = `You've successfully supplied ${formatLargeNumber(
              supplyAmount
            )} ${asset.symbol}`;
            setSuccessMessage({ message: txMessage, txHash: res.hash });
            setSupplyAmount(0);
            setClearInputField(true);
            setOpenSuccessModal(true);
            fetchModalData();
            sendGAEvent("event", `Success`, {
              value: txMessage,
            });
          } else {
            const txMessage = `An error occurred while proccessing your transaction`;
            addToast({
              message: txMessage,
              type: "error",
              txHash: res.hash,
            });
          }
        }
        setTxLoading(false);
      } else {
        const res = await approveAsset(parsedAmount);
        if (res) {
          const result = await res.wait();
          if (result.status === 1) {
            const txMessage = `You've successfully approved ${formatNumber(
              supplyAmount
            )} ${asset.symbol}`;
            addToast({
              message: txMessage,
              type: "success",
              txHash: res.hash,
            });
            fetchAllowance(true);
          } else {
            const txMessage = `An error occurred while proccessing your transaction`;
            addToast({
              message: txMessage,
              type: "error",
              txHash: res.hash,
            });
          }
        }
        setTxLoading(false);
      }
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        type: "error",
        copyText: errorObject.fullText,
        txHash: undefined,
      });
      setTxLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || withdrawAmount > parsedSupplied) {
      return alert("Enter valid amount");
    }
    try {
      setTxLoading(true);
      const parsedAmount = ethers.parseUnits(
        withdrawAmount.toString(),
        asset.decimals
      );
      const res = await withdrawAsset(parsedAmount);
      if (res) {
        const result = await res.wait();
        if (result.status === 1) {
          const txMessage = `You've successfully withdrawn ${formatNumber(
            withdrawAmount
          )} ${asset.symbol}`;
          addToast({
            message: txMessage,
            type: "success",
            txHash: res.hash,
          });
          setWithdrawAmount(0);
          setClearInputField(true);
          fetchModalData();
        } else {
          const txMessage = `An error occurred while proccessing your transaction`;
          addToast({
            message: txMessage,
            type: "error",
            txHash: res.hash,
          });
        }
      }
      setTxLoading(false);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        type: "error",
        copyText: errorObject.fullText,
        txHash: undefined,
      });
      setTxLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
    onClose();
  };

  return (
    <>
      <SuccessModal
        onClose={closeSuccessModal}
        isOpen={openSuccessModal}
        modalMessage={successMessage.message}
        txHash={successMessage.txHash}
        continueAction={() => {
          setOpenSuccessModal(false);
          setClearInputField(true);
        }}
        stakeAction={() => setActivePoolTab("Stake")}
      />
      <div
        data-testid="modal-container"
        className={`fixed inset-0 transition-all duration-300 ${
          isOpen && !openSuccessModal
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="app-modal p-4 md:p-6 lg:p-8 rounded shadow-lg w-11/12 max-w-[370px] sm:max-w-[400px] md:max-w-[470px] lg:max-w-[550px]">
            <div className="flex justify-between items-center">
              <h2
                className="text-lg md:text-2xl lg:text-3xl font-bold"
                data-testid="supply-modal-title"
              >
                Supply Asset
              </h2>
              <button
                className="text-2xl md:text-3xl lg:text-4xl cursor-pointer font-bold text-white relative hover:opacity-85"
                onClick={() => {
                  onClose();
                  setSupplyAmount(0);
                  setWithdrawAmount(0);
                  setClearInputField(true);
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
                  setSupplyAmount(0);
                }}
                testId="deposit-tab"
              />
              <Tab
                label="Withdraw"
                isActive={activeTab === "Withdraw"}
                onClick={() => {
                  setActiveTab("Withdraw");
                  setWithdrawAmount(0);
                }}
                testId="withdraw-tab"
              />
            </div>
            {activeTab === "Deposit" && (
              <div data-testid="deposit-content">
                <SupplyModalContent
                  title="Deposit"
                  maxAmount={parsedMaxAmount.toString()}
                  asset={asset}
                  assetPrice={assetPrice}
                  setClearInputField={setClearInputField}
                  clearInputField={clearInputField}
                  allowance={parsedAllowance}
                  modalInfo={
                    <SupplyTabInfo
                      supplied={`${formatNumber(parsedSupplied)} ${
                        asset.symbol
                      }`}
                      projectedSupply={`${formatNumber(
                        parsedSupplied + (supplyAmount || 0)
                      )} ${asset.symbol}`}
                      allowance={`${formatNumber(parsedAllowance)} ${
                        asset.symbol
                      }`}
                      baseSupplyAPY={formatAsPercentage(baseSupplyAPY)}
                    />
                  }
                  buttonAction={handleDeposit}
                  isTransactionLoading={txLoading || allowanceLoading}
                  setAmount={setSupplyAmount}
                  amount={supplyAmount}
                />
              </div>
            )}
            {activeTab === "Withdraw" && (
              <div data-testid="withdraw-content">
                <SupplyModalContent
                  title="Withdraw"
                  asset={asset}
                  assetPrice={assetPrice}
                  allowance={parsedAllowance}
                  modalInfo={
                    <WithdrawTabInfo
                      supplied={`${formatNumber(parsedSupplied)} ${
                        asset.symbol
                      }`}
                      baseSupplyAPY={formatAsPercentage(baseSupplyAPY)}
                      projectedSupply={`${formatNumber(
                        parsedSupplied - (withdrawAmount || 0)
                      )} ${asset.symbol}`}
                      liquidity={`${formatNumber(parsedAvailableLiquidity)} ${
                        asset.symbol
                      }`}
                      projectedLiquidity={`${formatNumber(
                        parsedAvailableLiquidity - (withdrawAmount || 0)
                      )} ${asset.symbol}`}
                    />
                  }
                  maxAmount={maxWithdrawAmount.toString()}
                  setClearInputField={setClearInputField}
                  clearInputField={clearInputField}
                  buttonAction={handleWithdraw}
                  isTransactionLoading={txLoading || allowanceLoading}
                  setAmount={setWithdrawAmount}
                  amount={withdrawAmount}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
