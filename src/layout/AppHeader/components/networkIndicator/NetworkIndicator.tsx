import React from "react";

export const NetworkIndicator = ({
  network,
  account,
  isWrongNetwork,
}: {
  network: string;
  account: string | undefined;
  isWrongNetwork: boolean;
}) => {
  return (
    <div
      className="flex items-center font-bold gap-x-2"
      data-testid="network-indicator"
    >
      <div className="text-mist text-3xs lg:text-sm xl:text-lg">Network: </div>
      <div className="relative flex gap-x-1.5 items-center network-indicator">
        <div
          className={`h-[6px] w-[6px] lg:w-2 lg:h-2 rounded-full ${account && !isWrongNetwork ? "bg-success" : "bg-transparent w-2 h-2 border-[1.5px] border-error rounded-full"}`}
          data-testid="network-status-circle"
        ></div>
        <span
          className="text-2xs lg:text-sm xl:text-lg"
          data-testid="app-network"
        >
          {network}
        </span>
        <div className="tooltip">
          {isWrongNetwork
            ? `Not Conected to ${network}`
            : `Conected to ${network}`}
        </div>
      </div>
    </div>
  );
};
