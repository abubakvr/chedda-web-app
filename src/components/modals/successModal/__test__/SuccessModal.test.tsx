import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SuccessModal } from "../SuccessModal";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { WalletConnect } from "@web3-react/walletconnect-v2";

jest.mock("next/image");
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 1,
    isActivating: false,
  })),
}));

jest.mock("@next/third-parties/google");
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/bridge"),
}));

describe("SuccessModal", () => {
  const onCloseMock = jest.fn();
  const continueActionMock = jest.fn();

  const renderComponent = (isOpen: boolean, modalMessage: string) => {
    render(
      <MockAppProviders>
        <SuccessModal
          isOpen={isOpen}
          onClose={onCloseMock}
          modalMessage={modalMessage}
          continueAction={continueActionMock}
        />
      </MockAppProviders>
    );
  };

  it("renders the component when isOpen is true", () => {
    renderComponent(true, "Modal Message");

    waitFor(() => {
      expect(screen.getByText("Transaction Completed")).toBeInTheDocument();
      expect(screen.getByText("Modal Message")).toBeInTheDocument();
    });
  });

  it("does not render the component when isOpen is false", () => {
    renderComponent(false, "Modal Message");

    waitFor(() => {
      expect(screen.queryByText("Transaction Completed")).toBeNull();
      expect(screen.queryByText("Modal Message")).toBeNull();
    });
  });

  it("calls onClose when close button is clicked", () => {
    renderComponent(true, "Modal Message");
    fireEvent.click(screen.getByText("×"));

    waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it("calls continueAction when Continue button is clicked", () => {
    renderComponent(true, "Modal Message");
    fireEvent.click(screen.getByText("Continue"));

    waitFor(() => {
      expect(continueActionMock).toHaveBeenCalledTimes(1);
    });
  });

  it("has correct IDs for main container and transaction completed text", () => {
    renderComponent(true, "Modal Message");

    waitFor(() => {
      expect(screen.getByTestId("successModalContainer")).toBeInTheDocument();
      expect(
        screen.getByTestId("transactionCompletedText")
      ).toBeInTheDocument();
    });
  });
});
