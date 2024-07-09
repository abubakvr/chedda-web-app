import React from "react";
import { BigNumber } from "ethers";
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
  const { data: positionSummary, isLoading: positionSummaryLoading } =
    usePositionSummary();

  const { netValue, suppliedValue, borrowedValue, lockedValue } =
    positionSummary || {};

  const parseValue = (value: BigNumber | undefined) =>
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
      className="bg-[#14132D] text-white p-8 rounded-lg shadow-lg flex pool-card w-full"
      data-testid="position-summary"
    >
      {isWalletConnected ? (
        <div
          className="hazy-bg flex p-10 pb-6 w-full"
          data-testid="wallet-connected"
        >
          <div className="mb-4 px-8 w-max flex-grow">
            <h2 className="text-2xl font-bold">Position Summary</h2>
            <p className="text-lg text-gray-400 mt-6">
              Review your overall portfolio value here. <br />
              You can manage positions from the Markets page.
            </p>
          </div>
          <div className="px-7 flex-grow">
            <div className="flex justify-between items-center text-center pt-4 text-[#F9FAFB]">
              <div data-testid="net-value">
                <p className="text-sm text-[#FFFFFF70] font-bold">Net Value</p>
                {positionSummaryLoading ? (
                  <div className=" animate-pulse">
                    <div
                      className=" mt-1.5 h-6 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                      data-testid="net-value-loading"
                    ></div>
                  </div>
                ) : (
                  <p className="text-xl card-gradient-text mt-1 font-bold">
                    {`${formatCurrency(parsedNetValue)}`}
                  </p>
                )}
              </div>
              <div data-testid="total-supplied">
                <p className="text-sm text-[#FFFFFF70] font-bold">
                  Total Supplied
                </p>
                {positionSummaryLoading ? (
                  <div className=" animate-pulse">
                    <div
                      className=" mt-1.5 h-6 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                      data-testid="total-supplied-loading"
                    ></div>
                  </div>
                ) : (
                  <p className="text-xl mt-1 font-bold">
                    {`${formatCurrency(parsedSuppliedValue)}`}
                  </p>
                )}
              </div>
              <div data-testid="total-borrowed">
                <p className="text-sm text-[#FFFFFF70] font-bold">
                  Total Borrowed
                </p>

                {positionSummaryLoading ? (
                  <div className=" animate-pulse">
                    <div
                      className=" mt-1.5 h-6 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                      data-testid="total-borrowed-loading"
                    ></div>
                  </div>
                ) : (
                  <p className="text-xl font-bold mt-1">
                    {`${formatCurrency(parsedBorrowedValue)}`}
                  </p>
                )}
              </div>
              <div data-testid="locked">
                <p className="text-sm text-[#FFFFFF70] font-bold">Locked</p>
                {positionSummaryLoading ? (
                  <div className=" animate-pulse">
                    <div
                      className=" mt-1.5 h-6 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                      data-testid="locked-loading"
                    ></div>
                  </div>
                ) : (
                  <p className="text-xl font-bold">
                    {`${formatCurrency(parsedLockedValue)}`}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full mt-11 flex" data-testid="bar-chart">
              {allPositionsLoading ? (
                <div className="animate-pulse">
                  <div
                    className="h-1 w-full rounded bg-gray-300 dark:bg-blue-200 opacity-10"
                    data-testid="bar-chart-loading"
                  ></div>
                </div>
              ) : getAccountPositions(allPositions).length ? (
                getAccountPositions(allPositions)?.map(
                  ({ asset, suppliedValue }, i) => (
                    <div
                      className="h-1"
                      key={`bar-${i}`}
                      style={{
                        backgroundColor: asset.color,
                        width: `${(suppliedValue / totalSuppliedValue) * 100}%`,
                      }}
                      data-testid={`bar-${i}`}
                    ></div>
                  )
                )
              ) : (
                <div className="w-full h-1 bg-[#5ED1F6] opacity-50"></div>
              )}
            </div>
            <div
              className="flex justify-around items-center text-center mt-5"
              data-testid="position-list"
            >
              {allPositionsLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex font-bold text-sm gap-x-1.5 animate-pulse"
                    data-testid={`position-item-loading-${i}`}
                  >
                    <div className="mt-1 w-3 h-3 rounded-full bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                    <div className="flex flex-col justify-around">
                      <div className="h-4 w-24 rounded bg-gray-300 dark:bg-blue-200 opacity-10"></div>
                      <div className="h-4 w-20 rounded bg-gray-300 dark:bg-blue-200 opacity-10 mt-1.5"></div>
                    </div>
                  </div>
                ))
              ) : getAccountPositions(allPositions).length ? (
                getAccountPositions(allPositions)?.map(
                  ({ asset, suppliedValue, supplied }, i) => (
                    <div
                      className="flex font-bold text-sm gap-x-1.5"
                      key={`info-${i}`}
                      data-testid={`position-item-${i}`}
                    >
                      <span
                        className="w-3 h-3 rounded-full m-1"
                        style={{ backgroundColor: asset.color }}
                        data-testid={`position-color-${i}`}
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
                <p className="text-[#B5B5B5]" data-testid="no-open-positions">
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
        <ConnectWalletBox title="position summary" />
      )}
    </div>
  );
};

export default PositionSummary;
