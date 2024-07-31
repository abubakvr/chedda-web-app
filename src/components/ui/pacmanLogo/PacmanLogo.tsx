import React from "react";
import "@/styles/pacman-loader.scss";

export const PacmanLogo = () => {
  return (
    <div className="pacman-logo" data-testid="pacman-logo">
      <div className="logo w-[10px] h-[10px] md:w-[8px] md:h-[8px] lg:w-[10px] lg:h-[10px]">
        <svg
          data-testid="logo-svg"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.4776 10.3006L18.8514 15.9998L31.4777 21.699C29.1813 27.7216 23.3515 32 16.5225 32C7.6859 32 0.522461 24.8366 0.522461 16C0.522461 7.16344 7.6859 0 16.5225 0C23.3514 0 29.1811 4.27821 31.4776 10.3006Z"
            fill="#EFD53D"
          />
        </svg>
      </div>
      <div className="flex ml-1 lg:ml-2 space-x-2 md:space-x-1 lg:space-x-1.5">
        <div
          className="circle-pac w-[4px] h-[4px] md:w-[3px] md:h-[3px] lg:w-[4px] lg:h-[4px]"
          data-testid="circle-pac"
        ></div>
        <div
          className="circle-pac w-[4px] h-[4px] md:w-[3px] md:h-[3px] lg:w-[4px] lg:h-[4px]"
          data-testid="circle-pac"
        ></div>
        <div
          className="circle-pac w-[4px] h-[4px] md:w-[3px] md:h-[3px] lg:w-[4px] lg:h-[4px]"
          data-testid="circle-pac"
        ></div>
        <div
          className="circle-pac w-[4px] h-[4px] md:w-[3px] md:h-[3px] lg:w-[4px] lg:h-[4px] md:hidden lg:flex"
          data-testid="circle-pac"
        ></div>
      </div>
    </div>
  );
};
