import { useState, useEffect } from "react";
import { Signer } from "ethers";
import { useCheddaSdk, useEnvironment } from "@/hooks";
import { generateInterestRateUtilizations } from "@/utils/helpers";
import { IInterestRatesProjection } from "chedda-sdk";

export const useRatesProjector = (poolId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [interestRates, setInterestRates] = useState<
    IInterestRatesProjection[]
  >([]);
  const { chedda, signer } = useCheddaSdk();
  const { currentEnvironment } = useEnvironment();

  async function fetchData() {
    setIsLoading(true);

    try {
      if (!chedda || !currentEnvironment || !poolId) {
        return;
      }

      const lendingPool = chedda.lendingPool(poolId, signer as Signer);
      const ratesProjector = chedda.interestRateProjector(
        currentEnvironment.contracts.InterestRatesProjector,
        signer as Signer
      );

      const interestRateModel = await lendingPool.interestRatesModel();
      const utlizations = generateInterestRateUtilizations();

      const interestRatesProjection = await ratesProjector.projection(
        interestRateModel,
        utlizations
      );

      setInterestRates(interestRatesProjection);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      throw new Error("Error in getting interest rates: " + error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [chedda, poolId]);

  return { isLoading, interestRates, fetchData };
};
