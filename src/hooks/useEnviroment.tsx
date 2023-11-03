import { useState, useCallback } from "react";
import { environmentConfig } from "@/data/environments";
import { IEnvironment } from "@/utils/types";

export function useEnvironment() {
  const [currentEnvironment, setCurrentEnvironment] = useState<IEnvironment>(
    environmentConfig[421613]
  );

  const switchEnvironment = useCallback((environmentId: number) => {
    if (environmentId in environmentConfig) {
      setCurrentEnvironment(environmentConfig[environmentId]);
    } else {
      console.error(`Environment with ID ${environmentId} not found.`);
    }
  }, []);

  return {
    currentEnvironment,
    switchEnvironment,
  };
}
