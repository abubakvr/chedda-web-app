import { Chedda } from "@/dist/index.js";
import { useWeb3React } from "@web3-react/core";
import { useEnvironment } from "./useEnviroment";

export const useCheddaSdk = () => {
  const { provider } = useWeb3React();
  const { currentEnvironment } = useEnvironment();

  const chedda = new Chedda(currentEnvironment.webSocketUrl);
  const signer = provider?.getSigner?.();
  const priceOracle = chedda.priceOracle();

  return { chedda, signer, priceOracle };
};
