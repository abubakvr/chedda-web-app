import { useState } from "react";
import { BigNumber, Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";
import ERC20 from "@/data/erc20.json";

interface TokenBalanceHookResult {
  tokenBalance: BigNumber | undefined;
  error: Error | null;
  fetchTokenBalance: (token: string) => void;
}

export const useTokenBalance = (): TokenBalanceHookResult => {
  const [tokenBalance, setTokenBalance] = useState<BigNumber>();
  const [error, setError] = useState<Error | null>(null);
  const { account, provider } = useWeb3React();

  const fetchTokenBalance = async (tokenAddress: string) => {
    try {
      if (!provider || !account) {
        throw new Error("Ethereum provider or account not available");
      }

      const contract = new Contract(tokenAddress, ERC20.abi, provider);
      const balance = await contract.balanceOf(account);

      setTokenBalance(balance);
    } catch (error: any) {
      setError(error);
    }
  };

  return { tokenBalance, error, fetchTokenBalance };
};
