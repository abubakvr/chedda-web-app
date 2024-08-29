"use client";
import React, { createContext, ReactNode } from "react";

export interface NonceContextType {
  nonce: string;
}

export const NonceContext = createContext<NonceContextType | undefined>(
  undefined
);

export const NonceProvider: React.FC<{
  nonce: string;
  children: ReactNode;
}> = ({ nonce, children }) => {
  return (
    <NonceContext.Provider value={{ nonce }}>{children}</NonceContext.Provider>
  );
};
