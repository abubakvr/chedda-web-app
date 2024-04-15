import { Chedda } from "chedda-sdk";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { currentEnvironment } from "@/data/environments";

export const useCheddaSdk = () => {
  const { provider, account } = useWeb3React();

  const chedda = useMemo(() => {
    if (!currentEnvironment) {
      return null;
    }

    return new Chedda(currentEnvironment.jsonRpcUrl);
  }, [currentEnvironment]);

  const signer = useMemo(() => {
    let signer;
    if (provider?.getSigner) {
      signer = provider.getSigner(account);
    }

    return signer;
  }, [provider, account]);

  return { chedda, signer };
};
