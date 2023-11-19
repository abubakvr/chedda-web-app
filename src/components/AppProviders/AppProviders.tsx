"use client";

import React from "react";
import connectors from "@/connectors";
import { Web3ReactProvider } from "@web3-react/core";
import { EnvironmentProvider } from "@/contexts/EnvironmentContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <EnvironmentProvider>{children}</EnvironmentProvider>
    </Web3ReactProvider>
  );
}
