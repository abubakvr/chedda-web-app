import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RestrictedModal } from "../RestrictedModal";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { HOMEPAGE_LINK, CHEDDA_TERMS_LINK } from "@/utils/constants";

jest.mock("../../../../hooks", () => ({
  useSwitchChain: jest.fn(),
}));

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
  usePathname: jest.fn(() => "/restricted"),
}));

describe("RestrictedModal Component", () => {
  it("renders the RestrictedModal correctly", () => {
    // Render the RestrictedModal component
    render(<RestrictedModal />);

    // Check that the modal is rendered
    const modal = screen.getByTestId("restrictedModal");
    expect(modal).toBeInTheDocument();

    // Check for the presence of the "Access Restricted" heading
    const heading = screen.getByText("Access Restricted");
    expect(heading).toBeInTheDocument();

    // Check for the Terms of Service link
    const termsLink = screen.getByRole("link", { name: /Terms of Service/i });
    expect(termsLink).toHaveAttribute("href", CHEDDA_TERMS_LINK);
    expect(termsLink).toHaveAttribute("target", "_blank");
  });

  it("redirects to the homepage when the button is clicked", () => {
    // Mock window.open function
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);

    // Render the RestrictedModal component
    render(<RestrictedModal />);

    // Find the button
    const button = screen.getByRole("button", { name: /GO TO HOMEPAGE/i });

    // Simulate button click
    fireEvent.click(button);

    // Check that window.open was called with the correct link
    expect(openSpy).toHaveBeenCalledWith(HOMEPAGE_LINK, "_blank");

    // Cleanup the mock
    openSpy.mockRestore();
  });
});
