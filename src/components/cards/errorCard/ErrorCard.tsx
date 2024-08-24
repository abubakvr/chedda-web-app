"use client";
import React from "react";

const refreshPage = () => {
  window.location.reload();
};

export const ErrorCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pool-card relative w-full flex gap-x-1 items-center justify-center rounded-lg p-6 md:p-5 text-white text-center text-xs md:text-sm lg:text-lg">
      <p>{children}</p>
      <button
        onClick={() => refreshPage()}
        className="w-max relative card-gradient-text underline text-[8px] md:text-xs lg:text-sm font-bold hover:opacity-90"
        data-testid="refresh-button"
      >
        Refresh page
        <div className="w-full h-[1.5px] rounded route-active-bar"></div>
      </button>
    </div>
  );
};
