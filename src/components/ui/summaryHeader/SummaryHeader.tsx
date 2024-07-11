import React from "react";
import backIcon from "@/assets/icon/back-icon.svg";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface SummaryProps {
  logoSrc?: StaticImageData;
  assetName?: string;
}

export const SummaryHeader = ({ logoSrc, assetName }: SummaryProps) => {
  const router = useRouter();

  const navigateToMarkets = () => {
    router.push("/markets");
  };

  return (
    <div className="flex items-center" data-testid="summary-header">
      <button
        className="text-white hover:opacity-80 mr-5"
        onClick={navigateToMarkets}
        data-testid="back-button"
      >
        <Image
          src={backIcon}
          className="h-12 w-14 hidden lg:flex"
          alt="Back icon"
          data-testid="back-icon"
          priority={true}
        />
      </button>
      {assetName && logoSrc ? (
        <div className="gap-x-2 flex items-center">
          <Image
            src={logoSrc}
            width={30}
            className="h-10 w-10 hidden lg:flex"
            alt="coin Logo"
            data-testid="coin-logo"
            priority={true}
          />
          <div
            className="text-white text-[32px] font-bold"
            data-testid="asset-name"
          >
            {assetName}
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
