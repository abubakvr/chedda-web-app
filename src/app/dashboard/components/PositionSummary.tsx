import React from "react";
import { ConnectWalletBox } from "./ConnectWalletBox";
import { usePositionSummary } from "@/hooks";
import {
  formatCurrency,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IPositionResponse } from "@/utils/types";
import { getAccountPositions } from "@/utils/helpers";
import Link from "next/link";
import { useNonce } from "@/hooks/useNonce";

interface PositionSummaryProps {
  isWalletConnected: boolean;
  allPositions: IPositionResponse[] | undefined;
  allPositionsLoading: boolean;
}

export const PositionSummary = ({
  isWalletConnected,
  allPositions,
  allPositionsLoading,
}: PositionSummaryProps) => {
  const { nonce } = useNonce();
  const { data: positionSummary, isLoading: positionSummaryLoading } =
    usePositionSummary();

  const { netValue, suppliedValue, borrowedValue, lockedValue } =
    positionSummary || {};

  const parseValue = (value: bigint | undefined) =>
    parseBigNumberToFloat(value, 18, 5);

  const parsedNetValue = parseValue(netValue);
  const parsedSuppliedValue = parseValue(suppliedValue);
  const parsedBorrowedValue = parseValue(borrowedValue);
  const parsedLockedValue = parseValue(lockedValue);
  const totalSuppliedValue =
    allPositions?.reduce(
      (total, { suppliedValue }) => total + suppliedValue,
      0
    ) || 0;

  return (
    <div
      className="bg-[#14132D] text-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex pool-card w-full"
      data-testid="position-summary"
    >
      {isWalletConnected ? (
        <div
          className="hazy-bg md:flex px-3 md:px-4 py-4 md:py-8 xl:px-10 lg:pt-10 lg:pb-6 w-full justify-between md:gap-x-50"
          data-testid="wallet-connected"
        >
          <div className="mb-4 pb-4 md:pb-0 lg:px-4 xl:px-8 flex flex-col justify-center items-center md:items-start md:justify-start border-b-[1px] md:border-b-0 border-[#FFFFFF30]">
            <h2 className="text-[sm] md:text-lg lg:text-2xl font-bold">
              Position Summary
            </h2>
            <p className="text-[8px] md:text-[10px] lg:text-lg text-[#FFFFFF70] text-center md:text-start mt-2 md:mt-3 lg:mt-6 w-max">
              Review your overall portfolio value here. <br />
              You can manage positions from the Markets page.
            </p>
          </div>
          <div className="lg:px-7 w-full md:w-max ">
            <div className="flex justify-evenly items-center text-center lg:pt-4 text-[#F9FAFB] w-full md:gap-x-6 lg:gap-x-8 xl:gap-x-16">
              <div data-testid="net-value" className="w-max">
                <p className="text-[8px] md:text-[10px] lg:text-sm text-[#FFFFFF70] font-semibold">
                  Net Value
                </p>
                {positionSummaryLoading ? (
                  <div className="animate-pulse">
                    <div
                      className=" mt-1.5 h-4 w-20 lg:h-6 lg:w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                      data-testid="net-value-loading"
                    ></div>
                  </div>
                ) : (
                  <p className="text-sm md:text-lg lg:text-xl card-gradient-text mt-1 font-bold">
                    {`${formatCurrency(parsedNetValue)}`}
                  </p>
                )}
              </div>
              <div data-testid="total-supplied" className="w-max">
                <p className="text-[8px] md:text-[10px] lg:text-sm text-[#FFFFFF70] font-semibold">
                  Total Supplied
                </p>
                {positionSummaryLoading ? (
                  <div className=" animate-pulse">
                    <div
                      className="mt-1.5 h-4 w-20 lg:h-6 lg:w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                      data-testid="total-supplied-loading"
                    ></div>
                  </div>
                ) : (
                  <p className="text-sm md:text-lg lg:text-xl mt-1 font-bold">
                    {`${formatCurrency(parsedSuppliedValue)}`}
                  </p>
                )}
              </div>
              <div data-testid="total-borrowed" className="w-max">
                <p className="text-[8px] md:text-[10px] lg:text-sm text-[#FFFFFF70] font-semibold">
                  Total Borrowed
                </p>

                {positionSummaryLoading ? (
                  <div className=" animate-pulse">
                    <div
                      className="mt-1.5 h-4 w-20 lg:h-6 lg:w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                      data-testid="total-borrowed-loading"
                    ></div>
                  </div>
                ) : (
                  <p className="text-sm md:text-lg lg:text-xl font-bold mt-1">
                    {`${formatCurrency(parsedBorrowedValue)}`}
                  </p>
                )}
              </div>
              <div data-testid="locked" className="w-max">
                <p className="text-[8px] md:text-[10px] lg:text-sm text-[#FFFFFF70] font-semibold">
                  Locked
                </p>
                {positionSummaryLoading ? (
                  <div className=" animate-pulse">
                    <div
                      className="mt-1.5 h-4 w-20 lg:h-6 lg:w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                      data-testid="locked-loading"
                    ></div>
                  </div>
                ) : (
                  <p className="text-sm md:text-lg lg:text-xl font-bold mt-1">
                    {`${formatCurrency(parsedLockedValue)}`}
                  </p>
                )}
              </div>
            </div>
            <div
              className="w-full mt-4 md:mt-6 lg:mt-11 flex"
              data-testid="bar-chart"
            >
              {allPositionsLoading ? (
                <div className="animate-pulse w-full">
                  <div
                    className="h-0.5 lg:h-1 w-full rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                    data-testid="bar-chart-loading"
                  ></div>
                </div>
              ) : getAccountPositions(allPositions).length ? (
                getAccountPositions(allPositions)?.map(
                  ({ asset, suppliedValue }, i) => (
                    <div
                      className="h-0.5 lg:h-1"
                      key={`bar-${i}`}
                      style={{
                        backgroundColor: asset.color,
                        width: `${(suppliedValue / totalSuppliedValue) * 100}%`,
                      }}
                      nonce={nonce}
                      data-testid={`bar-${i}`}
                    ></div>
                  )
                )
              ) : (
                <div className="w-full h-0.5 lg:h-1 bg-[#5ED1F6] opacity-50"></div>
              )}
            </div>
            <div
              className="flex justify-around items-center gap-x-2 text-center mt-2 md:mt-4 lg:mt-5"
              data-testid="position-list"
            >
              {allPositionsLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex font-bold text-sm gap-x-1.5 animate-pulse"
                    data-testid={`position-item-loading-${i}`}
                  >
                    <div className="mt-1 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="flex flex-col justify-around">
                      <div className="h-3 w-16 md:w-20 lg:h-4 lg:w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                      <div className="h-3 w-12 md:w-16 lg:h-4 lg:w-20 rounded bg-gray-300 dark:bg-blue-200 opacity-10 mt-1.5"></div>
                    </div>
                  </div>
                ))
              ) : getAccountPositions(allPositions).length ? (
                getAccountPositions(allPositions)?.map(
                  ({ asset, suppliedValue, supplied }, i) => (
                    <div
                      className="flex font-bold text-[8px] md:text-[10px] lg:text-sm gap-x-1.5"
                      key={`info-${i}`}
                      data-testid={`position-item-${i}`}
                    >
                      <span
                        className="w-2 h-2 lg:w-3 lg:h-3 rounded-full m-1"
                        style={{ backgroundColor: asset.color }}
                        data-testid={`position-color-${i}`}
                        nonce={nonce}
                      ></span>
                      <div className="text-left">
                        <p
                          className="text-[#FDFDFD]"
                          data-testid={`position-supplied-${i}`}
                        >
                          {formatNumber(supplied)} {asset.symbol}
                        </p>
                        <p
                          className="text-[#FFFFFF50] mt-0.5"
                          data-testid={`position-supplied-value-${i}`}
                        >
                          {formatCurrency(suppliedValue)}
                        </p>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p
                  className="text-[#FFFFFF70] text-[10px] md:text-xs lg:text-lg"
                  data-testid="no-open-positions"
                >
                  You do not have any open positions. Supply assets{" "}
                  <Link
                    href={"/markets"}
                    className="card-gradient-text relative hover:opacity-80"
                  >
                    here
                  </Link>{" "}
                  to start earning interest and rewards.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ConnectWalletBox title="position summary" height={28} />
      )}
    </div>
  );
};

export default PositionSummary;
