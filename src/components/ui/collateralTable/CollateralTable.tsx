import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo } from "react";
import InfoIcon from "@/assets/icon/info-icon.svg";
import { IFormattedCollateral } from "@/utils/types";
import { formatCurrency } from "@/utils/formatters";

interface ICollateralHeaderItems {
  name: string;
  info?: string;
}

interface CollateralTableProps {
  collateralHeaderItems: ICollateralHeaderItems[];
  collateralInfo?: IFormattedCollateral[];
}

export const CollateralTable: React.FC<CollateralTableProps> = ({
  collateralHeaderItems,
  collateralInfo = [],
}) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [columnWidths, setColumnWidths] = useState<string[]>([]);

  // Calculate column distribution once the component mounts and when data changes
  useEffect(() => {
    const calculateColumnWidths = () => {
      if (!tableContainerRef.current) return;

      const containerWidth = tableContainerRef.current.clientWidth - 40; // Subtract padding

      // Define relative weighting for each column
      const columnWeights = [1.5, 1.2, 1.2, 0.8, 0.8, 0.8, 0.8]; // Adjust these values to change column widths

      // Calculate the total weight
      const totalWeight = columnWeights.reduce(
        (sum, weight) => sum + weight,
        0
      );

      // Calculate width for each column based on its weight
      const widths = columnWeights.map(
        (weight) => `${((weight / totalWeight) * 100).toFixed(2)}%`
      );

      setColumnWidths(widths);
    };

    // Initial calculation
    calculateColumnWidths();

    // Recalculate on window resize
    window.addEventListener("resize", calculateColumnWidths);

    return () => {
      window.removeEventListener("resize", calculateColumnWidths);
    };
  }, []);

  const formattedCollateralInfo = useMemo(() => {
    return collateralInfo.map((item) => ({
      ...item,
      value: formatCurrency(item.value),
      myCollateralValue: item.myCollateralValue
        ? formatCurrency(item.myCollateralValue)
        : "",
    }));
  }, [collateralInfo]);

  return (
    <div ref={tableContainerRef} className="w-full flex flex-col">
      {/* Table Header */}
      <div className="w-full hidden md:flex h-10 rounded mt-4 bg-[#ffffff05] px-5 items-center text-white justify-between">
        {collateralHeaderItems.map((item, index) => (
          <div
            key={index}
            style={{ width: columnWidths[index] || "auto" }}
            className="relative flex items-center space-x-1.5 text-mist text-2xs lg:text-xs font-bold"
            data-testid={`collateral-header-item-${index}`}
          >
            <span>{item.name}</span>
            {item.info && (
              <div className="group relative cursor-pointer">
                <Image alt="info-icon" src={InfoIcon} className="w-3 h-3" />
                <div className="absolute z-10 hidden group-hover:block bg-[#00000050] border border-[#00000005] text-white text-2xs px-2 py-1 rounded top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                  {item.info}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Table Rows */}
      <div className="hidden md:flex flex-col px-4 mt-4 w-full">
        {formattedCollateralInfo.map((item, rowIndex) => (
          <div
            className="flex items-center text-white text-sm mt-3 w-full justify-between"
            key={rowIndex}
            data-testid={`collateral-item-${rowIndex}`}
          >
            {/* Asset column */}
            <div
              style={{ width: columnWidths[0] || "auto" }}
              className="flex-shrink-0"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex relative">
                  <Image
                    src={item.asset.logo}
                    alt={item.asset.name}
                    className="w-8 h-8 xl:w-10 xl:h-10"
                    data-testid={`collateral-item-logo-${rowIndex}`}
                  />
                  {item.asset.sourceLogo && (
                    <Image
                      src={item.asset.sourceLogo}
                      alt="icon image"
                      className="absolute w-[14px] h-[14px] xl:w-[18px] xl:h-[18px] top-0 left-0"
                    />
                  )}
                </div>
                <div className="font-bold text-xs">{item.asset.symbol}</div>
              </div>
            </div>

            {/* Amount deposited column */}
            <div
              style={{ width: columnWidths[1] || "auto" }}
              className="flex-shrink-0 flex flex-col text-xs"
            >
              <span className="font-bold">
                {item.amountDeposited} {item.asset.symbol}
              </span>
              <span className="text-mist mt-1">{item.value}</span>
            </div>

            {/* My collateral amount column */}
            <div
              style={{ width: columnWidths[2] || "auto" }}
              className="flex-shrink-0 flex flex-col text-xs"
            >
              <span className="font-bold">
                {item.myCollateralAmount} {item.asset.symbol}
              </span>
              <span className="text-mist mt-1">{item.myCollateralValue}</span>
            </div>
            <div
              style={{ width: columnWidths[3] || "auto" }}
              className="flex-shrink-0 text-xs"
              data-testid={`ltv-${rowIndex}`}
            >
              <span className="font-bold">{item.ltv}</span>
            </div>
            <div
              style={{ width: columnWidths[4] || "auto" }}
              className="flex-shrink-0 text-xs"
              data-testid={`lltv-${rowIndex}`}
            >
              <span className="font-bold">{item.lltv}</span>
            </div>
            <div
              style={{ width: columnWidths[5] || "auto" }}
              className="flex-shrink-0 text-xs"
              data-testid={`bonus-${rowIndex}`}
            >
              <span className="font-bold">{item.bonus}</span>
            </div>
            <div
              style={{ width: columnWidths[6] || "auto" }}
              className="flex-shrink-0 text-xs"
              data-testid={`penalty-${rowIndex}`}
            >
              <span className="font-bold">{item.penalty}</span>
            </div>
          </div>
        ))}
      </div>

      {/** Mobile View */}
      <div className="md:hidden mt-4 border rounded-lg  text-mist border-frost bg-glass">
        {formattedCollateralInfo?.map((item, index) => {
          return (
            <div
              className="justify-between text-white text-sm mt-3 p-4 border-b border-frost"
              key={index}
              data-testid={`mobile-collateral-item-${index}`}
            >
              <div className="flex items-center gap-x-2">
                <div className="flex relative">
                  <Image
                    style={{ color: "" }}
                    src={item.asset.logo}
                    alt={item.asset.name}
                    className="w-8 h-8 xl:w-10 xl:h-10"
                    data-testid={`mobile-collateral-item-logo-${index}`}
                  />
                  <Image
                    style={{ color: "" }}
                    src={item.asset?.sourceLogo}
                    alt="icon image"
                    className="absolute w-[14px] h-[14px] xl:w-[18px] xl:h-[18px] top-0 left-0"
                  />
                </div>
                <div className="font-bold text-xs xl:text-sm">
                  {item.asset.symbol}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-2xs text-mist">
                  <span>Deposited</span>
                </div>
                <div className="flex flex-col items-end text-2xs">
                  <span className="font-bold">
                    {item.amountDeposited} {item.asset.symbol}
                  </span>
                  <span className="text-mist">{item.value}</span>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-2xs text-mist">
                  <span>My Deposits</span>
                </div>
                <div className="flex flex-col items-end text-2xs">
                  <span className="font-bold">
                    {item.myCollateralAmount} {item.asset.symbol}
                  </span>
                  <span className="text-mist">{item.myCollateralValue}</span>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex gap-x-1.5 items-center text-2xs text-mist">
                  <span>LTV</span>
                  <div className="group relative cursor-pointer">
                    <Image
                      alt="info-icon"
                      src={InfoIcon}
                      className="w-2.5 h-2.5"
                    />
                    <div className="absolute z-10 hidden group-hover:block bg-[#00000050] border border-[#00000005] text-white text-2xs px-2 py-1 rounded top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                      Loan to value ratio
                    </div>
                  </div>
                </div>
                <div
                  className="pl-1 text-2xs"
                  data-testid={`mobile-collateral-factor-${index}`}
                >
                  <span className="font-bold">{item.ltv}</span>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <div className="flex gap-x-1.5 items-center text-2xs text-mist">
                  <span>LLTV</span>
                  <div className="group relative cursor-pointer">
                    <Image
                      alt="info-icon"
                      src={InfoIcon}
                      className="w-2.5 h-2.5"
                    />
                    <div className="absolute z-10 hidden group-hover:block bg-[#00000050] border border-[#00000005] text-white text-2xs px-2 py-1 rounded top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                      Liquidation loan to value ratio.
                    </div>
                  </div>
                </div>
                <div
                  className="pl-1 text-2xs"
                  data-testid={`mobile-collateral-factor-${index}`}
                >
                  <span className="font-bold">{item.lltv}</span>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <div className="flex gap-x-1.5 items-center text-2xs text-mist">
                  <span>Liq. Bonus</span>
                  <div className="group relative cursor-pointer">
                    <Image
                      alt="info-icon"
                      src={InfoIcon}
                      className="w-2.5 h-2.5"
                    />
                    <div className="absolute z-10 hidden group-hover:block bg-[#00000050] border border-[#00000005] text-white text-2xs px-2 py-1 rounded top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                      Liquidation Bonus
                    </div>
                  </div>
                </div>
                <div
                  className="pl-1 text-2xs"
                  data-testid={`mobile-collateral-factor-${index}`}
                >
                  <span className="font-bold">{item.bonus}</span>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <div className="flex gap-x-1.5 items-center text-2xs text-mist">
                  <span>Liq. Penalty</span>
                  <div className="group relative cursor-pointer">
                    <Image
                      alt="info-icon"
                      src={InfoIcon}
                      className="w-2.5 h-2.5"
                    />
                    <div className="absolute z-10 hidden group-hover:block bg-[#00000050] border border-[#00000005] text-white text-2xs px-2 py-1 rounded top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                      Liquidation Penalty
                    </div>
                  </div>
                </div>
                <div
                  className="pl-1 text-2xs"
                  data-testid={`mobile-collateral-factor-${index}`}
                >
                  <span className="font-bold">{item.penalty}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
