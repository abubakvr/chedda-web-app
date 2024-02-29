// MyInformationCard.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MyInformationCard } from "../MyInformationCard";
import { mockAccountInfo, mockPoolStats } from "@/utils/Mocks/MockTestData";
import { useTokenBalance } from "@/hooks";
import { ethers } from "ethers";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("ethers");
jest.mock("../../../../hooks");

describe("MyInformationCard", () => {
  it("renders MyInformationCard component correctly", () => {
    (useTokenBalance as jest.Mock).mockImplementation(() => ({
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
          available={ethers.BigNumber.from("1000")}
          fetchAccountInfo={jest.fn()}
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
          fetchAccountInfo={jest.fn()}
        />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByTestId("info-loading-element")).toBeInTheDocument();
    });
  });
});
