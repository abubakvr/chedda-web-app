import { Chedda } from "chedda-sdk";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useEnvironment } from "./useEnvironment";

export const useCheddaSdk = () => {
  const [chedda, setChedda] = useState<Chedda | null>();
  const { provider, account } = useWeb3React();
  const { currentEnvironment } = useEnvironment();

  const setupChedda = useCallback(() => {
    if (!currentEnvironment) return;

    try {
      const cheddaInstance = new Chedda(currentEnvironment.webSocketUrl);
      setChedda(cheddaInstance);
    } catch (error) {
      console.error("Error in setupChedda:", error);
    }
  }, [currentEnvironment, setChedda]);

  useEffect(() => {
    setupChedda();
  }, [currentEnvironment, setupChedda]);

  const signer = useMemo(() => {
    let signer;
    if (provider?.getSigner) {
      signer = provider.getSigner(account);
    }

    return signer;
  }, [provider, account]);

  return { chedda, signer, setupChedda };
};
