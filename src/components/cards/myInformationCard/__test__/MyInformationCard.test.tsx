import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MyInformationCard } from "../MyInformationCard";
import { mockAccountInfo, mockPoolStats } from "@/utils/Mocks/MockTestData";
import {
  useAccountCollateral,
  useAccountHealth,
  useAllowance,
  useAssetBalance,
  useAvailableLiquidity,
  useSelectTokenBalance,
  useToast,
  useTokenBalance,
  useTokenCollateralValue,
  useTokenValue,
  useTransaction,
} from "@/hooks";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("ethers");
jest.mock("../../../../hooks");

describe("MyInformationCard", () => {
  it("renders MyInformationCard component correctly", () => {
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
    (useAllowance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useAssetBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useAvailableLiquidity as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useTransaction as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useAccountCollateral as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useSelectTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useAccountHealth as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useTokenValue as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));
    (useTokenCollateralValue as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));

    render(
      <MockAppProviders>
        <MyInformationCard
          accountInfo={mockAccountInfo}
          poolStats={mockPoolStats[0]}
          isLoading={false}
          assetPrice={1000}
          available={BigInt("1000")}
          fetchPoolInfo={jest.fn()}
          setActivePoolTab={jest.fn()}
        />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByText("My Information")).toBeInTheDocument();
      expect(screen.getByText("Vault Contract")).toBeInTheDocument();
      expect(screen.getAllByTestId("collateral-logo")).toHaveLength(2);
      expect(screen.getByTestId("collaterals-list")).toBeInTheDocument();
    });
  });

  it("renders MyInformationCard component in loading state correctly", () => {
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
      fetchTokenBalance: jest.fn(),
      tokenBalance: "1000",
    }));

    render(
      <MockAppProviders>
        <MyInformationCard
          accountInfo={undefined}
          poolStats={undefined}
          isLoading={true}
          assetPrice={0}
          available={undefined}
          setActivePoolTab={jest.fn()}
          fetchPoolInfo={jest.fn()}
        />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByTestId("info-loading-element")).toBeInTheDocument();
    });
  });
});
