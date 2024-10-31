import React from "react";
import { render, screen } from "@testing-library/react";
import LockTab from "../LockTab";
import {
  useCheddaAllowance,
  useCheddaBalance,
  useClaimableLockRewards,
  useGaugeAddress,
  useLockedChedda,
  useToast,
  useTokenPrice,
  useCheddaPrice,
  useTotalAmountLocked,
  useTotalWeight,
  useTotalWeightSum,
  useTransaction,
} from "@/hooks";
import { StaticImageData } from "next/image";
import { NonceProvider } from "@/contexts/NonceContext";

// Mocking hooks
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));
jest.mock("../../../../../hooks");

const mockLockCheddaToken = jest.fn().mockResolvedValue({ hash: "0x00" });
const mockApproveLpToken = jest.fn().mockResolvedValue({ hash: "0x00" });

describe("LockTab Component", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      lockCheddaToken: mockLockCheddaToken,
      approveCheddaToken: mockApproveLpToken,
    }));
    (useLockedChedda as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useCheddaPrice as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useCheddaBalance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useCheddaAllowance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useClaimableLockRewards as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTokenPrice as jest.Mock).mockReturnValue({
      data: "1000",
      isLoading: false,
    });
    (useTotalAmountLocked as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTotalWeight as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useTotalWeightSum as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
    (useGaugeAddress as jest.Mock).mockReturnValue({
      data: BigInt("0x00"),
      isLoading: false,
    });
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
  });
  test("renders lock tab with correct data", () => {
    const asset = {
      name: "Ethereum",
      symbol: "ETH",
      address: "0x1",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
    };
    render(
      <NonceProvider nonce="0xc8">
        <LockTab asset={asset} fetchPoolStats={jest.fn()} />
      </NonceProvider>
    );

    expect(screen.getByTestId("lock-chedda-card")).toBeInTheDocument();
    expect(screen.getByTestId("lock-chedda-container")).toBeInTheDocument();
    expect(screen.getByTestId("lock-chedda-card")).toBeInTheDocument();
    expect(screen.getByTestId("lock-information-card")).toBeInTheDocument();
    expect(screen.getByTestId("lock-rewards-card")).toBeInTheDocument();
  });
});
