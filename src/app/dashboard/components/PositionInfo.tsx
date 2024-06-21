"use client";
import React, { useState } from "react";
import { RouteCard } from "@/components/cards";
import { PositionSummary } from "./PositionSummary";

interface PositionInfoProps {
  isWalletConnected: boolean;
}

export const PositionInfo = ({ isWalletConnected }: PositionInfoProps) => {
  const [activeTab, setActiveTab] = useState("Position Overview");
  const routePaths = ["Position Overview", "Transaction History"];

  const pageTabs = [
    {
      name: "Position Overview",
      info: "",
      tab: <PositionSummary isWalletConnected={isWalletConnected} />,
    },
    {
      name: "Transaction History",
      info: "",
      tab: <div className="text-white">Transaction Tab</div>,
    },
  ];

  return (
    <div>
      <RouteCard
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        routeInfo=""
        routhPaths={routePaths}
      />
      {pageTabs.map((item, index) =>
        activeTab === item.name ? (
          <div key={index} className="mt-6">
            {item.tab}
          </div>
        ) : null
      )}
    </div>
  );
};
