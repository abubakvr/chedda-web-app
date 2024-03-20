import React from "react";
import LinkOut from "@/assets/icon/link-out.svg";
import Image from "next/image";
import { formatLargeNumber, parseBigNumberToFloat } from "@/utils/formatters";

export const RewardsCard = () => {
  return (
    <div className="w-full">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          STAKE INFORMATION
        </div>
        <button className="flex gap-x-1 border-2 rounded-md py-[6px] px-3 border-[#ffffff60] hover:opacity-70">
          <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[10px]">
            Staking Pool
          </div>
          <Image src={LinkOut} alt="link out" />
        </button>
      </div>
      <div className="p-8 pb-0 text-white">
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">
            Annual Percentage Rate{" "}
          </div>
          <div className="text-sm font-bold">4.97%</div>
        </div>
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">Total Staked</div>
          <div className="font-bold">30 USDC</div>
        </div>
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">
            Percentage of LP Staked
          </div>
          <div className="font-bold">50 USDC</div>
        </div>
        <div className="flex justify-between text-sm pb-5">
          <div className="opacity-50 font-semibold">
            Underlying Asset Amount
          </div>
          <div className="font-bold">50 USDC</div>
        </div>
        <div className="flex justify-between text-sm ">
          <div className="opacity-50 font-semibold">Stakers</div>
          <div className="font-bold">123</div>
        </div>
      </div>
    </div>
  );
};
