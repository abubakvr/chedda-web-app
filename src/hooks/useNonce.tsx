import { useContext } from "react";
import { NonceContext, NonceContextType } from "@/contexts/NonceContext";

export const useNonce = (): NonceContextType => {
  const context = useContext(NonceContext);
  if (!context) {
    throw new Error("useNonce must be used within a NonceProvider");
  }
  return context;
};
