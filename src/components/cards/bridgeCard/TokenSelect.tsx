import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import leftIcon from "@/assets/icon/left-icon.svg";
import SearchIcon from "@/assets/icon/search-icon.svg";
import { ISourceChain, IToken } from "@/utils/types";
import { sourceChains } from "@/utils/constants";
import { useSwitchChain } from "@/hooks";
import { formatNumber } from "@/utils/formatters";

interface TokenBalances {
  [key: string]: number | null;
}

interface TokenSelectProps {
  selectedChain: ISourceChain;
  selectedToken: IToken;
  tokenList: IToken[];
  fetchTokenBalanceLoading: boolean;
  tokenBalances: TokenBalances;
  handleActiveScreen: (term: string) => void;
  switchToSelectedChain: (chain: ISourceChain) => void;
  setSelectedToken: React.Dispatch<React.SetStateAction<IToken>>;
}

export const TokenSelect = ({
  selectedChain,
  tokenList,
  selectedToken,
  fetchTokenBalanceLoading,
  tokenBalances,
  handleActiveScreen,
  switchToSelectedChain,
  setSelectedToken,
}: TokenSelectProps) => {
  const sortedTokenList = [...tokenList];
  const switchChain = useSwitchChain();
  const [searchKeyword, setSearchKeyword] = useState<string>();

  if (selectedToken) {
    const selectedTokenIndex = sortedTokenList.findIndex(
      (token) => token.symbol === selectedToken.symbol
    );
    if (selectedTokenIndex > -1) {
      // Move the selected token to the beginning of the list
      const [selectedToken] = sortedTokenList.splice(selectedTokenIndex, 1);
      sortedTokenList.unshift(selectedToken);
    }
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchKeyword(e.target.value);

  const matchSearchItem = (item: IToken, searchKeyword: string) => {
    const normalizedSearchKeyword = searchKeyword?.toLowerCase() || "";

    const matchesTokenName = item.name
      .toLowerCase()
      .includes(normalizedSearchKeyword);

    const matchesTokenSymbol = item.symbol
      .toLowerCase()
      .includes(normalizedSearchKeyword);

    const matchesTokenAddress = item.address
      .toLowerCase()
      .includes(normalizedSearchKeyword);
    return matchesTokenName || matchesTokenSymbol || matchesTokenAddress;
  };

  const switchNetwork = (chain: ISourceChain) => {
    if (chain !== undefined && chain !== null) {
      switchChain(chain.chainId);
      switchToSelectedChain(chain);
    }
  };

  const renderTokenList = (token: IToken, index: number) => {
    const balanceAddress =
      token.source === selectedChain.key ? token.address : token.bridgedOft;
    return (
      <div key={index} data-testid={"token-list-item"}>
        <button
          onClick={() => {
            setSelectedToken(token);
            handleActiveScreen("bridge");
          }}
          className={`w-full bridge-box relative flex justify-between items-center px-8 py-3 rounded-xl hover:cursor-pointer ${
            selectedToken?.symbol === token.symbol && "bridge-box-active"
          }`}
          data-testid={`token-select-item-${token.symbol}`}
        >
          <div className="w-max flex font-bold items-center py-2 px-4 space-x-4">
            <div className="w-max flex relative">
              <Image src={token.logo} alt="icon image" className="w-10 h-10" />
              <Image
                src={selectedChain.logo}
                alt="icon image"
                className="absolute w-4 h-4 top-0 left-0"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <p className="font-bold text-lg uppercase">{token.symbol}</p>
              <p className="font-bold text-xs mt-0.5">{selectedChain.name}</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-white font-bold">
              {fetchTokenBalanceLoading
                ? "Loading..."
                : tokenBalances[balanceAddress]
                  ? formatNumber(tokenBalances[balanceAddress] || 0)
                  : 0}
            </p>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="flex gap-x-6">
        <button
          className="relative hover:opacity-75"
          onClick={() => handleActiveScreen("bridge")}
          data-testid="back-button"
        >
          <Image src={leftIcon} alt="left icon" className="w-8 h-8" />
        </button>
        <div className="text-3xl font-bold">Select a Token</div>
      </div>
      <div className="flex gap-x-6 mt-8">
        {sourceChains.map((chain, index) => (
          <button
            key={index}
            className="flex flex-col items-center"
            onClick={() => switchNetwork(chain)}
            data-testid={`network-button-${chain.key}`}
          >
            <div
              className={`token-select w-20 h-20 flex justify-center items-center ${
                chain.key === selectedChain.key && "token-select-active"
              }`}
            >
              <Image src={chain.logo} alt="" className="w-8 h-8" />
            </div>
            <p className="font-bold text-xs text-[#B5B5B5] mt-2">
              {chain.name}
            </p>
          </button>
        ))}
      </div>
      <div
        data-testid="search-input"
        className="pool-card mt-8 flex flex-col justify-center gap-4 rounded-lg focus
        "
      >
        <div className="relative p-4">
          <Image
            src={SearchIcon}
            alt="Search Icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-60"
          />
          <input
            type="text"
            className="w-full h-full font-bold bg-transparent focus
        text-white pl-10"
            placeholder="Search token by name or address"
            onChange={(e) => handleSearch(e)}
            data-testid="search-input-field"
          />
        </div>
      </div>
      <div className="mt-6 h-64 overflow-y-auto bridge-scroll-element">
        {sortedTokenList.map((token, index) => {
          if (token.bridgeToken) {
            return !searchKeyword
              ? renderTokenList(token, index)
              : searchKeyword && matchSearchItem(token, searchKeyword)
                ? renderTokenList(token, index)
                : null;
          }
        })}
      </div>
    </div>
  );
};
