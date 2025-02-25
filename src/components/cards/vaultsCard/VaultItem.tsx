import React from "react";
import Link from "next/link";
import InfoIcon from "@/assets/icon/info-icon.svg";
import GradientInfoIcon from "@/assets/icon/gradient-info-icon.svg";
import stableIcon from "@/assets/icon/stable-icon.svg";
import defiIcon from "@/assets/icon/defi-icon.svg";
import gamefiIcon from "@/assets/icon/gamefi-icon.svg";
import bluechipIcon from "@/assets/icon/bluechip-icon.svg";
import {
  formatAsPercentage,
  formatCurrency,
  formatLargeNumber,
} from "@/utils/formatters";
import { IPoolStatsResponse, IToken } from "@/utils/types";
import Image from "next/image";

const poolFilters = [
  { keyword: "Stable Coin", icon: stableIcon },
  { keyword: "Defi", icon: defiIcon },
  { keyword: "Gamefi", icon: gamefiIcon },
  { keyword: "Bluechip", icon: bluechipIcon },
  { keyword: "Memes", icon: defiIcon },
];

export const VaultItem = ({ pool }: { pool: IPoolStatsResponse }) => {
  const itemFilter = poolFilters.find(
    (filter) => filter.keyword?.toLowerCase() === pool.categories[0]
  );

  return (
    <React.Fragment>
      <Link href={`/markets/${pool.pool}`} passHref prefetch={true}>
        <div
          data-testid="vault-item"
          className="market-card rounded-lg w-full xl:px-7 xl:py-5 text-white hover:opacity-90 cursor-pointer p-4 xl:p-6 transition-all"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <div className="flex relative">
                <Image
                  style={{ color: "" }}
                  src={pool.asset?.logo}
                  className="w-8 h-8 xl:h-10 xl:w-10 round-image"
                  alt={pool.asset?.symbol}
                  data-testid="asset-name"
                />
                <Image
                  style={{ color: "" }}
                  src={pool.asset?.sourceLogo}
                  alt="icon image"
                  className="absolute w-[14px] h-[14px] xl:w-[18px] xl:h-[18px] top-0 left-0"
                />
              </div>
              <div
                className="tracking-widest text-xs xl:text-lg font-bold"
                data-testid="asset-symbol"
              >
                {pool.asset?.symbol}
              </div>
              <div className="defi-box uppercase h-5 xl:h-6 px-2 flex items-center justify-center text-3xs md:text-2xs font-bold">
                {pool.characterization}
              </div>
            </div>
            <div>
              <Image
                style={{ color: "" }}
                src={itemFilter?.icon}
                alt="characterization"
                className="w-6 h-6 xl:w-8 xl:h-8"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xs lg:text-xs text-mist">Collateral</p>
            <div className="flex gap-x-3 items-center">
              <div className="flex w-max mt-2 ml-1">
                {pool.collaterals?.map((collateral: IToken, i: number) => {
                  return (
                    <div
                      key={i}
                      className="-ml-[4px] round-image w-max relative"
                    >
                      <Image
                        style={{ color: "" }}
                        src={collateral?.logo}
                        className="w-8 h-8 xl:h-10 xl:w-10 round-image"
                        alt={collateral?.symbol}
                        data-testid="collateral-logo"
                      />
                      <Image
                        style={{ color: "" }}
                        src={collateral?.sourceLogo}
                        alt={collateral?.symbol}
                        className="absolute w-[14px] h-[14px] xl:w-[18px] xl:h-[18px] top-0 left-0"
                      />
                    </div>
                  );
                })}
              </div>
              <div
                className={`w-full font-bold flex flex-wrap gap-x-1 items-center text-ellipsis overflow-hidden`}
                data-testid="collaterals-list"
              >
                {pool.collaterals?.map((collateral: IToken, i: number) => (
                  <div
                    className="flex text-xs lg:text-sm font-bold justify-start items-center text-ellipsis"
                    key={i}
                  >
                    {collateral?.symbol}
                    {i !== pool?.collaterals.length - 1 && <span>,</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="my-4 opacity-90 border-b border-accent-purple"></div>
          <div className="grid grid-cols-2">
            <div className="colspan-1">
              <div>
                <p className="text-2xs xl:text-xs text-mist">Supply APR</p>
                <div className="mt-2 text-sm xl:text-lg flex items-center space-x-1 font-bold">
                  <div data-testid="max-supply-apy">
                    {formatAsPercentage(pool.maxSupplyAPY)}
                  </div>
                  <Image
                    style={{ color: "" }}
                    src={InfoIcon}
                    className="w-3 h-3"
                    alt="Info Icon"
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-6">
                <p className="text-2xs xl:text-xs text-mist">Supplied</p>
                <div className="mt-2 text-sm xl:text-lg items-center font-bold">
                  <div data-testid="supplied">
                    {formatLargeNumber(pool.supplied)} {pool.asset?.symbol}
                  </div>
                  <div
                    className="opacity-50 text-xs mt-0.5"
                    data-testid="supplied-value"
                  >
                    ({formatCurrency(pool.suppliedValue)})
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-6">
                <p className="text-2xs xl:text-xs text-mist">Utilization</p>
                <div className="mt-2 text-sm xl:text-lg flex items-center font-bold">
                  <div data-testid="utilization">
                    {formatAsPercentage(pool.utilization)}
                  </div>
                </div>
              </div>
            </div>
            <div className="colspan-1">
              <div>
                <p className="text-2xs xl:text-xs text-mist">Borrow APR</p>
                <div className="mt-2 text-sm xl:text-lg flex items-center space-x-1 font-bold">
                  <div data-testid="max-borrow-apy">
                    {formatAsPercentage(pool.maxBorrowAPY)}
                  </div>
                  <Image
                    style={{ color: "" }}
                    src={InfoIcon}
                    className="w-3 h-3"
                    alt="Info Icon"
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-6">
                <p className="text-2xs xl:text-xs text-mist">Borrowed</p>
                <div className="mt-2 text-sm lg:text-lg items-center font-bold">
                  <div data-testid="borrowed">
                    {formatLargeNumber(pool.borrowed)} {pool.asset?.symbol}
                  </div>
                  <div
                    className="opacity-50 text-xs mt-0.5"
                    data-testid="borrowed-value"
                  >
                    ({formatCurrency(pool.borrowedValue)})
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-6">
                <p className="text-2xs xl:text-xs text-mist">Rewards APR</p>
                <div className="mt-2 text-sm xl:text-lg flex items-center space-x-1 font-bold card-gradient-text ">
                  <div data-testid="rewards">
                    {formatAsPercentage(pool.rewardsAPY)}
                  </div>
                  <Image
                    style={{ color: "" }}
                    src={GradientInfoIcon}
                    className="w-3 h-3"
                    alt="Info Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};
