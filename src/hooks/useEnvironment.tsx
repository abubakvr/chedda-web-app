import {
  EnvironmentContext,
  EnvironmentContextProps,
} from "@/contexts/EnvironmentContext";
import { useContext } from "react";

export const useEnvironment = (): EnvironmentContextProps => {
  const context = useContext(EnvironmentContext);

  if (!context) {
    throw new Error(
      "useEnvironment must be used within an EnvironmentProvider"
    );
  }

  return context;
};
