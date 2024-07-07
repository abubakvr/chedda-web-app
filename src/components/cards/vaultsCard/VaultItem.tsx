import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfoIcon from "@/assets/icon/info-icon.svg";
import stableIcon from "@/assets/icon/stable-icon.svg";
import defiIcon from "@/assets/icon/defi-icon.svg";
import gamefiIcon from "@/assets/icon/gamefi-icon.svg";
import bluechipIcon from "@/assets/icon/stable-icon.svg";
import {
  formatAsPercentage,
  formatCurrency,
  formatLargeNumber,
} from "@/utils/formatters";
import { IPoolStatsResponse, IToken } from "@/utils/types";
import { MobileVaultItem } from "./MobileVaultItem";

const poolFilters = [
  { keyword: "Stable Coin", icon: stableIcon },
  { keyword: "Defi", icon: defiIcon },
  { keyword: "Gamefi", icon: gamefiIcon },
  { keyword: "Bluechip", icon: bluechipIcon },
];

export const VaultItem = ({ pool }: { pool: IPoolStatsResponse }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [showEllipses, setShowEllipses] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    const handleShowEllipses = () => {
      if (element) {
        const hasVerticalOverflow = element.scrollHeight > element.clientHeight;

        if (hasVerticalOverflow) {
          setShowEllipses(true);
        } else {
          setShowEllipses(false);
        }
      }
    };

    handleShowEllipses();
    window.addEventListener("resize", handleShowEllipses);

    return () => {
      window.removeEventListener("resize", handleShowEllipses);
    };
  }, []);

  const itemFilter = poolFilters.find(
    (filter) => filter.keyword?.toLowerCase() === pool.categories[0]
  );

  return (
    <React.Fragment>
      <Link href={`/markets/${pool.pool}`} passHref>
        <div
          data-testid="vault-item"
          className="market-card pool-card rounded-lg w-full px-7 py-5 text-white hover:opacity-90 cursor-pointer p-6 transition-all"
        >
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src={pool.asset?.logo}
                className="h-8 w-8 "
                alt={pool.asset?.symbol}
                data-testid="asset-name"
              />
              <div
                className="tracking-widest text-lg font-bold"
                data-testid="asset-symbol"
              >
                {pool.asset?.symbol}
              </div>
              <div className="defi-box uppercase h-6 w-20 flex items-center justify-center text-[10px] font-bold">
                {pool.characterization}
              </div>
            </div>
            <div>
              <Image src={itemFilter?.icon} alt="characterization" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-[#FFFFFF70]">Collateral</p>
            <div className="flex gap-x-3 items-center">
              <div className="flex w-max mt-2">
                {pool.collaterals?.map((collateral: IToken, i: number) => (
                  <div key={i} className="-ml-[4px] round-image w-max">
                    <Image
                      src={collateral?.logo}
                      className="h-10 w-10 round-image"
                      alt={collateral?.symbol}
                      data-testid="collateral-logo"
                    />
                  </div>
                ))}
              </div>
              <div
                ref={elementRef}
                className={`w-full font-bold flex flex-wrap gap-x-1 text-ellipsis overflow-hidden`}
                data-testid="collaterals-list"
              >
                {pool.collaterals?.map((collateral: IToken, i: number) => (
                  <div
                    className="flex text-sm font-bold justify-start items-start text-ellipsis"
                    key={i}
                  >
                    {collateral?.symbol}
                    {i !== pool?.collaterals.length - 1 && <span>,</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="my-4 opacity-90 border-b border-[#7F56D9]"></div>
          <div className="grid grid-cols-2">
            <div className="colspan-1">
              <div>
                <p className="text-xs text-[#FFFFFF70]">Supply APR</p>
                <div className="mt-2 text-lg flex items-center space-x-2 font-bold">
                  <div data-testid="max-supply-apy">
                    {formatAsPercentage(pool.maxSupplyAPY)}
                  </div>
                  <Image src={InfoIcon} className="w-4 h-4" alt="Info Icon" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-[#FFFFFF70]">Supplied</p>
                <div className="mt-2 text-lg items-center font-bold">
                  <div data-testid="supplied">
                    {formatLargeNumber(pool.supplied)} {pool.asset?.symbol}
                  </div>
                  <div
                    className="opacity-50 text-xs mt-0.5"
                    data-testid="supplied-value"
                  >
                    {formatCurrency(pool.suppliedValue)}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-[#FFFFFF70]">Utilization</p>
                <div className="mt-2 text-lg flex items-center font-bold">
                  <div data-testid="utilization">
                    {formatAsPercentage(pool.utilization)}
                  </div>
                </div>
              </div>
            </div>
            <div className="colspan-1">
              <div>
                <p className="text-xs text-[#FFFFFF70]">Borrow APR</p>
                <div className="mt-2 text-lg flex items-center space-x-2 font-bold">
                  <div data-testid="max-borrow-apy">
                    {formatAsPercentage(pool.maxBorrowAPY)}
                  </div>
                  <Image src={InfoIcon} className="w-4 h-4" alt="Info Icon" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-[#FFFFFF70]">Borrowed</p>
                <div className="mt-2 text-lg items-center font-bold7tt ">
                  <div data-testid="borrowed">
                    {formatLargeNumber(pool.borrowed)} {pool.asset?.symbol}
                  </div>
                  <div
                    className="opacity-50 text-xs mt-0.5"
                    data-testid="borrowed-value"
                  >
                    {formatCurrency(pool.borrowedValue)}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-[#FFFFFF70]">Rewards APR</p>
                <div className="mt-2 text-lg flex items-center font-bold card-gradient-text ">
                  <div data-testid="rewards">
                    {formatAsPercentage(pool.rewardsAPY)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <MobileVaultItem pool={pool} />
    </React.Fragment>
  );
};
