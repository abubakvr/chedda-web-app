import { testnetEnvironment } from "./testnet.config";
import { stagingEnvironment } from "./staging.config";
import { mainnetEnvironment } from "./mainnet.config";

export const currentEnvironment =
  process.env.DEPLOYED_ENV === "mainnet"
    ? mainnetEnvironment
    : process.env.DEPLOYED_ENV === "staging"
      ? stagingEnvironment
      : process.env.DEPLOYED_ENV === "testnet"
        ? testnetEnvironment
        : mainnetEnvironment;
