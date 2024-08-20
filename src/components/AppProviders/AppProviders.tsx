"use client";
import React from "react";
import connectors from "@/connectors";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastProvider } from "@/contexts/ToastContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <ToastProvider>
        <Provider store={store}>{children}</Provider>
      </ToastProvider>
    </Web3ReactProvider>
  );
}
