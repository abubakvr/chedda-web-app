import React from "react";
import { render, screen } from "@testing-library/react";
import LockTab from "../LockTab";
import {
  useCheddaAllowance,
  useCheddaBalance,
  useClaimableLockRewards,
  useEnvironment,
  useGaugeAddress,
  useLockedChedda,
  useTokenPrice,
  useTokenValue,
  useTotalAmountLocked,
  useTotalWeight,
  useTotalWeightSum,
  useTransaction,
} from "@/hooks";
import { StaticImageData } from "next/image";
import { BigNumber } from "ethers";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";

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
    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
    (useTransaction as jest.Mock).mockImplementation(() => ({
      lockCheddaToken: mockLockCheddaToken,
      approveCheddaToken: mockApproveLpToken,
    }));
    (useLockedChedda as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
      isLoading: false,
    });
    (useTokenValue as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
      isLoading: false,
    });
    (useCheddaBalance as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
      isLoading: false,
    });
    (useCheddaAllowance as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
      isLoading: false,
    });
    (useClaimableLockRewards as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
      isLoading: false,
    });
    (useTokenPrice as jest.Mock).mockReturnValue({
      data: "1000",
      isLoading: false,
    });
    (useTotalAmountLocked as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
      isLoading: false,
    });
    (useTotalWeight as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
      isLoading: false,
    });
    (useTotalWeightSum as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
      isLoading: false,
    });
    (useGaugeAddress as jest.Mock).mockReturnValue({
      data: BigNumber.from("0x00"),
      isLoading: false,
    });
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
    render(<LockTab asset={asset} />);

    expect(screen.getByTestId("lock-chedda-card")).toBeInTheDocument();
    expect(screen.getByTestId("lock-chedda-container")).toBeInTheDocument();
    expect(screen.getByTestId("lock-chedda-card")).toBeInTheDocument();
    expect(screen.getByTestId("lock-information-card")).toBeInTheDocument();
    expect(screen.getByTestId("lock-rewards-card")).toBeInTheDocument();
  });
});
