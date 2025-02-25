"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/icon/search-icon.svg";
import { PositionItem } from "./PositionItem";
import { VaultSkeleton } from "@/components/ui";
import { IPositionResponse } from "@/utils/types";
import { ConnectWalletBox } from "./ConnectWalletBox";
import { isPostToken, positionsHeaderItem } from "@/utils/constants";
import { getAccountPositions } from "@/utils/helpers";
import { EmptyPositionCard } from "./EmptyPositionCard";

interface MyPositionsProps {
  isWalletConnected: boolean;
  allPositions: IPositionResponse[] | undefined;
  allPositionsLoading: boolean;
  cheddaTokenPrice: number | undefined;
  cheddaTokenPriceLoading: boolean;
}

export const MyPositions = ({
  isWalletConnected,
  allPositions,
  allPositionsLoading,
  cheddaTokenPrice,
  cheddaTokenPriceLoading,
}: MyPositionsProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>();

  const matchSearchItem = (item: IPositionResponse, searchKeyword: string) => {
    const normalizedSearchKeyword = searchKeyword?.toLowerCase() || "";

    const matchesAssetName = item.asset.name
      .toLowerCase()
      .includes(normalizedSearchKeyword);

    const matchesAssetSymbol = item.asset.symbol
      .toLowerCase()
      .includes(normalizedSearchKeyword);

    return matchesAssetName || matchesAssetSymbol;
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchKeyword(e.target.value);

  return (
    <div className="card-bg rounded-lg" data-testid="my-positions">
      <div
        data-testid="vault-card"
        className="w-full p-4 md:px-6 pb-0 sm:p-4 sm:pb-0"
      >
        <div className="w-full sm:flex justify-between items-center">
          <div
            data-testid="vaults-title"
            className="text-white font-open-sans sm:text-lg lg:text-xl  xl:text-3xl font-bold tracking-wider "
          >
            My Positions
          </div>
          <div
            data-testid="search-input"
            className="flex flex-col justify-center mt-4 items-center gap-4 h-8 md:h-9 lg:h-11 rounded-md border border-mist bg-transparent focus:border-blue sm:mt-1"
          >
            <div className="relative w-full">
              <input
                type="text"
                className="w-full sm:w-48 md:w-52 lg:w-64 h-full bg-transparent focus:outline-none text-2xs lg:text-lg text-white pl-3 pr-10 flex items-center"
                placeholder="Search"
                onChange={handleSearch}
              />
              <Image
                style={{ color: "" }}
                src={SearchIcon}
                alt="Search Icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-60 w-4 h-4"
              />
            </div>
          </div>
        </div>
        {isWalletConnected && getAccountPositions(allPositions).length > 0 && (
          <div
            className={`mt-2 pb-3 lg:pb-4 sm:mt-4 lg:mt-10 hidden md:grid ${isPostToken ? "grid-cols-7" : "grid-cols-5"} border-b  gap-x-20  border-gray-500 border-opacity-20`}
          >
            {positionsHeaderItem.map((item: string, index: number) => (
              <div key={index} className={`w-max flex  justify-start`}>
                <div
                  className={`w-fit text-white  col-span-1 opacity-50 flex font-open-sans text-3xs lg:text-xs font-bold leading-6 tracking-wide`}
                  data-testid={`vault-header-item-${index}`}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isWalletConnected ? (
        <div className="p-4 md:p-0">
          <div className="border rounded-lg text-mist border-frost bg-glass md:border-none md:bg-transparent md:m-0">
            {!allPositionsLoading ? (
              getAccountPositions(allPositions).length ? (
                getAccountPositions(allPositions)?.map(
                  (item: IPositionResponse, index: number) => {
                    const isMatch = searchKeyword
                      ? matchSearchItem(item, searchKeyword)
                      : true;
                    return (
                      isMatch && (
                        <div key={index} data-testid={`position-item-${index}`}>
                          <div className="vault-item ">
                            <PositionItem
                              pool={item}
                              cheddaTokenPrice={cheddaTokenPrice || 0}
                            />
                          </div>
                          {index !==
                            getAccountPositions(allPositions).length - 1 && (
                            <div className="w-5/4 mx-7 border-b border-gray-500 border-opacity-20" />
                          )}
                        </div>
                      )
                    );
                  }
                )
              ) : (
                <div className="p-4 md:p-6 lg:p-8">
                  <EmptyPositionCard />
                </div>
              )
            ) : (
              <VaultSkeleton itemCount={2} data-testid="vault-skeleton" />
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-6 lg:p-8">
          <ConnectWalletBox title="active positions" height={28} />
        </div>
      )}
    </div>
  );
};
