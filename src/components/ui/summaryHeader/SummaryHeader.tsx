import React from "react";
import backIcon from "@/assets/icon/back-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IToken } from "@/utils/types";

interface SummaryProps {
  asset: IToken | undefined;
  poolName: string | undefined;
}

export const SummaryHeader = ({ asset, poolName }: SummaryProps) => {
  const router = useRouter();

  const navigateToMarkets = () => {
    router.push("/markets");
  };

  return (
    <div className="flex items-center" data-testid="summary-header">
      <button
        className="text-white hover:opacity-80 mr-4 xl:mr-5"
        onClick={navigateToMarkets}
        data-testid="back-button"
      >
        <Image
          src={backIcon}
          className="w-9 h-7 lg:h-10 lg:w-12 xl:h-12 xl:w-14"
          alt="Back icon"
          data-testid="back-icon"
          priority={true}
        />
      </button>
      {poolName && asset ? (
        <div className="gap-x-3 xl:gap-x-2 flex items-center">
          <div className="flex relative">
            <Image
              src={asset.logo}
              width={30}
              className="h-8 w-8 xl:h-10 xl:w-10"
              alt="coin Logo"
              data-testid="coin-logo"
              priority={true}
            />
            <Image
              src={asset.sourceLogo}
              alt="icon image"
              className="absolute w-[14px] h-[14px] xl:w-[18px] xl:h-[18px] top-0 left-0"
            />
          </div>
          <div
            className="text-white text-xl: md:text-2xl xl:text-[32px] font-bold"
            data-testid="asset-name"
          >
            {poolName}
          </div>
        </div>
      ) : (
        <div className="flex rounded animate-pulse">
          <div className="h-10 bg-blue-400 rounded-md dark:bg-blue-400 opacity-20 w-48"></div>
        </div>
      )}
    </div>
  );
};
