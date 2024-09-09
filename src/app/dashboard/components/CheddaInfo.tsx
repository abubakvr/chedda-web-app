import React from "react";
import Image from "next/image";
import arrowForward from "@/assets/icon/arrow-forward.svg";
import LinkOut from "@/assets/icon/link-out-gradient.svg";

import { Card } from "@/components/common";
import { ConnectWalletBox } from "./ConnectWalletBox";
import { useCheddaBalance, useCheddaTotalSupply } from "@/hooks";
import { formatLargeNumber, parseBigNumberToFloat } from "@/utils/formatters";

interface CheddaInfoProps {
  isWalletConnected: boolean;
  cheddaTokenPrice: number | undefined;
  cheddaTokenPriceLoading: boolean;
}

interface InfoItemProps {
  title: string;
  value: string;
  isLoading: boolean;
  subValue?: string | React.ReactNode;
}

const InfoItem = ({ title, value, isLoading, subValue }: InfoItemProps) => (
  <div
    className="lg:border lg:border-[#ffffff19] lg:bg-[#ffffff02] rounded-lg lg:p-6 lg:pb-[51px] w-full space-y-1 lg:space-y-2"
    data-testid={`info-item-${title.replace(" ", "-").toLowerCase()}`}
  >
    <p className="text-[8px] lg:text-xs text-[#FFFFFF70] font-semibold w-max">
      {title}
    </p>
    {isLoading ? (
      <div className="space-y-2 lg:space-y-4 animate-pulse">
        <div className="mt-1 h-5 w-16 lg:h-7 lg:w-24 rounded lg:rounded-md bg-gray-300 dark:bg-blue-200 opacity-10"></div>
        {subValue && (
          <div className="mt-4 h-4 w-20 lg:h-4 lg:w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
        )}
      </div>
    ) : (
      <div className="lg:space-y-2">
        <p className="text-sm lg:text-2xl text-white font-bold">{value}</p>
        {subValue && (
          <p className="text-[10px] lg:text-sm text-[#FFFFFF70] w-max">
            {subValue}
          </p>
        )}
      </div>
    )}
  </div>
);

export const CheddaInfo = ({
  isWalletConnected,
  cheddaTokenPrice,
  cheddaTokenPriceLoading,
}: CheddaInfoProps) => {
  const { data: cheddaTokenBalance, isLoading: cheddaTokenBalanceLoading } =
    useCheddaBalance();

  const { data: cheddaTotalSupply, isLoading: cheddaTotalSupplyLoading } =
    useCheddaTotalSupply();

  const parsedCheddaBalance = parseBigNumberToFloat(cheddaTokenBalance, 18, 5);
  const parsedCheddaTotalSupply = parseBigNumberToFloat(
    cheddaTotalSupply,
    18,
    5
  );
  const parsedCheddaTokenPrice = Number(cheddaTokenPrice);
  const marketCap = parsedCheddaTotalSupply * parsedCheddaTokenPrice;

  const isLoading =
    cheddaTokenBalanceLoading ||
    cheddaTokenPriceLoading ||
    cheddaTotalSupplyLoading;

  return (
    <Card title="CHEDDA INFO">
      {isWalletConnected ? (
        <div data-testid="chedda-info-card">
          <div
            className="flex justify-between gap-x-2 border border-[#ffffff19] bg-[#ffffff02] lg:border-none lg:bg-transparent rounded-lg p-3 lg:p-0"
            data-testid="info-items-container"
          >
            <InfoItem
              title="CHEDDA BALANCE"
              value={formatLargeNumber(parsedCheddaBalance)}
              subValue={`$${formatLargeNumber(parsedCheddaTokenPrice * parsedCheddaBalance)}`}
              isLoading={isLoading}
            />
            <InfoItem
              title="CHEDDA PRICE"
              value={`$${formatLargeNumber(parsedCheddaTokenPrice)}`}
              subValue={
                <a
                  href="#"
                  className="flex gap-x-1 items-center relative hover:opacity-80"
                >
                  <span className="underline card-gradient-text">
                    See market trend
                  </span>
                  <Image
                    style={{ color: "" }}
                    src={LinkOut}
                    alt="link out"
                    className="w-3 h-3 lg:w-4 lg:h-4"
                  />
                </a>
              }
              isLoading={isLoading}
            />
            <InfoItem
              title="MARKET CAP"
              value={`$${formatLargeNumber(marketCap, true)}`}
              isLoading={isLoading}
            />
          </div>
          <div className="mt-2 lg:mt-4 flex items-center justify-between relative">
            <div className="text-[8px] lg:text-xs text-[#FFFFFF70]">
              Overview of CHEDDA Info
            </div>
            <a
              href="https://app.uniswap.org/#/swap"
              target="_blank"
              rel="noreferrer"
              className="modal-button text-white rounded-md lg:rounded-lg py-2 px-3 lg:py-3 lg:px-4 text-[8px] lg:text-xs font-bold flex items-center gap-x-1 lg:gap-x-2 hover:opacity-90"
              data-testid="buy-chedda-link"
            >
              <p>Buy CHEDDA</p>
              <Image
                style={{ color: "" }}
                src={arrowForward}
                alt="link out"
                className="w-2 h-2 lg:w-3 lg:h-3"
              />
            </a>
          </div>
        </div>
      ) : (
        <ConnectWalletBox
          title="CHEDDA info"
          data-testid="connect-wallet-box"
          height={20}
        />
      )}
    </Card>
  );
};
