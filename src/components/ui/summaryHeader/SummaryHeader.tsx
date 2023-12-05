import React from "react";
import backIcon from "@/assets/icon/back-icon.svg";
import Image, { StaticImageData } from "next/image";

interface ReusableComponentProps {
  navigateBack: () => void;
  logoSrc: StaticImageData;
  assetName: string;
}

export const SummaryHeader = ({
  navigateBack,
  logoSrc,
  assetName,
}: ReusableComponentProps) => {
  return (
    <div
      className="flex space-x-3 mt-5 items-center"
      data-testid="summary-header"
    >
      <button
        className="text-white hover:opacity-80"
        onClick={navigateBack}
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
      <Image
        src={logoSrc}
        width={30}
        className="h-10 w-10 hidden lg:flex"
        alt="coin Logo"
        data-testid="coin-logo"
        priority={true}
      />
      <div
        className="text-white text-2xl tracking-normal uppercase font-semibold"
        data-testid="asset-name"
      >
        {assetName}
      </div>
    </div>
  );
};
