import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CheddaInfo } from "../CheddaInfo";
import { useCheddaBalance, useCheddaTotalSupply, useTokenValue } from "@/hooks";

jest.mock("../../../../hooks");

describe("CheddaInfo", () => {
  beforeEach(() => {
    (useCheddaBalance as jest.Mock).mockReturnValue({
      data: BigInt("100000000000000000000"),
      isLoading: false,
    });
    (useCheddaTotalSupply as jest.Mock).mockReturnValue({
      data: BigInt("200000000000000000"),
      isLoading: false,
    });
    (useTokenValue as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
  });

  it("renders without crashing", () => {
    render(
      <CheddaInfo
        isWalletConnected={true}
        cheddaTokenPrice={1000}
        cheddaTokenPriceLoading={false}
      />
    );
    expect(screen.getByTestId("chedda-info-card")).toBeInTheDocument();
  });

  it("displays loading indicators when data is loading", () => {
    (useCheddaBalance as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
    });
    (useTokenValue as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
    });
    (useCheddaTotalSupply as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
    });

    render(
      <CheddaInfo
        isWalletConnected={true}
        cheddaTokenPrice={undefined}
        cheddaTokenPriceLoading={true}
      />
    );
    expect(screen.getByTestId("info-item-chedda-balance")).toHaveTextContent(
      "CHEDDA BALANCE"
    );
    expect(screen.getByTestId("info-item-chedda-price")).toHaveTextContent(
      "CHEDDA PRICE"
    );
    expect(screen.getByTestId("info-item-market-cap")).toHaveTextContent(
      "MARKET CAP"
    );
  });

  it("displays correct values when data is loaded", () => {
    render(
      <CheddaInfo
        isWalletConnected={true}
        cheddaTokenPrice={1000}
        cheddaTokenPriceLoading={false}
      />
    );
    expect(screen.getByText("CHEDDA BALANCE")).toBeInTheDocument();
    expect(screen.getByText("$200.00")).toBeInTheDocument();
    expect(screen.getByText("MARKET CAP")).toBeInTheDocument();
  });

  it("shows connect wallet box when wallet is not connected", () => {
    render(
      <CheddaInfo
        isWalletConnected={false}
        cheddaTokenPrice={1000}
        cheddaTokenPriceLoading={false}
      />
    );
    expect(screen.getByTestId("connect-wallet-box")).toBeInTheDocument();
  });

  it("displays the buy Chedda link", () => {
    render(
      <CheddaInfo
        isWalletConnected={true}
        cheddaTokenPrice={1000}
        cheddaTokenPriceLoading={false}
      />
    );
    expect(screen.getByTestId("buy-chedda-link")).toHaveTextContent(
      "Buy CHEDDA"
    );
  });
});
