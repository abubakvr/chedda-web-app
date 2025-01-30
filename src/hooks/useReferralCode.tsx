import { BASE_CHEDDA_API_URL } from "@/utils/constants";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";

export const useUserReferralCode = () => {
  const [referralCode, setReferralCode] = useState<string | undefined>(
    undefined
  );
  const { account } = useWeb3React();

  const getUserReferralCode = useCallback(async () => {
    if (!account) return;
    try {
      const response = await fetch(
        `${BASE_CHEDDA_API_URL}/user?wallet=${account}`
      );
      const data = await response.json();
      const returnedCode = data?.user?.referralCode;

      if (returnedCode) {
        setReferralCode(returnedCode);
        return returnedCode;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
  }, [account]);

  useEffect(() => {
    getUserReferralCode();
  }, [getUserReferralCode]);

  return { referralCode, getUserReferralCode };
};
