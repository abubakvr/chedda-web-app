import React, { FC, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useAllowance, useTokenBalance, useTransaction } from "@/hooks";
import {
  formatAsPercentage,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { modalInfoItem, IToken } from "@/utils/types";
import { SuccessModal } from "@/components/modals";
import { SupplyModalContent } from "@/components/common";

interface SupplyModalProps {
  asset: IToken;
  assetPrice: number;
  isOpen: boolean;
  baseSupplyAPY: string | number;
  supplied: BigNumber | undefined;
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
  isOpen,
  baseSupplyAPY,
  supplied,
  onClose,
  fetchAccountInfo,
}) => {
  const [activeTab, setActiveTab] = useState("Deposit");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [clearInputField, setClearInputField] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { data: allowance, fetchData: fetchAllowance } = useAllowance(
    asset.address
  );
  const { isLoading, isSuccess, approveAsset, depositAsset, withdrawAsset } =
    useTransaction(asset.address);
  const { data: tokenBalance } = useTokenBalance(asset.address);

  useEffect(() => {
    setOpenSuccessModal(isSuccess);
    setClearInputField(true);
  }, [isSuccess]);

  const parsedAllowance = parseFloat(
    parseBigNumberToFloat(allowance, asset.decimals)
  );
  const parsedSupplied = parseFloat(
    parseBigNumberToFloat(supplied, asset.decimals)
  );
  const parsedMaxAmount = parseBigNumberToFloat(tokenBalance, asset.decimals);

  const handleDeposit = async (amount: number, useAsCollateral: boolean) => {
    if (!amount) {
      return alert("Enter valid amount");
    }

    const parsedAmount = ethers.utils.parseUnits(
      amount.toString(),
      asset.decimals
    );

    if (amount < parsedAllowance) {
      await depositAsset(parsedAmount, useAsCollateral);
      const modalMessage = `You supplied ${amount} ${asset.symbol}`;
      setModalMessage(modalMessage);
      fetchAllowance();
      fetchAccountInfo();
    } else {
      await approveAsset(parsedAmount);
      fetchAllowance();
    }
  };

  const modalInfo: modalInfoItem[] = [
    {
      title: `Allowance `,
      value: `${formatNumber(parsedAllowance)} ${asset.symbol}`,
    },
    {
      title: `Supplied `,
      value: `${formatNumber(parsedSupplied)} ${asset.symbol}`,
    },
    { title: "Base Supply APY", value: formatAsPercentage(baseSupplyAPY) },
  ];

  const handleWithdraw = (amount: number) => {
    if (!amount) {
      return alert("Enter valid amount");
    }
    const parsedAmount = ethers.utils.parseUnits(amount.toString(), 6);
    withdrawAsset(parsedAmount);
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
        modalMessage={modalMessage}
      />
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
                onClick={() => setActiveTab("Deposit")}
              />
              <Tab
                label="Withdraw"
                isActive={activeTab === "Withdraw"}
                onClick={() => setActiveTab("Withdraw")}
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
                modalInfo={modalInfo}
                buttonAction={handleDeposit}
                isTransactionLoading={isLoading}
              />
            )}
            {activeTab === "Withdraw" && (
              <SupplyModalContent
                title="Withdraw"
                asset={asset}
                assetPrice={assetPrice}
                allowance={parsedAllowance}
                modalInfo={modalInfo}
                maxAmount={parsedMaxAmount}
                setClearInputField={setClearInputField}
                clearInputField={clearInputField}
                buttonAction={handleWithdraw}
                isTransactionLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
