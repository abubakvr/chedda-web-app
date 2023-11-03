import { useState, useCallback, useEffect } from "react";
import { environmentConfig } from "@/data/environments";
import { IEnvironment } from "@/utils/types";
import { useWeb3React } from "@web3-react/core";

export function useEnvironment() {
  const { chainId } = useWeb3React();
  const [currentEnvironment, setCurrentEnvironment] = useState<IEnvironment>(
    environmentConfig[chainId ?? 421613]
  );

  const switchEnvironment = useCallback((environmentId: number) => {
    if (environmentId in environmentConfig) {
      setCurrentEnvironment(environmentConfig[environmentId]);
    } else {
      console.log(`Environment with ID ${environmentId} not found.`);
    }
  }, []);

  useEffect(() => {
    // Update the current environment whenever chainId changes
    if (chainId && chainId in environmentConfig) {
      setCurrentEnvironment(environmentConfig[chainId]);
    }
  }, [chainId]);

  return {
    currentEnvironment,
    switchEnvironment,
  };
}
