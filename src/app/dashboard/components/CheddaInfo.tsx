import React from "react";
import Image from "next/image";
import linkOut from "@/assets/icon/link-out-white.svg";
import { Card } from "@/components/common";
import { ConnectWalletBox } from "./ConnectWalletBox";
import { useCheddaBalance, useCheddaTotalSupply, useTokenValue } from "@/hooks";
import { formatLargeNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { currentEnvironment } from "@/data/environments";

interface CheddaInfoProps {
  isWalletConnected: boolean;
}

interface InfoItemProps {
  title: string;
  value: string;
  isLoading: boolean;
  subValue?: string | React.ReactNode;
}

const InfoItem = ({ title, value, isLoading, subValue }: InfoItemProps) => (
  <div
    className="hazy-bg p-6 w-full space-y-2"
    data-testid={`info-item-${title.replace(" ", "-").toLowerCase()}`}
  >
    <p className="text-sm text-[#FFFFFF70] font-semibold">{title}</p>
    {isLoading ? (
      <div className="space-y-4">
        <div className="mt-1 h-7 w-24 rounded-md bg-blue-200 opacity-10 animate-pulse"></div>
        {subValue && (
          <div className="mt-4 h-4 w-24 rounded bg-blue-200 opacity-10 animate-pulse"></div>
        )}
      </div>
    ) : (
      <div className="space-y-2">
        <p className="text-2xl text-white font-bold">{value}</p>
        {subValue && <p className="text-sm text-[#FFFFFF70]">{subValue}</p>}
      </div>
    )}
  </div>
);

export const CheddaInfo = ({ isWalletConnected }: CheddaInfoProps) => {
  const { data: cheddaTokenBalance, isLoading: cheddaTokenBalanceLoading } =
    useCheddaBalance();
  const { data: cheddaPrice, isLoading: cheddaPriceLoading } = useTokenValue(
    currentEnvironment?.contracts.CheddaToken || ""
  );
  const { data: cheddaTotalSupply, isLoading: cheddaTotalSupplyLoading } =
    useCheddaTotalSupply();

  const parsedCheddaBalance = parseBigNumberToFloat(cheddaTokenBalance, 18, 5);
  const parsedCheddaTotalSupply = parseBigNumberToFloat(
    cheddaTotalSupply,
    18,
    5
  );
  const parsedCheddaPrice = Number(cheddaPrice);
  const marketCap = parsedCheddaTotalSupply * parsedCheddaPrice;

  const isLoading =
    cheddaTokenBalanceLoading || cheddaPriceLoading || cheddaTotalSupplyLoading;

  return (
    <Card title="CHEDDA INFO">
      {isWalletConnected ? (
        <div data-testid="chedda-info-card">
          <div
            className="flex justify-between gap-x-2"
            data-testid="info-items-container"
          >
            <InfoItem
              title="CHEDDA BALANCE"
              value={formatLargeNumber(parsedCheddaBalance)}
              subValue={`$${formatLargeNumber(parsedCheddaPrice * parsedCheddaBalance)}`}
              isLoading={isLoading}
            />
            <InfoItem
              title="CHEDDA PRICE"
              value={`$${formatLargeNumber(parsedCheddaPrice)}`}
              subValue={
                <span className="underline card-gradient-text">
                  See market trend
                </span>
              }
              isLoading={isLoading}
            />
            <InfoItem
              title="MARKET CAP"
              value={`$${formatLargeNumber(marketCap, true)}`}
              isLoading={isLoading}
            />
          </div>
          <div className="mt-5 flex items-center justify-between relative">
            <div className="text-xs text-[#FFFFFF70]">
              Overview of CHEDDA Info
            </div>
            <a
              href="https://app.uniswap.org/#/swap"
              target="_blank"
              rel="noreferrer"
              className="modal-button text-white rounded-lg p-3 px-4 text-xs font-bold flex gap-x-2 hover:opacity-90"
              data-testid="buy-chedda-link"
            >
              <p>Buy CHEDDA</p>
              <Image src={linkOut} alt="link out" className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <ConnectWalletBox
          title="CHEDDA info"
          data-testid="connect-wallet-box"
        />
      )}
    </Card>
  );
};
