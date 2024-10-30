import { testnetEnvironment } from "./testnet.config";
import { stagingEnvironment } from "./staging.config";
import { mainnetEnvironment } from "./mainnet.config";

export const currentEnvironment =
  process.env.NEXT_PUBLIC_DEPLOYED_ENV === "mainnet"
    ? mainnetEnvironment
    : process.env.NEXT_PUBLIC_DEPLOYED_ENV === "staging"
      ? stagingEnvironment
      : testnetEnvironment;
