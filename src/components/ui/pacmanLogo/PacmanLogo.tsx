import React from "react";
import "@/styles/pacman-loader.scss";

export const PacmanLogo = () => {
  return (
    <div
      className="absolute justify-center pacman-logo"
      data-testid="pacman-logo"
    >
      <div className="logo">
        <svg
          data-testid="logo-svg"
          width="10"
          height="10"
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
      <div className="flex ml-2 space-x-2">
        <div className="circle-pac" data-testid="circle-pac"></div>
        <div className="circle-pac" data-testid="circle-pac"></div>
        <div className="circle-pac" data-testid="circle-pac"></div>
        <div className="circle-pac" data-testid="circle-pac"></div>
      </div>
    </div>
  );
};
