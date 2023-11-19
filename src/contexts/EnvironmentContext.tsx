import {
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { environmentConfig } from "@/data/environments";
import { IEnvironment } from "@/utils/types";
import { useWeb3React } from "@web3-react/core";
import { savedChainId } from "@/utils/constants";

// Define the types for your context values
export interface EnvironmentContextProps {
  currentEnvironment: IEnvironment | undefined;
  switchEnvironment: (environmentId: number) => void;
}

// Create a new context with the specified type
export const EnvironmentContext = createContext<
  EnvironmentContextProps | undefined
>(undefined);

// Create a provider component
export interface EnvironmentProviderProps {
  children: ReactNode;
}

export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({
  children,
}) => {
  const [currentEnvironment, setCurrentEnvironment] = useState<
    IEnvironment | undefined
  >();
  const { chainId } = useWeb3React();

  const switchEnvironment = useCallback(
    (environmentId: number) => {
      if (environmentId in environmentConfig) {
        localStorage.setItem(savedChainId, environmentId.toString());
        setCurrentEnvironment(environmentConfig[environmentId]);
      } else {
        console.log(`Environment with ID ${environmentId} not found.`);
      }
    },
    [setCurrentEnvironment]
  );

  useEffect(() => {
    const savedEnvironment = localStorage.getItem(savedChainId);

    if (chainId && chainId in environmentConfig) {
      setCurrentEnvironment(environmentConfig[chainId]);
    } else if (savedEnvironment) {
      setCurrentEnvironment(environmentConfig[parseInt(savedEnvironment)]);
    } else {
      setCurrentEnvironment(environmentConfig[421613]);
    }
  }, [chainId, setCurrentEnvironment, currentEnvironment]);

  // Provide the context values to the components
  const contextValues: EnvironmentContextProps = {
    currentEnvironment,
    switchEnvironment,
  };

  return (
    <EnvironmentContext.Provider value={contextValues}>
      {children}
    </EnvironmentContext.Provider>
  );
};
