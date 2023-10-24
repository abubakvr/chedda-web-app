import { StaticImageData } from "next/image";
import React from "react";

export interface IMenuItem {
  name: string;
  path: string;
  icon: string;
}

export interface INetworkList {
  name: string;
  chainId: string;
  jsonRpcUrl: string;
  webSocketUrl: string;
  faucetUrl: string;
  txUrlPrefix: string;
  icon: StaticImageData;
}

export interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
