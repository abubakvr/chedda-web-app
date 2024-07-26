import { ISummaryStats } from "@/utils/types";
import React from "react";

export const MobileSummaryCard = ({
  aggregateStats,
}: {
  aggregateStats: ISummaryStats[] | undefined;
}) => {
  return (
    <div className="pool-card rounded-lg p-4 bg-gray-800 text-white w-full">
      <div className="flex justify-between border-b  border-[#51D5FA30] pb-3">
        {aggregateStats?.slice(0, 3).map((item, index) => (
          <div key={index} className="space-y-2 w-24">
            <p className="text-[10px] text-[#FFFFFF70]">{item.title}</p>
            <p className="text-sm font-bold">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        {aggregateStats?.slice(3, 6).map((item, index) => (
          <div key={index} className="space-y-2 w-24">
            <p className="text-[10px] text-[#FFFFFF70]">{item.title}</p>
            <p
              className={`text-sm font-bold ${index >= 1 && "card-gradient-text"}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
