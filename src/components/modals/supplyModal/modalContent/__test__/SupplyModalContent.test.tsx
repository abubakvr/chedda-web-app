import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { SupplyModalContent } from "../SupplyModalContent";
import { StaticImageData } from "next/image";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { WalletConnect } from "@web3-react/walletconnect-v2";

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 1,
    isActivating: false,
  })),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/bridge"),
}));

describe("SupplyModalContent Component", () => {
  const mockProps = {
    title: "Deposit",
    maxAmount: "1000",
    asset: {
      name: "Ethereum",
      symbol: "ETH",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
    },
    assetPrice: 200,
    modalInfo: <div>Mock Modal Info</div>,
    allowance: 500,
    buttonAction: jest.fn(),
    isTransactionLoading: false,
    clearInputField: false,
    setClearInputField: jest.fn(),
    setAmount: jest.fn(),
    amount: 0,
  } as any;

  it("renders component with correct data-testid", () => {
    jest.mock("@web3-react/core", () => {
      return {
        useWeb3React: () => ({
          account: "0x00",
        }),
      };
    });
    render(
      <MockAppProviders>
        <SupplyModalContent {...mockProps} />
      </MockAppProviders>
    );

    const component = screen.getByTestId("supply-modal-content");
    waitFor(() => {
      expect(component).toBeInTheDocument();
    });
  });

  it("updates amount on input change", () => {
    jest.mock("@web3-react/core", () => {
      return {
        useWeb3React: () => ({
          account: "0x00",
        }),
      };
    });
    render(
      <MockAppProviders>
        <SupplyModalContent {...mockProps} />
      </MockAppProviders>
    );

    const amountInput = screen.getByTestId("amount-input");

    act(() => {
      fireEvent.change(amountInput, { target: { value: "50" } });
    });

    waitFor(() => {
      expect(mockProps.setAmount).toHaveBeenCalledWith(50);
    });
  });

  it("uses max amount on MAX button click", () => {
    jest.mock("@web3-react/core", () => {
      return {
        useWeb3React: () => ({
          account: "0x00",
        }),
      };
    });
    render(
      <MockAppProviders>
        <SupplyModalContent {...mockProps} />
      </MockAppProviders>
    );

    const maxButton = screen.getByTestId("max-button");

    act(() => {
      fireEvent.click(maxButton);
    });

    waitFor(() => {
      expect(mockProps.setAmount).toHaveBeenCalledWith(1000);
    });
  });

  it("calls button action on button click", () => {
    jest.mock("@web3-react/core", () => {
      return {
        useWeb3React: () => ({
          account: "0x00",
        }),
      };
    });
    render(
      <MockAppProviders>
        <SupplyModalContent {...mockProps} />
      </MockAppProviders>
    );

    const actionButton = screen.getByTestId("custom-button");

    act(() => {
      fireEvent.click(actionButton);
    });

    waitFor(() => {
      expect(mockProps.buttonAction).toHaveBeenCalled();
    });
  });
});
