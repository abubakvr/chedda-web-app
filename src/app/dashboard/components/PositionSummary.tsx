import React from "react";

export const PositionSummary = () => {
  return (
    <div className="bg-[#14132D] text-white p-8 rounded-lg shadow-lg flex pool-card w-full">
      <div className="hazy-bg flex p-7 w-full">
        <div className="mb-4 px-8 w-max flex-grow">
          <h2 className="text-2xl font-bold">Position Summary</h2>
          <p className="text-lg text-gray-400 mt-6">
            Review your overall portfolio value here. <br />
            You can manage positions from the Markets page.
          </p>
        </div>
        <div className="px-7 flex-grow">
          <div className="flex justify-between items-center text-center pt-4">
            <div>
              <p className="text-sm text-[#FFFFFF70] font-bold">Net Value</p>
              <p className="text-xl card-gradient-text mt-1 font-bold">
                $1,163.66
              </p>
            </div>
            <div>
              <p className="text-sm text-[#FFFFFF70] font-bold">
                Total Supplied
              </p>
              <p className="text-xl mt-1 font-bold">$677.44</p>
            </div>
            <div>
              <p className="text-sm text-[#FFFFFF70] font-bold">
                Total Borrowed
              </p>
              <p className="text-xl font-bold mt-1">$486.22</p>
            </div>
            <div>
              <p className="text-sm text-[#FFFFFF70] font-bold">Locked</p>
              <p className="text-xl font-bold mt-1">$23.32</p>
            </div>
          </div>
          <div className="w-full mt-16 flex ">
            <div className="h-1 bg-[#36C693] w-full"></div>
            <div className="h-1 bg-[#F4C042]  w-full"></div>
            <div className="h-1 bg-[#885AF8]  w-full"></div>
            <div className="h-1 bg-[#4ACBD3]  w-full"></div>
          </div>
          <div className="flex justify-between items-center text-center mt-5">
            <div className="flex items-center font-bold text-sm gap-x-2">
              <span className="w-3 h-3 bg-[#36C693] rounded-full"></span>
              <p className=" text-[#FFFFFF70]">USDT</p>
              <p className=" text-[#FDFDFD]">$25,539</p>
            </div>
            <div className="flex items-center font-bold text-sm gap-x-1">
              <span className="w-3 h-3 bg-[#F4C042] rounded-full"></span>
              <p className="text-[#FFFFFF70]">USDC</p>
              <p className="text-[#FDFDFD]">$25,539</p>
            </div>
            <div className="flex items-center font-bold text-sm gap-x-1">
              <span className="w-3 h-3 bg-[#885AF8] rounded-full"></span>
              <p className="text-[#FFFFFF70]">ETH</p>
              <p className="text-[#FDFDFD]">$12,043</p>
            </div>
            <div className="flex items-center font-bold text-sm gap-x-1">
              <span className="w-3 h-3 bg-[#4ACBD3] rounded-full"></span>
              <p className="text-[#FFFFFF70]">USDC.e</p>
              <p className="text-[#FDFDFD]">$5,534.6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
