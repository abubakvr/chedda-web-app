import React from "react";
import Link from "next/link";
import InfoIcon from "@/assets/icon/info-icon.svg";
// import stableIcon from "@/assets/icon/stable-icon.svg";
// import defiIcon from "@/assets/icon/defi-icon.svg";
// import gamefiIcon from "@/assets/icon/gamefi-icon.svg";
// import bluechipIcon from "@/assets/icon/bluechip-icon.svg";
import { formatAsPercentage, formatCurrency } from "@/utils/formatters";
import { IPoolStatsResponse, IToken } from "@/utils/types";
import Image from "next/image";

// const poolFilters = [
//   { keyword: "Stable Coin", icon: stableIcon },
//   { keyword: "Defi", icon: defiIcon },
//   { keyword: "Gamefi", icon: gamefiIcon },
//   { keyword: "Bluechip", icon: bluechipIcon },
//   { keyword: "Memes", icon: defiIcon },
// ];

export const VaultItem = ({
  layout,
  pool,
}: {
  layout: "list" | "grid";
  pool: IPoolStatsResponse;
}) => {
  // const itemFilter = poolFilters.find(
  //   (filter) => filter.keyword?.toLowerCase() === pool.categories[0]
  // );

  const renderGridView = () => (
    <div
      data-testid="vault-item"
      className="market-card rounded-lg w-full xl:px-7 xl:py-5 text-white hover:opacity-90 cursor-pointer p-4 xl:p-6 transition-all"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="flex relative">
              <Image
                style={{ color: "" }}
                src={pool.asset?.logo}
                className="w-8 h-8 md:w-10 md:h-10 round-image"
                alt={pool.asset?.symbol}
                data-testid="asset-name-list-mobile"
              />
              <Image
                style={{ color: "" }}
                src={pool.asset?.sourceLogo}
                alt="icon image"
                className="absolute w-[14px] h-[14px] md:w-[18px] md:h-[18px] top-0 left-0"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div
                  className="tracking-widest text-sm lg:text-xl font-bold"
                  data-testid="asset-symbol-list-mobile"
                >
                  {pool.asset?.symbol}
                </div>
                <div className="defi-box uppercase h-5 px-2 flex items-center justify-center text-3xs md:text-2xs font-bold">
                  {pool.characterization}
                </div>
              </div>
              <div className="text-xs text-mist mt-0.5">
                Utilization: {formatAsPercentage(pool.maxBorrowAPY)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex flex-col border border-[#FFFFFF08] p-3 rounded">
            <div className="flex items-center space-x-1">
              <p className="text-3xs md:text-xs text-mist">Supply APR</p>
              <Image
                style={{ color: "" }}
                src={InfoIcon}
                className="w-2.5 h-2.5"
                alt="Info Icon"
              />
            </div>
            <div className="flex items-center font-bold mt-1 text-success text-xs md:text-lg">
              <div data-testid="max-supply-a-mobile">
                {formatAsPercentage(pool.maxSupplyAPY)}
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-[#FFFFFF08] p-3 rounded">
            <div className="flex items-center space-x-1">
              <p className="text-3xs md:text-xs text-mist">Borrow APR</p>
              <Image
                style={{ color: "" }}
                src={InfoIcon}
                className="w-2.5 h-2.5"
                alt="Info Icon"
              />
            </div>
            <div className="flex items-center font-bold mt-1 text-error text-xs md:text-lg">
              <div data-testid="max-borrow-apy-list-mobile">
                {formatAsPercentage(pool.maxBorrowAPY)}
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-[#FFFFFF08] p-3 rounded">
            <div className="flex items-center space-x-1">
              <p className="text-3xs md:text-xs text-mist">Total Supplied</p>
              <Image
                style={{ color: "" }}
                src={InfoIcon}
                className="w-2.5 h-2.5"
                alt="Info Icon"
              />
            </div>
            <div className="flex items-center font-bold mt-1 text-xs md:text-lg">
              <div data-testid="supplied-value-mobile">
                {formatCurrency(pool.suppliedValue)}
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-[#FFFFFF08] p-3 rounded">
            <div className="flex items-center space-x-1">
              <p className="text-3xs md:text-xs text-mist">Total Borrowed</p>
              <Image
                style={{ color: "" }}
                src={InfoIcon}
                className="w-2.5 h-2.5"
                alt="Info Icon"
              />
            </div>
            <div className="flex items-center font-bold mt-1 text-xs md:text-lg">
              <div data-testid="borrowed-value-mobile">
                {formatCurrency(pool.borrowedValue)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-3xs md:text-xs text-mist mb-2">
            Accepted Collateral
          </p>
          <div className="flex flex-wrap gap-1">
            {pool.collaterals
              ?.slice(0, 3)
              .map((collateral: IToken, i: number) => (
                <div
                  key={i}
                  className="flex space-x-1 items-center collateral-chip rounded-full px-2 py-0.5 md:"
                >
                  <div className="round-image w-max relative">
                    <Image
                      style={{ color: "" }}
                      src={collateral?.logo}
                      className="w-3 h-3 md:w-4 md:h-4 round-image"
                      alt={collateral?.symbol}
                      data-testid="collateral-logo-list-mobile"
                    />
                  </div>
                  <p className="text-xs">{collateral.symbol}</p>
                </div>
              ))}
            {pool.collaterals?.length > 3 && (
              <div className="rounded-full collateral-chip text-xs px-2 py-0.5 md:py-1 md:px-2.5">
                +{pool.collaterals.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div
      data-testid="vault-item-list"
      className="market-card rounded-lg w-full text-white hover:opacity-90 cursor-pointer p-4 xl:p-6 transition-all"
    >
      {/* Desktop view */}
      <div className="hidden lg:flex justify-between items-center">
        <div className="flex items-center gap-x-4 w-1/5">
          <div className="flex relative w-max">
            <Image
              style={{ color: "" }}
              src={pool.asset?.logo}
              className="min-w-8 min-h-8 xl:min-h-10 xl:min-w-10 max-w-8 max-h-8 xl:max-h-10 xl:max-w-10 round-image"
              alt={pool.asset?.symbol}
              data-testid="asset-name-list"
            />
            <Image
              style={{ color: "" }}
              src={pool.asset?.sourceLogo}
              alt="icon image"
              className="absolute w-[14px] h-[14px] xl:w-[18px] xl:h-[18px] top-0 left-0"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <div
                className="tracking-widest text-xs xl:text-lg font-bold"
                data-testid="asset-symbol-list"
              >
                {pool.asset?.symbol}
              </div>
              <div className="defi-box uppercase h-5 xl:h-6 px-2 flex items-center w-max justify-center text-3xs md:text-2xs font-bold">
                {pool.characterization}
              </div>
            </div>
            <div className="md:text-xs xl:text-sm text text-mist mt-1">
              Utilization: {formatAsPercentage(pool.maxBorrowAPY)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/7 border border-[#FFFFFF08] py-4 px-5 rounded">
          <div className="flex items-center space-x-2">
            <p className="text-2xs xl:text-xs text-mist">Supply APR</p>
            <Image
              style={{ color: "" }}
              src={InfoIcon}
              className="w-3 h-3"
              alt="Info Icon"
            />
          </div>
          <div className="flex items-center space-x-1 font-bold mt-1 text-success">
            <div data-testid="max-supply-a">
              {formatAsPercentage(pool.maxSupplyAPY)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/7 border border-[#FFFFFF08] p-4 rounded">
          <div className="flex items-center space-x-2">
            <p className="text-2xs xl:text-xs text-mist">Borrow APR</p>
            <Image
              style={{ color: "" }}
              src={InfoIcon}
              className="w-3 h-3"
              alt="Info Icon"
            />
          </div>
          <div className="flex items-center space-x-1 font-bold mt-1 text-error">
            <div data-testid="max-borrow-apy-list">
              {formatAsPercentage(pool.maxBorrowAPY)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/7 border border-[#FFFFFF08] p-4 rounded">
          <div className="flex items-center space-x-2">
            <p className="text-2xs xl:text-xs text-mist">Total Supplied</p>
            <Image
              style={{ color: "" }}
              src={InfoIcon}
              className="w-3 h-3"
              alt="Info Icon"
            />
          </div>
          <div className="flex items-center space-x-1 font-bold mt-1">
            <div data-testid="supplied-value">
              {formatCurrency(pool.suppliedValue)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/7 border border-[#FFFFFF08] p-4 rounded">
          <div className="flex items-center space-x-2">
            <p className="text-2xs xl:text-xs text-mist">Total Borrowed</p>
            <Image
              style={{ color: "" }}
              src={InfoIcon}
              className="w-3 h-3"
              alt="Info Icon"
            />
          </div>
          <div className="flex items-center space-x-1 font-bold mt-1">
            <div data-testid="borrowed-value">
              {formatCurrency(pool.borrowedValue)}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/5">
          <p className="text-2xs xl:text-xs text-mist">Accepted Collateral</p>
          <div className="flex lg:hidden xl:flex items-center space-x-1 mt-2">
            {pool.collaterals
              ?.slice(0, 3)
              .map((collateral: IToken, i: number) => (
                <div
                  key={i}
                  className="flex space-x-1 items-center collateral-chip rounded-full px-2 py-1"
                >
                  <div className="round-image w-max relative">
                    <Image
                      style={{ color: "" }}
                      src={collateral?.logo}
                      className="w-3 h-3 xl:h-4 xl:w-4 round-image"
                      alt={collateral?.symbol}
                      data-testid="collateral-logo-list"
                    />
                  </div>
                  <p className="text-sm">{collateral.symbol}</p>
                </div>
              ))}
            {pool.collaterals?.length > 3 && (
              <div className="rounded-full collateral-chip text-sm px-2 py-1">
                +{pool.collaterals.length - 3}
              </div>
            )}
          </div>
          <div className="hidden lg:flex xl:hidden items-center space-x-1 mt-2">
            {pool.collaterals
              ?.slice(0, 2)
              .map((collateral: IToken, i: number) => (
                <div
                  key={i}
                  className="flex space-x-1 items-center collateral-chip rounded-full px-2 py-1"
                >
                  <div className="round-image w-max relative">
                    <Image
                      style={{ color: "" }}
                      src={collateral?.logo}
                      className="w-3 h-3 xl:h-4 xl:w-4 round-image"
                      alt={collateral?.symbol}
                      data-testid="collateral-logo-list"
                    />
                  </div>
                  <p className="text-sm">{collateral.symbol}</p>
                </div>
              ))}
            {pool.collaterals?.length > 2 && (
              <div className="rounded-full collateral-chip text-sm px-2 py-1">
                +{pool.collaterals.length - 2}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="flex relative">
              <Image
                style={{ color: "" }}
                src={pool.asset?.logo}
                className="w-8 h-8 round-image"
                alt={pool.asset?.symbol}
                data-testid="asset-name-list-mobile"
              />
              <Image
                style={{ color: "" }}
                src={pool.asset?.sourceLogo}
                alt="icon image"
                className="absolute w-[14px] h-[14px] top-0 left-0"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div
                  className="tracking-widest text-sm font-bold"
                  data-testid="asset-symbol-list-mobile"
                >
                  {pool.asset?.symbol}
                </div>
                <div className="defi-box uppercase h-5 px-2 flex items-center justify-center text-3xs font-bold">
                  {pool.characterization}
                </div>
              </div>
              <div className="text-xs text-mist mt-0.5">
                Utilization: {formatAsPercentage(pool.maxBorrowAPY)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex flex-col border border-[#FFFFFF08] p-3 rounded">
            <div className="flex items-center space-x-1">
              <p className="text-3xs text-mist">Supply APR</p>
              <Image
                style={{ color: "" }}
                src={InfoIcon}
                className="w-2.5 h-2.5"
                alt="Info Icon"
              />
            </div>
            <div className="flex items-center font-bold mt-1 text-success text-xs">
              <div data-testid="max-supply-a-mobile">
                {formatAsPercentage(pool.maxSupplyAPY)}
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-[#FFFFFF08] p-3 rounded">
            <div className="flex items-center space-x-1">
              <p className="text-3xs text-mist">Borrow APR</p>
              <Image
                style={{ color: "" }}
                src={InfoIcon}
                className="w-2.5 h-2.5"
                alt="Info Icon"
              />
            </div>
            <div className="flex items-center font-bold mt-1 text-error text-xs">
              <div data-testid="max-borrow-apy-list-mobile">
                {formatAsPercentage(pool.maxBorrowAPY)}
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-[#FFFFFF08] p-3 rounded">
            <div className="flex items-center space-x-1">
              <p className="text-3xs text-mist">Total Supplied</p>
              <Image
                style={{ color: "" }}
                src={InfoIcon}
                className="w-2.5 h-2.5"
                alt="Info Icon"
              />
            </div>
            <div className="flex items-center font-bold mt-1 text-xs">
              <div data-testid="supplied-value-mobile">
                {formatCurrency(pool.suppliedValue)}
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-[#FFFFFF08] p-3 rounded">
            <div className="flex items-center space-x-1">
              <p className="text-3xs text-mist">Total Borrowed</p>
              <Image
                style={{ color: "" }}
                src={InfoIcon}
                className="w-2.5 h-2.5"
                alt="Info Icon"
              />
            </div>
            <div className="flex items-center font-bold mt-1 text-xs">
              <div data-testid="borrowed-value-mobile">
                {formatCurrency(pool.borrowedValue)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-3xs text-mist mb-2">Accepted Collateral</p>
          <div className="flex flex-wrap gap-1">
            {pool.collaterals
              ?.slice(0, 3)
              .map((collateral: IToken, i: number) => (
                <div
                  key={i}
                  className="flex space-x-1 items-center collateral-chip rounded-full px-2 py-0.5"
                >
                  <div className="round-image w-max relative">
                    <Image
                      style={{ color: "" }}
                      src={collateral?.logo}
                      className="w-3 h-3 round-image"
                      alt={collateral?.symbol}
                      data-testid="collateral-logo-list-mobile"
                    />
                  </div>
                  <p className="text-xs">{collateral.symbol}</p>
                </div>
              ))}
            {pool.collaterals?.length > 3 && (
              <div className="rounded-full collateral-chip text-xs px-2 py-0.5">
                +{pool.collaterals.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Link href={`/markets/${pool.pool}`} passHref prefetch={true}>
        {layout === "grid" ? renderGridView() : renderListView()}
      </Link>
    </React.Fragment>
  );
};
