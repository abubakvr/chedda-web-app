import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { BigNumber, ethers } from "ethers";
import {
  useAllowance,
  useAssetBalance,
  useAvailableLiquidity,
  useTokenBalance,
  useTransaction,
} from "@/hooks";
import {
  formatAsPercentage,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IToken } from "@/utils/types";
import { Toast } from "@/components/ui";
import { SuccessModal } from "@/components/modals";
import { SupplyTabInfo, WithdrawTabInfo } from "./TabInfo";
import { SupplyModalContent } from "./modalContent/SupplyModalContent";

interface SupplyModalProps {
  asset: IToken;
  assetPrice: number;
  isOpen: boolean;
  tokenBalance: BigNumber | undefined;
  baseSupplyAPY: string | number;
  supplied: BigNumber | undefined;
  available: BigNumber | undefined;
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
  defaultTab,
  onClose,
  fetchPoolInfo,
  setActivePoolTab,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || "Deposit");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [clearInputField, setClearInputField] = useState(false);
  const [{ txMessage, txHash, txStatus, copyText }, setTxDetails] = useState<{
    txMessage: string;
    txHash: string | null;
    copyText: string | null;
    txStatus: "success" | "failed";
  }>({
    copyText: "",
    txMessage: "",
    txHash: "",
    txStatus: "success",
  });
  const [supplyAmount, setSupplyAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const { data: allowance, fetchData: fetchAllowance } = useAllowance(
    asset.address
  );
  const { data: assetBalance, fetchData: fetchAssetBalance } = useAssetBalance(
    asset.address
  );
  const { fetchData: fetchTokenBalance } = useTokenBalance(asset.address);
  const { fetchData: fetchAvailable } = useAvailableLiquidity();
  const { approveAsset, depositAsset, withdrawAsset } = useTransaction(
    asset.address
  );

  const parsedAllowance = parseBigNumberToFloat(allowance, asset.decimals);
  const parsedSupplied = parseBigNumberToFloat(supplied, asset.decimals);
  const parsedAssetBalance = parseBigNumberToFloat(
    assetBalance,
    asset.decimals
  );
  const parsedMaxAmount = parseBigNumberToFloat(tokenBalance, asset.decimals);
  const parsedAvailableLiquidity = parseBigNumberToFloat(
    available,
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
    try {
      if (!supplyAmount || supplyAmount > parsedMaxAmount) {
        return alert("Enter valid amount");
      }

      setTxLoading(true);
      setShowToast(false);
      const parsedAmount = ethers.utils.parseUnits(
        supplyAmount.toString(),
        asset.decimals
      );

      if (supplyAmount <= parsedAllowance) {
        depositAsset(parsedAmount, useAsCollateral)
          .then(async (res) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully supplied ${formatNumber(
                  supplyAmount
                )} ${asset.symbol}`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setSupplyAmount(0);
                setClearInputField(true);
                setOpenSuccessModal(true);
                fetchModalData();
              } else {
                const txMessage = `An error occurred while proccessing your transaction`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "failed",
                });
                setShowToast(true);
              }
            }
            setTxLoading(false);
          })
          .catch((error) => {
            const errorObject = JSON.parse(error.message);
            setTxDetails({
              txMessage: errorObject.errorMessage,
              copyText: errorObject.fullText,
              txHash: null,
              txStatus: "failed",
            });
            setShowToast(true);
            setTxLoading(false);
          });
      } else {
        approveAsset(parsedAmount)
          .then(async (res) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully approved ${formatNumber(
                  supplyAmount
                )} ${asset.symbol}`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setShowToast(true);
                fetchAllowance(false);
              } else {
                const txMessage = `An error occurred while proccessing your transaction`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "failed",
                });
                setShowToast(true);
              }
            }
            setTxLoading(false);
          })
          .catch((error) => {
            const errorObject = JSON.parse(error.message);
            setTxDetails({
              txMessage: errorObject.errorMessage,
              copyText: errorObject.fullText,
              txHash: null,
              txStatus: "failed",
            });
            setShowToast(true);
            setTxLoading(false);
          });
      }
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      setTxDetails({
        txMessage: errorObject.errorMessage,
        copyText: errorObject.fullText,
        txHash: null,
        txStatus: "failed",
      });
      setShowToast(true);
      setTxLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || withdrawAmount > parsedSupplied) {
      return alert("Enter valid amount");
    }
    setTxLoading(true);
    setShowToast(false);
    const parsedAmount = ethers.utils.parseUnits(
      withdrawAmount.toString(),
      asset.decimals
    );
    withdrawAsset(parsedAmount)
      .then(async (res) => {
        if (res) {
          const result = await res.wait();
          if (result.status === 1) {
            const txMessage = `You've successfully withdrawn ${formatNumber(
              withdrawAmount
            )} ${asset.symbol}`;
            setTxDetails({
              txMessage,
              copyText: null,
              txHash: res.hash,
              txStatus: "success",
            });
            setWithdrawAmount(0);
            setClearInputField(true);
            setShowToast(true);
            fetchModalData();
          } else {
            const txMessage = `An error occurred while proccessing your transaction`;
            setTxDetails({
              txMessage,
              copyText: null,
              txHash: res.hash,
              txStatus: "failed",
            });
            setShowToast(true);
          }
        }
        setTxLoading(false);
      })
      .catch((error) => {
        const errorObject = JSON.parse(error.message);
        setTxDetails({
          txMessage: errorObject.errorMessage,
          copyText: errorObject.fullText,
          txHash: null,
          txStatus: "failed",
        });
        setShowToast(true);
        setTxLoading(false);
      });
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
        modalMessage={txMessage}
        continueAction={() => setOpenSuccessModal(false)}
        stakeAction={() => setActivePoolTab("Stake")}
      />
      <Toast
        isOpen={showToast}
        toastMessage={txMessage}
        txHash={txHash}
        status={txStatus}
        copyText={copyText}
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
                Supply Asset
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
                  isTransactionLoading={txLoading}
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
                  isTransactionLoading={txLoading}
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
