"use client";

import React from "react";
import connectors from "@/connectors";
import { Web3ReactProvider } from "@web3-react/core";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
