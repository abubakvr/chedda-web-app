"use client";
import React from "react";
import connectors from "@/connectors";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastProvider } from "@/contexts/ToastContext";
import { NonceProvider } from "@/contexts/NonceContext";

export function AppProviders({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce: string;
}) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <NonceProvider nonce={nonce}>
        <ToastProvider>
          <Provider store={store}>{children}</Provider>
        </ToastProvider>
      </NonceProvider>
    </Web3ReactProvider>
  );
}
