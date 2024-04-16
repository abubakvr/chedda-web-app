import React from "react";

export const NetworkIndicator = ({
  network,
  account,
}: {
  network: string;
  account: string | undefined;
}) => {
  return (
    <div
      className="flex items-center font-bold gap-x-2"
      data-testid="network-indicator"
    >
      <div className="text-[#ffffff70] text-lg">Network: </div>
      <div className="flex gap-x-1.5 items-center">
        {account && (
          <div
            className="w-2 h-2 rounded-full bg-success"
            data-testid="network-status-circle"
          ></div>
        )}
        <span className="text-lg">{network}</span>
      </div>
    </div>
  );
};
