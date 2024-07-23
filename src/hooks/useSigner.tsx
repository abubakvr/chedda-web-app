import { useWeb3React } from "@web3-react/core";
import { BrowserProvider, ethers } from "ethers";
import { useMemo } from "react";

export const useSigner = () => {
  const { account } = useWeb3React();

  const provider = useMemo(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      return new BrowserProvider(window.ethereum);
    }
    return undefined;
  }, []);

  const signer = useMemo(() => {
    if (provider && account) {
      return new ethers.JsonRpcSigner(provider, account);
    }
    return undefined;
  }, [provider, account]);

  return {
    provider,
    signer,
  };
};
